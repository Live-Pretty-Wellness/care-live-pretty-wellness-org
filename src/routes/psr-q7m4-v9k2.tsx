import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import lpwLogo from "@/assets/lpw-logo.png";
import clearSkinPyramid from "@/assets/live-pretty-clear-skin-pyramid.png.asset.json";
import {
  CHECKLIST,
  EMPTY_RESET_STATE,
  loadResetState,
  saveResetState,
  type PersistedResetState,
} from "@/lib/pretty-skin-reset";

const JEAN_PHOTO = "/images/jeans-picks/acneplan/jean-portrait-approved.jpeg";

export const Route = createFileRoute("/psr-q7m4-v9k2")({
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, nofollow" },
      { title: "The Pretty Skin Reset — Live Pretty Wellness" },
      {
        name: "description",
        content:
          "A free interactive reset for acne-prone skin: clear the noise, see what you're actually doing, and create a simpler starting point.",
      },
      { property: "og:title", content: "The Pretty Skin Reset" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PrettySkinReset,
});

const LONG_GAME = [
  "Pregnancy or trying to conceive",
  "breastfeeding/postpartum",
  "perimenopause or menopause",
  "a new health condition",
  "new medications",
  "side effects",
  "insurance or cost changes",
  "moving",
  "changing healthcare providers",
  "travel",
  "a busier schedule",
  "skin becoming drier or more sensitive",
  "priorities changing as I get older",
  "current treatment no longer working the way it once did",
];

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

function H2({ children }: { children: ReactNode }) {
  return <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">{children}</h2>;
}

function Body({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-[0.95rem] leading-relaxed text-ink-soft ${className}`}>{children}</p>;
}

function SectionNumber({ n, id }: { n: string; id: string }) {
  return (
    <div id={id} className="mb-6 scroll-mt-24">
      <span className="font-display text-sm font-semibold tracking-[0.3em] text-rose">{n}</span>
    </div>
  );
}

function Pathway() {
  const steps = ["CLEAR", "ORGANIZE", "SUPPORT", "STABILIZE"];
  return (
    <p className="text-[0.72rem] font-medium tracking-[0.18em] text-taupe" aria-label="The four parts of the Reset: Clear, Organize, Support, Stabilize">
      {steps.map((s, i) => (
        <span key={s}>
          {i > 0 && <span className="mx-1.5 text-rose" aria-hidden="true">→</span>}
          {s}
        </span>
      ))}
    </p>
  );
}

function ProgressBar() {
  const items: { id: string; label: string; n: string }[] = [
    { id: "clear", label: "Clear", n: "01" },
    { id: "organize", label: "Organize", n: "02" },
    { id: "support", label: "Support", n: "03" },
    { id: "stabilize", label: "Stabilize", n: "04" },
  ];
  return (
    <nav aria-label="Reset progress" className="sticky top-0 z-40 border-b border-line bg-ivory/95 backdrop-blur-sm">
      <div className="pick-shell flex items-center justify-between gap-2 py-2.5">
        <img src={lpwLogo} alt="Live Pretty Wellness" className="h-6 w-auto" />
        <ol className="flex items-center gap-1 sm:gap-2">
          {items.map((it, i) => (
            <li key={it.id} className="flex items-center">
              {i > 0 && <span className="mx-0.5 text-[0.6rem] text-taupe" aria-hidden="true">→</span>}
              <a
                href={`#${it.id}`}
                className="rounded px-1.5 py-1 text-[0.62rem] font-medium tracking-[0.14em] text-ink-soft uppercase transition-colors hover:bg-rose-tint hover:text-ink focus-visible:outline-2 focus-visible:outline-ring sm:px-2 sm:text-[0.68rem]"
              >
                <span className="text-rose">{it.n}</span> {it.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

function ResetPyramid() {
  const levels = [
    { n: "4 — STABILIZE", d: "Move toward skin that feels healthier, softer, supple and comfortable.", tone: "bg-cocoa text-offwhite", size: "basis-[34%] pt-7", copy: "w-[38%]" },
    { n: "3 — SUPPORT", d: "Create a gentler environment for acne-prone skin.", tone: "bg-rose-tint text-ink", size: "basis-[22%]", copy: "w-[56%]" },
    { n: "2 — ORGANIZE", d: "See what you're already using.", tone: "bg-sand text-ink", size: "basis-[22%]", copy: "w-[72%]" },
    { n: "1 — CLEAR", d: "Remove unnecessary noise.", tone: "bg-cream text-ink", size: "basis-[22%]", copy: "w-[88%]" },
  ];
  return (
    <div className="mx-auto max-w-lg" role="img" aria-label="The Pretty Skin Reset mini-framework: Clear, Organize, Support, Stabilize">
      <div className="flex aspect-[1.08/1] w-full flex-col overflow-hidden border border-cocoa bg-cream [clip-path:polygon(50%_0,100%_100%,0_100%)]">
        {levels.map((lvl) => (
          <div
            key={lvl.n}
            className={`flex min-h-0 shrink-0 flex-col items-center justify-center border-b border-cocoa/60 text-center last:border-b-0 ${lvl.tone} ${lvl.size}`}
          >
            <div className={lvl.copy}>
              <p className="text-[0.54rem] font-semibold tracking-[0.08em] sm:text-[0.68rem] sm:tracking-[0.14em]">{lvl.n}</p>
              <p className="mt-1 text-[0.54rem] leading-tight sm:text-[0.72rem] sm:leading-snug">{lvl.d}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <Pathway />
      </div>
    </div>
  );
}

function ClearSkinPyramid() {
  return (
    <figure className="mx-auto max-w-2xl">
      <div className="ml-[7%] inline-flex flex-col items-center text-center text-[0.7rem] font-semibold tracking-[0.18em] text-cocoa uppercase sm:ml-[10%]">
        <span>You are here</span>
        <span className="mt-1 text-xl leading-none text-rose" aria-hidden="true">↓</span>
      </div>
      <img
        src={clearSkinPyramid.url}
        alt="Jean's original Clear-Skin Pyramid, with Stabilize Skin as the foundation, followed by Calm Inflammation, Control Breakouts, and Maintain and Enhance toward Clear Skin"
        className="mt-1 h-auto w-full object-contain"
        loading="lazy"
      />
    </figure>
  );
}

function PrettySkinReset() {
  const [state, setState] = useState<PersistedResetState>(EMPTY_RESET_STATE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setState(loadResetState());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveResetState(state);
  }, [state, loaded]);

  const toggleCheck = (i: number) =>
    setState((s) => ({ ...s, checklist: s.checklist.map((c, j) => (j === i ? !c : c)) }));

  return (
    <div className="min-h-screen bg-ivory">
      <ProgressBar />

      <header className="pick-shell pt-12 pb-10 text-center">
        <img src={lpwLogo} alt="Live Pretty Wellness" className="mx-auto h-14 w-auto" />
        <div className="mt-8"><Eyebrow>Live Pretty Wellness</Eyebrow></div>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">The Pretty Skin Reset</h1>
        <p className="mt-4 font-display text-xl text-cocoa italic">Before you add something else, reset what you're already doing.</p>
        <div className="mx-auto mt-5 max-w-xl space-y-3">
          <Body>Acne-prone skin can get complicated fast—products, treatments, prescriptions, advice, trends and another thing to try.</Body>
          <Body>The Pretty Skin Reset helps you step out of the noise, see what you're actually doing and create a simpler starting point.</Body>
        </div>
        <a href="#clear" className="mt-8 inline-block rounded-sm bg-cocoa px-8 py-3.5 text-[0.8rem] font-semibold tracking-[0.18em] text-offwhite uppercase transition-colors hover:bg-espresso focus-visible:outline-2 focus-visible:outline-ring">
          Start My Reset
        </a>
        <div className="mt-6 flex justify-center"><Pathway /></div>
      </header>

      <div className="rule-hair" aria-hidden="true" />

      <section aria-labelledby="h-clear" className="pick-shell py-10">
        <SectionNumber n="01 — CLEAR" id="clear" />
        <h2 id="h-clear" className="sr-only">Clear the noise</h2>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div>
            <H2>Clear the Noise</H2>
            <div className="mt-4 space-y-3">
              <Body>Before you decide what comes next, take a look at what's already there.</Body>
              <Body>The goal of this Reset isn't to add another product or build another complicated routine. We're starting by clearing some of the unnecessary noise around acne-prone skin.</Body>
            </div>
          </div>
          <ResetPyramid />
        </div>

        <div className="gem-card mt-8 text-center">
          <Eyebrow>First rule of the Reset</Eyebrow>
          <p className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">Don't add something else.</p>
          <div className="mx-auto mt-3 max-w-md space-y-2">
            <Body>For now, don't buy another acne active, exfoliant, serum or spot treatment just because your skin changes.</Body>
            <Body className="font-semibold text-ink">An empty space in your routine doesn't need to be filled.</Body>
          </div>
        </div>
      </section>

      <div className="rule-hair" aria-hidden="true" />

      <section aria-labelledby="h-organize" className="pick-shell py-10">
        <SectionNumber n="02 — ORGANIZE" id="organize" />
        <h2 id="h-organize" className="sr-only">See what you're actually doing</h2>
        <H2>See What You're Actually Doing</H2>
        <div className="mt-4 max-w-xl space-y-3">
          <Body>Don't clean it up yet.</Body>
          <Body>First, put your current routine in one place—even if it feels like a lot.</Body>
        </div>

        <div className="mt-8 rounded-lg border border-sand bg-cream p-6 text-center sm:p-8">
          <Eyebrow>Your skin regimen organizer</Eyebrow>
          <p className="mx-auto mt-3 max-w-md font-display text-2xl font-semibold text-ink">Before you simplify your routine, put what you're currently using in one place.</p>
          <Link
            to="/sro-k8p3-x5n7"
            className="mt-6 inline-block rounded-sm bg-cocoa px-7 py-3.5 text-[0.75rem] font-semibold tracking-[0.18em] text-offwhite uppercase transition-colors hover:bg-espresso focus-visible:outline-2 focus-visible:outline-ring"
          >
            Open My Skin Regimen Organizer →
          </Link>
          <Body className="mx-auto mt-4 max-w-md text-[0.85rem]">
            A blank space is okay. The organizer helps you see what you're already doing—it doesn't mean you need every step.
          </Body>
        </div>
      </section>

      <div className="rule-hair" aria-hidden="true" />

      <section aria-labelledby="h-support" className="pick-shell py-10">
        <SectionNumber n="03 — SUPPORT" id="support" />
        <h2 id="h-support" className="sr-only">Support your skin</h2>
        <H2>Support Your Skin</H2>
        <Body className="mt-4 max-w-xl">Now that you can see your routine more clearly, focus on simple habits that support acne-prone skin without piling on more treatment.</Body>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-[0.72rem] font-semibold tracking-[0.18em] text-cocoa uppercase">Support your skin</h3>
            <div className="mt-4 space-y-4">
              <div>
                <p className="font-display text-lg font-semibold text-ink">Gentle cleansing</p>
                <ul className="mt-2 space-y-2 text-[0.9rem] leading-relaxed text-ink-soft">
                  <li><span className="font-semibold text-ink">Cleanse gently.</span> Use lukewarm water and your fingertips.</li>
                  <li><span className="font-semibold text-ink">Skip the scrub.</span> Avoid abrasive cleansing tools and aggressive scrubbing.</li>
                  <li><span className="font-semibold text-ink">Don't chase “squeaky clean.”</span> Clean skin does not need to feel tight or stripped.</li>
                  <li><span className="font-semibold text-ink">After sweating:</span> Cleanse when you're able rather than leaving sweat sitting on the skin for long periods.</li>
                </ul>
              </div>
              <div className="border-t border-line pt-4">
                <p className="font-display text-lg font-semibold text-ink">Hands + face</p>
                <ul className="mt-2 space-y-2 text-[0.9rem] leading-relaxed text-ink-soft">
                  <li>Don't pick, squeeze or pop.</li>
                  <li>Keep frequently used makeup brushes and applicators clean.</li>
                  <li>Remove makeup before bed.</li>
                  <li>Clean items that repeatedly touch the face, such as pillowcases, headbands and hats.</li>
                  <li>Be aware of oily hair products repeatedly contacting the forehead or face.</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[0.72rem] font-semibold tracking-[0.18em] text-cocoa uppercase">Reset your food environment</h3>
            <div className="mt-4 rounded-lg border border-line bg-offwhite p-5">
              <p className="font-display text-lg font-semibold text-ink">Look at what you rely on most often.</p>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft">You don't need a perfect “acne diet.” Start by making the everyday food environment a little easier to work with.</p>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-rose uppercase">Have less often</p>
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-soft">Sugary soda and sweetened drinks • candy • cookies • cake • doughnuts and pastries • sugary breakfast cereals • white bread • potato chips • highly refined sugary snack foods</p>
                </div>
                <div>
                  <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-olive uppercase">Build more meals around</p>
                  <ul className="mt-2 space-y-2 text-[0.85rem] leading-relaxed text-ink-soft">
                    <li><span className="font-semibold text-ink">Vegetables:</span> leafy greens, broccoli, cauliflower, cabbage, peppers, zucchini, green beans, Brussels sprouts</li>
                    <li><span className="font-semibold text-ink">Whole fruit:</span> berries, apples, pears, cherries, peaches, plums, kiwi</li>
                    <li><span className="font-semibold text-ink">Protein:</span> fish, chicken, turkey, beans, lentils</li>
                    <li><span className="font-semibold text-ink">Fats + add-ons:</span> avocado, walnuts, almonds, chia seeds, pumpkin seeds, extra-virgin olive oil</li>
                    <li><span className="font-semibold text-ink">Carbohydrate options:</span> sweet potato, quinoa, beans, lentils</li>
                  </ul>
                </div>
              </div>
              <div className="mt-5 border-t border-line pt-4">
                <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-cocoa uppercase">Quick grocery list</p>
                <div className="mt-3 grid gap-3 text-[0.85rem] leading-relaxed text-ink-soft sm:grid-cols-2">
                  <p><span className="font-semibold text-ink">Produce:</span> Berries • apples • pears • leafy greens • broccoli • cauliflower • peppers • zucchini • green beans • sweet potatoes • avocado</p>
                  <p><span className="font-semibold text-ink">Protein:</span> Fish • chicken/turkey • beans • lentils</p>
                  <p><span className="font-semibold text-ink">Pantry:</span> Quinoa • almonds • walnuts • chia seeds • pumpkin seeds • extra-virgin olive oil</p>
                  <p><span className="font-semibold text-ink">Milk swap, if you want one:</span> Cow's milk → unsweetened almond milk</p>
                </div>
                <p className="mt-4 border-t border-line pt-3 text-[0.85rem] font-semibold text-ink">Build the food first. You don't need a “skin supplement” haul for this Reset.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="gem-card mt-8">
          <Eyebrow>Jean's optional Reset pick</Eyebrow>
          <p className="mt-2 font-display text-xl font-semibold text-ink">La Roche-Posay Thermal Spring Water</p>
          <p className="mt-1 text-[0.9rem] text-ink-soft">An optional soothing mist Jean likes during the Reset.</p>
        </div>
      </section>

      <div className="rule-hair" aria-hidden="true" />

      <section aria-labelledby="h-stabilize" className="pick-shell py-10">
        <SectionNumber n="04 — STABILIZE" id="stabilize" />
        <h2 id="h-stabilize" className="sr-only">Know what you're aiming for</h2>
        <H2>Know What You're Aiming For</H2>
        <Body className="mt-4 max-w-xl">This Reset isn't about making skin perfectly smooth or forcing it to feel “clean.”</Body>

        <div className="mt-8 border-y border-sand bg-cream px-6 py-10 text-center">
          <Eyebrow>Think</Eyebrow>
          <p className="mt-4 font-display text-4xl font-semibold tracking-wide text-ink sm:text-5xl">Soft. Supple. Comfortable. Plush.</p>
          <div className="mx-auto mt-4 max-w-md space-y-2">
            <Body>Think soft, supple, almost baby-like skin—not squeaky-clean skin.</Body>
            <Body className="font-semibold text-ink">Perfectly smooth isn't the goal. Healthy-feeling skin is.</Body>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div>
            <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-olive uppercase">Look for</p>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-soft">Healthy-looking • comfortable • not stripped • not excessively dried out</p>
          </div>
          <div className="border-t border-line pt-4 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
            <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-cocoa uppercase">Feel for</p>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-soft">Soft • supple • comfortable • plush • gentle</p>
          </div>
          <div className="border-t border-line pt-4 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
            <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-rose uppercase">Not the goal</p>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-soft">Squeaky • tight • raw • burning • over-dried • rough from overdoing skincare</p>
          </div>
        </div>

        <div className="mt-10 border-l-2 border-rose pl-5">
          <h3 className="font-display text-2xl font-semibold text-ink">Think About Your Long Game</h3>
          <p className="mt-3 max-w-xl font-display text-lg leading-snug text-cocoa">Can I see myself using my current approach to manage acne-prone skin for the next 5, 10, 15—or even 20 years?</p>
          <Body className="mt-3">Have I thought about what happens to my plan if my life changes?</Body>
          <div className="mt-4 flex flex-wrap gap-2">
            {LONG_GAME.map((c) => (
              <span key={c} className="rounded-full border border-line bg-cream px-3 py-1.5 text-[0.78rem] text-ink-soft">{c}</span>
            ))}
          </div>
          <Body className="mt-3 italic">You don't need to solve any of this today. Just think about it.</Body>
        </div>

        <div className="panel-card mt-10">
          <h3 className="font-display text-2xl font-semibold text-ink">Reset Check</h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {CHECKLIST.map((item, i) => (
              <li key={item}>
                <button
                  type="button"
                  aria-pressed={state.checklist[i]}
                  onClick={() => toggleCheck(i)}
                  className={`flex h-full w-full items-start gap-3 rounded-md border px-4 py-3 text-left text-[0.88rem] leading-relaxed transition-colors focus-visible:outline-2 focus-visible:outline-ring ${
                    state.checklist[i] ? "border-cocoa bg-rose-tint text-ink" : "border-line bg-ivory text-ink-soft hover:border-rose"
                  }`}
                >
                  <span aria-hidden="true" className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-sm border text-[0.7rem] ${state.checklist[i] ? "border-cocoa bg-cocoa text-offwhite" : "border-line bg-offwhite text-transparent"}`}>✓</span>
                  <span>{item}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <h3 className="font-display text-2xl font-semibold text-ink">Where This Reset Lives</h3>
          <div className="mt-5"><ClearSkinPyramid /></div>
          <div className="mx-auto mt-4 max-w-md space-y-2 text-center">
            <Body className="font-semibold text-ink">The Pretty Skin Reset lives here.</Body>
            <Body>This Reset is a starting point—not your entire acne plan.</Body>
          </div>
        </div>
      </section>

      <div className="rule-hair" aria-hidden="true" />

      <section aria-labelledby="h-next" className="pick-shell py-10">
        <H2>You've Cleared Some of the Noise. What's Next?</H2>
        <div className="mt-4 max-w-xl space-y-3">
          <Body>Maybe seeing everything in one place made something obvious:</Body>
          <Body className="font-semibold text-ink">Treating the next breakout and having a long-term strategy for acne-prone skin aren't the same thing.</Body>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="panel-card flex flex-col">
            <Eyebrow>Pretty Skin Strategist</Eyebrow>
            <h3 className="mt-2 font-display text-xl font-semibold text-ink">The Pretty Skin Strategist Guide</h3>
            <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-ink-soft">For acne-prone skin that needs a long-term strategy.</p>
            <a href="https://liveprettywellness.com/pretty-skin-strategist" className="mt-5 inline-block rounded-sm border border-cocoa px-6 py-3 text-center text-[0.75rem] font-semibold tracking-[0.18em] text-cocoa uppercase transition-colors hover:bg-cocoa hover:text-offwhite focus-visible:outline-2 focus-visible:outline-ring">Get My Guide</a>
          </div>
          <div className="panel-card flex flex-col !border-cocoa">
            <Eyebrow>Personalized help</Eyebrow>
            <h3 className="mt-2 font-display text-xl font-semibold text-ink">Ready for Jean to Look at Your Skin With You?</h3>
            <p className="mt-2 text-[0.9rem] font-semibold text-ink">Personalized Skin Strategy Visit</p>
            <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-ink-soft">Jean looks at your skin history, current routine, treatments, previous responses, goals and treatment preferences with you—and works with you to build your individualized:</p>
            <p className="mt-2 font-display text-lg font-semibold text-cocoa">Long-Term Clear Skin Game Plan</p>
            <a href="https://liveprettywellness.com/acne-skin-help" className="mt-5 inline-block rounded-sm bg-cocoa px-6 py-3 text-center text-[0.75rem] font-semibold tracking-[0.18em] text-offwhite uppercase transition-colors hover:bg-espresso focus-visible:outline-2 focus-visible:outline-ring">Work With Jean 1:1</a>
          </div>
        </div>
      </section>

      <div className="rule-hair" aria-hidden="true" />

      <section aria-labelledby="h-jean" className="pick-shell py-10">
        <div className="panel-card flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <img src={JEAN_PHOTO} alt="Jean, board-certified Family Nurse Practitioner and founder of Live Pretty Wellness" className="h-28 w-28 shrink-0 rounded-full border border-line object-cover" loading="lazy" />
          <div className="min-w-0 text-center sm:text-left">
            <Eyebrow>A note from Jean</Eyebrow>
            <h2 id="h-jean" className="mt-2 font-display text-2xl font-semibold text-ink">Jean, MSN, FNP-C</h2>
            <p className="text-[0.85rem] text-ink-soft">Board-Certified Family Nurse Practitioner</p>
            <div className="mt-4 space-y-3 text-[0.9rem] leading-relaxed text-ink-soft">
              <p className="font-semibold text-ink">A Quick Note from Jean</p>
              <p>I'm a board-certified Family Nurse Practitioner, but I'm not your healthcare provider—although I'd love the opportunity to be. 💗 The Pretty Skin Reset is general education because I haven't personally evaluated you or reviewed your medical history. Keep following the treatment plan from your healthcare provider, and check with them before making changes to your medications or medical care.</p>
            </div>
          </div>
        </div>
        <p className="mt-10 pb-4 text-center text-[0.7rem] tracking-[0.18em] text-taupe uppercase">Live Pretty Wellness</p>
      </section>
    </div>
  );
}
