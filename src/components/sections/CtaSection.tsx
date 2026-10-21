"use client";

import { useRef } from "react";
import { ArrowRight, Phone, Send } from "lucide-react";
import { site } from "@/lib/site";
import { useParallax } from "@/components/animations/useParallax";
import { useReveal } from "@/components/animations/useReveal";
import { Button } from "@/components/ui/Button";
import { OpenConsult } from "@/components/ui/OpenConsult";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Final premium call-to-action: catalogue or consultation. */
export function CtaSection() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  useParallax(root);

  return (
    <section ref={root} id="cta" className="relative px-4 pb-20 sm:px-6 md:px-10 md:pb-36">
      <div className="surface relative mx-auto max-w-[1440px] overflow-hidden rounded-[28px] px-5 py-14 text-center sm:rounded-[40px] sm:px-6 md:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            data-parallax="0.25"
            className="absolute -left-[10%] -top-[40%] h-[90%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.14),transparent)] blur-2xl"
          />
          <div
            data-parallax="-0.2"
            className="absolute -bottom-[45%] -right-[10%] h-[90%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.1),transparent)] blur-2xl"
          />
          <div className="noise absolute inset-0" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
          <span data-reveal className="glass rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide text-smoke sm:px-4">
            Savolingiz bormi?
          </span>
          <SectionHeading
            align="center"
            title="Mos qurilmani birga tanlaymiz."
            description="Mutaxassisimiz ehtiyojingizni eshitib, byudjetingizga mos eng yaxshi variantni tavsiya qiladi."
            className="mt-5 sm:mt-6"
          />

          <div data-reveal className="mt-8 flex w-full max-w-xs flex-col items-stretch justify-center gap-3 sm:mt-10 sm:w-auto sm:max-w-none sm:flex-row sm:items-center">
            <OpenConsult size="lg" magnetic className="w-full sm:w-auto">
              Konsultatsiya olish
            </OpenConsult>
            <Button href="/catalog" variant="secondary" size="lg" magnetic icon={<ArrowRight className="size-4" />} className="w-full sm:w-auto">
              Katalogga o&apos;tish
            </Button>
          </div>

          <div data-reveal className="mt-8 flex flex-col items-center justify-center gap-x-8 gap-y-3 text-sm text-smoke sm:mt-10 sm:flex-row sm:flex-wrap">
            <a href={site.contacts.phoneHref} className="inline-flex items-center gap-2 transition-colors hover:text-white">
              <Phone className="size-4" strokeWidth={1.8} />
              {site.contacts.phone}
            </a>
            <a
              href={site.contacts.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <Send className="size-4" strokeWidth={1.8} />
              {site.contacts.telegramLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
