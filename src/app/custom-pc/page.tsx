import type { Metadata } from "next";
import { ChevronRight, Wrench } from "lucide-react";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { PCBuilder } from "@/components/pc-builder/PCBuilder";

export const metadata: Metadata = {
  title: "PC Konfigurator — O'z kompyuteringizni yig'ing",
  description:
    "NVIDIA RTX 5090, RTX 5080, RTX 5060, Intel Core i9, AMD Ryzen 7800X3D va Lian Li, NZXT, Fractal Design korpuslari bilan o'z shaxsiy kompyuteringizni yig'ing va hisoblang.",
  alternates: { canonical: "/custom-pc" },
};

export default function CustomPCPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-28 pt-24 md:px-10 md:pt-28">
      {/* Breadcrumb navigation */}
      <nav aria-label="Yo'l" className="mb-6 flex items-center gap-1.5 text-xs text-ash">
        <TransitionLink href="/" className="transition-colors hover:text-white">
          Bosh sahifa
        </TransitionLink>
        <ChevronRight className="size-3.5" />
        <span className="text-smoke">PC Konfigurator</span>
      </nav>

      {/* Page Heading */}
      <div className="mb-10 flex flex-col items-start gap-3">
        <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-smoke">
          <Wrench className="size-3.5 text-white" />
          Maxsus kompyuter yig&apos;ish studiyasi
        </span>

        <h1 className="text-3xl font-semibold tracking-[-0.035em] text-fog sm:text-4xl md:text-5xl">
          O&apos;z orzuingizdagi kompyuterni yig&apos;ing.
        </h1>

        <p className="max-w-2xl text-sm leading-relaxed text-smoke md:text-base">
          Yangi avlod NVIDIA GeForce RTX 5060, RTX 5080, RTX 5090 videokartalari, eng kuchli Intel & AMD protsessorlari va premium korpuslarni tanlang. Real vaqtda narx va quvvatni hisoblang.
        </p>
      </div>

      {/* Interactive Builder */}
      <PCBuilder />
    </div>
  );
}
