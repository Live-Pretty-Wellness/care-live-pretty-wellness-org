import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import lpwLogo from "@/assets/lpw-logo.png";

const CONSULTATION_URL = "https://stan.store/liveprettywellness/p/personalized-skincare-strategy-visit";
const STRATEGIST_URL = "https://liveprettywellness.com/pretty-skin-strategist";
const JEAN_PHOTO = "/images/jeans-picks/acneplan/jean-portrait-approved.jpeg";
const PAGE_PATH = "/acne-prone-skin-elimination-guide";

export const Route = createFileRoute("/acne-prone-skin-elimination-guide")({
  head: () => ({
    meta: [
      { title: "Acne-Prone Skin Elimination Guide | Live Pretty Wellness" },
      {
        name: "description",
        content:
          "Use this free acne-prone skin elimination guide to screen skincare ingredients, products, habits, foods, and everyday exposures and build a simpler starting routine.",
      },
      { name: "robots", content: "index, follow" },
      { name: "googlebot", content: "index, follow" },
      { property: "og:title", content: "Acne-Prone Skin Elimination Guide | Live Pretty Wellness" },
      {
        property: "og:description",
        content:
          "Screen skincare ingredients, products, habits, foods, and everyday exposures, then build a simpler three-day starting routine.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_PATH },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: PAGE_PATH }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "The Acne-Prone Skin Elimination Guide",
          description:
            "A free guide for screening products, ingredients, foods, habits, and everyday exposures and building a simpler starting routine.",
          url: PAGE_PATH,
          author: {
            "@type": "Person",
            name: "Jean",
            honorificSuffix: "MSN, FNP-C",
            jobTitle: "Board-Certified Family Nurse Practitioner",
            worksFor: { "@type": "Organization", name: "Live Pretty Wellness" },
          },
          publisher: { "@type": "Organization", name: "Live Pretty Wellness" },
        }),
      },
    ],
  }),
  component: EliminationGuidePage,
});

const COMEDOGENIC_INGREDIENTS = [
  "Isopropyl Myristate",
  "Isopropyl Palmitate",
  "Myristyl Myristate",
  "Myristyl Lactate",
  "Laureth-4",
  "Acetylated Lanolin",
  "Lanolin derivatives",
  "Ethylhexyl Palmitate",
  "Octyl Palmitate",
  "Wheat Germ Oil",
  "Algae Extracts in rich formulations",
  "Carrageenan",
  "Cocoa Butter",
  "Heavy waxes or esters when your skin consistently clogs from them",
];

const HEAVY_OILS = [
  "Coconut Oil",
  "Cocoa Butter",
  "Wheat Germ Oil",
  "Flaxseed Oil",
  "Palm Oil",
  "Soybean Oil",
  "Avocado Oil",
  "Olive Oil",
  "Shea Butter in very rich formulations",
];

const OUTSIDE_SKINCARE = [
  "Hair oils",
  "Edge control",
  "Leave-in conditioner",
  "Hair masks",
  "Styling creams",
  "Scalp treatments",
  "Makeup",
  "Cleansing balms",
  "Body products touching the face",
];

const IRRITATING_INGREDIENTS = [
  "High concentrations of alcohol",
  "Strong fragrance",
  "Essential oils",
  "Menthol",
  "Peppermint",
  "Eucalyptus",
  "Camphor",
  "Citrus oils",
  "Witch hazel in highly astringent formulas",
  "Strong exfoliating acids used too frequently",
  "High-strength benzoyl peroxide when poorly tolerated",
  "Retinoids used too aggressively",
  "Multiple acne actives layered together",
];

const IRRITATING_PRODUCTS = [
  "Physical facial scrubs",
  "Exfoliating brushes",
  "Cleansing devices",
  "Strong acne cleansers",
  "Astringent toners",
  "Alcohol-heavy toners",
  "Peel pads",
  "At-home chemical peels",
  "Multiple exfoliating serums",
  "Harsh clay masks",
  "Strong spot treatments used over large areas",
  "Fragranced skincare if your skin is reactive",
  "Too many acne treatments at the same time",
];

