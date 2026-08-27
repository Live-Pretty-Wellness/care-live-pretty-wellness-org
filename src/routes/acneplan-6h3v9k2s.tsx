import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import {
  StoryTopBar,
  ChapterProgress,
  Chapter,
  H1,
  H2,
  Sub,
  P,
  Beat,
  Statement,
  PullCard,
  Byline,
  List,
  Photo,
  ExpandCard,
  QuietCard,
  Bridge,
  ChapterNav,
  BigChoice,
  ReflectCards,
  FieldSection,
  Move,
  Notes,
  ContactChains,
  NoteField,
  PickOne,
  DayRow,
  TeamNode,
  TeamConnector,
} from "@/components/picks/StoryKit";
import { Gem, Disclaimer } from "@/components/picks/PickKit";
import lpwLogo from "@/assets/lpw-logo.png";

const IMAGE_BASE = "/images/jeans-picks/acneplan";
const acneStrip = `${IMAGE_BASE}/how-i-cleared-my-acne.png`;
const clientCollage = `${IMAGE_BASE}/client-results-collage-watermarked.webp`;
const triad = `${IMAGE_BASE}/healthy-skin-triad-approved.png`;
const lifestyleGym = `${IMAGE_BASE}/jean-lifestyle-gym.png`;
const lifestyleStretch = `${IMAGE_BASE}/jean-lifestyle-stretch.png`;
const jeanPortrait = `${IMAGE_BASE}/jean-portrait-approved.jpeg`;

export const Route = createFileRoute("/acneplan-6h3v9k2s")({
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, nofollow" },
      { title: "I Had Acne for 20+ Years. Here's What Finally Changed. | Jean's Picks" },
      {
        name: "description",
        content:
          "Jean's story, the mindset shift, the Healthy Skin Triad, and a Pretty Skin Strategist playbook you can start using this week.",
      },
      {
        property: "og:title",
        content: "I Had Acne for 20+ Years. Here's What Finally Changed.",
      },
      {
        property: "og:description",
        content:
          "A short, premium interactive Jean's Pick: the shift from reacting to acne to managing acne-prone skin.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrettySkinStrategist,
});

const STORAGE_KEY = "lpw_pretty_skin_strategist_v1";

const STRATEGY_URL = "https://stan.store/liveprettywellness/p/personalized-skincare-strategy-visit";
const MEET_JEAN_URL = "https://stan.store/liveprettywellness/p/meet-jean-free-live-qa";

type Stage = "" | "DECIDING" | "THINKING_AHEAD" | "BACK_AGAIN";

type Saved = {
  chapter: number;
  stage: Stage;
  pore_starting_move: string;
  barrier_starting_move: string;
  balance_starting_move: string;
  movement_days: string[];
  person_check: string[];
  in_list: string;
  on_list: string;
  skin_notes: string;
};

const EMPTY: Saved = {
  chapter: 1,
  stage: "",
  pore_starting_move: "",
  barrier_starting_move: "",
  balance_starting_move: "",
  movement_days: [],
  person_check: [],
  in_list: "",
  on_list: "",
  skin_notes: "",
};

const STAGE_SUMMARY: Record<Exclude<Stage, "">, string> = {
  DECIDING: "I'm thinking about what direction I want my acne management to take.",
  THINKING_AHEAD:
    "My skin may be controlled, but I'm thinking ahead about what I want my future strategy to look like.",
  BACK_AGAIN:
    "I know I can get better. I want to become better at staying intentional when my acne returns or changes.",
};

const STAGE_CARDS = [
  {
    value: "DECIDING",
    label: "I'm trying to decide what I want.",
    lines: [
      "Maybe treatment has been recommended.",
      "Maybe you already know there are things you do not want to rely on.",
      "You want to understand what managing acne-prone skin could look like for you.",
    ],
  },
  {
    value: "THINKING_AHEAD",
    label: "My skin is controlled. I'm thinking ahead.",
    lines: [
      "What you're doing may be working.",
      "But you're wondering what happens if your treatment, preferences, health, pregnancy plans, or life circumstances change.",
    ],
  },
  {
    value: "BACK_AGAIN",
    label: "I've been here before.",
    lines: ["You can get your skin better.", "Your bigger frustration is keeping it better."],
  },
];

/* Field Guide starting-move labels (short action labels only) */
const PORE_MOVES = [
  "Cleanse gently — no scrubbing contest",
  "Hands off the breakout",
  "Clean or change one high-contact item",
  "Clean my makeup brushes this week",
];

const BARRIER_MOVES = [
  "Remove one source of unnecessary friction",
  "Write skin discomfort in My Skin Notes",
  "Make sun protection part of the habit",
];

const BALANCE_MOVES = [
  "Choose my movement days",
  "Make one regular meal more balanced",
  "Make one high-sugar habit less frequent",
  "Add one colorful plant food this week",
  "Improve one sleep habit",
  "Notice what else changed when my skin changes",
];

const LONG_GAME_REASONS: { title: string; lines: string[] }[] = [
  {
    title: "Pregnancy + postpartum",
    lines: [
      "Some acne treatments are not appropriate during pregnancy, and treatment plans may need to change before or during pregnancy.",
      "Hormonal changes during pregnancy and postpartum can also change what your skin is doing.",
    ],
  },
  {
    title: "Perimenopause + menopause",
    lines: [
      "Hormonal seasons change.",
      "Acne can persist, recur, or behave differently during adulthood, including during perimenopause and menopause.",
      "Your acne strategy may need to evolve with you.",
    ],
  },
  {
    title: "Side effects + tolerability",
    lines: [
      "A treatment can be effective and still not be something you personally want to use indefinitely.",
      "Some people experience side effects.",
      "Some simply decide the trade-offs no longer fit their preferences or health circumstances.",
    ],
  },
  {
    title: "Not wanting a daily systemic medication forever",
    lines: [
      "Some people are comfortable using medication when it is needed but do not want taking a systemic acne medication every day to be their only long-term strategy if other clinically appropriate options exist.",
      "That preference is allowed.",
      "It does not make someone anti-medication.",
    ],
  },
  {
    title: "Antibiotic stewardship",
    lines: [
      "Oral antibiotics can be useful in acne treatment.",
      "But they are generally not intended to become an indefinite maintenance strategy.",
      "Responsible antibiotic use matters, including limiting unnecessary or prolonged exposure and considering antibiotic resistance.",
    ],
  },
  {
    title: "Acne can come back",
    lines: [
      "A medication can work very well and still not permanently change the fact that someone has acne-prone skin.",
      "For some people, acne eventually returns after a treatment ends or changes.",
      "That does not automatically mean the treatment failed.",
      "Control and cure are not the same thing. Acne can be chronic and recurrent.",
    ],
  },
  {
    title: "Your health can change",
    lines: [
      "New diagnoses. New symptoms. New medications. New priorities. New stages of life.",
      "Sometimes your overall health changes what makes sense for your skin.",
    ],
  },
];

const PERSON_CHECK = [

  "Do I feel heard?",
  "Do I feel comfortable asking questions?",
  "Do my preferences matter?",
  "Do I feel like this person wants to understand me — not just today's breakout?",
  "Do I trust this person enough to come back when something changes?",
];

function PrettySkinStrategist() {
  const [state, setState] = useState<Saved>(EMPTY);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...EMPTY, ...(JSON.parse(raw) as Partial<Saved>) });
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, loaded]);

  const chapter = state.chapter;
  const go = (n: number) => {
    setState((s) => ({ ...s, chapter: n }));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <main className="min-h-screen bg-ivory">
      <StoryTopBar />
      <ChapterProgress chapter={chapter} />

      {chapter === 1 ? <ChapterOne onNext={() => go(2)} /> : null}
      {chapter === 2 ? <ChapterTwo onBack={() => go(1)} onNext={() => go(3)} /> : null}
      {chapter === 3 ? (
        <ChapterThree
          stage={state.stage}
          setStage={(stage) => setState((s) => ({ ...s, stage }))}
          onBack={() => go(2)}
          onNext={() => go(4)}
        />
      ) : null}
      {chapter === 4 ? <ChapterFour onBack={() => go(3)} onNext={() => go(5)} /> : null}
      {chapter === 5 ? <ChapterFive onBack={() => go(4)} onNext={() => go(6)} /> : null}
      {chapter === 6 ? (
        <ChapterSix
          poreMove={state.pore_starting_move}
          barrierMove={state.barrier_starting_move}
          balanceMove={state.balance_starting_move}
          setMove={(k, v) => setState((s) => ({ ...s, [k]: v }))}
          days={state.movement_days}
          setDays={(movement_days) => setState((s) => ({ ...s, movement_days }))}
          inList={state.in_list}
          setInList={(in_list) => setState((s) => ({ ...s, in_list }))}
          onList={state.on_list}
          setOnList={(on_list) => setState((s) => ({ ...s, on_list }))}
          skinNotes={state.skin_notes}
          setSkinNotes={(skin_notes) => setState((s) => ({ ...s, skin_notes }))}
          onBack={() => go(5)}
          onNext={() => go(7)}
        />
      ) : null}
      {chapter === 7 ? (
        <ChapterSeven
          checks={state.person_check}
          setChecks={(person_check) => setState((s) => ({ ...s, person_check }))}
          onBack={() => go(6)}
          onNext={() => go(8)}
        />
      ) : null}
      {chapter === 8 ? (
        <ChapterEight
          stage={state.stage}
          poreMove={state.pore_starting_move}
          barrierMove={state.barrier_starting_move}
          balanceMove={state.balance_starting_move}
          inList={state.in_list}
          onList={state.on_list}
          skinNotes={state.skin_notes}
          onBack={() => go(7)}
        />
      ) : null}

      <Disclaimer />
    </main>
  );
}

