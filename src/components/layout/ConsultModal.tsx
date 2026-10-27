"use client";

import { useRef, useState, type FormEvent } from "react";
import { Check, Send, X } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { submitLead } from "@/lib/lead";
import { store, useCart } from "@/lib/store";
import { useUI } from "@/lib/ui-state";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site";
import { gsap } from "@/components/animations/gsap";
import { EASE } from "@/components/animations/motion";
import { useOverlay } from "@/components/animations/useOverlay";

type Status = "idle" | "sending" | "done" | "error";

const field =
  "h-12 w-full rounded-2xl border border-line bg-white/5 px-4 text-[15px] text-fog outline-none transition-colors placeholder:text-ash focus:border-white/30 focus:bg-white/8";

/** Consultation request / order form. Also used as the "Buyurtma berish" step of the cart. */
export function ConsultModal() {
  const { consult, closeConsult } = useUI();
  const { lines, total } = useCart();
  const { t } = useI18n();
  const isOrder = consult.mode === "order";

  const root = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const firstField = useRef<HTMLInputElement>(null);
  const check = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const close = () => {
    closeConsult();
    // let the exit animation finish before resetting
    window.setTimeout(() => {
      setStatus("idle");
      setError("");
    }, 600);
  };
  useOverlay({ open: consult.open, onClose: close, root, backdrop, panel, from: "center", focusRef: firstField });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const digits = phone.replace(/\D/g, "");
    if (name.trim().length < 2) return setError("Ismingizni kiriting.");
    if (digits.length < 9) return setError("Telefon raqamini to'g'ri kiriting.");

    setStatus("sending");
    const res = await submitLead({
      kind: consult.mode,
      name: name.trim(),
      phone: phone.trim(),
      message: message.trim() || undefined,
      subject: consult.subject,
      ...(isOrder
        ? {
            items: lines.map((l) => ({
              id: l.id,
              name: l.product.name,
              qty: l.qty,
              color: l.color,
              price: l.product.price,
            })),
            total,
          }
        : {}),
    });

    if (!res.ok) {
      setStatus("error");
      setError("Yuborib bo'lmadi. Iltimos, qayta urinib ko'ring yoki bizga qo'ng'iroq qiling.");
      return;
    }

    if (isOrder) store.clearCart();
    setStatus("done");
    setName("");
    setPhone("");
    setMessage("");
    requestAnimationFrame(() => {
      if (check.current) gsap.fromTo(check.current, { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: EASE.pop });
    });
  };

  return (
    <div
      ref={root}
      inert={!consult.open}
      className="fixed inset-0 z-[100] hidden"
      role="dialog"
      aria-modal="true"
      aria-label={isOrder ? "Buyurtma berish" : "Konsultatsiya olish"}
    >
      <div ref={backdrop} onClick={close} className="absolute inset-0 bg-black/70 opacity-0 backdrop-blur-md" />

      <div className="relative flex h-full items-end justify-center p-0 sm:items-center sm:p-6">
        <div
          ref={panel}
          tabIndex={-1}
          data-lenis-prevent
          className="surface relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-[28px] p-5 pb-8 outline-none sm:rounded-[32px] sm:p-8 md:p-9"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Yopish"
            className="absolute right-3.5 top-3.5 flex size-9 items-center justify-center rounded-full text-smoke transition-colors hover:bg-fog/10 hover:text-fog sm:right-4 sm:top-4 sm:size-10"
          >
            <X className="size-5" />
          </button>

          {status === "done" ? (
            <div className="flex flex-col items-center gap-4 py-6 text-center sm:gap-5 sm:py-8">
              <div ref={check} className="flex size-16 items-center justify-center rounded-full bg-fog text-ink sm:size-20">
                <Check className="size-8 sm:size-10" strokeWidth={2.4} />
              </div>
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {t({ uz: "Rahmat!", ru: "Спасибо!" })}
              </h2>
              <p className="max-w-xs text-xs text-smoke sm:text-sm">
                {isOrder
                  ? t({ uz: "Buyurtmangiz qabul qilindi. Menejerimiz tez orada siz bilan bog'lanadi.", ru: "Ваш заказ принят. Наш менеджер скоро свяжется с вами." })
                  : t({ uz: "So'rovingiz qabul qilindi. Menejerimiz tez orada siz bilan bog'lanadi.", ru: "Ваша заявка принята. Наш менеджер скоро свяжется с вами." })}
              </p>
              <button
                type="button"
                onClick={close}
                className="mt-2 inline-flex h-10 items-center rounded-full bg-white/10 px-5 text-xs font-medium transition-colors hover:bg-white/15 sm:h-11 sm:px-6 sm:text-sm"
              >
                {t({ uz: "Yopish", ru: "Закрыть" })}
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3.5 sm:gap-4">
              <div className="pr-10">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-ash">
                  {isOrder ? t({ uz: "Buyurtma", ru: "Заказ" }) : t("nav.consult")}
                </p>
                <h2 className="mt-1.5 text-xl font-semibold leading-tight tracking-[-0.02em] sm:mt-2 sm:text-2xl md:text-3xl">
                  {isOrder
                    ? t({ uz: "Buyurtmani rasmiylashtiring", ru: "Оформите заказ" })
                    : t({ uz: "Mos qurilmani birga tanlaymiz", ru: "Поможем выбрать устройство" })}
                </h2>
                <p className="mt-1.5 text-xs text-smoke sm:mt-2 sm:text-sm">
                  {isOrder
                    ? t({ uz: "Ma'lumotlaringizni qoldiring — menejer tasdiqlash va yetkazib berish uchun bog'lanadi.", ru: "Оставьте данные — менеджер свяжется для подтверждения и доставки." })
                    : t({ uz: "Raqamingizni qoldiring — mutaxassisimiz qo'ng'iroq qilib, savollaringizga javob beradi.", ru: "Оставьте номер — специалист перезвонит и ответит на все вопросы." })}
                </p>
              </div>

              {consult.subject ? (
                <div className="rounded-2xl border border-line bg-white/4 px-4 py-3 text-sm text-smoke">
                  <span className="text-ash">{isOrder ? `${t("cart.title")}: ` : `${t({ uz: "Mavzu: ", ru: "Тема: " })}`}</span>
                  {consult.subject}
                  {isOrder ? <span className="mt-1 block font-medium text-fog">{t("cart.total")}: {formatPrice(total)}</span> : null}
                </div>
              ) : null}

              <label className="flex flex-col gap-1.5">
                <span className="text-xs text-smoke">{t("consult.nameLabel")}</span>
                <input
                  ref={firstField}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  placeholder={t({ uz: "Ism", ru: "Имя" })}
                  className={field}
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs text-smoke">{t("consult.phoneLabel")}</span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+998 90 123 45 67"
                  className={field}
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs text-smoke">{t("consult.commentLabel")}</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder={t({ uz: "Qaysi qurilma yoki qanday vazifa uchun kerak?", ru: "Для каких задач или какое устройство вас интересует?" })}
                  className={cn(field, "h-auto resize-none py-3")}
                />
              </label>

              {error ? (
                <p role="alert" className="text-xs text-red-300 sm:text-sm">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white text-sm font-medium text-black transition-colors hover:bg-white/90 disabled:opacity-60 sm:h-13 sm:text-[15px]"
              >
                {status === "sending" ? (
                  t({ uz: "Yuborilmoqda…", ru: "Отправка…" })
                ) : (
                  <>
                    <Send className="size-4" />
                    <span>{t("consult.sendBtn")}</span>
                  </>
                )}
              </button>

              <p className="text-center text-xs text-ash">
                Savollar uchun:{" "}
                <a href={site.contacts.telegramSupport} target="_blank" rel="noopener noreferrer" className="text-smoke underline-offset-4 hover:underline">
                  {site.contacts.telegramSupportLabel}
                </a>
                {" · Tel: "}
                <a href={site.contacts.phoneHref} className="text-smoke underline-offset-4 hover:underline">
                  {site.contacts.phone}
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