const OVER_TREATMENT_SIGNS = [
  "Burning",
  "Stinging",
  "Persistent redness",
  "Tightness after cleansing",
  "Peeling",
  "Sudden sensitivity",
  "Increased oiliness with dehydration",
  "Breakouts appearing alongside irritation",
];

const IRRITATING_PRACTICES = [
  "Washing your face too frequently",
  "Using very hot water",
  "Scrubbing while cleansing",
  "Cleansing for excessively long periods",
  "Picking or squeezing pimples",
  "Constantly touching your face",
  "Changing products every few days",
  "Adding multiple new products at once",
  "Exfoliating every day",
  "Layering several strong active ingredients",
  "Using acne treatments on already irritated skin",
  "Frequently using extraction tools",
  "Sleeping in makeup",
  "Leaving sweat on the skin for long periods",
  "Allowing hair products to sit against acne-prone facial skin",
  "Using dirty makeup brushes or applicators",
  "Repeatedly rubbing the skin with towels, cleansing cloths, or wipes",
];

const BEYOND_SKINCARE = [
  "Haircare",
  "Makeup",
  "Sunscreen",
  "Lip products",
  "Pillowcases",
  "Hats and headbands",
  "Workout gear",
  "Phones",
  "Towels",
];

const FOOD_GROUPS = [
  {
    title: "Eliminate",
    items: [
      "White bread",
      "White rice",
      "Corn flakes",
      "Puffed rice cereal",
      "Potato chips",
      "White potatoes",
      "French fries",
      "Doughnuts",
      "Pastries",
      "Sugary drinks",
      "Milkshakes",
      "Cow’s milk",
      "Fast food",
      "Fried foods",
      "Highly processed snack foods",
    ],
  },
  { title: "For now", items: ["Cook most of your meals at home."] },
  {
    title: "Vegetables",
    items: ["Leafy greens", "Broccoli", "Cauliflower", "Cabbage", "Peppers", "Zucchini", "Green beans", "Brussels sprouts"],
  },
  { title: "Whole fruit", items: ["Berries", "Apples", "Pears", "Cherries", "Peaches", "Plums", "Kiwi"] },
  { title: "Protein", items: ["Fish", "Chicken", "Turkey", "Beans", "Lentils"] },
  { title: "Carbohydrates", items: ["Sweet potatoes", "Quinoa", "Beans", "Lentils"] },
  {
    title: "Oils + fats",
    items: ["Avocado oil", "Extra-virgin olive oil", "Avocado", "Walnuts", "Almonds", "Chia seeds", "Pumpkin seeds"],
  },
  { title: "Milk alternatives", items: ["Unsweetened almond milk", "Unsweetened soy milk"] },
];

type AccordionItem = { id: string; title: string; content: ReactNode };

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[0.98rem] leading-relaxed text-ink-soft">
          <span aria-hidden="true" className="mt-[0.68rem] h-1.5 w-1.5 shrink-0 rounded-full bg-rose" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-cocoa">{children}</p>;
}