/* =======================================================================
   CHAPTER 1 — MY STORY
   ======================================================================= */
function ChapterOne({ onNext }: { onNext: () => void }) {
  return (
    <Chapter>
      <p className="eyebrow">Jean&rsquo;s Pick</p>
      <H1>
        I Had Acne for 20+ Years.
        <br />
        Here&rsquo;s What Finally Changed.
     </H1>
      <Sub>
        The skin-management shift that helped me get my acne under control&mdash;and what I want
        every person with acne-prone skin to understand.
      </Sub>
      <Byline>By Jean | Nurse Practitioner + Founder, Live Pretty Wellness</Byline>

      <figure className="my-7">
        <img
          src={acneStrip}
          alt="A strip of five close-up photographs of Jean's skin during her years of active acne"
          className="mx-auto h-auto w-full max-w-[700px]"
        />
        <figcaption className="mt-3 text-sm leading-relaxed text-taupe">
          Yep. That&rsquo;s me. And yes&mdash;I know what this feels like.
        </figcaption>
      </figure>

      <P>If you&rsquo;ve dealt with acne for a while, you probably know some version of this story.</P>
      <Beat
        lines={[
          "You try something.",
          "You wait.",
          "You watch your skin.",
          "You think it's getting better.",
          "Then something changes and…",
          "here we go again.",
        ]}
      />
      <P>Now you&rsquo;re trying to figure out what happened.</P>
      <Beat
        lines={[
          "Was it something you used?",
          "Something you stopped?",
          "Your hormones?",
          "Stress?",
          "Your routine?",
          "Something else?",
        ]}
      />
      <P>
        And somehow you have 14 tabs open and another skincare product sitting in your cart.
      </P>
      <Beat
        lines={[
          "I know that life.",
          "I lived with acne-prone skin for more than 20 years.",
          "But eventually something changed.",
          "And surprisingly…",
        ]}
      />
      <Statement>It wasn&rsquo;t one magical product.</Statement>

      <H2>My Acne Story</H2>
      <P>
        <strong>This started when I was 16.</strong>
      </P>
      <P>
        I&rsquo;ve had acne-prone skin since I was sixteen, and for years it wasn&rsquo;t mild. It
        was aggressive, cystic acne.
      </P>
      <P>And it affected a lot more than my skin.</P>
      <Beat
        lines={[
          "I was self-conscious.",
          "I was depressed.",
          "I spent a lot of time indoors.",
          "I checked mirrors constantly because I was so focused on how my skin looked.",
        ]}
      />
      <P>And like a lot of people with persistent acne, I sought treatment.</P>

      <P>
        <strong>I did the medications.</strong>
      </P>
      <P>
        By the time I was around 30, I had been through isotretinoin/Accutane five times. I had also
        spent substantial periods of my younger years using treatments that included birth control
        for acne, spironolactone, and years of oral antibiotics.
      </P>
      <Beat
        lines={[
          "I saw dermatologists.",
          "I tried prescriptions.",
          "I tried products.",
          "Some things helped.",
          "Some didn't.",
        ]}
      />
      <P>And when something worked, I hoped:</P>
      <P>&ldquo;Maybe this is finally it.&rdquo;</P>
      <P>
        But having clear skin for a period of time didn&rsquo;t change the fact that I still had
        acne-prone skin.
      </P>
      <Statement>My skin still needed a long-term strategy.</Statement>

      <H2>Then My Perspective on Long-Term Treatment Changed.</H2>
      <P>
        After being diagnosed with cancer, I became much more intentional about what I wanted my
        long-term health and treatment choices to look like.
      </P>
      <P>Thankfully, I&rsquo;m now cancer-free.</P>
      <QuietCard label="I want to be very clear">
        <p>I am not saying that my acne medications caused my cancer.</p>
        <p>They are two separate parts of my health story.</p>
      </QuietCard>
      <P>But going through cancer changed me.</P>
      <Beat
        lines={[
          "It changed the way I thought about my body.",
          "My health.",
          "Medications.",
          "Daily habits.",
          "Wellness.",
          "And what I personally wanted my long-term treatment strategy to look like.",
        ]}
      />
      <P>I started asking different questions:</P>
      <Beat
        lines={[
          "What do I truly need?",
          "What can I manage differently?",
          "What can I become more proactive about?",
          "Where might medication still have a role?",
          "And what kind of long-term strategy feels right for me?",
        ]}
      />
      <P>
        That experience was a major reason I decided I did not want my acne-management plan to be
        centered on long-term systemic treatment.
      </P>
      <P>I didn&rsquo;t decide medication was bad.</P>
      <P>I decided I needed to become better at managing my acne-prone skin.</P>
      <P>
        That&rsquo;s when becoming the manager of my own skin stopped being an idea. It became part
        of how I wanted to live.
      </P>

      <H2>Why I Built Live Pretty Wellness</H2>
      <P>
        I&rsquo;m Jean, a board-certified Family Nurse Practitioner with nearly two decades in nursing.
      </P>
      <P>
        But Live Pretty Wellness didn&rsquo;t come only from being a provider. It came from being the
        person searching for answers, too.
      </P>
      <Beat
        lines={[
          "I know what it's like to want clear skin badly enough to try the next thing.",
          "And the next thing.",
          "And the next thing.",
        ]}
      />
      <P>
        What eventually changed for me wasn&rsquo;t finding one magical product. I learned how to
        become the manager of my acne-prone skin.
      </P>
      <Statement>That&rsquo;s the shift I&rsquo;m going to teach you.</Statement>



      <ChapterNav onNext={onNext} nextLabel="Okay Jean. What changed? →" />
    </Chapter>
  );
}

/* =======================================================================
   CHAPTER 2 — THE SHIFT
   ======================================================================= */
