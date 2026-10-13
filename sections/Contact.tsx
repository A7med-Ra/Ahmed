"use client";
import { useState } from "react";
import { MessageCircle, Mail } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { WHATSAPP, LINKS } from "@/constants";
const F = ["name", "phone", "company", "email"] as const;
export default function Contact() {
  const { t } = useLang();
  const [waUrl, setWaUrl] = useState<string | null>(null);
  const input = "w-full rounded-xl border border-white/10 bg-bg px-4 py-3 outline-none transition focus:border-accent focus:ring-1 focus:ring-accent";
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const v = (k: string) => String(d.get(k) || "").trim();
    const lines = [t("contact.waGreeting"), ""];
    F.forEach(f => v(f) && lines.push(`${t(`contact.${f}`)}: ${v(f)}`));
    lines.push(`${t("contact.type")}: ${v("type")}`, "", v("message"));
    const url = `${WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`;
    setWaUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return (
    <section id="contact" className="mx-auto grid max-w-6xl gap-10 px-5 py-24 lg:grid-cols-[1.4fr_1fr]">
      <form onSubmit={submit} className="space-y-4 rounded-3xl bg-card p-6 sm:p-8">
        <h2 className="text-3xl font-bold">{t("contact.title")}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {F.map(f => (
            <label key={f} className="text-sm text-muted">{t(`contact.${f}`)}
              <input name={f} required={f === "name" || f === "phone"} type={f === "email" ? "email" : f === "phone" ? "tel" : "text"}
                inputMode={f === "phone" ? "tel" : undefined} autoComplete={f === "phone" ? "tel" : f === "email" ? "email" : "off"} className={`${input} mt-1`} />
            </label>
          ))}
        </div>
        <label className="block text-sm text-muted">{t("contact.type")}
          <select name="type" className={`${input} mt-1`}>{(t("contact.types") as string[]).map(x => <option key={x}>{x}</option>)}</select></label>
        <label className="block text-sm text-muted">{t("contact.message")}<textarea name="message" required rows={6} className={`${input} mt-1`} /></label>
        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-4 font-semibold text-bg transition hover:brightness-110"><MessageCircle size={18} />{t("contact.submit")}</button>
        {waUrl && (
          <p role="status" className="text-sm text-muted">{t("contact.sent")}{" "}
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="text-accent underline">{t("contact.openWa")}</a></p>
        )}
      </form>
      <aside className="space-y-3 text-muted">
        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl bg-accent p-5 font-medium text-bg"><MessageCircle />WhatsApp</a>
        <a href={LINKS.email} className="flex items-center gap-3 p-2 hover:text-white"><Mail size={18} />Email</a>
      </aside>
    </section>
  );
}
