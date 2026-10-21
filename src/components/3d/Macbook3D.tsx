"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

// Cached GLTF model so we only download 10.6MB once across the entire site
let cachedGltf: GLTF | null = null;
let loadPromise: Promise<GLTF> | null = null;

function loadMacbookGltf(): Promise<GLTF> {
  if (cachedGltf) return Promise.resolve(cachedGltf);
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      "/macbook_pro_m3_16_inch_2024.glb",
      (gltf) => {
        cachedGltf = gltf;
        resolve(gltf);
      },
      undefined,
      (err) => {
        console.error("Failed to load MacBook 3D model:", err);
        reject(err);
      },
    );
  });

  return loadPromise;
}

export type Macbook3DProps = {
  className?: string;
  mode?: "hero" | "showcase" | "interactive";
  /** Optional manual scroll progress from 0 to 1 (for showcase scrub) */
  scrollProgress?: number;
  /** Optional ref with scroll progress to avoid React re-renders on scroll */
  scrollProgressRef?: React.RefObject<number | null>;
  /** Initial rotation offsets in radians */
  initialRotationX?: number;
  initialRotationY?: number;
  /** Whether mouse tilt / drag orbit is active */
  interactive?: boolean;
  /** Priority flag to start loading immediately */
  priority?: boolean;
};

