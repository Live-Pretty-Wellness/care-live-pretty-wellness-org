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
  QuickPick,
  Flow,
  EvaluateYourSkin,
  SaveThis,
  QuestionChanged,
  FinalPick,
  NextStep,
  Disclaimer,
  Divider,
} from "@/components/picks/PickKit";
import { HealthySkinTriad } from "@/components/picks/HealthySkinTriad";
import hero from "@/assets/pick4-hero.jpg";

export const Route = createFileRoute("/hairbo-2z6d8f3y")({
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, nofollow" },
      { title: "Are My Hair Products Breaking Me Out? | Jean's Picks" },
      {
        name: "description",
        content:
          "Jean's Pick #4: hairline breakouts, wash day, product transfer, pillowcases and bonnets, oily scalp, and what social media calls “fungal acne.”",
      },
      { property: "og:title", content: "Are My Hair Products Breaking Me Out?" },
      {
        property: "og:description",
        content:
          "Your skincare routine may not be the only thing touching your face. A save-worthy skincare answer from Live Pretty Wellness.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pick4,
});

function Pick4() {
  return (
    <main className="min-h-screen bg-ivory">
      <PickTopBar />

      <PickHero
        title="Are My Hair Products Breaking Me Out?"
        question="Your skincare routine may not be the only thing touching your face."
        image={hero}
        imageAlt="A woman with coily hair wearing a satin bonnet resting near her hairline and forehead"
        hook={
          <>
            <p>
              Hair products can contribute to breakouts in some acne-prone people—especially when
              oils, edge control, styling products, conditioner, or residue keep touching the same
              areas of skin.
            </p>
            <Lead>
              If the breakouts keep showing up where your hair or hair products keep touching, pay
              attention to the pattern.
            </Lead>
          </>
        }
      />

      <FastAnswer>
        <Sub>Hair products may deserve a closer look when:</Sub>
        <Bullets
          items={[
            "bumps keep showing up around your hairline",
            "your forehead breaks out where your hair sits against it",
            "your temples break out near oils, edge control, or styling products",
            "breakouts show up after a new hair product",
            "heavy hair products regularly touch your face",
            "your skin seems worse after styling or wash day",
          ]}
        />
        <Note>These are clues, not proof that one hair product is the cause.</Note>
      </FastAnswer>

      <div className="pick-shell">
        <Gem large>
          Your face doesn&rsquo;t know which aisle the product came from. It only knows what keeps
          touching the skin.
        </Gem>
      </div>

      <Divider />

      <Section index="02" title="Wash day: hair first. Face last.">
        <Flow steps={["Hair first", "Rinse away from the face", "Face last"]} />
        <div className="space-y-3">
          <div className="panel-card">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cocoa">
              1. Hair first
            </p>
            <p className="mt-2">Wash, condition, mask, or treat your hair.</p>
          </div>
          <div className="panel-card">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cocoa">
              2. Rinse away from the face when practical
            </p>
            <p className="mt-2">
              Try not to repeatedly let heavy conditioner, masks, oils, or residue run over your
              forehead, cheeks, or jawline.
            </p>
          </div>
          <div className="panel-card">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cocoa">
              3. Face last
            </p>
            <p className="mt-2">
              Once wash day is finished, gently cleanse your face to remove anything that may have
              transferred onto your skin.
            </p>
          </div>
        </div>
        <Lead>Hair first. Rinse away from the face. Face last.</Lead>

        <Sub>Product placement matters too</Sub>
        <p>
          Not every leave-in, oil, or styling product needs to sit directly on your scalp, roots,
          forehead, or hairline unless the product is meant to be used there.
        </p>
        <Lead>
          Where a hair product ends up can matter just as much as what the product is.
        </Lead>
      </Section>

      <Divider />

      <Section index="03" title="Everything that touches your face counts">
        <Sub>The repeat-contact check: pillowcase</Sub>
        <p>Your pillowcase can collect:</p>
        <div className="flex flex-wrap gap-2">
          {[
            "hair oil",
            "leave-in conditioner",
            "edge control",
            "styling cream",
            "scalp oil",
            "sweat",
            "skin oil",
          ].map((s) => (
            <span
              key={s}
              className="rounded-full border border-sand bg-cream px-3.5 py-1.5 text-sm text-ink"
            >
              {s}
            </span>
          ))}
        </div>
        <p>If it feels or looks oily or product-coated, wash or change it.</p>
        <Gem>Satin may be cute. Satin is not self-cleaning.</Gem>
        <p>Hair-friendly fabric still needs skin-friendly hygiene.</p>

        <Sub>Bonnets, scarves, wraps + headbands</Sub>
        <p>
          Anything that repeatedly touches your forehead, temples, or hairline can collect oil,
          sweat, and product residue. Keep repeat-contact items clean.
        </p>

        <Sub>Hands</Sub>
        <Flow steps={["Hair product", "Hands", "Face"]} />
        <p>
          You apply edge control or styling cream, adjust your hairline, then touch your forehead.
        </p>
        <Gem large>Finish the hair. Wash the hands. Then touch the face.</Gem>
      </Section>

      <Divider />

      <Section index="04" title="Your scalp may be part of the picture">
        <p>
          An oily, itchy, or flaky scalp can be a sign that your scalp itself deserves attention.
        </p>
        <p>Your scalp naturally has oil, sweat, bacteria, and yeast living on it.</p>
        <p>
          One type of yeast called <strong>Malassezia</strong> normally lives on human skin. It can be
          involved in scalp conditions such as dandruff and seborrheic dermatitis, and in a condition
          called <strong>Malassezia folliculitis</strong> — what social media often calls
          &ldquo;fungal acne.&rdquo;
        </p>
        <p>
          Scalp oil, sweat, and hair-product residue can also transfer onto the hairline, forehead,
          pillowcase, and nearby skin.
        </p>

        <Lead>
          If your scalp is very oily, itchy, or flaky, don&rsquo;t ignore the scalp while only
          treating your face.
        </Lead>
      </Section>

      <Divider />

      <Section index="05" title="“Fungal acne” vs. regular acne">
        <QuickPick
          columns={[
            {
              head: "Regular acne may include",
              items: [
                "blackheads",
                "whiteheads",
                "different-sized pimples",
                "red or inflamed pimples",
              ],
            },
            {
              head: "What social media calls “fungal acne” may look more like",
              items: [
                "lots of small bumps",
                "bumps that look very similar to each other",
                "itching",
                "often no obvious blackheads or whiteheads",
              ],
            },
          ]}
          footnote="These are clues, not a self-diagnosis tool. Several skin conditions can look alike."
        />
        <Gem large>
          If every bump looks almost the same and it itches, don&rsquo;t automatically assume
          it&rsquo;s regular acne.
        </Gem>
        <p>More acne products won&rsquo;t necessarily fix something that isn&rsquo;t regular acne.</p>
      </Section>

      <Divider />

      <Section index="06" title="Don't try to scrub the problem away">
        <p>
          Some people think: &ldquo;If oil or yeast is involved, I need to scrub harder.&rdquo;
        </p>
        <Lead>Clean is not the same as stripped.</Lead>
        <p>The goal is:</p>
        <Bullets
          items={[
            "appropriate scalp care",
            "clean repeat-contact surfaces",
            "less unwanted product transfer",
            "healthy skin—not irritated skin",
          ]}
        />
      </Section>

      <HealthySkinTriad supporting="Good skincare decisions don't stop at the face product. I also look at Healthy Skin Balance, Healthy Pore Care, and Healthy Skin Barrier." />

      <SaveThis
        heading="The Hair + Skin Reset"
        rows={[
          {
            label: "Hairline / temple breakouts",
            body: (
              <p>
                → Look at oils, pomades, edge control, leave-ins, styling creams, and hair repeatedly
                touching the area.
              </p>
            ),
          },
          {
            label: "Wash-day products run down the face",
            body: <p>→ Hair first → rinse away from the face → face last</p>,
          },
          {
            label: "Hair product on the hands",
            body: <p>→ Wash hands before touching the face.</p>,
          },
          {
            label: "Oily / product-coated pillowcase",
            body: <p>→ Change and wash it.</p>,
          },
          {
            label: "Bonnet / scarf / wrap touching the hairline",
            body: <p>→ Keep repeat-contact items clean.</p>,
          },
          {
            label: "Oily / itchy / flaky scalp",
            body: <p>→ The scalp deserves attention too.</p>,
          },
          {
            label: "Itchy + lots of same-looking bumps",
            body: <p>→ Don&rsquo;t automatically assume regular acne.</p>,
          },
          {
            label: "Heavy product at the roots / hairline",
            body: <p>→ Ask whether the product really needs to sit there.</p>,
          },
        ]}
      />

      <div className="pick-shell">
        <Gem large>
          Sometimes better acne care isn&rsquo;t another active ingredient. It&rsquo;s reducing what
          keeps getting back onto the skin.
        </Gem>
      </div>

      <EvaluateYourSkin
        title="The 30-second contact check"
        questions={[
          "What keeps touching the breakout area?",
          "Does my hair sit against it?",
          "Do hair products transfer onto it?",
          "What happens during wash day?",
          "What am I sleeping on?",
          "Is my scalp oily, itchy, or flaky?",
          "Are the bumps itchy or very similar-looking?",
        ]}
        takeaway="Look for the pattern—not one product in isolation."
      />

      <QuestionChanged
        intro="Professional evaluation may make more sense when:"
        items={[
          "the bumps are very itchy",
          "almost all the bumps look the same",
          "scalp itching or flaking is significant",
          "the problem keeps returning",
          "the bumps do not behave like ordinary acne",
          "the area is spreading",
          "the bumps are painful",
          "the skin becomes significantly irritated",
          "you are not sure whether the problem is actually acne",
        ]}
        mainLine="If the problem isn't behaving like regular acne, don't keep treating it like regular acne."
        closing="Before buying stronger acne products, make sure the right problem is being treated."
      />

      <FinalPick
        headline="Sometimes the breakout isn't coming from what you put on your face. It's coming from what keeps touching it."
        looks={[
          "Look at the hairline.",
          "Look at wash day.",
          "Look at the scalp.",
          "Look at the pillowcase.",
          "Look at the bonnet.",
          "Look at the hands.",
          "Look at the pattern.",
        ]}
        finalLine="Before buying another acne product, check what the skin keeps coming into contact with."
      />

      <NextStep prompt="Want help looking at the bigger picture of your acne-prone skincare routine?" />

      <Disclaimer extra="Hair products, scalp conditions, folliculitis, acne, and other skin conditions can sometimes look similar. Talk with an appropriate healthcare professional about persistent, painful, spreading, very itchy, or unexplained bumps, significant scalp symptoms, severe irritation, or questions about what may be appropriate for your skin." />
    </main>
  );
}
