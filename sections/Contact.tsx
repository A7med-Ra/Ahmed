"use client";
import { useState } from "react";
import { MessageCircle, Mail } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import Reveal from "@/components/Reveal";
import { WHATSAPP, LINKS } from "@/constants";
const F = ["name", "phone", "company", "email"] as const;
type ContactField = "name" | "phone" | "email" | "message";
export default function Contact() {
  const { t } = useLang();
  const [waUrl, setWaUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({});
  const [loading, setLoading] = useState(false);
  const input = "w-full rounded-xl border border-white/10 bg-bg px-4 py-3 outline-none transition focus:border-accent focus:ring-1 focus:ring-accent";
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const v = (k: string) => String(d.get(k) || "").trim();
    const nextErrors: Partial<Record<ContactField, string>> = {};
    if (!v("name")) nextErrors.name = t("contact.errors.name");
    if (v("phone").replace(/\D/g, "").length < 7 || v("phone").replace(/\D/g, "").length > 15) nextErrors.phone = t("contact.errors.phone");
    const email = form.elements.namedItem("email") as HTMLInputElement;
    if (v("email") && !email.checkValidity()) nextErrors.email = t("contact.errors.email");
    if (!v("message")) nextErrors.message = t("contact.errors.message");
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus();
      return;
    }
    const lines = [t("contact.waGreeting"), ""];
    F.forEach(f => v(f) && lines.push(`${t(`contact.${f}`)}: ${v(f)}`));
    lines.push(`${t("contact.type")}: ${v("type")}`, "", v("message"));
    const url = `${WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`;
    setWaUrl(null);
    setLoading(true);
    window.open(url, "_blank", "noopener,noreferrer");
    window.setTimeout(() => { setLoading(false); setWaUrl(url); }, 350);
  }
  return (
    <section id="contact" className="mx-auto grid max-w-6xl gap-10 px-5 py-24 lg:grid-cols-[1.4fr_1fr]">
      <Reveal>
      <form noValidate onSubmit={submit} className="space-y-4 rounded-3xl bg-card p-6 sm:p-8">
        <h2 className="text-3xl font-bold">{t("contact.title")}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {F.map(f => (
            <label key={f} className="text-sm text-muted">{t(`contact.${f}`)}
              <input name={f} required={f === "name" || f === "phone"} type={f === "email" ? "email" : f === "phone" ? "tel" : "text"}
                aria-invalid={!!errors[f as ContactField]} aria-describedby={errors[f as ContactField] ? `contact-${f}-error` : undefined}
                onChange={() => setErrors(previous => ({ ...previous, [f]: undefined }))}
                inputMode={f === "phone" ? "tel" : undefined} autoComplete={f === "phone" ? "tel" : f === "email" ? "email" : "off"} className={`${input} mt-1`} />
              {errors[f as ContactField] && <span id={`contact-${f}-error`} role="alert" className="mt-1 block text-sm text-accent">{errors[f as ContactField]}</span>}
            </label>
          ))}
        </div>
        <label className="block text-sm text-muted">{t("contact.type")}
          <select name="type" className={`${input} mt-1`}>{(t("contact.types") as string[]).map(x => <option key={x}>{x}</option>)}</select></label>
        <label className="block text-sm text-muted">{t("contact.message")}<textarea name="message" required rows={6} aria-invalid={!!errors.message} aria-describedby={errors.message ? "contact-message-error" : undefined} onChange={() => setErrors(previous => ({ ...previous, message: undefined }))} className={`${input} mt-1`} />
          {errors.message && <span id="contact-message-error" role="alert" className="mt-1 block text-sm text-accent">{errors.message}</span>}
        </label>
        <button disabled={loading} aria-busy={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-4 font-semibold text-onaccent transition hover:brightness-110 disabled:cursor-wait disabled:opacity-75"><MessageCircle size={18} />{loading ? t("contact.sending") : t("contact.submit")}</button>
        {waUrl && (
          <p role="status" aria-live="polite" className="text-sm text-muted">{t("contact.sent")}{" "}
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="text-accent underline">{t("contact.openWa")}</a></p>
        )}
      </form>
      </Reveal>
      <Reveal>
      <aside className="space-y-3 text-muted">
        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl bg-accent p-5 font-medium text-onaccent"><MessageCircle />WhatsApp</a>
        <a href={LINKS.email} className="flex items-center gap-3 p-2 hover:text-white"><Mail size={18} />Email</a>
      </aside>
      </Reveal>
    </section>
  );
}