function ChapterTwo({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <Chapter>
      <H1>For years, I was really good at reacting to acne.</H1>
      <Beat
        lines={[
          "Breakout? Do something.",
          "Skin getting worse? Find something.",
          "Something isn't working? Try something else.",
        ]}
      />
      <P>I was constantly responding to what my skin was doing after it happened.</P>
      <P>Until I realized:</P>
      <Statement>
        Treating a breakout and managing acne-prone skin are not the same thing.
      </Statement>
      <P>I stopped asking only:</P>
      <P>&ldquo;How do I get rid of this breakout?&rdquo;</P>
      <P>and started asking:</P>
      <P>&ldquo;How do I get better at managing the skin that keeps getting them?&rdquo;</P>
      <P>That changed the way I thought about everything.</P>

      <Gem>
        The breakout is an event. Acne-prone skin is the skin you&rsquo;re living in every day.
     </Gem>

      <List
        items={[
          "I started learning my skin.",
          "I learned to pay attention to patterns.",
          "I learned that consistency mattered.",
          "I learned to think about prevention—not just rescue.",
          "I learned to notice when something changed.",
          "I learned that sometimes the smartest move was not to panic and change everything.",
          "I learned there were things I could manage myself.",
          "And I learned there were things I shouldn't have to figure out alone.",
        ]}
      />

      <Statement>
        I stopped being only reactive.
        <br />I became proactive.
      </Statement>

      <figure className="my-7">
        <img
          src={lifestyleStretch}
          alt="Jean stretching outdoors in activewear on a sunny day"
          className="mx-auto h-auto w-[75%] max-w-[350px]"
          loading="lazy"
        />
        <figcaption className="mt-3 text-center text-sm leading-relaxed text-taupe">
          This became part of how I live&mdash;not something I only think about when I&rsquo;m
          breaking out.
        </figcaption>
      </figure>

      <QuietCard label="About medication">
        <p>
          Today, my personal acne-management approach does not rely on isotretinoin (Accutane),
          birth control for acne, spironolactone, or chronic oral antibiotics for acne.
        </p>
        <p>That does not mean those treatments are bad.</p>
        <p>It does not mean nobody should use them.</p>
        <p>
          And it does not mean you should stop or change prescribed treatment because of my
          experience.
        </p>
        <p>I&rsquo;m not here to make you anti-medication.</p>
      </QuietCard>

      <QuietCard label="What balance can look like">
        <p>Long-term acne management does not necessarily mean zero medication.</p>
        <p>For some people, medication may remain part of the plan.</p>
        <p>The goal is balance: understanding your skin, being proactive where you reasonably can,
          using treatment appropriately, and having additional strategies so every change does not
          send you back to square one.
        </p>
      </QuietCard>

      <Statement>I&rsquo;m here to make you pro-strategy.</Statement>

      <H2>Why Think About the Long Game?</H2>
      <Statement>Because your acne plan has to live through your life.</Statement>
      <P>
        The treatment that works for you today may not be the treatment you want&mdash;or can
        use&mdash;forever.
      </P>
      <Beat
        lines={[
          "Sometimes life changes the plan.",
          "Sometimes your health changes the plan.",
          "Sometimes your preferences change the plan.",
        ]}
      />
      <P>
        And sometimes something that controlled your acne for a period of time is no longer the
        strategy you want to depend on indefinitely.
      </P>
      <P>
        That&rsquo;s why I want you thinking about the long game <strong>before</strong> you
        desperately need a new plan.
      </P>

      <div className="mt-6 grid gap-3">
        {LONG_GAME_REASONS.map((r) => (
          <div key={r.title} className="rounded-lg border border-line bg-offwhite px-5 py-4">
            <p className="text-[0.9rem] font-semibold uppercase tracking-[0.12em] text-cocoa">
              {r.title}
            </p>
            <div className="mt-2 space-y-1.5 text-[0.975rem] leading-relaxed text-ink-soft">
              {r.lines.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <P>Most of us become very good at asking:</P>
      <P>&ldquo;How do I get this breakout under control?&rdquo;</P>
      <P>I want you to start asking another question too:</P>
      <Statement>
        &ldquo;How am I going to manage my acne-prone skin for the long game?&rdquo;
      </Statement>

      <Gem>
        The goal isn&rsquo;t to prove you can live without medication. The goal is to build a
        strategy that doesn&rsquo;t fall apart every time your treatment needs to change.
      </Gem>

      <QuietCard label="A clear guardrail">
        <p>Medication can be an appropriate part of acne treatment.</p>
        <p>
          This guide does not tell you to stop, taper, replace, or change prescribed treatment.
        </p>
        <p>
          If you want to change a prescribed medication, discuss that decision with the clinician
          managing it.
        </p>
        <p>
          Becoming a Pretty Skin Strategist means becoming more intentional about your long-term
          management&mdash;not becoming your own prescriber.
        </p>
      </QuietCard>


      <ChapterNav onBack={onBack} onNext={onNext} nextLabel="Show me the shift →" />
    </Chapter>
  );
}

/* =======================================================================
   CHAPTER 3 — WHY YOU'RE HERE
   ======================================================================= */
function ChapterThree({
  stage,
  setStage,
  onBack,
  onNext,
}: {
  stage: Stage;
  setStage: (s: Stage) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <Chapter>
      <H1>Where are you in your acne story right now?</H1>
      <Sub>Choose the one that feels closest.</Sub>

      <BigChoice options={STAGE_CARDS} value={stage} onChange={(v) => setStage(v as Stage)} />

      {stage ? null : (
        <p className="mt-5 text-sm text-taupe">Choose one to continue.</p>
      )}

      {stage ? <ChapterNav onBack={onBack} onNext={onNext} nextLabel="I'm ready →" /> : null}
    </Chapter>
  );
}

/* =======================================================================
   CHAPTER 4 — PRETTY SKIN STRATEGIST
   ======================================================================= */
function ChapterFour({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <Chapter>
      <PullCard title="Different moment. Same important shift:">
        <p className="text-[1rem] text-ink">
          Learn your skin before your skin makes the next decision for you.
        </p>
      </PullCard>

      <P>
        Whatever direction your acne care takes&mdash;medication or no medication&mdash;someone still
        has to manage the acne.
      </P>
      <Beat
        lines={[
          "Someone still has to notice what changes.",
          "Someone still has to know what is normal for your skin.",
          "Someone still has to make the day-to-day decisions.",
        ]}
      />
      <P>That someone is you.</P>

      <H1>Okay. You&rsquo;ve officially been promoted.</H1>
      <Sub>Your new role?</Sub>
      <Statement>Manager of Your Own Skin.</Statement>

      <P>And before you close this tab because that sounds suspiciously like work&hellip;</P>
      <P>Hear me out.</P>

      <P>Being the manager of your skin does NOT mean:</P>
      <List
        items={[
          "diagnosing yourself",
          "prescribing for yourself",
          "knowing every ingredient",
          "never needing medication",
          "never needing professional help",
          "becoming a skincare expert",
        ]}
      />

      <P>It means: you start knowing your skin.</P>
      <List
        items={[
          "You pay attention.",
          "You notice patterns.",
          "You learn what is normal for you.",
          "You become more consistent.",
          "You become more proactive.",
          "You recognize when something has changed.",
        ]}
      />
      <P>And when you reach something you don&rsquo;t know? You know when to call your person.</P>

      <PullCard title="The manager doesn't have to do every job.">
        <p>The manager needs to know when a job needs doing.</p>
      </PullCard>

      <H2>Welcome to Your Pretty Skin Strategist Era.</H2>
      <P>A Pretty Skin Strategist is not someone with perfect skin.</P>
      <P>
        It is someone learning to make better decisions about their own acne-prone skin. Women,
        men&mdash;everybody with acne-prone skin is welcome here.
      </P>

      <Statement>
        Acne-prone skin isn&rsquo;t bad skin.
        <br />
        It doesn&rsquo;t deserve punishment.
      </Statement>

      <List
        items={[
          "You can still want glow.",
          "You can still wear makeup.",
          "You can still enjoy skincare.",
        ]}
      />
      <P>You can still walk through Sephora or Ulta and think: &ldquo;Ooooh&hellip;what&rsquo;s that?&rdquo;</P>
      <P>You just learn to become more intentional about what happens next.</P>

      <PullCard title="Soft can still be strategic.">
        <p>You can take acne seriously without treating your skin like the enemy.</p>
      </PullCard>

      <ChapterNav onBack={onBack} onNext={onNext} nextLabel="So what am I managing? →" />
    </Chapter>
  );
}

/* =======================================================================
   CHAPTER 5 — HEALTHY SKIN TRIAD
   ======================================================================= */
function TriadGraphic() {
  return (
    <div className="mx-auto my-7 max-w-md">
      <img
        src={triad}
        alt="Jean's Healthy Skin Triad: Healthy Pore Care, Healthy Skin Barrier, and Healthy Skin Balance overlapping around Clear Skin"
        className="h-auto w-full"
      />
    </div>
  );
}

function ChapterFive({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <Chapter>
      <H1>Here&rsquo;s the Lens I Use.</H1>
      <P>
        When I stopped looking only at individual breakouts, I needed a better way to see the whole
        picture.
      </P>
      <TriadGraphic />
      <P>These are the three areas I want you to start thinking about.</P>

      <ExpandCard title="Healthy Pore Care" defaultOpen>
        <p>Think beyond the pimple you can see.</p>
        <p>Acne-prone pores still need thoughtful, consistent management.</p>
        <p>
          The better question is not &ldquo;what can I attack this breakout with?&rdquo; It is
          &ldquo;what am I doing consistently to manage acne-prone pores?&rdquo;
        </p>
      </ExpandCard>

      <ExpandCard title="Healthy Skin Barrier">
        <p>Acne treatment still has to live on skin.</p>
        <p>Stronger, drier, and burning are not automatically better.</p>
        <p>Start noticing how your skin feels&mdash;not only how many pimples you see.</p>
      </ExpandCard>

      <ExpandCard title="Healthy Skin Balance">
        <p>Your skin does not exist separately from the rest of you.</p>
        <p>
          Your health, your habits, the things that change, and the things that stay consistent all
          belong in the picture.
        </p>
        <p>Don&rsquo;t diagnose. Notice.</p>
      </ExpandCard>

      <Gem>
        Irritation is information. You do not get Pretty Skin Strategist points for suffering.
      </Gem>

      <QuietCard label="The three-question mental check">
        <p>Next time your skin changes, remember:</p>
        <p>
          <strong>Pore Care</strong> &mdash; What am I noticing about my acne management?
        </p>
        <p>
          <strong>Barrier</strong> &mdash; How is my skin tolerating what I&rsquo;m doing?
        </p>
        <p>
          <strong>Balance</strong> &mdash; What else have I been noticing?
        </p>
      </QuietCard>

      <Statement>
        That&rsquo;s it.
        <br />
        You just looked at your skin differently.
      </Statement>

      <H2>Before We Go Any Deeper&hellip;</H2>
      <P>I&rsquo;m going to give you plenty of things you can actually use on your own.</P>
      <P>
        But when the answer depends on your products, your medications, your health history, your
        skin, or how your skin responds, I&rsquo;m going to stop giving a general answer.
      </P>
      <P>Not because I&rsquo;m gatekeeping.</P>
      <P>Because I would have to know you to give you a responsible answer.</P>
      <P>That&rsquo;s the difference between education and personalization.</P>
      <P>And I never want to pretend they&rsquo;re the same thing.</P>

      <ChapterNav onBack={onBack} onNext={onNext} nextLabel="Okay Jean. What can I actually do? →" />
    </Chapter>
  );
}

/* =======================================================================
   CHAPTER 6 — THE PRETTY SKIN STRATEGIST FIELD GUIDE
   ======================================================================= */
function ChapterSix({
  poreMove,
  barrierMove,
  balanceMove,
  setMove,
  days,
  setDays,
  inList,
  setInList,
  onList,
  setOnList,
  skinNotes,
  setSkinNotes,
  onBack,
  onNext,
}: {
  poreMove: string;
  barrierMove: string;
  balanceMove: string;
  setMove: (k: "pore_starting_move" | "barrier_starting_move" | "balance_starting_move", v: string) => void;
  days: string[];
  setDays: (d: string[]) => void;
  inList: string;
  setInList: (v: string) => void;
  onList: string;
  setOnList: (v: string) => void;
  skinNotes: string;
  setSkinNotes: (v: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const ready = Boolean(poreMove && barrierMove && balanceMove);
  return (
    <Chapter>
      <H1>The Pretty Skin Strategist Field Guide</H1>
      <Sub>Things you can start doing without buying another skincare product.</Sub>

      <Statement>This Is What I Learned to Do.</Statement>
      <P>
        These are the things I learned to pay attention to when I decided to stop waiting for my skin
        to fix itself.
      </P>
      <P>Not a product list. A way of managing acne-prone skin.</P>

      <P>Three sections. Same lens you just learned.</P>
      <P>Open one at a time. You are not supposed to do all of it.</P>

      <FieldSection
        name="Pore Care"
        kicker="What I do"
        defaultOpen
        intro={
          <>
            <p>Your pores don&rsquo;t need punishment.</p>
            <p>They need consistent care.</p>
          </>
        }
      >
        <Move
          title="Clean gently"
          move={
            <>
              <p>Take a look at how you cleanse tonight.</p>
              <p>Gentle hands. No scrubbing contest.</p>
            </>
          }
        >
          <p>
            Wash acne-prone skin gently with your fingertips and a mild, non-abrasive cleanser.
          </p>
          <p>Gently cleanse acne-prone skin up to twice daily and after sweating.</p>
          <p>Skip aggressive scrubbing, rough washcloths, and abrasive cleansing tools.</p>
        </Move>

        <Move
          title="Keep your hands off"
          move={
            <>
              <p>When you catch yourself inspecting a breakout with your fingers:</p>
              <p>Hands down.</p>
            </>
          }
        >
          <p>
            Picking, squeezing, and digging at acne can increase inflammation and raise the risk of
            scarring and lingering dark marks.
          </p>
        </Move>

        <Move
          title="Watch what touches your skin"
          move={<p>Pick one high-contact item today. Clean it, wash it, or change it.</p>}
          why={
            <>
              <p>
                This does not mean every object touching your face causes acne. It means repeated
                contact is worth noticing.
              </p>
            </>
          }
        >
          <p>Think about things that repeatedly contact acne-prone areas:</p>
          <Notes
            items={[
              "pillowcases",
              "phones",
              "makeup tools",
              "hats",
              "helmets",
              "workout gear",
              "hair",
            ]}
          />
        </Move>

        <Move
          title="Clean your makeup tools"
          move={
            <p>
              If you cannot remember the last time you cleaned your brushes, start there.
            </p>
          }
        >
          <p>If you wear makeup, your tools deserve attention too.</p>
          <p>Cleaning reusable makeup brushes about once a week is a practical habit.</p>
          <p>Do not share makeup or applicators.</p>
        </Move>

        <Move
          title="Hair products count"
          move={
            <>
              <p>Look at what is on your hair right now.</p>
              <p>Then look at where your hairline, temples, forehead, jawline, neck, and back are.</p>
              <p>Notice the contact.</p>
            </>
          }
          why={
            <>
              <p>
                This does not mean hair products cause everyone&rsquo;s acne. It means hair products
                are part of what touches acne-prone skin, and that is worth noticing.
              </p>
            </>
          }
        >
          <p>Hair products do not stay on hair.</p>
          <p>They transfer.</p>
          <ContactChains
            chains={[
              ["Hair", "Bonnet", "Skin"],
              ["Hair", "Pillowcase", "Skin"],
              ["Hair", "Hands", "Skin"],
              ["Hair", "Hairline", "Skin"],
            ]}
          />
          <p className="mt-4">
            Oils, butters, pomades, edge products, conditioner, and styling products can end up on
            your forehead, temples, hairline, jawline, neck, and back.
          </p>
        </Move>

        <Gem>
          Clear-skin strategy is often less about doing more and more about doing the right things
          consistently.
        </Gem>
      </FieldSection>

      <FieldSection
        name="Barrier"
        kicker="What I protect"
        intro={
          <>
            <p>When you want acne gone badly enough, it is easy to start thinking:</p>
            <p>Stronger. More. Faster. Drier.</p>
            <p>But acne treatment still has to live on your skin.</p>
          </>
        }
      >
        <Move
          title="Remove unnecessary friction"
          move={
            <p>
              Skip unnecessary abrasive brushes, aggressive scrubbing, and trying to physically
              erase texture.
            </p>
          }
        >
          <p>Acne is not dirt trapped on your face.</p>
          <p>Scrubbing harder does not make you cleaner.</p>
        </Move>

        <Move
          title="Listen when your skin complains"
          move={
            <>
              <p>If your skin repeatedly feels uncomfortable, put it in My Skin Notes.</p>
              <p>What did I notice? When did it begin? What changed around that time?</p>
            </>
          }
        >
          <p>Pay attention to persistent or significant:</p>
          <Notes
            items={["burning", "stinging", "peeling", "tightness", "rawness", "discomfort"]}
          />
          <p>You do not have to diagnose why it is happening. But do not ignore it.</p>
        </Move>

        <Gem>Your acne treatment does not get extra credit because your face hurts.</Gem>

        <Move
          title="Sun protection"
          move={<p>Make sun protection part of your regular skin-management habits.</p>}
        >
          <p>
            Sun protection belongs in acne-prone skincare too&mdash;especially if breakouts tend to
            leave dark marks behind.
          </p>
          <p>
            When outdoors, broad-spectrum, water-resistant SPF 30 or higher is a useful standard.
          </p>
        </Move>
      </FieldSection>

      <FieldSection
        name="Balance"
        kicker="What I support"
        intro={
          <>
            <p>Now zoom out. Your skin belongs to a whole human being.</p>
            <p>
              That does not mean every breakout came from your food, your stress, your gut, or
              something you did wrong.
            </p>
            <p>It means your overall health belongs in the picture.</p>
          </>
        }
      >
        <Move
          title="Your skin is information"
          move={
            <>
              <p>You do not have to force an answer.</p>
              <p>Your job is to notice the pattern.</p>
              <p>That&rsquo;s what a Pretty Skin Strategist does.</p>
            </>
          }
          why={
            <>
              <p>
                Not every flare has an identifiable product or lifestyle trigger. Sometimes the
                honest answer is &ldquo;nothing obvious.&rdquo;
              </p>
              <p>This is not about blaming yourself. It is about keeping a record.</p>
            </>
          }
        >
          <p>A breakout doesn&rsquo;t automatically tell you why it happened.</p>
          <p>But a change in your skin is worth noticing. Ask: what changed?</p>
          <Notes
            items={[
              "new skincare",
              "hair product",
              "more irritation",
              "more sweating or friction",
              "different routine",
              "medication change",
              "menstrual or hormonal pattern when relevant",
              "stress",
              "sleep",
              "illness",
              "something else going on with my health",
              "or nothing obvious",
            ]}
          />
        </Move>

        <QuietCard label="Sometimes I needed more information, too.">
          <p>
            At one point in my own journey, I was dealing with persistent skin concerns that
            didn&rsquo;t seem to be adding up.
          </p>
          <p>
            Additional testing identified gut dysbiosis and a microbiome shift in my individual case.
            Those findings became another piece of my health picture and helped inform what I did
            next.
          </p>
          <p>That does not mean your acne is coming from your gut.</p>
          <p>And it does not mean everyone with acne needs functional testing.</p>
          <p>
            What it taught me was something bigger: being the manager of your skin also means
            knowing when observation is enough&mdash;and when something deserves a closer look.
          </p>
          <p>Sometimes being a good manager means bringing in your person.</p>
        </QuietCard>


        <Move
          title="Move your body"
          move={
            <>
              <p>
                Do not write &ldquo;exercise more.&rdquo; Choose your days.
              </p>
              <DayRow values={days} onChange={setDays} />
            </>
          }
          why={
            <>
              <p>
                Adults should also aim for muscle-strengthening activity on 2 days each week when
                appropriate.
              </p>
              <p>Walking counts. Dancing counts. Cycling counts.</p>
              <p>Choose movement you can realistically repeat.</p>
            </>
          }
        >
          <p>
            For general adult health, a useful target is at least 150 minutes of moderate-intensity
            physical activity each week.
          </p>
          <p>An easy way to picture it: 30 minutes &times; 5 days.</p>
        </Move>

        <figure className="my-2">
          <img
            src={lifestyleGym}
            alt="Jean resting on an exercise ball with a dumbbell during a workout"
            className="mx-auto h-auto w-[62%] max-w-[280px]"
            loading="lazy"
          />
        </figure>

        <Move
          title="Build more meals around whole foods"
          move={
            <>
              <p>Choose one meal you eat regularly and ask:</p>
              <p>&ldquo;How could I make this meal a little more balanced?&rdquo;</p>
              <p>One meal. Not an entire new personality.</p>
            </>
          }
          why={
            <>
              <p>
                Start by building more meals around foods such as vegetables, fruit, beans and
                lentils, whole or minimally processed grains, nuts and seeds, appropriate protein
                sources, and fish such as salmon if you enjoy it.
              </p>
              <p>No single food clears acne, and salmon is not required.</p>
              <p>Do not obsess over one &ldquo;superfood.&rdquo; Look at the overall pattern.</p>
            </>
          }
        >
          <p>You do not need an &ldquo;acne diet.&rdquo;</p>
        </Move>

        <Move
          title="Watch the blood-sugar roller coaster"
          move={
            <p>
              Choose one frequent high-sugar or highly refined choice you could make less frequent.
            </p>
          }
          why={
            <>
              <p>
                Pay attention to patterns heavy in sugary drinks, frequent pastries and sweets,
                highly refined snack foods, and large amounts of refined carbohydrates.
              </p>
              <p>This does not mean dessert is banned. We are looking at patterns, not perfection.</p>
            </>
          }
        >
          <p>
            Research suggests lower-glycemic eating patterns may help acne for some people, although
            food is not the whole acne story.
          </p>
        </Move>

        <Move
          title="Dairy? Notice your pattern."
          move={
            <>
              <p>
                If dairy is something you suspect may matter for you, use your Skin Notes.
              </p>
              <p>Notice the pattern before making conclusions about your skin.</p>
            </>
          }
        >
          <p>Diet and acne are not identical for everyone.</p>
          <p>
            I personally chose to avoid dairy as part of the way I manage my own lifestyle
            and acne-prone skin.
          </p>
          <p>
            That does not mean every person with acne has to make the same choice.
          </p>
        </Move>

        <Gem>Pretty Skin Strategists collect patterns&mdash;not food fears.</Gem>

        <Move
          title="Eat some color"
          move={
            <p>
              Add one colorful plant food to something you are already eating this week.
            </p>
          }
          why={
            <>
              <p>
                Think leafy greens, berries, citrus, peppers, tomatoes, beans, nuts and seeds.
              </p>
              <p>Foods first. Variety matters more than chasing one magical nutrient.</p>
            </>
          }
        >
          <p>
            Different whole foods provide nutrients and antioxidant compounds that support overall
            health.
          </p>
        </Move>

        <Move
          title="Fats: keep the story simple"
          move={<p>Think overall eating pattern&mdash;not &ldquo;good oil versus evil oil.&rdquo;</p>}
          why={
            <p>
              Examples can include olive oil, nuts, seeds, avocado, and fish, when appropriate.
            </p>
          }
        >
          <p>
            For general cardiovascular health, favor sources of unsaturated fats as part of an
            overall healthy eating pattern.
          </p>
        </Move>

        <Move
          title="Stress belongs in your notes"
          move={
            <>
              <p>When your skin suddenly changes, ask: &ldquo;What else has changed lately?&rdquo;</p>
              <Notes
                items={["work", "school", "travel", "sleep", "illness", "stress", "routine"]}
              />
              <p>Do not diagnose. Notice.</p>
            </>
          }
        >
          <p>Stress does not mean &ldquo;you caused your acne.&rdquo;</p>
          <p>
            But if your skin changes during a high-stress season, that context can be worth
            noticing.
          </p>
        </Move>

        <Move
          title="Your gut is health information"
          move={
            <>
              <p>Notice meaningful changes.</p>
              <p>
                Persistent or concerning digestive symptoms belong in an appropriate healthcare
                conversation.
              </p>
            </>
          }
          why={
            <>
              <p>
                Notice meaningful or persistent changes such as constipation, diarrhea, significant
                bloating, pain, or other new digestive symptoms.
              </p>
              <p>
                A breakout is not proof that your gut is &ldquo;toxic.&rdquo; And you do not need to
                &ldquo;detox&rdquo; your body because you got acne.
              </p>
            </>
          }
        >
          <p>Your digestion and bowel habits are part of your overall health.</p>
        </Move>

        <Move
          title="Protect your sleep"
          move={
            <>
              <p>Choose one realistic improvement:</p>
              <Notes
                items={[
                  "earlier bedtime",
                  "less scrolling in bed",
                  "a more consistent sleep and wake schedule",
                ]}
              />
            </>
          }
        >
          <p>Most adults generally need at least 7 hours of sleep per night.</p>
          <p>Sleep supports overall health and recovery. It is not an overnight acne treatment.</p>
        </Move>

        <Move
          title="Hydrate normally"
          move={<p>Drink normally. Then go back to the things that actually need your attention.</p>}
        >
          <p>Stay appropriately hydrated for general health.</p>
          <p>But do not turn water into another acne miracle cure.</p>
        </Move>
      </FieldSection>

      <H2>Now Stop.</H2>
      <Sub>Yes, there is more you could do. That is not your assignment.</Sub>
      <P>Choose three. One from each part of the lens.</P>

      <PickOne
        label="One pore move"
        options={PORE_MOVES}
        value={poreMove}
        onChange={(v) => setMove("pore_starting_move", v)}
      />
      <PickOne
        label="One barrier move"
        options={BARRIER_MOVES}
        value={barrierMove}
        onChange={(v) => setMove("barrier_starting_move", v)}
      />
      <PickOne
        label="One balance move"
        options={BALANCE_MOVES}
        value={balanceMove}
        onChange={(v) => setMove("balance_starting_move", v)}
      />

      {ready ? (
        <>
          <H2>Jean&rsquo;s 7-Day Pretty Skin Reset</H2>
          <Sub>This is not a seven-day acne cure.</Sub>
          <P>For seven days, I want you to simplify.</P>
          <P>Not forever.</P>
          <P>
            And not because one week of &ldquo;perfect eating&rdquo; is going to cure acne.
          </P>
          <P>
            For one week, practice being very intentional about what goes IN you and what goes ON
            you.
          </P>

          <ExpandCard title="The 7-day food challenge" defaultOpen>
            <p>
              <strong>No takeout for 7 days.</strong> Cook meals at home.
            </p>
            <p>
              <strong>Skip junk food for 7 days.</strong> Leave out candy, chips, fast food, and
              highly processed snack foods.
            </p>
            <p>
              <strong>Skip added-sugar treats for 7 days.</strong> No cake, cookies, doughnuts,
              candy, sugary drinks, or desserts.
            </p>
            <p>
              <strong>Do not deep-fry food for 7 days.</strong> Bake, roast, steam, grill, saut&eacute;,
              or air-fry when appropriate.
            </p>
            <p>
              <strong>Keep cooking fats simple.</strong> Options such as olive oil, cold-pressed
              olive oil, or avocado oil work well for home cooking.
            </p>
            <p>
              <strong>Build simple whole-food meals.</strong> Vegetables, fruit, beans, lentils,
              whole or minimally processed grains, nuts, seeds, appropriate protein sources, and fish
              such as salmon if you enjoy it.
            </p>
            <p>
              This is a seven-day challenge. The goal is not dietary perfection. The goal is to make
              it easier to know what you consumed and to practice intentionality.
            </p>
          </ExpandCard>

          <H2>In Me. On Me.</H2>
          <Sub>
            For seven days, become a detective&mdash;not a defendant. We&rsquo;re not looking for
            something to blame. We&rsquo;re creating a record.
          </Sub>

          <NoteField
            label="My IN list"
            hint="You do not need to count calories. Simply record the things you ingest: meals, snacks, drinks, dairy exposure if relevant, supplements, vitamins, protein powders or shakes, medications, anything unusual or new."
            placeholder="Day 1 — ..."
            value={inList}
            onChange={setInList}
          />

          <NoteField
            label="My ON list"
            hint="Record the things that regularly touch your acne-prone skin: facial skincare, makeup, hair oils, hair butters, pomades, edge products, conditioner, styling products, bonnet or scarf, pillowcase, hats, headbands, helmets, workout gear, phone, anything unusual or new."
            placeholder="Day 1 — ..."
            value={onList}
            onChange={setOnList}
          />

          <NoteField
            label="My skin notes"
            hint="What did I notice? When did it begin? What changed around that time?"
            placeholder="What I noticed…"
            value={skinNotes}
            onChange={setSkinNotes}
            rows={4}
          />

          <QuietCard label="In me. On me. Notice. Do not diagnose.">
            <p>Don&rsquo;t decide what caused your acne from these lists.</p>
            <p>Your job is to notice.</p>
            <p>Your skin may give you a clue. It may not.</p>
            <p>
              But you&rsquo;re building a much better record than: &ldquo;I don&rsquo;t know. I
              didn&rsquo;t change anything.&rdquo;
            </p>
          </QuietCard>

          <QuietCard label="How I&rsquo;ll know I did it">
            <p>Did I become more intentional about what I ate?</p>
            <p>Do I know what I consumed this week?</p>
            <p>Did I notice exposures I normally wouldn&rsquo;t think about?</p>
            <p>Did I identify any possible patterns?</p>
            <p>Did I reduce unnecessary variables?</p>
            <p>Did I become more aware of what goes IN me and ON me?</p>
          </QuietCard>

          <PullCard title="Success this week:">
            <p>
              &ldquo;I became more intentional about managing my acne-prone skin.&rdquo;
            </p>
          </PullCard>
        </>
      ) : null}

      {ready ? (
        <ChapterNav onBack={onBack} onNext={onNext} nextLabel="One more thing: build your team →" />
      ) : (
        <div className="no-print mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onBack}
            className="rounded-full border border-sand px-5 py-3 text-xs uppercase tracking-[0.18em] text-taupe transition-colors hover:border-rose hover:text-cocoa"
          >
            ← Back
          </button>
          <p className="text-sm text-taupe sm:text-right">
            Choose one move from each section to continue.
          </p>
        </div>
      )}
    </Chapter>
  );
}

/* =======================================================================
   CHAPTER 7 — YOUR PRETTY SKIN TEAM
   ======================================================================= */
function ChapterSeven({
  checks,
  setChecks,
  onBack,
  onNext,
}: {
  checks: string[];
  setChecks: (c: string[]) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <Chapter>
      <H1>You&rsquo;re the Manager.</H1>
      <Sub>Your person is your backup.</Sub>

      <div className="mt-7">
        <TeamNode
          title="You"
          role="Pretty Skin Strategist"
          lead="You:"
          items={[
            "notice",
            "track",
            "manage what you reasonably can",
            "learn your skin",
            "recognize when something changes",
          ]}
        />
        <TeamConnector />
        <TeamNode
          title="Your Person"
          role="Trusted professional"
          lead="Someone you turn to when you need:"
          items={[
            "expertise",
            "prescription support when appropriate",
            "another set of eyes",
            "deeper strategy",
            "or help with something you should not have to figure out alone",
          ]}
        />
      </div>

      <Statement>That&rsquo;s your Pretty Skin Team.</Statement>
      <P>And it can be very small.</P>
      <P>You do not need a skincare entourage.</P>

      <H2>Could Jean be your person?</H2>
      <P>Absolutely.</P>
      <P>But it does not have to be me.</P>
      <P>
        What matters is that your person is qualified for what you need, someone you trust, and
        someone who cares that this matters to you.
      </P>

      <Statement>They should care that YOU care.</Statement>

      <List
        items={[
          "You should be able to ask questions without feeling annoying.",
          "You should feel heard.",
          "Your preferences should matter.",
          "Your goals should matter.",
          "Your history should matter.",
        ]}
      />
      <P>You should feel comfortable saying:</P>
      <Beat
        lines={[
          "“I don't want that.”",
          "“This matters to me.”",
          "“Something changed.”",
          "“I don't understand.”",
          "“Can we talk about another option?”",
        ]}
      />
      <P>
        Your person does not have to care about your skin exactly the way you do. But they should
        care that you care.
      </P>

      <H2>The &ldquo;Is this my person?&rdquo; check</H2>
      <ReflectCards items={PERSON_CHECK} values={checks} onChange={setChecks} />

      <QuietCard>
        <p>Mostly yes? Beautiful. Keep building that relationship.</p>
        <p>Kept hesitating? That is information too.</p>
        <p>
          There is a difference between having someone you can make an appointment with and having
          your person.
        </p>
      </QuietCard>

      <figure className="my-7 flex justify-center">
        <img
          src={jeanPortrait}
          alt="Jean, Nurse Practitioner and founder of Live Pretty Wellness"
          className="h-auto w-[68%] max-w-[310px] rounded-full"
          loading="lazy"
        />
      </figure>

      <H2>A note from Jean</H2>
      <P>I don&rsquo;t want you intimidated by me.</P>
      <P>I don&rsquo;t want you embarrassed to tell me what you&rsquo;ve tried.</P>
      <P>
        I don&rsquo;t want you thinking you&rsquo;re bothering me because your skin matters to you.
      </P>
      <P>I want to understand:</P>
      <List
        items={[
          "what matters to you",
          "what you're tired of",
          "what you're worried about",
          "what you've already tried",
          "what you're willing to do",
          "what you aren't",
          "and what you want your acne strategy to look like inside your actual life",
        ]}
      />

      <Statement>
        You stay the manager.
        <br />I can become your person.
      </Statement>

      <P>I don&rsquo;t want to make you dependent on me.</P>
      <P>
        I want you to become better at understanding and managing your skin&mdash;and know
        I&rsquo;m here when something needs another set of eyes, clinical expertise, or deeper
        strategy.
      </P>

      <div className="my-7 rounded-lg border border-sand bg-cream px-6 py-7">
        <p className="eyebrow text-cocoa">Is Jean the right person for you?</p>
        <div className="mt-3.5 space-y-3 text-[1rem] leading-relaxed text-ink">
          <p>
            Jean&rsquo;s approach is for people who want a strategy that is not centered on Jean
            prescribing or managing isotretinoin (Accutane), spironolactone, birth control for acne,
            or long-term oral antibiotics for acne.
          </p>
          <p>That does not mean those treatments are bad or inappropriate.</p>
          <p>They can be appropriate and effective medical treatments.</p>
          <p>
            They simply are not the center of Jean&rsquo;s Live Pretty Wellness approach.
          </p>
          <p>
            If your primary goal is to have someone prescribe or manage those specific treatments
            for you, Jean may not be the right provider for that goal.
          </p>
          <p>
            If you are looking for a Nurse Practitioner who will help you think more deeply about
            managing acne-prone skin, your skincare strategy, and the bigger picture: Jean may be a
            good fit.
          </p>
        </div>
      </div>

      <ExpandCard title="Sometimes we need more information.">
        <p>Most people with acne do not automatically need advanced testing.</p>
        <p>
          But when your history, symptoms, or overall health gives me a clinical reason to look
          deeper, additional testing may be considered.
        </p>
        <p>Advanced diagnostic options available through Live Pretty Wellness include:</p>
        <p>GI-MAP&reg; Stool Analysis</p>
        <p>DUTCH&reg; Hormone Testing</p>
        <p>Organic Acids Test (OAT)</p>
        <div className="rounded-lg border-l-2 border-rose bg-cream px-4 py-3 text-ink">
          <p>Testing is optional.</p>
          <p>Lab fees are separate.</p>
          <p>Ordering is included when clinically appropriate.</p>
          <p>
            Interpretation and functional medicine treatment are not included with this visit.
          </p>
        </div>
        <p>More testing isn&rsquo;t automatically better.</p>
        <p>The value is knowing when there is actually a reason to look.</p>
        <p>This is where personalization begins.</p>
      </ExpandCard>


      <H2>You Wouldn&rsquo;t Be the First.</H2>
      <P>
        Over the years, I&rsquo;ve had the privilege of helping people with acne-prone skin build more
        thoughtful, personalized strategies for managing their skin.
      </P>
      <P>Different people.</P>
      <P>Different skin.</P>
      <P>Different histories.</P>
      <P>Different plans.</P>
      <P>The common thread wasn&rsquo;t perfection.</P>
      <P>It was strategy.</P>

      <figure className="my-9">
        <img
          src={clientCollage}
          alt="Grid of before-and-after photographs from Jean's acne clients, shared with permission"
          className="h-auto w-full rounded-lg border border-line bg-offwhite"
          loading="lazy"
        />
        <figcaption className="mt-3 text-sm leading-relaxed text-taupe">
          Individual client examples. Results vary. These images are not a promise of what your skin
          will do.
        </figcaption>
      </figure>

      <P>There are more of us than you think.</P>
      <P>
        You are not the only person who has had to learn how to live well with acne-prone skin.
      </P>

      <ChapterNav onBack={onBack} onNext={onNext} nextLabel="Finish my pretty skin plan →" />
    </Chapter>
  );
}

/* =======================================================================
   CHAPTER 8 — YOUR STARTING PLAN + INVITATION + BRAND CLOSE
   ======================================================================= */
function ChapterEight({
  stage,
  poreMove,
  barrierMove,
  balanceMove,
  inList,
  onList,
  skinNotes,
  onBack,
}: {
  stage: Stage;
  poreMove: string;
  barrierMove: string;
  balanceMove: string;
  inList: string;
  onList: string;
  skinNotes: string;
  onBack: () => void;
}) {
  return (
    <>
      <Chapter>
        <H1>
          Look at you.
          <br />
          You&rsquo;re already thinking differently about your skin.
       </H1>
        <P>Let&rsquo;s put your starting point somewhere you can actually use it.</P>

        <div id="my-plan" className="mt-7 rounded-lg border border-rose/50 bg-rose-tint p-6 sm:p-8">
          <p className="eyebrow text-cocoa">Live Pretty Wellness</p>
          <p className="mt-2 font-display text-[1.6rem] leading-tight text-ink sm:text-[2rem]">
            My Pretty Skin Strategist Plan
          </p>

          <PlanBlock label="Why I'm here">
            <p>{stage ? STAGE_SUMMARY[stage] : "Not selected."}</p>
          </PlanBlock>

          <PlanBlock label="My pore care move">
            <p>{poreMove || "Not selected."}</p>
          </PlanBlock>

          <PlanBlock label="My barrier move">
            <p>{barrierMove || "Not selected."}</p>
          </PlanBlock>

          <PlanBlock label="My balance move">
            <p>{balanceMove || "Not selected."}</p>
          </PlanBlock>

          <PlanBlock label="My new lens">
            <p>Healthy Pore Care</p>
            <p>Healthy Skin Barrier</p>
            <p>Healthy Skin Balance</p>
            <p className="mt-2 text-sm text-taupe">Don&rsquo;t diagnose. Notice.</p>
          </PlanBlock>

          <PlanBlock label="My 7-day reset">
            <p>Cook at home. No takeout, junk food, added-sugar treats, or deep-fried food.</p>
            <p>Simple whole-food meals.</p>
            <p>Do my three moves.</p>
            <p>Keep My IN List and My ON List.</p>
          </PlanBlock>

          <PlanBlock label="My IN list">
            <p className="whitespace-pre-line">
              {inList || "Keep tracking what I eat, drink, take, and ingest for 7 days."}
            </p>
          </PlanBlock>

          <PlanBlock label="My ON list">
            <p className="whitespace-pre-line">
              {onList || "Keep tracking what regularly touches my acne-prone skin for 7 days."}
            </p>
          </PlanBlock>

          <PlanBlock label="My skin notes">
            <p className="whitespace-pre-line">
              {skinNotes || "Add what I notice when something in my skin changes."}
            </p>
          </PlanBlock>

          <PlanBlock label="Success this week">
            <p>
              &ldquo;I became more intentional about managing my acne-prone skin.&rdquo;
            </p>
          </PlanBlock>
        </div>

        <div className="no-print mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => window.print()}
            className="w-full rounded-md bg-cocoa px-6 py-4 text-sm font-semibold uppercase tracking-[0.13em] text-cream transition-colors hover:bg-espresso sm:w-auto"
          >
            Save my plan
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="w-full rounded-full border border-sand px-6 py-4 text-xs uppercase tracking-[0.16em] text-cocoa transition-colors hover:border-rose sm:w-auto"
          >
            Print my plan
          </button>
        </div>

        <div className="no-print mt-8">
          <button
            type="button"
            onClick={onBack}
            className="rounded-full border border-sand px-5 py-3 text-xs uppercase tracking-[0.18em] text-taupe transition-colors hover:border-rose hover:text-cocoa"
          >
            ← Back
          </button>
        </div>
      </Chapter>

      {/* ---------- JEAN INVITATION (after the paid deliverable) ---------- */}
      <section className="no-print border-t border-line bg-cream py-2">
        <Chapter>
          <p className="eyebrow">One last question&hellip;</p>
          <H1>
            Did this leave you thinking: &ldquo;Okay Jean&hellip;what does all of this mean for MY
            skin?&rdquo;
         </H1>

          <P>Maybe you&rsquo;re wondering about:</P>
          <List
            items={[
              "your products",
              "your routine",
              "your treatment",
              "recurring acne",
              "irritation",
              "dark marks",
              "your current medication",
              "what happens if your circumstances change",
              "or how all the pieces fit together",
            ]}
          />
          <P>If that&rsquo;s you:</P>
          <Statement>That&rsquo;s exactly where general education should stop.</Statement>
          <P>I don&rsquo;t want to guess about your skin.</P>
          <P>And I don&rsquo;t want you guessing either.</P>
          <P>The deeper work requires knowing the individual.</P>

          <H2>This is where 1:1 is different.</H2>
          <p className="mt-4 text-[1.0125rem] text-ink">This Jean&rsquo;s Pick taught:</p>
          <List
            items={[
              "my story",
              "the mindset shift",
              "the Pretty Skin Strategist identity",
              "Jean's Healthy Skin Triad at the public level",
              "actions you can start yourself",
              "a way to observe your skin differently",
              "your starting plan",
            ]}
          />
          <p className="mt-6 text-[1.0125rem] text-ink">But it did NOT:</p>
          <List
            items={[
              "review your products",
              "review ingredient lists",
              "tell you what to use or stop",
              "build your routine",
              "determine treatment",
              "interpret your individual Triad",
              "apply Jean's deeper proprietary strategy to your specific skin",
            ]}
          />
          <Statement>This is where personalization begins.</Statement>
          <P>This isn&rsquo;t because I&rsquo;m gatekeeping information.</P>
          <P>It&rsquo;s because personalization requires a person.</P>

          <H2>Sometimes the Bigger Picture Deserves a Closer Look.</H2>
          <P>
            Depending on your history, symptoms, and individual situation, Jean may determine that
            additional evaluation, selected testing, or referral is appropriate.
          </P>
          <P>Testing is not automatically part of acne care.</P>
          <P>More testing is not automatically better.</P>
          <P>The point is knowing when something actually deserves investigation.</P>

          <H2>Planning to Work With Jean?</H2>
          <Sub>Bring your work with you.</Sub>
          <P>If you complete your:</P>
          <List
            items={[
              "7-Day Pretty Skin Reset",
              "My IN List",
              "My ON List",
              "Skin Notes",
              "and Pretty Skin Strategist Starting Plan",
            ]}
          />
          <P>bring them to your Personalized Skin Strategy Visit.</P>
          <P>I&rsquo;ll review them with you as part of your visit.</P>
          <P>
            That means you don&rsquo;t have to walk into your appointment and try to remember
            everything from the last several weeks.
          </P>
          <P>You&rsquo;ve already started doing the work of a Pretty Skin Strategist.</P>
          <P>Now I can help you make sense of what you collected.</P>

          <img
            src={jeanPortrait}
            alt="Jean of Live Pretty Wellness"
            className="mx-auto mt-8 h-auto w-[60%] max-w-[240px] rounded-full"
            loading="lazy"
          />

          <H2>Want Jean on Your Pretty Skin Team?</H2>
          <P>You&rsquo;ve already experienced how I think.</P>
          <Beat
            lines={[
              "If you like the way I think about acne-prone skin…",
              "if you felt understood here…",
              "if you want someone who will listen…",
              "and you're ready to stop trying to put every piece together by yourself…",
            ]}
          />
          <P>I&rsquo;d love to meet you.</P>

          <Statement>
            You bring your skin. Your history. Your questions. Your preferences. Your goals.
          </Statement>
          <P>I&rsquo;ll bring the clinical strategy.</P>
          <P>And we&rsquo;ll figure out what makes sense for you.</P>

          <a
            href={STRATEGY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-cocoa px-6 py-4 text-sm font-semibold uppercase tracking-[0.13em] text-cream transition-colors hover:bg-espresso sm:w-auto"
          >
            Explore personalized skin strategy →
          </a>

          <p className="mt-5">
            <a
              href={MEET_JEAN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm uppercase tracking-[0.16em] text-cocoa underline decoration-rose decoration-1 underline-offset-4"
            >
              Meet Jean →
            </a>
          </p>

          <p className="mt-6">
            <a
              href="#my-plan"
              className="text-sm uppercase tracking-[0.16em] text-taupe underline decoration-sand decoration-1 underline-offset-4 hover:text-cocoa"
            >
              I&rsquo;m good for now — take me back to my plan
            </a>
          </p>
        </Chapter>
      </section>

      {/* ---------- FINAL BRAND CLOSE ---------- */}
      <section className="border-t border-line bg-ivory py-10 text-center">
        <div className="pick-shell">
          <img src={lpwLogo} alt="Live Pretty Wellness" className="mx-auto h-14 w-auto sm:h-16" />
          <h2 className="mt-6 text-[1.6rem] sm:text-[2rem]">
            Welcome to Your Pretty Skin Strategist Era.
          </h2>
          <div className="mt-5 space-y-1.5 text-[1.0125rem] text-ink">
            <p>Acne-prone skin is not bad skin.</p>
            <p>It is skin worth knowing.</p>
            <p>Worth caring for.</p>
            <p>Worth protecting.</p>
            <p>Worth understanding.</p>
            <p>And yes&mdash;it still gets to be pretty.</p>
          </div>
          <p className="mt-7 font-display text-xl text-ink">Live Pretty Wellness</p>
          <p className="eyebrow mt-2">Clarity + Strategy for Acne-Prone Skin</p>
          <p className="mt-6 font-display text-lg text-cocoa">
            I&rsquo;ll see you around. &mdash; Jean
          </p>
        </div>
      </section>
    </>
  );
}

function PlanBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-t border-rose/40 py-4 first-of-type:mt-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cocoa">{label}</p>
      <div className="mt-2 space-y-1.5 text-[0.975rem] leading-relaxed text-ink">{children}</div>
    </div>
  );
}
