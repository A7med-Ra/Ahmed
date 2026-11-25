"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, MessageCircle, RotateCcw } from "lucide-react";
import { WHATSAPP } from "@/constants";
import { useLang } from "@/hooks/useLang";
import Reveal from "@/components/Reveal";

const QUESTIONS = {
  ar: [
    { title: "نوع نشاطك التجاري وحجم المنافسة حواليك إيه؟", choices: ["متجر أو تجارة إلكترونية", "خدمات أو عيادة", "تقنية أو SaaS", "علامة شخصية أو نشاط آخر"] },
    { title: "لما العميل يشوف بوستاتك، إيه أول رد فعل بيحصل؟", choices: ["بيعمل Scroll من غير ما يقف", "بيسأل بكام ويمشي", "تفاعل ضعيف أو متقطع", "بيسأل وبيكمل للخطوة الجاية"] },
    { title: "أسلوب الكتابة في إعلاناتك وبوستاتك مبني على إيه؟", choices: ["وصف المميزات والأسعار", "كلام عام شبه المنافسين", "لسه مفيش خطة كتابة واضحة", "احتياج العميل واعتراضاته"] },
    { title: "إزاي بتكسر خوف أو تردد العميل قبل الشراء؟", choices: ["مش بتكلم عن مخاوفه بوضوح", "بذكر الخصم أو السعر بس", "بعرض تجربة أو دليل ثقة", "بجاوب على اعتراضاته بمحتوى مقنع"] },
    { title: "إيه أكبر هدف عايز تحققه في الـ90 يوم الجايين؟", choices: ["مبيعات أكتر", "عملاء محتملون مناسبون", "تحويل المتابعين لمشترين", "إطلاق عرض أو خدمة جديدة"] },
  ],
  en: [
    { title: "What does your business do, and how crowded is the market?", choices: ["Retail or ecommerce", "Services or healthcare", "Technology or SaaS", "Personal brand or other"] },
    { title: "When people see your posts, what do they usually do first?", choices: ["Scroll past without stopping", "Ask the price, then leave", "Engage very little or inconsistently", "Ask questions and take the next step"] },
    { title: "What guides the copy in your ads and social posts?", choices: ["Features and prices", "General copy like competitors", "No clear writing plan yet", "Customer needs and objections"] },
    { title: "How does your content ease a customer's doubts before buying?", choices: ["It rarely addresses their concerns", "It mainly mentions a discount or price", "It shares proof or customer experience", "It answers objections with persuasive content"] },
    { title: "What is your biggest goal for the next 90 days?", choices: ["More sales", "More qualified leads", "Turn followers into buyers", "Launch an offer or service"] },
  ],
};

