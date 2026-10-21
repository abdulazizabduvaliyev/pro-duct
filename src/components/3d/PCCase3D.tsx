"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export type RGBTheme = {
  name: string;
  color: string;
  glow: string;
  gradient: string;
};

export const PC_RGB_THEMES: RGBTheme[] = [
  { name: "Kiber Moviy", color: "#38bdf8", glow: "rgb(56 189 248 / 0.4)", gradient: "from-sky-500/20 via-sky-400/10 to-transparent" },
  { name: "Neon Binafsha", color: "#c084fc", glow: "rgb(192 132 252 / 0.4)", gradient: "from-purple-500/20 via-fuchsia-400/10 to-transparent" },
  { name: "Zumrad Yashil", color: "#34d399", glow: "rgb(52 211 153 / 0.4)", gradient: "from-emerald-500/20 via-emerald-400/10 to-transparent" },
  { name: "Muz Oq", color: "#f8fafc", glow: "rgb(255 255 255 / 0.4)", gradient: "from-white/25 via-white/10 to-transparent" },
  { name: "Quyosh Olov", color: "#fb923c", glow: "rgb(251 146 60 / 0.4)", gradient: "from-orange-500/20 via-amber-400/10 to-transparent" },
];

export type PCCase3DProps = {
  className?: string;
  activeRgb?: RGBTheme;
};