function GuideAccordion({ items, value, onChange }: { items: AccordionItem[]; value: string; onChange: (id: string) => void }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => {
        const open = value === item.id;
        const panelId = `${item.id}-panel`;
        return (
          <section key={item.id}>
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => onChange(open ? "" : item.id)}
                className="flex min-h-16 w-full items-center justify-between gap-5 py-4 text-left font-sans text-[0.79rem] font-semibold uppercase tracking-[0.13em] text-ink transition-colors hover:text-cocoa focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                <span>{item.title}</span>
                <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-rose text-xl font-normal text-cocoa">
                  {open ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div id={panelId} hidden={!open} className="pb-7 pr-1 sm:pr-6">
              {item.content}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function SectionHeading({ id, number, title, subtitle }: { id: string; number: string; title: string; subtitle: string }) {
  return (
    <header>
      <Label>{number} — {title}</Label>
      <h2 id={id} className="mt-3 text-[2rem] sm:text-[2.65rem]">{subtitle}</h2>
    </header>
  );
}

function ActionLink({ href, children, outlined = false }: { href: string; children: ReactNode; outlined?: boolean }) {
  return (
    <a
      href={href}
      className={`mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-sm px-5 py-3 text-center text-[0.74rem] font-semibold uppercase tracking-[0.12em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:w-auto ${
        outlined ? "border border-cocoa text-cocoa hover:bg-cocoa hover:text-offwhite" : "bg-cocoa text-offwhite hover:bg-espresso"
      }`}
    >
      {children}
    </a>
  );
}

function ClinicalCheckIn({ final = false }: { final?: boolean }) {
  return (
    <section className="border-y border-rose bg-rose-tint py-9" aria-labelledby={final ? "final-check-in" : "first-check-in"}>
      <div className="pick-shell">
        <Label>Clinical check-in</Label>
        <h2 id={final ? "final-check-in" : "first-check-in"} className="mt-3 text-[1.75rem] sm:text-[2.15rem]">
          {final ? "If You’re Currently Having an Acne Flare-Up" : "If Your Skin Is Flaring Right Now"}
        </h2>
        {final ? (
          <div className="mt-4 max-w-2xl space-y-3 text-[1rem] leading-relaxed text-ink-soft">
            <p>If you’re experiencing deep or painful breakouts, significant inflammation, worsening acne, or you’re concerned about scarring, I recommend getting help sooner rather than waiting.</p>
            <p>My concern is protecting your skin and reducing the risk of acne scarring when possible.</p>
          </div>
        ) : (
          <div className="mt-4 max-w-2xl space-y-2 text-[1rem] leading-relaxed text-ink-soft">
            <p>Deep or painful breakouts?</p>
            <p>Significant inflammation?</p>
            <p>Acne getting worse?</p>
            <p>Concerned about scarring?</p>
            <p className="pt-2">Don’t feel like you have to finish this guide first.</p>
            <p>Deep, inflamed acne has a greater risk of leaving acne scars. If that’s what’s happening with your skin right now, I recommend getting help sooner.</p>
          </div>
        )}
        <ActionLink href={CONSULTATION_URL}>Check same-day consultation availability →</ActionLink>
        <p className="mt-3 text-[0.78rem] text-taupe">Same-day consultations available when scheduling permits.</p>
      </div>
    </section>
  );
}

function ThreeStepPath() {
  const steps = [
    ["01", "Eliminate", "What needs to go?"],
    ["02", "Preserve", "What needs to stay?"],
    ["03", "Build", "What does my routine look like right now?"],
  ];
  return (
    <section className="pick-shell py-10" aria-label="Guide steps">
      <div className="grid gap-0 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
        {steps.map(([number, title, text], index) => (
          <div key={title} className="contents">
            <div className="border border-line bg-offwhite p-5 text-center">
              <p className="font-display text-2xl text-rose">{number}</p>
              <p className="mt-2 text-[0.72rem] font-semibold uppercase tracking-[0.17em] text-cocoa">{title}</p>
              <p className="mt-2 text-[0.9rem] leading-snug text-ink-soft">{text}</p>
            </div>
            {index < steps.length - 1 ? <div aria-hidden="true" className="grid h-8 place-items-center text-cocoa md:h-auto md:w-8"><span className="md:hidden">↓</span><span className="hidden md:inline">→</span></div> : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function EliminationGuidePage() {
  const [openElimination, setOpenElimination] = useState("");
  const [openRoutine, setOpenRoutine] = useState("");

  const eliminationItems: AccordionItem[] = [
    {
      id: "comedogenic-ingredients",
      title: "Comedogenic ingredients",
      content: <div className="space-y-4 text-[0.98rem] leading-relaxed text-ink-soft"><p>These ingredients may be more likely to contribute to clogged pores in some acne-prone skin, particularly when they appear high on an ingredient list or are used in heavier formulations.</p><p className="font-semibold text-ink">Consider eliminating or evaluating:</p><BulletList items={COMEDOGENIC_INGREDIENTS} /><div className="quiet-card mt-6"><Label>What to look for</Label><p className="mt-3">Instead of judging one ingredient in isolation, look at the entire formula.</p><p className="mt-3">A potentially pore-clogging ingredient near the bottom of a lightweight cleanser may behave very differently from the same ingredient near the top of a heavy leave-on cream.</p></div></div>,
    },
    {
      id: "heavy-oils",
      title: "Comedogenic or heavy oils",
      content: <div className="space-y-4 text-[0.98rem] leading-relaxed text-ink-soft"><p>Some acne-prone skin tolerates oils beautifully. Other people notice increased congestion, closed comedones, or breakouts.</p><p className="font-semibold text-ink">Oils worth evaluating if you are repeatedly clogging:</p><BulletList items={HEAVY_OILS} /><div className="mt-6"><Label>Also check products outside your skincare routine</Label><p className="mt-3">Oil exposure may come from:</p><BulletList items={OUTSIDE_SKINCARE} /></div><p className="border-l-2 border-rose pl-4 font-display text-lg text-ink">If your breakouts cluster around the hairline, forehead, temples, jawline, or sides of the face, look beyond your facial moisturizer.</p></div>,
    },
    {
      id: "irritating-ingredients",
      title: "Irritating ingredients",
      content: <div className="space-y-4 text-[0.98rem] leading-relaxed text-ink-soft"><p>Irritation can weaken the skin barrier and make acne-prone skin look increasingly inflamed, textured, dry, oily, or reactive.</p><p className="font-semibold text-ink">Ingredients that may need to be reduced or temporarily removed include:</p><BulletList items={IRRITATING_INGREDIENTS} /><div className="quiet-card mt-6"><p>The issue is often not that the ingredient is inherently “bad.”</p><p className="mt-3 font-semibold text-ink">The problem may be dose + frequency + combination + your individual skin tolerance.</p></div></div>,
    },
    {
      id: "irritating-products",
      title: "Irritating skincare products",
      content: <div className="space-y-4 text-[0.98rem] leading-relaxed text-ink-soft"><p>Sometimes the problem is the product category rather than one ingredient.</p><p className="font-semibold text-ink">Consider temporarily eliminating:</p><BulletList items={IRRITATING_PRODUCTS} /><div className="mt-6"><Label>Watch for signs of over-treatment:</Label><BulletList items={OVER_TREATMENT_SIGNS} /></div><p className="border-l-2 border-rose pl-4 font-display text-lg text-ink">More acne treatment does not automatically equal better acne control.</p></div>,
    },
    {
      id: "irritating-practices",
      title: "Irritating practices",
      content: <div className="space-y-4 text-[0.98rem] leading-relaxed text-ink-soft"><p>Even a well-designed skincare routine can become irritating depending on how it is used.</p><p className="font-semibold text-ink">Evaluate these habits:</p><BulletList items={IRRITATING_PRACTICES} /></div>,
    },
    { id: "beyond-skincare", title: "Check beyond your skincare", content: <BulletList items={BEYOND_SKINCARE} /> },
    {
      id: "food",
      title: "Check your food",
      content: <div className="grid gap-6 sm:grid-cols-2">{FOOD_GROUPS.map((group) => <section key={group.title} className="border-t border-sand pt-4"><Label>{group.title}</Label><BulletList items={group.items} /></section>)}<p className="sm:col-span-2 border-l-2 border-rose pl-4 font-display text-lg text-ink">Whole fruit stays.</p></div>,
    },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-ivory text-ink">
      <header className="border-b border-line bg-cream/80">
        <div className="pick-shell flex items-center justify-between py-4">
          <img src={lpwLogo} alt="Live Pretty Wellness" className="h-12 w-auto sm:h-14" />
          <p className="eyebrow text-right">Free skin guide</p>
        </div>
      </header>

      <section className="pick-shell py-12 sm:py-16">
        <Label>Live Pretty Wellness</Label>
        <h1 className="mt-4 max-w-3xl text-[2.65rem] leading-[1.04] sm:text-[4.15rem]">The Acne-Prone Skin Elimination Guide</h1>
        <p className="mt-5 font-display text-xl text-cocoa sm:text-2xl">Clear the way for your clear-skin strategy.</p>
        <div className="mt-6 max-w-2xl space-y-4 text-[1.02rem] leading-relaxed text-ink-soft">
          <p>Before you add another product, let’s look at what may need to come out.</p>
          <p>Use this guide to remove products, ingredients, foods, and everyday practices that may be working against acne-prone skin—while keeping healthcare-provider-directed treatment in place.</p>
        </div>
        <div className="mt-9 border-y border-sand py-6 font-display text-[1.25rem] leading-relaxed text-ink sm:text-[1.45rem]">
          <p>Eliminate what may be working against your skin.</p>
          <p>Keep the treatment your healthcare provider has you on.</p>
          <p>Then build from a better foundation.</p>
        </div>
      </section>

      <ClinicalCheckIn />
      <ThreeStepPath />

      <section className="border-t border-line bg-offwhite py-12 sm:py-16" aria-labelledby="eliminate-title">
        <div className="pick-shell">
          <SectionHeading id="eliminate-title" number="01" title="Eliminate" subtitle="What Needs to Go?" />
          <div className="mt-6 max-w-2xl space-y-4 text-[1rem] leading-relaxed text-ink-soft">
            <p>Grab the skincare, haircare, makeup, and other products that regularly touch your face.</p>
            <p>Turn them over. Read the labels. Use the lists below to screen what you’re using.</p>
          </div>
          <div className="gem-card mt-7 text-[0.94rem] leading-relaxed text-ink-soft">
            <p><span className="font-semibold text-ink">Clinical note:</span> Not every ingredient affects every person the same way. This is a screening and elimination guide—not a universal banned list.</p>
          </div>
          <div className="mt-9">
            <GuideAccordion items={eliminationItems} value={openElimination} onChange={setOpenElimination} />
          </div>
        </div>
      </section>

      <section className="pick-shell py-12 sm:py-16" aria-labelledby="preserve-title">
        <SectionHeading id="preserve-title" number="02" title="Preserve" subtitle="What Needs to Stay?" />
        <h3 className="mt-8 text-2xl sm:text-3xl">Preserve Your Treatment.</h3>
        <div className="mt-4 max-w-2xl space-y-4 text-[1rem] leading-relaxed text-ink-soft">
          <p>This guide is for cleaning up the products, foods, and practices around your acne care—not for stopping treatment from your healthcare provider.</p>
          <p>If a healthcare provider has told you to use a medication or treatment, keep using it as directed.</p>
        </div>
        <div className="mt-7 border-2 border-cocoa bg-cream p-6 sm:p-8">
          <Label>Important safety note</Label>
          <p className="mt-3 font-display text-xl leading-relaxed text-ink sm:text-2xl">Do not stop, reduce, skip, or otherwise change any prescription or clinician-directed acne medication without first contacting the healthcare provider managing that treatment and getting their guidance or clearance.</p>
        </div>
      </section>

      <section className="border-y border-line bg-cream py-12 sm:py-16" aria-labelledby="build-title">
        <div className="pick-shell">
          <SectionHeading id="build-title" number="03" title="Build" subtitle="What Does My Routine Look Like Right Now?" />
          <h3 className="mt-8 text-2xl sm:text-3xl">Build Your 3-Day Skin-Barrier-Support Routine</h3>
          <p className="mt-4 max-w-2xl text-[1rem] leading-relaxed text-ink-soft">For the next 3 days, keep your skincare routine simple while you eliminate unnecessary products and support your skin.</p>
          <div className="mt-8">
            <GuideAccordion
              value={openRoutine}
              onChange={setOpenRoutine}
              items={[{
                id: "three-day-routine",
                title: "Open my 3-day routine",
                content: <div className="space-y-7"><div className="flex items-end justify-between border-b border-sand pb-4"><p className="font-display text-2xl text-ink">AM + PM</p><Label>For 3 days</Label></div><div className="grid gap-4 sm:grid-cols-2"><div className="panel-card"><Label>Step 1</Label><h4 className="mt-2 text-xl">Cleanse</h4><p className="mt-2 text-[0.95rem] text-ink-soft">Gentle cleanser and/or water rinse.</p></div><div className="panel-card"><Label>Step 2</Label><h4 className="mt-2 text-xl">Thermal Water</h4><p className="mt-2 text-[0.95rem] text-ink-soft">Apply thermal water.</p></div></div><div className="space-y-5 text-[0.94rem] leading-relaxed text-ink-soft"><div><Label>Already have a moisturizer?</Label><p className="mt-2">If your moisturizer passes the Elimination Guide screen, you can keep using it.</p></div><div><Label>Already have a sunscreen?</Label><p className="mt-2">If your sunscreen passes the Elimination Guide screen, you can keep using it.</p></div><div><Label>Using treatment from your healthcare provider?</Label><p className="mt-2">Keep using it as directed.</p></div></div><div className="gem-card"><p className="font-display text-xl text-ink">This is your starting point—not your forever routine.</p><p className="mt-3 text-[0.94rem] leading-relaxed text-ink-soft">This simplified routine does not mean your skin will never need benzoyl peroxide, salicylic acid, a retinoid, azelaic acid, or another acne treatment.</p></div></div>,
              }]}
            />
          </div>
        </div>
      </section>

      <section className="pick-shell py-12 sm:py-16" aria-labelledby="after-title">
        <h2 id="after-title" className="text-[2rem] sm:text-[2.65rem]">After Your 3 Days</h2>
        <div className="mt-5 max-w-2xl space-y-4 text-[1rem] leading-relaxed text-ink-soft">
          <p>You may have noticed that this routine is very simple. That’s intentional.</p>
          <p>It isn’t a complete morning and evening skincare routine.</p>
          <p>Before I can recommend a full routine for you, I need to understand your skin—what you’re using now, how your skin is responding, your acne treatment, your concerns, and the internal and external factors that may be affecting your acne-prone skin.</p>
          <p>If you’d like help rebuilding your full morning and evening routine, I can help you with that.</p>
        </div>
        <ActionLink href={CONSULTATION_URL}>Help me rebuild my routine →</ActionLink>
        <p className="mt-3 text-[0.78rem] text-taupe">Personalized Skin Strategy Consultation</p>
      </section>

      <section className="bg-cocoa py-12 text-offwhite" aria-labelledby="completion-title">
        <div className="pick-shell">
          <Label><span className="text-rose-soft">Your starting point</span></Label>
          <h2 id="completion-title" className="mt-3 text-[2.25rem] text-offwhite sm:text-[3rem]">You’ve Cleared the Way.</h2>
          <ul className="mt-7 space-y-4 text-[1rem] leading-relaxed">
            {["You’ve screened the products and ingredients touching your skin.", "You’ve eliminated foods and everyday habits that may be working against your clear-skin goals.", "You’ve kept your healthcare-provider-directed treatment in place.", "You’ve built your 3-day skin-barrier-support routine."].map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className="text-rose-soft">✓</span><span>{item}</span></li>)}
          </ul>
        </div>
      </section>

      <section className="pick-shell py-12 sm:py-16" aria-labelledby="keep-going-title">
        <Label>Want to keep going?</Label>
        <h2 id="keep-going-title" className="mt-3 text-[2rem] sm:text-[2.65rem]">The Pretty Skin Strategist Guide</h2>
        <div className="mt-5 max-w-2xl space-y-4 text-[1rem] leading-relaxed text-ink-soft">
          <p>If this guide helped you clear away some of the things that may be working against your skin, The Pretty Skin Strategist Guide can help you take the next step.</p>
          <p>Start moving beyond reacting to individual breakouts and toward managing acne-prone skin more strategically for the long game.</p>
        </div>
        <ActionLink href={STRATEGIST_URL} outlined>Explore the Pretty Skin Strategist Guide →</ActionLink>
      </section>

      <ClinicalCheckIn final />

      <section className="pick-shell py-10 sm:py-12" aria-labelledby="reviewed-by">
        <div className="flex flex-col items-center gap-5 border-b border-line pb-10 text-center sm:flex-row sm:text-left">
          <img src={JEAN_PHOTO} alt="Jean, board-certified Family Nurse Practitioner at Live Pretty Wellness" className="h-24 w-24 shrink-0 rounded-full border border-line object-cover" loading="lazy" />
          <div>
            <Label>Written and clinically reviewed by</Label>
            <h2 id="reviewed-by" className="mt-2 text-2xl">Jean, MSN, FNP-C</h2>
            <p className="mt-1 text-[0.9rem] text-ink-soft">Board-Certified Family Nurse Practitioner · Nurse Practitioner Strategist</p>
          </div>
        </div>
        <p className="mt-8 text-center text-[0.7rem] uppercase tracking-[0.18em] text-taupe">Live Pretty Wellness</p>
      </section>
    </main>
  );
}