export function Macbook3D({
  className = "",
  mode = "hero",
  scrollProgress,
  scrollProgressRef,
  initialRotationX = 0.14,
  initialRotationY = 0,
  interactive = true,
}: Macbook3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // References to communicate with the render loop without re-running useEffect
  const pivotRef = useRef<THREE.Group | null>(null);
  const scrollRef = useRef<number | undefined>(scrollProgress);
  const progressRefInternal = useRef(scrollProgressRef);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    progressRefInternal.current = scrollProgressRef;
  }, [scrollProgressRef]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let isDisposed = false;
    let animId: number;
    let isVisible = true;

    // ── 1. Three.js Scene, Camera, Renderer ─────────────────
    const scene = new THREE.Scene();

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;
    const aspect = width / height;

    const camera = new THREE.PerspectiveCamera(32, aspect, 0.1, 100);
    const initialCamZ = aspect < 1.1 ? Math.min(10.5, (6.8 / aspect) * 0.95) : 6.8;
    const initialCamY = initialCamZ * (1.1 / 6.8);
    camera.position.set(0, initialCamY, initialCamZ);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Append canvas to container
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // ── 2. Studio Lighting for Apple Aluminum & Glass ────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Main Key Light (front-top-right)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(4, 7, 6);
    scene.add(keyLight);

    // Soft Fill Light (cool-tinted, from left)
    const fillLight = new THREE.DirectionalLight(0xdbeafe, 1.6);
    fillLight.position.set(-5, 3, 5);
    scene.add(fillLight);

    // Rim Accent Light (back-bottom, specular edges)
    const rimLight = new THREE.DirectionalLight(0xa78bfa, 1.6);
    rimLight.position.set(0, -3, -5);
    scene.add(rimLight);

    // Overhead subtle bounce (illuminates keyboard)
    const topLight = new THREE.DirectionalLight(0xffffff, 1.2);
    topLight.position.set(0, 8, 2);
    scene.add(topLight);

    // ── 3. Pivot Group ──────────────────────────────────────
    const pivot = new THREE.Group();
    pivot.rotation.x = initialRotationX;
    pivot.rotation.y = initialRotationY;
    scene.add(pivot);
    pivotRef.current = pivot;

    // ── 4. Load & Setup Model ───────────────────────────────
    loadMacbookGltf()
      .then((gltf) => {
        if (isDisposed) return;

        // Clone the model scene using SkeletonUtils for safety
        const model = clone(gltf.scene);

        // Compute bounding box and center the model exactly
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);

        // Normalize target size: target width ~ 2.9 units in scene for balanced framing
        const targetSize = 2.9;
        const scale = targetSize / maxDim;
        model.scale.setScalar(scale);

        // Center model and lift by 0.22 units so the keyboard, trackpad, and bottom chassis
        // are 100% visible with equal top and bottom breathing room.
        model.position.x = -center.x * scale;
        model.position.y = -center.y * scale + 0.22;
        model.position.z = -center.z * scale;

        // Enhance material reflectivity for dark mode
        model.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            child.castShadow = false;
            child.receiveShadow = false;
            if (
              "metalness" in child.material &&
              typeof (child.material as THREE.MeshStandardMaterial).envMapIntensity === "number"
            ) {
              (child.material as THREE.MeshStandardMaterial).envMapIntensity = 1.4;
            }
          }
        });

        pivot.add(model);
        setLoaded(true);
      })
      .catch((err) => {
        console.error(err);
        if (!isDisposed) setError(true);
      });

    // ── 5. Mouse Interaction Tracking ───────────────────────
    let mouseX = 0;
    let mouseY = 0;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let targetRotX = initialRotationX;
    let targetRotY = initialRotationY;

    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onPointerMove = (e: MouseEvent | PointerEvent) => {
      if (mode === "showcase") return;

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;

        dragOffsetY += deltaX * 0.008;
        dragOffsetX = Math.max(-0.5, Math.min(0.5, dragOffsetX + deltaY * 0.008));
        targetRotY = initialRotationY + dragOffsetY;
        targetRotX = initialRotationX + dragOffsetX;
        return;
      }

      if (!interactive) return;

      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      mouseX = Math.max(-1, Math.min(1, normX));
      mouseY = Math.max(-1, Math.min(1, normY));

      targetRotY = initialRotationY + dragOffsetY + mouseX * 0.32;
      targetRotX = Math.max(-0.4, Math.min(0.6, initialRotationX + dragOffsetX - mouseY * 0.18));
    };

    const onPointerDown = (e: PointerEvent) => {
      if (mode === "showcase" || !interactive) return;
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      try {
        container.setPointerCapture(e.pointerId);
      } catch {}
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      try {
        container.releasePointerCapture(e.pointerId);
      } catch {}
    };

    if (interactive && mode !== "showcase") {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      container.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("pointerup", onPointerUp);
    }

    // ── 6. Intersection Observer (Pause when off-screen) ────
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 },
    );
    observer.observe(container);

    // ── 7. Resize Observer ──────────────────────────────────
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const w = entry.contentRect.width;
      const h = entry.contentRect.height;
      if (w > 0 && h > 0) {
        const aspect = w / h;
        camera.aspect = aspect;
        const camZ = aspect < 1.1 ? Math.min(10.5, (6.8 / aspect) * 0.95) : 6.8;
        const camY = camZ * (1.1 / 6.8);
        camera.position.set(0, camY, camZ);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    // ── 8. Render Loop ──────────────────────────────────────
    const clock = new THREE.Clock();

    const animate = () => {
      if (isDisposed) return;
      animId = requestAnimationFrame(animate);

      if (!isVisible) return; // 0% GPU while offscreen

      const elapsedTime = clock.getElapsedTime();

      if (pivot) {
        if (mode === "showcase") {
          // In showcase mode: driven by scroll progress
          const pRef = progressRefInternal.current;
          const progress =
            pRef && typeof pRef.current === "number"
              ? pRef.current
              : (scrollRef.current ?? 0);

          // Smooth 3D rotation timeline:
          // 0.0 -> front view tilted
          // 0.3 -> swings right (rotY: -28deg)
          // 0.6 -> swings left, reveals side & back (rotY: +34deg)
          // 1.0 -> beautiful centered finish
          const targetShowcaseRotY =
            initialRotationY + Math.sin(progress * Math.PI * 2) * -0.6;
          const targetShowcaseRotX =
            initialRotationX + Math.sin(progress * Math.PI) * 0.12;

          pivot.rotation.y += (targetShowcaseRotY - pivot.rotation.y) * 0.1;
          pivot.rotation.x += (targetShowcaseRotX - pivot.rotation.x) * 0.1;
          pivot.position.y = Math.sin(elapsedTime * 0.7) * 0.03;
        } else {
          // Hero mode: mouse tilt + subtle breathing float
          pivot.rotation.y += (targetRotY - pivot.rotation.y) * 0.06;
          pivot.rotation.x += (targetRotX - pivot.rotation.x) * 0.06;

          // Subtle idle float
          if (!isDragging) {
            pivot.position.y = Math.sin(elapsedTime * 1.2) * 0.05;
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // ── 9. Cleanup on Unmount ───────────────────────────────
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animId);
      observer.disconnect();
      resizeObserver.disconnect();

      window.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);

      renderer.dispose();
      renderer.forceContextLoss();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [mode, initialRotationX, initialRotationY, interactive]);

  return (
    <div className={`relative size-full select-none ${className}`}>
      {/* 3D Canvas Mount Point */}
      <div
        ref={mountRef}
        className={`size-full transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${interactive && mode !== "showcase" ? "cursor-grab active:cursor-grabbing" : ""}`}
      />

      {/* Loading Skeleton / Pulse */}
      {!loaded && !error && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="relative flex size-12 items-center justify-center">
            <span className="absolute size-full rounded-full border border-white/20 animate-ping" />
            <span className="size-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-widest text-smoke">
            3D MacBook yuklanmoqda...
          </span>
        </div>
      )}

      {/* Interactive Helper Badge (for Hero) */}
      {loaded && mode === "hero" && interactive && (
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] text-smoke backdrop-blur-md opacity-60 hover:opacity-100 transition-opacity">
          3D • Sichqoncha bilan burang
        </div>
      )}
    </div>
  );
}