export function PCCase3D({
  className = "",
  activeRgb = PC_RGB_THEMES[0],
}: PCCase3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const rgbRef = useRef(activeRgb);

  useEffect(() => {
    rgbRef.current = activeRgb;
  }, [activeRgb]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let isDisposed = false;
    let animId: number;
    let isVisible = true;

    // ── 1. Scene, Camera, Renderer ───────────────────────────
    const scene = new THREE.Scene();

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(4.2, 2.2, 5.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // ── 2. Studio Lighting ──────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x94a3b8, 1.4);
    fillLight.position.set(-5, 2, 4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.6);
    rimLight.position.set(0, -3, -5);
    scene.add(rimLight);

    // ── 3. Pivot Group ──────────────────────────────────────
    const pivot = new THREE.Group();
    // Default 3/4 beauty angle: shows front glass, side glass, and internal components
    pivot.rotation.y = -0.55;
    pivot.rotation.x = 0.12;
    scene.add(pivot);

    // ── 4. Build Procedural Gaming PC Case ──────────────────
    const pcGroup = new THREE.Group();
    pivot.add(pcGroup);

    // Materials
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x141418,
      metalness: 0.8,
      roughness: 0.35,
    });

    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0d,
      metalness: 0.6,
      roughness: 0.6,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.28,
      roughness: 0.08,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const rgbColor = new THREE.Color(rgbRef.current.color);
    const rgbEmissiveMat = new THREE.MeshStandardMaterial({
      color: rgbColor,
      emissive: rgbColor,
      emissiveIntensity: 2.2,
      roughness: 0.2,
    });

    // Dynamic RGB materials list for color updates
    const rgbMaterials: THREE.MeshStandardMaterial[] = [rgbEmissiveMat];

    // Case Dimensions: W: 1.8, H: 3.4, D: 3.2
    const caseW = 1.8;
    const caseH = 3.4;
    const caseD = 3.2;

    // A) Case Bottom (PSU Chamber / Feet)
    const bottomGeo = new THREE.BoxGeometry(caseW, 0.6, caseD);
    const bottomMesh = new THREE.Mesh(bottomGeo, chassisMat);
    bottomMesh.position.set(0, -caseH / 2 + 0.3, 0);
    pcGroup.add(bottomMesh);

    // 4 Rubber Feet
    const footGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.1, 16);
    const footMat = new THREE.MeshStandardMaterial({ color: 0x222226, roughness: 0.9 });
    const footOffsets = [
      [-caseW / 2 + 0.18, -caseH / 2 - 0.05, -caseD / 2 + 0.2],
      [caseW / 2 - 0.18, -caseH / 2 - 0.05, -caseD / 2 + 0.2],
      [-caseW / 2 + 0.18, -caseH / 2 - 0.05, caseD / 2 - 0.2],
      [caseW / 2 - 0.18, -caseH / 2 - 0.05, caseD / 2 - 0.2],
    ];
    footOffsets.forEach(([fx, fy, fz]) => {
      const foot = new THREE.Mesh(footGeo, footMat);
      foot.position.set(fx, fy, fz);
      pcGroup.add(foot);
    });

    // B) Case Top Roof (Exhaust mesh)
    const topGeo = new THREE.BoxGeometry(caseW, 0.2, caseD);
    const topMesh = new THREE.Mesh(topGeo, chassisMat);
    topMesh.position.set(0, caseH / 2 - 0.1, 0);
    pcGroup.add(topMesh);

    // C) Case Back Wall
    const backGeo = new THREE.BoxGeometry(caseW, caseH - 0.8, 0.1);
    const backMesh = new THREE.Mesh(backGeo, chassisMat);
    backMesh.position.set(0, 0.1, -caseD / 2 + 0.05);
    pcGroup.add(backMesh);

    // D) Right Solid Metal Panel
    const rightGeo = new THREE.BoxGeometry(0.08, caseH - 0.8, caseD);
    const rightMesh = new THREE.Mesh(rightGeo, chassisMat);
    rightMesh.position.set(-caseW / 2 + 0.04, 0.1, 0);
    pcGroup.add(rightMesh);

    // E) Left Panoramic Tempered Glass Panel
    const leftGlassGeo = new THREE.BoxGeometry(0.04, caseH - 0.8, caseD - 0.1);
    const leftGlassMesh = new THREE.Mesh(leftGlassGeo, glassMat);
    leftGlassMesh.position.set(caseW / 2 - 0.02, 0.1, 0);
    pcGroup.add(leftGlassMesh);

    // F) Front Glass Panel
    const frontGlassGeo = new THREE.BoxGeometry(caseW - 0.1, caseH - 0.8, 0.04);
    const frontGlassMesh = new THREE.Mesh(frontGlassGeo, glassMat);
    frontGlassMesh.position.set(0, 0.1, caseD / 2 - 0.02);
    pcGroup.add(frontGlassMesh);

    // G) Motherboard Tray & PCB
    const moboGeo = new THREE.BoxGeometry(0.05, 1.9, 2.0);
    const moboMesh = new THREE.Mesh(moboGeo, innerMat);
    moboMesh.position.set(-caseW / 2 + 0.25, 0.35, 0.1);
    pcGroup.add(moboMesh);

    // Chipset Heatsink
    const heatsinkGeo = new THREE.BoxGeometry(0.08, 0.45, 0.5);
    const heatsinkMat = new THREE.MeshStandardMaterial({ color: 0x2a2a32, metalness: 0.9, roughness: 0.2 });
    const heatsink = new THREE.Mesh(heatsinkGeo, heatsinkMat);
    heatsink.position.set(-caseW / 2 + 0.3, -0.2, -0.3);
    pcGroup.add(heatsink);

    // H) CPU AIO Liquid Cooler Pump (Center of Mobo)
    const pumpBaseGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.12, 32);
    const pumpBaseMat = new THREE.MeshStandardMaterial({ color: 0x18181c, roughness: 0.4 });
    const pumpBase = new THREE.Mesh(pumpBaseGeo, pumpBaseMat);
    pumpBase.rotation.z = Math.PI / 2;
    pumpBase.position.set(-caseW / 2 + 0.32, 0.6, 0.1);
    pcGroup.add(pumpBase);

    // RGB Infinity Mirror Ring on Pump
    const pumpRingGeo = new THREE.TorusGeometry(0.18, 0.025, 16, 32);
    const pumpRing = new THREE.Mesh(pumpRingGeo, rgbEmissiveMat);
    pumpRing.rotation.y = Math.PI / 2;
    pumpRing.position.set(-caseW / 2 + 0.38, 0.6, 0.1);
    pcGroup.add(pumpRing);

    // Cooling Tubes from Pump to Top Radiator
    const curve1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-caseW / 2 + 0.35, 0.65, 0.2),
      new THREE.Vector3(-caseW / 2 + 0.55, 0.95, 0.35),
      new THREE.Vector3(-caseW / 2 + 0.4, 1.4, 0.4),
    ]);
    const tubeGeo1 = new THREE.TubeGeometry(curve1, 20, 0.035, 8, false);
    const tubeMat = new THREE.MeshStandardMaterial({ color: 0x111115, roughness: 0.8 });
    const tube1 = new THREE.Mesh(tubeGeo1, tubeMat);
    pcGroup.add(tube1);

    const curve2 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-caseW / 2 + 0.35, 0.58, 0.0),
      new THREE.Vector3(-caseW / 2 + 0.58, 0.9, 0.15),
      new THREE.Vector3(-caseW / 2 + 0.4, 1.4, 0.2),
    ]);
    const tubeGeo2 = new THREE.TubeGeometry(curve2, 20, 0.035, 8, false);
    const tube2 = new THREE.Mesh(tubeGeo2, tubeMat);
    pcGroup.add(tube2);

    // I) RAM Sticks (with RGB Lightbars)
    const ramGeo = new THREE.BoxGeometry(0.04, 0.45, 0.08);
    const ramRgbGeo = new THREE.BoxGeometry(0.045, 0.08, 0.08);
    for (let r = 0; r < 2; r++) {
      const zOffset = 0.45 + r * 0.12;
      const ramStick = new THREE.Mesh(ramGeo, heatsinkMat);
      ramStick.position.set(-caseW / 2 + 0.32, 0.6, zOffset);
      pcGroup.add(ramStick);

      const ramRgb = new THREE.Mesh(ramRgbGeo, rgbEmissiveMat);
      ramRgb.position.set(-caseW / 2 + 0.32, 0.82, zOffset);
      pcGroup.add(ramRgb);
    }

    // J) GPU: Massive Triple-Slot Graphics Card
    const gpuW = 0.5;
    const gpuH = 0.4;
    const gpuL = 1.9;
    const gpuGeo = new THREE.BoxGeometry(gpuW, gpuH, gpuL);
    const gpuMat = new THREE.MeshStandardMaterial({ color: 0x1c1c22, metalness: 0.8, roughness: 0.3 });
    const gpuMesh = new THREE.Mesh(gpuGeo, gpuMat);
    gpuMesh.position.set(-caseW / 2 + 0.65, -0.15, 0.2);
    pcGroup.add(gpuMesh);

    // GPU RGB Logo Strip on Side
    const gpuStripGeo = new THREE.BoxGeometry(0.02, 0.08, 0.9);
    const gpuStrip = new THREE.Mesh(gpuStripGeo, rgbEmissiveMat);
    gpuStrip.position.set(-caseW / 2 + 0.91, -0.15, 0.2);
    pcGroup.add(gpuStrip);

    // K) ARGB Cooling Fans (Top 3x, Rear 1x)
    const fansList: THREE.Group[] = [];

    function createFan(radius: number) {
      const fanGroup = new THREE.Group();
      // Outer ring
      const ringGeo = new THREE.TorusGeometry(radius, 0.03, 16, 32);
      const ringMesh = new THREE.Mesh(ringGeo, rgbEmissiveMat);
      fanGroup.add(ringMesh);

      // Blades
      const bladesGroup = new THREE.Group();
      const bladeGeo = new THREE.BoxGeometry(radius * 0.85, 0.02, radius * 0.28);
      const bladeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 });
      for (let b = 0; b < 5; b++) {
        const blade = new THREE.Mesh(bladeGeo, bladeMat);
        blade.rotation.z = (b * Math.PI) / 2.5;
        bladesGroup.add(blade);
      }
      fanGroup.add(bladesGroup);
      return { fanGroup, bladesGroup };
    }

    // Top 3 Fans (AIO 360mm Radiator)
    for (let f = 0; f < 3; f++) {
      const { fanGroup, bladesGroup } = createFan(0.36);
      fanGroup.rotation.x = Math.PI / 2;
      fanGroup.position.set(0, 1.45, -0.8 + f * 0.85);
      pcGroup.add(fanGroup);
      fansList.push(bladesGroup);
    }

    // Rear 1x Exhaust Fan
    const { fanGroup: rearFan, bladesGroup: rearBlades } = createFan(0.38);
    rearFan.position.set(0, 0.65, -caseD / 2 + 0.2);
    pcGroup.add(rearFan);
    fansList.push(rearBlades);

    setLoaded(true);

    // ── 5. Mouse Orbit / Drag Interaction ───────────────────
    let targetRotY = -0.55;
    let targetRotX = 0.12;
    let dragOffsetY = 0;
    let dragOffsetX = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onPointerMove = (e: MouseEvent | PointerEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;

        dragOffsetY += deltaX * 0.008;
        dragOffsetX = Math.max(-0.4, Math.min(0.5, dragOffsetX + deltaY * 0.008));
        targetRotY = -0.55 + dragOffsetY;
        targetRotX = 0.12 + dragOffsetX;
        return;
      }

      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetRotY = -0.55 + dragOffsetY + Math.max(-1, Math.min(1, normX)) * 0.28;
      targetRotX = Math.max(-0.35, Math.min(0.45, 0.12 + dragOffsetX - Math.max(-1, Math.min(1, normY)) * 0.15));
    };

    const onPointerDown = (e: PointerEvent) => {
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

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);

    // ── 6. Intersection & Resize Observers ──────────────────
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 },
    );
    observer.observe(container);

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const w = entry.contentRect.width;
      const h = entry.contentRect.height;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        if (w < 640) {
          camera.position.set(4.8, 2.5, 5.8);
        } else {
          camera.position.set(4.2, 2.2, 5.2);
        }
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    // ── 7. Render Loop ──────────────────────────────────────
    const clock = new THREE.Clock();

    const animate = () => {
      if (isDisposed) return;
      animId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Update RGB lights smoothly
      const currentRgb = rgbRef.current;
      const targetColor = new THREE.Color(currentRgb.color);
      rgbMaterials.forEach((mat) => {
        mat.color.lerp(targetColor, 0.1);
        mat.emissive.lerp(targetColor, 0.1);
      });

      // Spin fan blades
      fansList.forEach((blades) => {
        blades.rotation.z += 0.07;
      });

      // Smooth camera orbit & subtle idle float
      if (pivot) {
        pivot.rotation.y += (targetRotY - pivot.rotation.y) * 0.06;
        pivot.rotation.x += (targetRotX - pivot.rotation.x) * 0.06;
        if (!isDragging) {
          pivot.position.y = Math.sin(elapsedTime * 1.2) * 0.04;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

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
  }, []);

  return (
    <div className={`relative size-full select-none ${className}`}>
      {/* 3D Canvas */}
      <div
        ref={mountRef}
        className={`size-full cursor-grab active:cursor-grabbing transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ touchAction: "pan-y" }}
      />

      {/* Loading Skeleton */}
      {!loaded && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="relative flex size-12 items-center justify-center">
            <span className="absolute size-full rounded-full border border-white/20 animate-ping" />
            <span className="size-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-widest text-smoke">
            3D Kompyuter yuklanmoqda...
          </span>
        </div>
      )}

      {/* Interactive Helper Badge */}
      {loaded && (
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3.5 py-1 text-[11px] font-medium text-smoke backdrop-blur-md">
          <span className="size-1.5 rounded-full animate-pulse" style={{ backgroundColor: activeRgb.color }} />
          <span>3D • Sichqoncha bilan 360° burang</span>
        </div>
      )}
    </div>
  );
}
