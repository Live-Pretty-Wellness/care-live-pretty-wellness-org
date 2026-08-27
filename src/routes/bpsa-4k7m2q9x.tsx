import { createFileRoute } from "@tanstack/react-router";
import {
  PickTopBar,
  Section,
  Sub,
  Lead,
  Note,
  Bullets,
  Gem,
  Flow,
  CardGrid,
  SaveThis,
  QuestionChanged,
  FinalPick,
  NextStep,
  Disclaimer,
  Divider,
} from "@/components/picks/PickKit";
import { HealthySkinTriad } from "@/components/picks/HealthySkinTriad";
import hero from "@/assets/pick1-hero.jpg";

export const Route = createFileRoute("/bpsa-4k7m2q9x")({
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, nofollow" },
      { title: "Benzoyl Peroxide or Salicylic Acid? | Jean's Picks" },
      {
        name: "description",
        content:
          "Jean's Pick #1: which acne ingredient do you actually reach for? A quick, plain-language guide to strengths, forms, timing, and the rest of your routine.",
      },
      { property: "og:title", content: "Benzoyl Peroxide or Salicylic Acid? | Jean's Picks" },
      {
        property: "og:description",
        content:
          "Don't treat the pimple and forget about the skin it's living in. A quick skincare guide from Live Pretty Wellness.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pick1,
});

function Pick1() {
  return (
    <main className="min-h-screen bg-ivory">
      <PickTopBar />

      {/* ---------- HERO (compact — answers come fast) ---------- */}
      <section className="pick-shell pt-9 pb-2">
        <p className="eyebrow">A quick skincare guide from Live Pretty Wellness</p>
        <h1 className="mt-4 text-[2.35rem] leading-[1.08] sm:text-[3.1rem]">
          Benzoyl Peroxide or Salicylic Acid?
        </h1>
        <p className="mt-3 font-display text-xl text-ink-soft sm:text-2xl">
          Which one do I actually reach for?
        </p>
        <div className="mt-6 flex items-center gap-4 rounded-lg border border-line bg-cream p-4">
          <img
            src={hero}
            alt="Close-up of acne-prone skin with realistic texture"
            className="h-20 w-20 shrink-0 rounded-md object-cover sm:h-24 sm:w-24"
          />
          <p className="font-display text-lg leading-snug text-ink sm:text-xl">
            Here&rsquo;s the simplest way to think about it: these two ingredients do different jobs.
          </p>
        </div>
      </section>

      {/* ---------- 1. THE FAST ANSWER ---------- */}
      <Section index="01" title="The fast answer">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-rose/50 bg-rose-tint p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-cocoa">
              Blackheads, whiteheads or little plugged-looking bumps?
            </p>
            <p className="mt-3 font-display text-[1.6rem] leading-tight text-ink">
              Think salicylic acid first.
            </p>
            <p className="mt-3 text-ink-soft">
              Salicylic acid is commonly used when clogged pores are a big part of the problem. It
              helps loosen the buildup that can sit inside pores.
            </p>
          </div>
          <div className="rounded-lg border border-rose/50 bg-rose-tint p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-cocoa">
              Red, swollen, tender or pus-filled pimples?
            </p>
            <p className="mt-3 font-display text-[1.6rem] leading-tight text-ink">
              Think benzoyl peroxide first.
            </p>
            <p className="mt-3 text-ink-soft">
              Benzoyl peroxide is commonly used when acne looks more red and inflamed. It helps
              reduce acne-causing bacteria and inflammation.
            </p>
          </div>
        </div>

        <Sub>Seeing both?</Sub>
        <p>
          There can be a reason for <strong className="text-ink">both</strong> ingredients to have a
          place in an acne routine. But two good acne ingredients do not automatically make a better
          routine when everything is piled together.
        </p>
        <Gem large>Five good acne products can still make one bad routine.</Gem>
      </Section>

      <Divider />

      {/* ---------- 2. FACE OR BODY ---------- */}
      <Section index="02" title="Face or body?">
        <Sub>Can both be used on the face?</Sub>
        <p>
          Yes. There is no rule that says salicylic acid is only for the face and benzoyl peroxide is
          only for the body. The better starting point is still:
        </p>
        <Bullets
          marker="→"
          items={[
            <>
              Mostly blackheads, whiteheads or plugged-looking bumps —{" "}
              <strong className="text-ink">think salicylic acid</strong>
            </>,
            <>
              Mostly red, swollen or inflamed pimples —{" "}
              <strong className="text-ink">think benzoyl peroxide</strong>
            </>,
          ]}
        />

        <Sub>What about back + chest acne?</Sub>
        <p>
          For people with lots of red, inflamed pimples across the back or chest, a benzoyl peroxide{" "}
          <strong className="text-ink">wash</strong> is one common over-the-counter option. And
          here&rsquo;s something many people do not know:
        </p>
        <Lead>Benzoyl peroxide body wash may need a little contact time.</Lead>
        <Flow steps={["Apply", "Let it sit a few minutes", "Rinse"]} />
        <Note>Always follow the directions on the specific product you are using.</Note>
        <p>
          For a large area like the back or chest, a wash can also be much easier than trying to dab
          spot treatment onto every pimple.
        </p>
        <Gem>Your face and your back do not need matching skincare routines.</Gem>
      </Section>

      <Divider />

      {/* ---------- 3. STRENGTH + FORM ---------- */}
      <Section index="03" title="What strength + what form?">
        <Sub>Benzoyl peroxide</Sub>
        <p>You may see: 2.5% · 4% · 5% · 10%</p>
        <p>
          Do not automatically grab the highest number. For acne on the face,{" "}
          <strong className="text-ink">2.5% benzoyl peroxide</strong> is an important strength to know
          about before jumping straight to 10%. A stronger percentage can also mean more dryness or
          irritation for some people.
        </p>
        <Gem large>10% sounds stronger. Stronger doesn&rsquo;t automatically mean smarter.</Gem>

        <Sub>Salicylic acid</Sub>
        <p>
          Salicylic acid comes in cleansers, leave-on liquids, gels, spot treatments and masks. And
          here is what matters: <strong className="text-ink">do not shop by percentage alone.</strong>{" "}
          A salicylic acid cleanser that gets rinsed off and a salicylic acid treatment that stays on
          your skin are not the same experience.
        </p>

        <Sub>Which form makes sense?</Sub>
        <CardGrid
          items={[
            {
              title: "Wash",
              body: (
                <>
                  <p>Rinses off. Often practical for:</p>
                  <Bullets
                    items={["larger areas", "back or chest", "not wanting another leave-on layer"]}
                  />
                </>
              ),
            },
            {
              title: "Leave-on",
              body: (
                <>
                  <p>Stays on the skin.</p>
                  <p>
                    <strong className="text-ink">More product does not mean faster results.</strong>{" "}
                    Follow the directions on the product.
                  </p>
                </>
              ),
            },
            {
              title: "Spot treatment",
              body: (
                <p>
                  Usually meant for an individual blemish when the product is labeled that way. But
                  if pimples keep appearing across the same area, chasing one pimple at a time may
                  not be the whole picture.
                </p>
              ),
            },
            {
              title: "Mask",
              body: (
                <p>
                  Another rinse-off format. It is not automatically stronger or better just because
                  it says mask.
                </p>
              ),
            },
          ]}
        />
        <Gem>
          The ingredient tells you the job. The product form tells you how that job reaches your skin.
        </Gem>
      </Section>

      <Divider />

      {/* ---------- 4. MORNING OR NIGHT ---------- */}
      <Section index="04" title="Morning or night? Can I use both?">
        <Lead>
          Benzoyl peroxide does not automatically belong only in the morning. Salicylic acid does not
          automatically belong only at night.
        </Lead>
        <p>Either one may show up in a morning or an evening routine. What matters more is:</p>
        <Bullets
          items={[
            "what else you are already using",
            "whether it is a wash or a leave-on",
            "how your skin is handling the routine",
          ]}
        />

        <Sub>Can both be in one routine?</Sub>
        <p>Yes, there can be a place for both. Common ways people see them used include:</p>
        <Bullets
          items={[
            "different times of day",
            "different days",
            "one as a wash + one as a leave-on",
            "different body areas",
          ]}
        />
        <Lead>
          &ldquo;Both can help acne&rdquo; does not mean &ldquo;put both everywhere.&rdquo;
        </Lead>
        <p>
          Using several acne treatments at once can leave skin dry, irritated, or overwhelmed.
        </p>
      </Section>

      <Divider />

      {/* ---------- 5. WHAT ELSE ARE YOU USING ---------- */}
      <Section index="05" title="What else are you already using?">
        <div className="quiet-card">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-cocoa">
            Already using any of these?
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {[
              "Tretinoin",
              "Adapalene",
              "Azelaic acid",
              "Another exfoliating acid",
              "Another acne cleanser",
              "Another spot treatment",
            ].map((s) => (
              <li
                key={s}
                className="rounded-full border border-rose/50 bg-rose-tint px-3.5 py-1.5 text-sm text-ink"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
        <Lead>Your bathroom cabinet is part of your health history.</Lead>
        <p>
          If you use a prescription acne medication, make sure your healthcare provider knows what
          other medicated cleansers, acids, spot treatments and acne products you are using too.
        </p>
        <Gem large>
          Don&rsquo;t build an acne routine one product at a time. Look at the whole routine.
        </Gem>
      </Section>

      <Divider />

      {/* ---------- 6. LOOK AT THE SKIN ---------- */}
      <Section index="06" title="Look at the skin, not just the pimple">
        <p>
          Before adding another acne product, pay attention to the skin around the breakout. Is it
          already:
        </p>
        <ul className="flex flex-wrap gap-2">
          {[
            "burning?",
            "stinging?",
            "peeling a lot?",
            "raw?",
            "painfully tight?",
            "suddenly very sensitive?",
          ].map((s) => (
            <li
              key={s}
              className="rounded-full border border-rose/50 bg-rose-tint px-3.5 py-1.5 text-sm text-ink"
            >
              {s}
            </li>
          ))}
        </ul>
        <p>
          If yes, the question may no longer be &ldquo;which acne product should I add?&rdquo; It may
          be &ldquo;is my skin already doing too much?&rdquo;
        </p>
        <Lead>A breakout can need attention while the skin barrier needs attention too.</Lead>
      </Section>

      <HealthySkinTriad supporting="Good skincare decisions don't stop at the product. I also look at Healthy Skin Balance, Healthy Pore Care, and Healthy Skin Barrier." />

      {/* ---------- 7. SAVE THIS ---------- */}
      <SaveThis
        heading="Jean's Quick Guide"
        rows={[
          {
            label: "What do I see?",
            body: (
              <>
                <p>
                  Blackheads / whiteheads / plugged-looking bumps → think{" "}
                  <strong className="text-ink">salicylic acid</strong>
                </p>
                <p>
                  Red / swollen / inflamed / pus-filled pimples → think{" "}
                  <strong className="text-ink">benzoyl peroxide</strong>
                </p>
                <p>Both patterns → there may be a place for both.</p>
              </>
            ),
          },
          {
            label: "Where?",
            body: (
              <>
                <p>
                  <strong className="text-ink">Face</strong> → type of breakout + strength + product
                  form + rest of routine matter.
                </p>
                <p>
                  <strong className="text-ink">Back / chest</strong> → a wash can be especially
                  practical for a larger area.
                </p>
              </>
            ),
          },
          {
            label: "What form?",
            body: (
              <>
                <p>Wash → rinses off</p>
                <p>Leave-on → stays on skin</p>
                <p>Spot treatment → individual blemish when labeled that way</p>
                <p>Mask → another rinse-off format</p>
              </>
            ),
          },
          {
            label: "What strength?",
            body: (
              <>
                <p>Benzoyl peroxide: bigger number does not automatically mean better.</p>
                <p>Salicylic acid: do not judge the product by percentage alone.</p>
              </>
            ),
          },
          {
            label: "When?",
            body: (
              <>
                <p>Morning or night can both be possible.</p>
                <p>The whole routine matters more than memorizing a clock rule.</p>
              </>
            ),
          },
          {
            label: "Already using other acne products?",
            body: (
              <p>
                Count them. <strong className="text-ink">Prescription + over-the-counter.</strong>
              </p>
            ),
          },
          {
            label: "Remember",
            body: (
              <p className="font-display text-[1.4rem] leading-tight text-ink">
                The right acne ingredient in the wrong routine can still be the wrong move.
              </p>
            ),
          },
        ]}
      />

      <QuestionChanged
        intro="Sometimes choosing between benzoyl peroxide and salicylic acid is not enough. A healthcare professional may be helpful when acne is:"
        items={[
          "deep",
          "painful",
          "scarring",
          "not improving with over-the-counter care",
          "very widespread",
          "making the skin significantly irritated",
          "or when you are not even sure the bumps are acne",
        ]}
        mainLine="Sometimes another acne product isn't the answer. Sometimes the bigger picture needs to be looked at."
      />

      <FinalPick
        headline="Don't treat the pimple and forget about the skin it's living in."
        looks={[
          "Look at the breakout.",
          "Look at where it is.",
          "Look at the strength.",
          "Look at the product form.",
          "Look at what else is already in the routine.",
          "And look at how the skin itself is doing.",
        ]}
        finalLine="The goal is not to use the most acne products. The goal is to build a routine that makes sense."
      />

      <NextStep prompt="Want help making sense of your entire acne-prone skincare routine?" />

      <Disclaimer />
    </main>
  );
}
