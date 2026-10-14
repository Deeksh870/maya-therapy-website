"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  EDIT THESE THREE VALUES                                            */
/* ------------------------------------------------------------------ */
// 1. Your Web3Forms access key (free at web3forms.com, emailed to you)
const ACCESS_KEY = "PASTE_YOUR_ACCESS_KEY_HERE";
// 2. The email shown on the website
const CONTACT_EMAIL = "hello@mayareynolds.com";
// 3. Optional phone number shown on the website. Leave "" to hide.
const CONTACT_PHONE: string = "";

/* All copy is based on Dr. Maya Reynolds' profile. */

const services = [
  {
    title: "Anxiety & Panic",
    image: "/service-anxiety.jpg",
    imageAlt: "Soft light through sheer curtains, representing calm after anxiety and panic therapy in Santa Monica",
    description:
      "For constant worry, tension in your body, difficulty sleeping, or the sense that you're always bracing for something to go wrong. We work with both the emotional and physiological sides of what you're experiencing.",
    tag: "ANXIETY · PANIC · OVERTHINKING",
    position: "object-center",
  },
  {
    title: "Trauma & EMDR",
    image: "/service-trauma.jpg",
    imageAlt: "Quiet misty path representing a carefully paced trauma therapy and EMDR journey in Santa Monica",
    description:
      "Support for adults with single-incident trauma as well as complex, long-standing patterns that may stem from childhood, relationships, or chronic stress, paced carefully with an emphasis on safety and stabilization.",
    tag: "TRAUMA · EMDR · SAFETY",
    position: "object-center",
  },
  {
    title: "Burnout & Perfectionism",
    image: "/service-burnout.jpg",
    imageAlt: "Tea and a book in quiet morning light representing slowing down after professional burnout",
    description:
      "For entrepreneurs, creatives, and professionals who feel disconnected from themselves after years of pushing through stress. Therapy becomes a space to slow down and build more sustainable ways of living and working.",
    tag: "BURNOUT · HIGH INTERNAL PRESSURE",
    position: "object-[35%_50%]",
  },
];

const areas = [
  "Anxiety",
  "Panic",
  "Trauma",
  "Complex trauma",
  "Professional burnout",
  "Perfectionism",
  "Overthinking",
  "Difficulty sleeping",
  "High internal pressure",
  "Tension in the body",
  "Relationships",
  "Confidence & sense of safety",
];

const methods = [
  {
    title: "Cognitive-Behavioral Therapy",
    description:
      "CBT brings practical tools to constant worry and overthinking, balanced with depth-oriented work so change lasts beyond the session.",
  },
  {
    title: "EMDR",
    description:
      "EMDR is one of the evidence-based methods I integrate into trauma work, which is paced carefully with an emphasis on safety and stabilization.",
  },
  {
    title: "Mindfulness-Based Practices",
    description:
      "Mindfulness-based practices help you notice and understand what you're experiencing, and feel more regulated in your daily life.",
  },
  {
    title: "Body-Oriented Techniques",
    description:
      "Anxiety and trauma often show up in the body. Body-oriented techniques address tension and the physiological side of what you're experiencing.",
  },
];

const faqs = [
  {
    q: "Do you offer online therapy in California?",
    a: "Yes. I offer secure telehealth sessions for clients located in California, as well as in-person therapy from my Santa Monica office.",
  },
  {
    q: "Who do you work with?",
    a: "I work with adults. Many of my clients are high-achieving, thoughtful, and self-aware, including entrepreneurs, creatives, and professionals, who feel exhausted, stuck in overthinking, or emotionally on edge.",
  },
  {
    q: "What can anxiety and panic therapy help with?",
    a: "Therapy can help if you're dealing with constant worry, tension in your body, difficulty sleeping, or a sense that you're always bracing for something to go wrong. We look at both the emotional and physiological sides of what you're experiencing.",
  },
  {
    q: "Do you offer trauma therapy in Santa Monica?",
    a: "Yes. Trauma work is an important part of my practice. I work with adults who have experienced single-incident trauma as well as more complex, long-standing patterns. My approach is paced carefully, with an emphasis on safety and stabilization.",
  },
  {
    q: "What therapy methods do you use?",
    a: "I integrate evidence-based methods such as cognitive-behavioral therapy (CBT), EMDR, mindfulness-based practices, and body-oriented techniques, tailored to what you need.",
  },
  {
    q: "What are sessions like?",
    a: "Sessions are structured enough to feel supportive, while still leaving space for reflection and depth. My approach is warm, collaborative, and grounded, and you're actively involved in the process.",
  },
];

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Specialties", href: "#specialties" },
  { label: "Methods", href: "#methods" },
  { label: "Our Office", href: "#office" },
  { label: "FAQs", href: "#faq" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Dr. Maya Reynolds, PsyD - Clinical Psychology",
  description:
    "Licensed clinical psychologist offering anxiety, trauma, and burnout therapy for adults in Santa Monica, California, with in-person and telehealth sessions.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123th Street 45 W",
    addressLocality: "Santa Monica",
    addressRegion: "CA",
    postalCode: "90401",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Santa Monica" },
    { "@type": "State", name: "California" },
  ],
};

