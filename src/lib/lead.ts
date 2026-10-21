export type LeadPayload = {
  kind: "consultation" | "order";
  name: string;
  phone: string;
  message?: string;
  subject?: string;
  /** Cart lines for `order` leads. */
  items?: Array<{ id: string; name: string; qty: number; color?: string; price: number }>;
  total?: number;
};

/**
 * Sends a consultation request / order to the backend.
 *
 * TODO: set NEXT_PUBLIC_LEAD_ENDPOINT (e.g. a PHP/Telegram-bot relay or your
 * API). Until then requests are NOT delivered anywhere — the call just
 * resolves so the UI flow can be developed.
 */
export async function submitLead(payload: LeadPayload): Promise<{ ok: boolean; demo?: boolean }> {
  const endpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT;

  if (!endpoint) {
    console.warn("[lead] NEXT_PUBLIC_LEAD_ENDPOINT is not set — lead was not sent:", payload);
    await new Promise((resolve) => setTimeout(resolve, 700));
    return { ok: true, demo: true };
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}
