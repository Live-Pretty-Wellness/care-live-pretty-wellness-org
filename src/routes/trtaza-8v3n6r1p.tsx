import { createFileRoute } from "@tanstack/react-router";
import {
  PickTopBar,
  PickHero,
  FastAnswer,
  Section,
  Sub,
  Lead,
  Bullets,
  Gem,
  QuickPick,
  
  ReadYourSkin,
  SaveThis,
  QuestionChanged,
  FinalPick,
  NextStep,
  Disclaimer,
  Divider,
} from "@/components/picks/PickKit";
import { HealthySkinTriad } from "@/components/picks/HealthySkinTriad";
import hero from "@/assets/pick2-hero.jpg";

export const Route = createFileRoute("/trtaza-8v3n6r1p")({
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, nofollow" },
      { title: "Tretinoin + Azelaic Acid: How Do They Fit Together? | Jean's Picks" },
      {
        name: "description",
        content:
          "Jean's Pick #2: how tretinoin and azelaic acid can fit into one routine, one common morning and night setup, and what your skin is telling you.",
      },
      { property: "og:title", content: "Tretinoin + Azelaic Acid | Jean's Picks" },
      {
        property: "og:description",
        content:
          "Two good ingredients don't have to compete for the same time slot. A save-worthy skincare answer from Live Pretty Wellness.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pick2,
});

function Pick2() {
  return (
    <main className="min-h-screen bg-ivory">
      <PickTopBar />

      <PickHero
        title="Tretinoin + Azelaic Acid"
        question="How do they actually fit together?"
        scanner="Morning? ☀️ Night? 🌙 Together? Separate?"
        image={hero}
        imageAlt="A man applying a thin layer of skincare cream to his cheek in soft morning light"
      />

      <FastAnswer>
        <Lead>
          Yes — tretinoin and azelaic acid can both have a place in the same overall skincare
          routine.
        </Lead>
        <p>
          But: <strong>that does not mean they have to be applied at the same time.</strong>
        </p>
        <QuickPick
          intro="One common way people may use them"
          columns={[
            {
              head: "☀️ Morning",
              items: ["Azelaic acid", "→ moisturizer if used", "→ sunscreen last"],
            },
            {
              head: "🌙 Evening",
              items: ["Tretinoin — as directed for your prescription", "→ moisturizer if used"],
            },
          ]}
          footnote="This is one common setup — not the only one."
        />
        <Gem>Two good ingredients do not have to compete for the same time slot.</Gem>
      </FastAnswer>

      <Divider />

      <Section index="02" title="What does each one do?">
        <Sub>Tretinoin</Sub>
        <p>Think:</p>
        <Bullets
          items={["acne", "keeping pores from staying plugged", "helping skin cells turn over"]}
        />
        <Sub>Azelaic acid</Sub>
        <p>Think:</p>
        <Bullets items={["acne", "redness and inflammation", "dark marks left behind after breakouts"]} />
        <Gem large>Different jobs. Same overall skincare routine.</Gem>
      </Section>

      <Divider />

      <Section index="03" title="Morning or night?">
        <Sub>Does azelaic acid have to be used in the morning?</Sub>
        <p>
          No. Azelaic acid can fit at different times. Morning is simply{" "}
          <strong>one common place</strong> for it when tretinoin is already being used at night.
        </p>
        <Sub>Does tretinoin have to be used at night?</Sub>
        <p>
          Tretinoin is commonly used at night, and the directions that came with your prescription
          matter. If your tretinoin was prescribed a certain way, follow those directions rather than
          changing it based on a skincare guide.
        </p>
        <Gem>
          Sometimes morning vs. night is less about the clock and more about giving your routine some
          breathing room.
        </Gem>
      </Section>

      <Divider />

      <Section index="04" title="Can they be used together?">
        <Lead>Yes, they can both be part of the same overall routine.</Lead>
        <p>
          But that does not mean everyone needs to layer them during the same skincare session. Both
          can sometimes contribute to:
        </p>
        <Bullets items={["burning", "stinging", "dryness", "peeling", "irritation"]} />
        <p>Separating them can sometimes make it easier to understand:</p>
        <Bullets
          items={[
            "what your skin is handling well",
            "what may be irritating it",
            "what seems to be helping",
          ]}
        />
        <Gem large>
          &ldquo;Can these go together?&rdquo; and &ldquo;Does my skin need them together?&rdquo; are
          two different questions.
        </Gem>
      </Section>

      <Divider />

      <Section index="05" title="New to tretinoin, or already used to it?">
        <Sub>New to tretinoin?</Sub>
        <p>
          When tretinoin is new, your skin may still be adjusting. If several new products are added
          at once, it becomes harder to know:
        </p>
        <Bullets
          items={[
            "What caused the dryness?",
            "What caused the irritation?",
            "What is your skin actually handling well?",
          ]}
        />
        <Gem>
          When everything changes at once, it gets harder to tell what helped — and what
          didn&rsquo;t.
        </Gem>
        <Sub>Already using tretinoin comfortably?</Sub>
        <p>
          That is a different situation. If your skin has been calm and your routine has been stable,
          there is a clearer picture of how your skin is already handling tretinoin.
        </p>
      </Section>

      <Divider />

      <Section index="06" title="What if your skin is already burning or peeling?">
        <div className="quiet-card">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-cocoa">
            Look at the skin — is it
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {[
              "burning?",
              "stinging?",
              "peeling a lot?",
              "raw?",
              "painfully tight?",
              "very red?",
              "getting more irritated instead of settling down?",
            ].map((s) => (
              <li
                key={s}
                className="rounded-full border border-rose/50 bg-rose-tint px-3.5 py-1.5 text-sm text-ink"
              >
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-ink-soft">
            If your skin is already very irritated, adding another active may not be the most
            important next step.
          </p>
        </div>
        <Gem large>A breakout can need attention while the skin barrier needs attention too.</Gem>
        <p>
          If irritation is significant, persistent, or getting worse, contact your healthcare
          provider rather than changing a prescription on your own.
        </p>
      </Section>

      <Divider />

      <Section index="07" title="Where do moisturizer and sunscreen fit?">
        <Sub>Moisturizer</Sub>
        <p>Moisturizer can help support skin comfort when acne treatments feel drying.</p>
        <Lead>
          Moisturizer is not &ldquo;canceling out&rdquo; good acne care just because it makes the
          routine gentler.
        </Lead>
        <Sub>Sunscreen</Sub>
        <p>
          In the morning, sunscreen generally goes last. Azelaic acid can appear earlier in a morning
          routine, with sunscreen applied afterward. Tretinoin may be used at night, but daytime sun
          protection still matters.
        </p>
        <Gem>If tretinoin is doing work at night, sun protection still matters during the day.</Gem>
      </Section>

      <Divider />

      <Section index="08" title="What else are you already using?">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-cocoa">
          Already using any of these?
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            "Benzoyl peroxide",
            "Salicylic acid",
            "Adapalene",
            "Other exfoliating acids",
            "Scrubs",
            "Medicated cleansers",
            "Other prescription skincare",
          ].map((s) => (
            <span
              key={s}
              className="rounded-full border border-sand bg-cream px-3.5 py-1.5 text-sm text-ink"
            >
              {s}
            </span>
          ))}
        </div>
        <Lead>Your bathroom cabinet is part of your health history.</Lead>
        <p>
          If you use prescription tretinoin, make sure your healthcare provider knows about the other
          medicated cleansers, acids, spot treatments, and acne products in your routine too.
        </p>
        <Gem large>
          Don&rsquo;t build a skincare routine one product at a time. Look at the whole routine.
        </Gem>
      </Section>


      <HealthySkinTriad supporting="Good skincare decisions don't stop at the product. I also look at Healthy Skin Balance, Healthy Pore Care, and Healthy Skin Barrier." />

      <SaveThis
        heading="Tretinoin + Azelaic Acid Quick Guide"
        rows={[
          { label: "Can both be part of the same routine?", body: <p>Yes.</p> },
          { label: "Do they have to be applied at the same time?", body: <p>No.</p> },
          {
            label: "One common setup?",
            body: (
              <>
                <p>☀️ Azelaic acid in the morning</p>
                <p>🌙 Tretinoin at night, as directed for the prescription</p>
              </>
            ),
          },
          {
            label: "Can azelaic acid go under sunscreen?",
            body: <p>Yes. Sunscreen generally goes last in the morning.</p>,
          },
          {
            label: "What if tretinoin is new?",
            body: (
              <p>
                Changing too many things at once can make it harder to tell what your skin is
                handling well.
              </p>
            ),
          },
          {
            label: "What if the skin is burning or peeling?",
            body: (
              <p>
                That changes the conversation. Irritated skin may need attention before another
                active is added.
              </p>
            ),
          },
          {
            label: "What about moisturizer?",
            body: <p>It can help support skin comfort when acne treatments feel drying.</p>,
          },
          {
            label: "Using other acne products too?",
            body: <p>Count them. Prescription + over-the-counter products.</p>,
          },
        ]}
      />

      <ReadYourSkin
        signs={[
          "burning",
          "stinging",
          "peeling a lot",
          "painful tightness",
          "rawness",
          "increasing redness",
          "irritation that keeps getting worse instead of settling down",
        ]}
        closing={
          <p>
            If irritation is significant, persistent, or getting worse, talk with your healthcare
            provider before changing your prescription.
          </p>
        }

      />

      <QuestionChanged
        title="When the question has changed"
        intro="Professional help may be more useful when:"
        items={[
          "skin is very irritated",
          "acne is deep or painful",
          "acne is scarring",
          "the routine has become complicated",
          "several medicated products are being used",
          "you are unsure how your prescription fits with everything else",
        ]}
        mainLine="Sometimes the real question isn't “Where do I put this product?” It's “Does my whole routine make sense together?”"
      />

      <FinalPick
        headline="Tretinoin and azelaic acid can both have a place in the same skincare routine. They do not have to compete for the same time slot."
        looks={[
          "Know what each product is doing.",
          "Follow your prescription directions.",
          "Count the rest of the routine.",
          "Pay attention to how your skin is doing.",
        ]}
        finalLine="Good products are the ingredients. Strategy is the recipe."
      />

      <NextStep prompt="Want help making sense of your entire acne-prone skincare routine?" />

      <Disclaimer extra="Prescription directions come first. Skincare products can work differently from person to person. Talk with your healthcare provider before changing how you use a prescription medication or if you have significant irritation, persistent acne, or questions about what may be appropriate for your skin." />
    </main>
  );
}