/*
  Image component.
  - fit="natural" (default): the WHOLE picture is shown, nothing is cropped.
  - fit="cover": fills its box (only used for the wide quote banner).
  - If the file is missing it tries `fallbackSrc`, then shows a soft gradient.
*/
function Photo({
  src,
  fallbackSrc,
  alt,
  className = "",
  imgClassName = "",
  fit = "natural",
  eager = false,
}: {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  fit?: "natural" | "cover";
  eager?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden bg-linear-to-br from-blush via-cream to-sage ${
        fit === "natural" ? "min-h-40" : ""
      } ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        onError={(e) => {
          const img = e.currentTarget;
          if (fallbackSrc && !img.dataset.fallback) {
            img.dataset.fallback = "1";
            img.src = fallbackSrc;
          } else {
            img.style.display = "none";
          }
        }}
        className={`${
          fit === "natural"
            ? "block h-auto w-full"
            : "block h-full w-full object-cover"
        } ${imgClassName}`}
      />
    </div>
  );
}

const wrap = "mx-auto max-w-[1300px] px-6 md:px-12 lg:px-16";
const label = "text-xs uppercase tracking-[0.25em]";
const h2 = "font-heading text-4xl font-light leading-[1.1] md:text-5xl";
const body = "text-base leading-8 text-muted";
const linkUnderline =
  "inline-block border-b border-current pb-1 text-xs uppercase tracking-[0.25em] transition hover:opacity-70";
