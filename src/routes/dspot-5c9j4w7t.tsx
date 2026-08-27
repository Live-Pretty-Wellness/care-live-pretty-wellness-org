import { createFileRoute } from "@tanstack/react-router";
import {
  PickTopBar,
  PickHero,
  FastAnswer,
  Section,
  Sub,
  Lead,
  Note,
  Bullets,
  Gem,
  SaveThis,
  QuestionChanged,
  FinalPick,
  NextStep,
  Disclaimer,
  Divider,
} from "@/components/picks/PickKit";
import { HealthySkinTriad } from "@/components/picks/HealthySkinTriad";
import hero from "@/assets/pick3-hero.jpg";

export const Route = createFileRoute("/dspot-5c9j4w7t")({
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, nofollow" },
      { title: "Why Do Their Dark Spots Fade Faster Than Mine? | Jean's Picks" },
      {
        name: "description",
        content:
          "Jean's Pick #3: why your post-acne dark marks may fade slower, what keeps creating new marks, and how to read your own pattern instead of someone else's timeline.",
      },
      { property: "og:title", content: "Why Do Their Dark Spots Fade Faster Than Mine?" },
      {
        property: "og:description",
        content:
          "Don't compare the speed. Study the pattern. A save-worthy skincare answer from Live Pretty Wellness.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pick3,
});

function Pick3() {
  return (
    <main className="min-h-screen bg-ivory">
      <PickTopBar />

      <PickHero
        title="Why Do Their Dark Spots Fade Faster Than Mine?"
        question="Don't compare the speed. Study the pattern."
        image={hero}
        imageAlt="Close-up of flat post-acne dark marks on a woman's cheek with realistic skin texture"
        hook={
          <>
            <p>
              Watching someone else&rsquo;s acne marks disappear faster than yours can make you
              wonder, &ldquo;What am I doing wrong?&rdquo;
            </p>
            <Lead>
              A slower fading timeline does not automatically mean your skincare is failing.
            </Lead>
          </>
        }
      />

      <Section index="01" title="First: is it a dark mark or a scar?">
        <Sub>Flat + color only?</Sub>
        <p>
          If your skin feels smooth but there is a brown, gray, or darker mark where acne used to be,
          that may be a post-acne dark mark. You may hear this called{" "}
          <strong>post-inflammatory hyperpigmentation</strong> — which simply means a flat dark mark
          left behind after inflammation.
        </p>
        <Sub>Dented, raised or textured?</Sub>
        <p>
          That is different. If the surface of the skin itself has changed, that may be a scar rather
          than just a dark mark.
        </p>
        <Gem>A dark mark and an acne scar are not automatically the same thing.</Gem>
      </Section>

      <Divider />

      <FastAnswer>
        <Sub>Why your timeline may look different</Sub>
        <p className="text-ink-soft">Dark marks can fade at different speeds because of things like:</p>
        <Bullets
          items={[
            "how inflamed the original pimple was",
            "how easily your skin leaves dark marks behind",
            "how dark the mark is",
            "whether new breakouts keep creating new marks",
            "sun exposure",
            "picking or squeezing",
            "irritation from your routine",
            "how your skin tends to respond after inflammation",

          ]}
        />
        <p>Some skin simply holds onto pigment longer after inflammation.</p>
        <Note>
          People with deeper skin tones are more likely to notice lingering dark marks after acne.
        </Note>
      </FastAnswer>

      <Divider />

      <Section
        index="03"
        title="Are the old spots not fading — or are new ones replacing them?"
      >
        <p>Sometimes your old marks really are getting lighter.</p>
        <p>
          But if new breakouts keep leaving new marks, your skin can still look like nothing is
          changing. That can make it feel like the fading product is not working, when the bigger
          issue is old marks fading while new marks keep arriving.
        </p>
        <Gem large>
          You may be fading yesterday&rsquo;s marks while today&rsquo;s breakouts are creating
          tomorrow&rsquo;s.
        </Gem>
      </Section>

      <Divider />

      <Section index="04" title="The dark-spot pattern check">
        <Sub>Look for the pattern</Sub>
        <Bullets
          items={[
            "Does almost every pimple leave a mark?",
            "Do only the bigger or redder pimples leave marks?",
            "Are old marks slowly getting lighter?",
            "Are new marks showing up faster than old ones fade?",
            "Are you picking or squeezing?",
            "Is your skin getting irritated from trying to fade faster?",
            "Are you protecting your skin from the sun?",
          ]}
        />
        <Lead>The goal is not to stare at one spot. Look at the trend.</Lead>
      </Section>

      <Divider />

      <Section index="05" title="Why one dark-spot serum may not fix the whole problem">
        <Sub>Sometimes the product is only doing one job</Sub>
        <p>
          A fading product may be working on the mark you already have. But other things may be
          happening at the same time:
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { t: "1. New breakouts", b: "Still creating new marks." },
            { t: "2. Irritation", b: "Creating more inflammation." },
            { t: "3. Sun exposure", b: "Making dark marks harder to fade." },
            {
              t: "4. The existing mark",
              b: "Still needing time and a pigment-focused approach.",
            },
          ].map((c) => (
            <div key={c.t} className="panel-card">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cocoa">{c.t}</p>
              <p className="mt-2">{c.b}</p>
            </div>
          ))}
        </div>
        <Lead>
          Sometimes the product isn&rsquo;t failing. It may only be doing one job in a problem with
          several moving parts.
        </Lead>
      </Section>

      <Divider />

      <Section index="06" title="More products is not always a faster strategy">
        <p>
          A multi-part strategy does not mean stacking five fading products on your face. It means
          understanding that more than one part of the pattern may need attention:
        </p>
        <Bullets
          items={["new breakouts", "ongoing irritation", "sun exposure", "existing discoloration"]}
        />
        <Gem>More products ≠ a better pigment strategy.</Gem>
        <p>Trying to fade faster can backfire if your routine keeps irritating your skin.</p>
      </Section>

      <Divider />

      <Section index="07" title="Why irritation matters">
        <div className="quiet-card">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cocoa">
            If your skin is:
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {[
              "burning",
              "stinging",
              "raw",
              "very red",
              "peeling heavily",
              "painfully tight",
            ].map((s) => (
              <li
                key={s}
                className="rounded-full border border-rose/50 bg-rose-tint px-4 py-1.5 text-sm text-ink"
              >
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-ink-soft">
            Adding another fading product may not be the most useful next step.
          </p>
        </div>
        <Gem large>
          Don&rsquo;t create more inflammation while trying to erase the evidence of old
          inflammation.
        </Gem>
      </Section>

      <Divider />

      <Section title="Sun protection helps protect your progress">
        <p>
          Sun exposure can make dark marks more noticeable and harder to fade. So if you&rsquo;re
          working on dark marks, sun protection is part of the picture.
        </p>
        <Gem>
          If you&rsquo;re working on dark spots but ignoring sun exposure, you may be working against
          your own progress.
        </Gem>
      </Section>

      <Divider />

      <Section title="How long can dark marks take?">
        <p>Dark marks can take time.</p>
        <p>
          Some marks may fade gradually over weeks or months. Darker or more stubborn marks can take
          longer.
        </p>
        <Gem>Someone else&rsquo;s six-week result is not a deadline for your skin.</Gem>
      </Section>

      <HealthySkinTriad supporting="Good skincare decisions don't stop at the dark spot. I also look at Healthy Skin Balance, Healthy Pore Care, and Healthy Skin Barrier." />

      <SaveThis
        heading="Jean's Dark-Spot Check"
        rows={[
          {
            label: "Old marks getting lighter + fewer new marks",
            body: (
              <p>
                → The overall pattern may be improving — even if every mark is not gone yet.
              </p>
            ),
          },
          {
            label: "Old marks getting lighter + lots of new marks",
            body: (
              <p>
                → The fading step may be working while new breakouts keep creating new marks.
              </p>
            ),
          },
          {
            label: "More burning / peeling / rawness",
            body: <p>→ Trying to go faster may be irritating your skin.</p>,
          },
          {
            label: "No sun protection",
            body: <p>→ Sun exposure may be working against fading progress.</p>,
          },
          {
            label: "Picking or squeezing",
            body: <p>→ More inflammation can mean more lingering marks.</p>,
          },
          {
            label: "New / changing / unusual spot",
            body: <p>→ Do not automatically assume it is an acne mark.</p>,
          },
        ]}
      />

      <div className="pick-shell">
        <Lead>Don&rsquo;t only watch the spot. Watch the trend.</Lead>
      </div>

      <QuestionChanged
        title="When a dark spot deserves a different conversation"
        intro="Not every dark or discolored spot is an acne mark. Professional evaluation makes sense when a spot:"
        items={[
          "appears without a clear connection to acne",
          "changes",
          "grows",
          "bleeds",
          "itches",
          "becomes painful",
          "looks noticeably different from your usual marks",
        ]}
        mainLine="Don't try to “fade” something that first needs to be identified."
      />

      <FinalPick
        headline="Your dark spots are not competing with anyone else's timeline."
        looks={[
          "Look at what keeps creating new marks.",
          "Look at whether old marks are actually getting lighter.",
          "Look at irritation.",
          "Look at sun protection.",
          "Look at the overall trend—not one day in the mirror.",
        ]}
        finalLine="Don't compare the speed. Study the pattern. Sometimes the answer is not a stronger fading product. It is understanding the different pieces of the problem."
      />

      <NextStep prompt="Want help looking at the bigger picture of your acne-prone skincare routine?" />

      <Disclaimer extra="Not every dark or discolored spot is a post-acne mark, and fading timelines vary from person to person. Talk with an appropriate healthcare professional about persistent, changing, bleeding, painful, itchy, or unusual spots, significant irritation, prescription questions, or concerns about what may be appropriate for your skin." />
    </main>
  );
}