export default function GrowthAudit() {
  const { lang } = useLang();
  const ar = lang === "ar";
  const questions = QUESTIONS[lang];
  const [answers, setAnswers] = useState<number[]>([]);
  const complete = answers.length === questions.length;
  const score = useMemo(() => {
    // Keep the diagnostic in a deliberately realistic 32–54 readiness range.
    const friction = answers.reduce((total, answer, index) => total + (answer === 3 ? 0 : [4, 6, 5, 5, 2][index]), 0);
    return Math.max(32, Math.min(54, 54 - friction));
  }, [answers]);
  const insight = useMemo(() => {
    const post = answers[1];
    const copy = answers[2];
    const objection = answers[3];
    if (post === 0 || post === 1) return ar
      ? "العميل إما بيعدّي البوست أو بيسأل عن السعر ويمشي. ده غالباً معناه إن الخطاف بيشد الانتباه من غير ما يوضح قيمة تخليه يكمل؛ محتواك محتاج يربط احتياجه بسبب مقنع للشراء."
      : "People either scroll past or ask the price and leave. Your hook may get attention without showing enough value to keep them moving. The copy needs to connect their need to a clear reason to buy.";
    if (copy === 0 || copy === 1 || copy === 2) return ar
      ? "لما البوست يكتفي بالمميزات أو كلام عام، العميل مش بيشوف نفسه في الرسالة ومش بيلقى سبب يختارك. محتاجين كتابة تبدأ بوجعه، وتوضح الفرق، وتنتهي بخطوة شراء واضحة."
      : "When a post lists features or uses generic lines, customers don't see themselves in it or a reason to choose you. The copy needs to start with their problem, show what makes you different, and give them a clear next step.";
    if (objection === 0 || objection === 1) return ar
      ? "محتواك بيطلب من العميل يشتري قبل ما يطمن. من غير إجابة واضحة على تردده ودليل ثقة، حتى الخطاف الجيد ممكن يجيب مشاهدة من غير تحويل."
      : "Your content asks customers to buy before they feel confident. Without a clear answer to their doubts and proof they can trust, even a strong hook can earn views without conversions.";
    return ar
      ? "واضح إن عندك أساس كويس، لكن النتيجة اللي عايزها محتاجة ربط أقوى بين الخطاف، والرسالة المكتوبة، واعتراضات العميل، وخطوة التحويل."
      : "You have a useful foundation, but reaching your goal takes a tighter link between the hook, the copy, customer objections, and the conversion step.";
  }, [answers, ar]);
  const chosen = (question: number) => questions[question].choices[answers[question]];
  const report = ar
    ? `تشخيص نمو المحتوى | النشاط: ${chosen(0)} | رد فعل العميل على البوستات: ${chosen(1)} | أسلوب الكتابة: ${chosen(2)} | معالجة التردد: ${chosen(3)} | هدف 90 يوم: ${chosen(4)} | جاهزية التحويل: ${score}% | الملاحظة: ${insight}`
    : `Content Growth Audit | Business: ${chosen(0)} | Reaction to posts: ${chosen(1)} | Copywriting: ${chosen(2)} | Handling hesitation: ${chosen(3)} | 90-day goal: ${chosen(4)} | Conversion readiness: ${score}% | Insight: ${insight}`;
  const choose = (value: number) => setAnswers((previous) => [...previous, value]);

  return (
    <section id="growth-audit" className="mx-auto max-w-5xl px-5 py-20" aria-labelledby="audit-title">
      <Reveal>
        <div className="grid gap-8 overflow-hidden rounded-[2rem] border border-accent/20 bg-card p-6 shadow-2xl md:grid-cols-[.8fr_1.2fr] md:p-10">
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-sm font-semibold tracking-[.18em] text-accent">{ar ? "تشخيص نمو المحتوى" : "CONTENT GROWTH AUDIT"}</span>
              <h2 id="audit-title" className="mt-3 text-3xl font-bold">{ar ? "بوستاتك بتحوّل لمبيعات؟" : "Are your posts turning into sales?"}</h2>
              <p className="mt-3 text-muted">{ar ? "جاوب على 5 أسئلة سريعة واكتشف فين بتضيع فرص التحويل." : "Answer five quick questions and find where conversions are slipping away."}</p>
            </div>
            <div className="mt-8 flex gap-2" aria-label={ar ? "التقدم" : "Progress"}>
              {questions.map((question, index) => <span key={question.title} className={`h-1.5 flex-1 rounded-full ${index < answers.length ? "bg-accent" : "bg-white/10"}`} />)}
            </div>
          </div>
          <div className="min-h-64 rounded-2xl border border-white/10 bg-bg/60 p-5 sm:p-7" aria-live="polite">
            {complete ? <div className="animate-in">
              <div className="flex items-start justify-between gap-4">
                <div><span className="text-sm text-muted">{ar ? "جاهزية التحويل الحالية" : "CURRENT CONVERSION READINESS"}</span><p className="mt-1 text-4xl font-bold text-accent">{score}<span className="text-lg text-muted">%</span></p></div>
                <button type="button" onClick={() => setAnswers([])} aria-label={ar ? "ابدأ من جديد" : "Start over"} className="rounded-full border border-white/10 p-2 text-muted transition hover:text-accent"><RotateCcw size={17} /></button>
              </div>
              <div className="mt-5 rounded-xl border-s-2 border-accent bg-accent/5 p-4"><p className="text-xs font-bold text-accent">{ar ? "إيه اللي موقف التحويل؟" : "WHY CONVERSIONS ARE STALLING"}</p><p className="mt-1 text-sm leading-7">{insight}</p></div>
              <div className="mt-4 space-y-2 text-xs text-muted">{questions.slice(1, 4).map((question, index) => <p key={question.title}><span className="font-semibold text-white">{question.title} </span>{chosen(index + 1)}</p>)}</div>
              <a href={`${WHATSAPP}?text=${encodeURIComponent(report)}`} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-onaccent transition hover:brightness-110"><MessageCircle size={18} />{ar ? "ابعت التشخيص الكامل على واتساب" : "Send my full audit on WhatsApp"}</a>
            </div> : <div>
              <div className="mb-5 flex items-center justify-between"><p className="text-sm font-semibold text-muted">{ar ? `السؤال ${answers.length + 1} من ${questions.length}` : `QUESTION ${answers.length + 1} OF ${questions.length}`}</p>{answers.length > 0 && <button type="button" onClick={() => setAnswers((previous) => previous.slice(0, -1))} className="inline-flex items-center gap-1 text-xs text-muted hover:text-accent">{ar ? <><ArrowRight size={14} />رجوع</> : <><ArrowLeft size={14} />Back</>}</button>}</div>
              <h3 className="mb-4 text-xl font-bold">{questions[answers.length].title}</h3>
              <div className="grid gap-2 sm:grid-cols-2">{questions[answers.length].choices.map((choice, index) => <button type="button" key={choice} onClick={() => choose(index)} className="rounded-xl border border-white/10 px-4 py-3 text-start text-sm transition hover:border-accent/50 hover:bg-accent/5 focus-visible:border-accent">{choice}</button>)}</div>
            </div>}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