const script = "font-script text-[1.15em] leading-none";
const leaf = "rounded-tl-[80px] rounded-br-[80px] rounded-tr-2xl rounded-bl-2xl";
const inputClass =
  "w-full border border-cream/40 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream/60 outline-none transition focus:border-rose-light";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;

    try {
      const formData = new FormData(form);
      formData.append("access_key", ACCESS_KEY);
      formData.append("subject", "New consultation request from your website");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();

      if (result.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <main id="top" className="bg-cream text-plum">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ============ Navigation ============ */}
      <header className="sticky top-0 z-50 border-b border-plum/10 bg-cream/95 backdrop-blur">
        <nav
          aria-label="Main"
          className={`${wrap} flex items-center justify-between py-4`}
        >
          <a href="#top" className="leading-none">
            <span className="block font-heading text-3xl font-light sm:text-4xl">
              Maya Reynolds
            </span>
            <span className="mt-1 block text-[10px] tracking-[0.35em] text-rose sm:text-xs">
              PSYD · CLINICAL PSYCHOLOGY
            </span>
          </a>

          <div className="hidden items-center gap-9 text-[13px] uppercase tracking-[0.18em] lg:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-rose">
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full border border-plum px-7 py-3 text-xs tracking-[0.2em] transition hover:bg-plum hover:text-cream"
            >
              Contact
            </a>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-plum/40 lg:hidden"
          >
            <span className={`h-px w-5 bg-plum transition ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-plum transition ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`h-px w-5 bg-plum transition ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-plum/10 bg-cream px-6 pb-4 lg:hidden">
            {[...navLinks, { label: "Contact", href: "#contact" }].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-plum/10 py-4 text-sm uppercase tracking-[0.2em] last:border-0"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ============ Hero (portrait left, text right) ============ */}
      <section className="overflow-hidden">
        <div className={`${wrap} grid items-center gap-12 py-12 md:grid-cols-12 md:py-16 lg:py-20`}>
          <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[340px] md:col-span-5 md:mx-0 md:max-w-[360px] md:justify-self-center">
            <div className={`absolute -bottom-3 -right-3 h-full w-full bg-blush ${leaf}`} />
            <Photo
              src="/portrait.png"
              alt="Dr. Maya Reynolds, PsyD, licensed clinical psychologist offering therapy in Santa Monica, California"
              eager
              className={`relative ${leaf}`}
            />
            <div className="absolute -bottom-5 left-4 rounded-lg bg-cream px-4 py-3 shadow-lg">
              <p className="font-heading text-lg leading-tight">Dr. Maya Reynolds, PsyD</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-rose">
                Licensed Clinical Psychologist
              </p>
            </div>
          </div>

          <div className="md:col-span-7">
            <p className={`${label} text-rose`}>
              Therapy for adults · Santa Monica, California
            </p>

            <h1 className="mt-5 font-heading text-4xl font-light leading-[1.1] sm:text-5xl lg:text-6xl">
              Anxiety, trauma &amp; burnout therapy in{" "}
              <span className={`${script} text-rose`}>Santa Monica</span>, CA
            </h1>

            <p className={`${body} mt-6 max-w-xl text-lg`}>
              You don&apos;t have to hold everything together. A thoughtful
              space to work through anxiety, heal from difficult experiences,
              and reconnect with yourself.
            </p>

            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-plum px-8 py-4 text-xs uppercase tracking-[0.25em] text-cream transition hover:bg-rose"
            >
              Request a consultation <span aria-hidden="true">↗</span>
            </a>

            <p className="mt-5 text-sm leading-6 text-muted">
              In-person in Santa Monica · Secure telehealth throughout California
            </p>
          </div>
        </div>
      </section>

      {/* ============ About / Introduction ============ */}
      <section id="about" className="scroll-mt-20 bg-cream pb-14 pt-6 md:pb-20">
        <div className={`${wrap} grid gap-12 lg:grid-cols-12 lg:items-center`}>
          <div className="lg:col-span-7">
            <h2 className={h2}>
              Meet Dr. Maya Reynolds, clinical psychologist in Santa Monica, CA.
            </h2>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div className="space-y-5">
                <p className={`${label} leading-8`}>
                  Many of my clients are high-achieving, thoughtful, and
                  self-aware, yet internally feel exhausted, stuck in
                  overthinking, or emotionally on edge.
                </p>
                <p className={body}>
                  I&apos;m a licensed clinical psychologist based in Santa
                  Monica, California, offering therapy for adults who feel
                  overwhelmed by anxiety, stress, or the lingering effects of
                  past experiences.
                </p>
              </div>

              <div className="space-y-5">
                <p className={body}>
                  Clients frequently come to me feeling “functional” on the
                  outside while quietly struggling with constant worry, tension
                  in their body, difficulty sleeping, or a sense that
                  they&apos;re always bracing for something to go wrong.
                </p>
                <p className={body}>
                  If you&apos;re looking for a therapist who combines practical
                  tools with depth-oriented work, and who understands the
                  realities of living and working in a fast-paced environment,
                  I may be a good fit.
                </p>
              </div>
            </div>
          </div>

          <Photo
            src="/intro-calm.jpg"
            alt="Calm, quiet landscape in soft light, representing a grounded approach to therapy in Santa Monica"
            className={`lg:col-span-5 ${leaf}`}
          />
        </div>
      </section>

      {/* ============ Services: How I help ============ */}
      <section id="specialties" className="scroll-mt-20 bg-sage py-14 md:py-20">
        <div className={wrap}>
          <h2 className={h2}>
            How I <span className={`${script} text-rose`}>help</span>
          </h2>
          <p className={`${body} mt-4 max-w-2xl`}>
            Our work is collaborative and tailored to your experiences, needs,
            and goals.
          </p>

          <div className="mt-10 grid items-start gap-10 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="group">
                <Photo
                  src={service.image}
                  alt={service.imageAlt}
                  fit="cover"
                  className="aspect-square rounded-2xl"
                  imgClassName={`transition duration-700 group-hover:scale-105 ${service.position}`}
                />
                <h3 className="mt-6 font-heading text-3xl font-light">{service.title}</h3>
                <p className={`${body} mt-3`}>{service.description}</p>
                <p className="mt-5 border-t border-plum/15 pt-4 text-[10px] tracking-[0.15em] text-rose">
                  {service.tag}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Quote banner ============ */}
      <section className="relative">
        <Photo
          src="/banner.jpg"
          alt="Quiet, light-filled space representing a calm place to be heard in Santa Monica"
          fit="cover"
          className="h-[340px] md:h-[440px]"
        />
        <div className="absolute inset-0 bg-plum-deep/70" />
        <div className="absolute inset-0 flex items-center">
          <p className={`${wrap} w-full max-w-4xl font-heading text-3xl font-light leading-snug text-cream md:text-5xl`}>
            My goal is not just symptom relief, but helping you develop{" "}
            <em>insight, resilience, and a stronger relationship with yourself.</em>
          </p>
        </div>
      </section>

      {/* ============ Areas of expertise ============ */}
      <section id="expertise" className="relative scroll-mt-20 overflow-hidden bg-cream py-14 md:py-20">
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-blush/80 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-sage blur-3xl" />

        <div className={`${wrap} relative grid gap-10 lg:grid-cols-12`}>
          <div className="lg:col-span-4">
            <p className={`${label} text-rose`}>What I treat</p>
            <h2 className={`${h2} mt-4`}>
              Areas of <span className={`${script} text-rose`}>expertise</span>
            </h2>
            <p className={`${body} mt-5`}>
              Support for both the emotional and physiological sides of what
              you&apos;re experiencing, paced carefully and with attention to
              safety.
            </p>
            <a href="#contact" className={`${linkUnderline} mt-8`}>
              Request a consultation
            </a>
          </div>

          <div className="rounded-3xl border border-plum/10 bg-white/70 p-5 shadow-xl shadow-plum/5 backdrop-blur sm:p-8 lg:col-span-8">
            <ul className="grid gap-x-10 sm:grid-cols-2">
              {areas.map((area, index) => (
                <li
                  key={area}
                  className="group flex items-center gap-4 border-b border-plum/10 py-5 text-sm uppercase tracking-[0.2em] transition hover:border-rose hover:text-rose"
                >
                  <span className="font-heading text-lg tracking-normal text-rose">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">{area}</span>
                  <span
                    aria-hidden="true"
                    className="-translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    →
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ How I work (image right) ============ */}
      <section className="bg-blush py-14 md:py-20">
        <div className={`${wrap} grid gap-12 lg:grid-cols-12 lg:items-center`}>
          <div className="lg:col-span-7">
            <p className={`${label} text-rose`}>How I work</p>

            <h2 className={`${h2} mt-4`}>
              A warm, collaborative, and grounded approach.
            </h2>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div className="space-y-5">
                <p className={`${label} leading-8`}>
                  Sessions are structured enough to feel supportive, while
                  still leaving space for reflection and depth.
                </p>
                <p className={body}>
                  I believe therapy works best when you feel respected,
                  understood, and actively involved in the process.
                </p>
              </div>

              <p className={body}>
                My work is paced carefully, with an emphasis on safety,
                stabilization, and helping you feel more regulated in your
                daily life, not just during sessions. We&apos;ll look at both
                the emotional and physiological sides of what you&apos;re
                experiencing.
              </p>
            </div>

            <a href="#about" className={`${linkUnderline} mt-8`}>
              Learn more about me
            </a>
          </div>

          <Photo
            src="/approach.jpg"
            alt="Calm, private therapy space designed for a collaborative approach"
            className={`lg:col-span-5 ${leaf}`}
          />
        </div>
      </section>

      {/* ============ Beyond symptom relief (image left) ============ */}
      <section className="bg-cream py-14 md:py-20">
        <div className={`${wrap} grid gap-12 lg:grid-cols-12 lg:items-center`}>
          <Photo
            src="/insight.jpg"
            alt="Quiet morning light representing insight and resilience after therapy"
            className={`lg:col-span-6 ${leaf}`}
          />

          <div className="lg:col-span-6 lg:pl-8">
            <h2 className="font-heading text-4xl font-light leading-[1.15] md:text-5xl">
              Beyond symptom relief, toward insight{" "}
              <span className={`${script} text-rose`}>&amp;</span> resilience.
            </h2>
            <p className={`${body} mt-6`}>
              Therapy can become a space to slow down, reconnect, and develop
              more sustainable ways of living and working, with a stronger
              relationship with yourself over time.
            </p>
          </div>
        </div>
      </section>

      {/* ============ Methods (2 x 2) ============ */}
      <section id="methods" className="scroll-mt-20 bg-sage py-14 md:py-20">
        <div className={`${wrap} grid gap-8 lg:grid-cols-12`}>
          <h2 className={`${h2} lg:col-span-4`}>
            My <span className={`${script} text-rose`}>methods</span> include…
          </h2>

          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:col-span-8">
            {methods.map((method) => (
              <article key={method.title}>
                <h3 className="font-heading text-3xl font-light">{method.title}</h3>
                <p className={`${body} mt-3`}>{method.description}</p>
                <a href="#contact" className={`${linkUnderline} mt-5`}>
                  Ask about this
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Our Office (new section) ============ */}
      <section id="office" className="scroll-mt-20 bg-cream py-14 md:py-20">
        <div className={`${wrap} grid gap-12 lg:grid-cols-2 lg:items-center`}>
          <div className="grid grid-cols-2 items-start gap-4 md:gap-6">
            <Photo
              src="/office1.jpeg"
              alt="Calm Santa Monica therapy office with natural light, a sofa, and large windows"
              className="rounded-2xl"
            />
            <Photo
              src="/office2.jpeg"
              alt="Comfortable, uncluttered counseling space in Dr. Maya Reynolds' Santa Monica office"
              className="mt-10 rounded-2xl md:mt-14"
            />
          </div>

          <div>
            <p className={`${label} text-rose`}>Our office</p>
            <h2 className={`${h2} mt-4`}>
              A calm, private therapy space in{" "}
              <span className={`${script} text-rose`}>Santa Monica</span>
            </h2>

            <p className={`${body} mt-6`}>
              My Santa Monica office is a quiet, private space designed to feel
              calm and grounding, with natural light and a comfortable,
              uncluttered environment. Clients often share that the space
              itself helps them feel more at ease when they arrive.
            </p>
            <p className={`${body} mt-4`}>
              In-person sessions are available here, and secure telehealth is
              available for clients located in California.
            </p>

            <div className="mt-6 border-l-2 border-rose pl-6 leading-8 text-muted">
              <p className="font-semibold text-plum">Santa Monica Office</p>
              <p>123th Street 45 W</p>
              <p>Santa Monica, CA 90401</p>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=123th+Street+45+W+Santa+Monica+CA+90401"
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkUnderline} mt-6`}
            >
              Get directions
            </a>
          </div>
        </div>
      </section>

      {/* ============ FAQs ============ */}
      <section id="faq" className="scroll-mt-20 bg-blush py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <p className={`${label} text-rose`}>Frequently asked questions</p>
          <h2 className={`${h2} mt-4`}>Questions about therapy with Dr. Maya Reynolds.</h2>

          <div className="mt-10 divide-y divide-plum/20 border-y border-plum/20">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-6 font-heading text-2xl font-light">
                  {faq.q}
                  <span className="faq-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-rose text-xl text-rose transition">
                    +
                  </span>
                </summary>
                <p className={`${body} mt-3`}>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Contact / Schedule ============ */}
      <section id="contact" className="scroll-mt-20 bg-plum py-14 text-cream md:py-20">
        <div className={`${wrap} grid gap-12 lg:grid-cols-2 lg:items-start`}>
          <div>
            <p className={`${label} text-rose-light`}>Schedule a consultation</p>

            <h2 className={`${h2} mt-4`}>
              Let&apos;s see if I&apos;m the right fit for{" "}
              <span className={`${script} text-rose-light`}>you</span>.
            </h2>

            <p className="mt-6 text-base leading-8 text-cream/85">
              If you&apos;re looking for a therapist who combines practical
              tools with depth-oriented work, and who understands the realities
              of living and working in a fast-paced environment, I may be a
              good fit. Share a few details and I&apos;ll be in touch.
            </p>

            <Photo
              src="/contact-left.jpg"
              alt="Warm cup of tea in quiet light, a calm moment before a therapy session"
              className={`mt-8 max-w-md ${leaf}`}
            />
          </div>

          <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={`${label} mb-3 block`}>Full name</label>
              <input id="name" name="name" required placeholder="Your name" className={inputClass} />
            </div>

            <div>
              <label htmlFor="email" className={`${label} mb-3 block`}>Email</label>
              <input id="email" name="email" type="email" required placeholder="you@example.com" className={inputClass} />
            </div>

            <div>
              <label htmlFor="phone" className={`${label} mb-3 block`}>
                Phone <span className="normal-case tracking-normal text-cream/70">(optional)</span>
              </label>
              <input id="phone" name="phone" type="tel" placeholder="Best number to reach you" className={inputClass} />
            </div>

            <div>
              <label htmlFor="format" className={`${label} mb-3 block`}>Preferred format</label>
              <select id="format" name="format" defaultValue="In-person (Santa Monica)" className={inputClass}>
                <option className="text-plum">In-person (Santa Monica)</option>
                <option className="text-plum">Telehealth (California)</option>
                <option className="text-plum">No preference</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="concern" className={`${label} mb-3 block`}>
                What would you like support with?
              </label>
              <select id="concern" name="concern" defaultValue="Not sure yet" className={inputClass}>
                {services.map((service) => (
                  <option key={service.title} className="text-plum">
                    {service.title}
                  </option>
                ))}
                <option className="text-plum">Not sure yet</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="message" className={`${label} mb-3 block`}>
                Anything you&apos;d like me to know{" "}
                <span className="normal-case tracking-normal text-cream/70">(optional)</span>
              </label>
              <textarea id="message" name="message" rows={4} placeholder="A few words about what brings you here." className={inputClass} />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-full border border-rose-light px-10 py-4 text-xs uppercase tracking-[0.25em] text-rose-light transition hover:bg-rose-light hover:text-plum-deep disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Book a consultation"}
              </button>

              {status === "sent" && (
                <p role="status" className="mt-6 text-sm leading-7">
                  Thank you. Your request has been sent and I&apos;ll be in touch soon.
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="mt-6 text-sm leading-7 text-rose-light">
                  Something went wrong. Please try again, or email{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* ============ Footer ============ */}
      <footer className="bg-white">
        <div className={`${wrap} grid gap-10 py-14 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <p className="font-heading text-5xl font-light leading-none">Maya Reynolds</p>
            <p className="mt-3 text-xs tracking-[0.35em] text-rose">PSYD · CLINICAL PSYCHOLOGY</p>
            <p className={`${body} mt-6 max-w-md`}>
              You&apos;re welcome to come into my office in Santa Monica, or
              schedule secure telehealth sessions if you&apos;re located in
              California.
            </p>
          </div>

          <div className="lg:col-span-2">
            <p className={label}>Navigate</p>
            <ul className="mt-5 space-y-3 text-muted">
              <li><a href="#top" className="hover:text-rose">Home</a></li>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-rose">{link.label}</a>
                </li>
              ))}
              <li><a href="#contact" className="hover:text-rose">Contact</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className={label}>Specialties</p>
            <ul className="mt-5 space-y-3 text-muted">
              {services.map((service) => (
                <li key={service.title}>{service.title}</li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className={label}>Contact</p>
            <div className="mt-5 space-y-1 text-muted">
              <p>123th Street 45 W</p>
              <p>Santa Monica, CA 90401</p>
              <p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-rose">{CONTACT_EMAIL}</a>
              </p>
              {CONTACT_PHONE && (
                <p>
                  <a href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`} className="hover:text-rose">
                    {CONTACT_PHONE}
                  </a>
                </p>
              )}
            </div>
            <p className="mt-5 italic leading-7 text-muted">
              In-person in Santa Monica · Telehealth throughout California
            </p>
          </div>
        </div>

        <div className="bg-plum py-5 text-sm text-cream/85">
          <div className={wrap}>
            © 2026 Dr. Maya Reynolds, PsyD · Anxiety, Trauma &amp; Burnout Therapy in Santa Monica, CA
          </div>
        </div>
      </footer>
    </main>
  );
}
