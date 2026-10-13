"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  EDIT THESE THREE VALUES                                            */
/* ------------------------------------------------------------------ */
// 1. Your Web3Forms access key (get it free at web3forms.com, it is emailed to you)
const ACCESS_KEY = "168cec93-f39e-41c2-b510-fa97376cbbb1";
// 2. The email shown on the website
const CONTACT_EMAIL = "deedeekshitha70@gmail.com";
// 3. Optional phone number shown on the website. Leave "" to hide.
const CONTACT_PHONE: string = "";

/* All copy below is based on Dr. Maya Reynolds' profile. */

const services = [
  {
    number: "01",
    title: "Anxiety & Panic Therapy",
    image: "/service-anxiety.jpg",
    imageAlt: "Calm sunlit window with soft curtains, representing anxiety therapy in Santa Monica",
    description:
      "For constant worry, tension in your body, difficulty sleeping, or the sense that you're always bracing for something to go wrong. Using CBT, mindfulness-based practices, and body-oriented techniques, we work with both the emotional and physiological sides of anxiety and panic.",
  },
  {
    number: "02",
    title: "Trauma Therapy & EMDR",
    image: "/service-trauma.jpg",
    imageAlt: "Quiet, grounding natural scene representing trauma therapy and EMDR in Santa Monica",
    description:
      "Support for adults with single-incident trauma as well as complex, long-standing patterns that may stem from childhood, relationships, or chronic stress. Work is paced carefully, with an emphasis on safety, stabilization, and feeling more regulated in daily life.",
  },
  {
    number: "03",
    title: "Burnout & Perfectionism Therapy",
    image: "/service-burnout.jpg",
    imageAlt: "Slow, restful morning scene representing burnout therapy for professionals in Santa Monica",
    description:
      "For entrepreneurs, creatives, and professionals who feel disconnected from themselves after years of pushing through stress. Therapy becomes a space to slow down, ease perfectionism and high internal pressure, and build more sustainable ways of living and working.",
  },
];

const focusAreas = [
  "Anxiety",
  "Panic",
  "Trauma",
  "Burnout",
  "Perfectionism",
  "Cognitive-Behavioral Therapy (CBT)",
  "EMDR",
  "Mindfulness-Based Practices",
  "Body-Oriented Techniques",
];

const trustItems = [
  { label: "Credentials", value: "Licensed Clinical Psychologist" },
  { label: "Clients", value: "Adults" },
  { label: "Sessions", value: "In-person & Telehealth" },
  { label: "Location", value: "Santa Monica, California" },
];

const signs = [
  "Constant worry that is hard to switch off",
  "Tension in your body, or difficulty sleeping",
  "Feeling like you're always bracing for something to go wrong",
  "Stuck in overthinking, exhausted, or emotionally on edge",
  "Earlier life experiences still affecting your relationships, confidence, or sense of safety",
  "Feeling disconnected from yourself after years of pushing through stress",
];

const modalities = [
  "Cognitive-Behavioral Therapy (CBT)",
  "EMDR",
  "Mindfulness-Based Practices",
  "Body-Oriented Techniques",
];

const clientTypes = ["Entrepreneurs", "Creatives", "Professionals", "High-achieving adults"];

const approach = [
  {
    number: "1",
    title: "Safety & stabilization",
    description:
      "Work is paced carefully. We build a sense of safety and help you feel more regulated in your daily life, not just during sessions.",
  },
  {
    number: "2",
    title: "Insight & understanding",
    description:
      "Sessions are structured enough to feel supportive, with space for reflection and depth, so you can understand both the emotional and physiological sides of what you're experiencing.",
  },
  {
    number: "3",
    title: "Resilience & self-connection",
    description:
      "The goal is not just symptom relief, but lasting insight, resilience, and a stronger relationship with yourself over time.",
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
  { label: "Services", href: "#services" },
  { label: "Our Office", href: "#office" },
  { label: "FAQs", href: "#faq" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Dr. Maya Reynolds, PsyD - Psychology & Wellbeing",
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

const inputClass =
  "w-full rounded-xl border border-[#2b1b3d]/20 bg-white px-4 py-3 text-sm text-[#2b1b3d] placeholder:text-[#8a7d9c] outline-none transition focus:border-[#c9441f] focus:ring-4 focus:ring-[#c9441f]/15";

const primaryButton =
  "rounded-full bg-gradient-to-r from-[#c9441f] to-[#b02a63] px-7 py-4 text-center text-sm font-medium text-white shadow-xl shadow-[#c9441f]/25 transition hover:-translate-y-1 hover:shadow-2xl";

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
    <main className="min-h-screen overflow-x-hidden bg-[#fff8f2] text-[#2b1b3d]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .marquee-track { animation: marquee 50s linear infinite; }
        .fade-up { animation: fadeUp 0.9s ease-out both; }
        .fade-up-2 { animation: fadeUp 0.9s ease-out 0.15s both; }
        .fade-up-3 { animation: fadeUp 0.9s ease-out 0.3s both; }
        details > summary { list-style: none; }
        details > summary::-webkit-details-marker { display: none; }
        details[open] .faq-icon { transform: rotate(45deg); }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track, .fade-up, .fade-up-2, .fade-up-3 { animation: none; }
          html { scroll-behavior: auto; }
        }
      `}</style>

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-[#2b1b3d]/10 bg-[#fff8f2]/90 backdrop-blur-lg">
        <nav
          aria-label="Main"
          className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-12"
        >
          <a href="#" className="text-sm font-semibold tracking-wide sm:text-lg">
            MAYA REYNOLDS, PsyD
            <span className="mt-1 block text-[10px] font-normal tracking-[0.2em] text-[#c23d1f] sm:text-xs">
              PSYCHOLOGY & WELLBEING
            </span>
          </a>

          <div className="hidden items-center gap-8 text-sm md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative py-1 transition hover:text-[#c23d1f]"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#c23d1f] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="rounded-full bg-[#2b1b3d] px-5 py-2.5 text-sm text-white shadow-lg shadow-[#2b1b3d]/20 transition hover:-translate-y-0.5 hover:bg-[#c23d1f] sm:px-6 sm:py-3"
            >
              Get in touch
            </a>

            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-[#2b1b3d]/20 md:hidden"
            >
              <span className={`h-0.5 w-5 bg-[#2b1b3d] transition ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-0.5 w-5 bg-[#2b1b3d] transition ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-5 bg-[#2b1b3d] transition ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="border-t border-[#2b1b3d]/10 bg-[#fff8f2] px-6 py-4 md:hidden">
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-[#2b1b3d]/10 py-4 text-lg last:border-0"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#ffd9c9] opacity-70 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-40 h-80 w-80 rounded-full bg-[#e3d8ff] opacity-80 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:px-6 md:grid-cols-2 md:py-24 lg:px-12">
          <div>
            <p className="fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-[#c23d1f]/25 bg-white/70 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[#c23d1f] sm:text-xs sm:tracking-[0.25em]">
              <span className="h-2 w-2 rounded-full bg-[#c9441f]" />
              Licensed Clinical Psychologist · Santa Monica, CA
            </p>

            <h1 className="fade-up-2 max-w-xl font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Anxiety, Trauma & Burnout Therapy in{" "}
              <span className="bg-gradient-to-r from-[#c9441f] via-[#b02a63] to-[#6a3fd6] bg-clip-text italic text-transparent">
                Santa Monica, CA
              </span>
            </h1>

            <p className="fade-up-3 mt-7 max-w-lg text-base leading-8 text-[#5d4d70] sm:text-lg">
              Dr. Maya Reynolds, PsyD, offers warm, collaborative therapy for
              adults who look “functional” on the outside but feel overwhelmed,
              exhausted, or on edge inside. In-person in Santa Monica or by
              secure telehealth across California.
            </p>

            <div className="fade-up-3 mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href="#contact" className={primaryButton}>
                Request a consultation ↗
              </a>
              <a
                href="#services"
                className="inline-block rounded-full border border-[#2b1b3d]/25 px-7 py-4 text-center text-sm transition hover:bg-[#2b1b3d] hover:text-white"
              >
                Explore therapy services
              </a>
            </div>

            <p className="mt-6 text-sm text-[#6b5b7d]">
              In-person in Santa Monica · Telehealth throughout California
            </p>
          </div>

          {/* Portrait */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-[#e3d8ff] via-[#ffe3d6] to-[#ffd0bd] opacity-80 blur-2xl" />

            <img
              src="/portrait.png"
              alt="Dr. Maya Reynolds, PsyD, licensed clinical psychologist in Santa Monica, California"
              className="relative block h-auto w-full rounded-3xl"
            />

            <div className="absolute -bottom-5 left-4 right-4 rounded-2xl bg-white/95 px-5 py-4 shadow-xl backdrop-blur sm:left-auto sm:right-[-1.5rem] sm:w-64">
              <p className="font-serif text-lg leading-tight">Dr. Maya Reynolds, PsyD</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-[#c23d1f]">
                Licensed Clinical Psychologist
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-[#2b1b3d]/10 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-8 sm:px-6 md:grid-cols-4 lg:px-12">
          {trustItems.map((item) => (
            <div key={item.label} className="text-center md:text-left">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#c23d1f]">{item.label}</p>
              <p className="mt-1 font-serif text-base sm:text-lg">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Marquee */}
      <section aria-label="Areas of focus" className="overflow-hidden bg-[#2b1b3d] py-5 text-[#fff8f2]">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {[...focusAreas, ...focusAreas].map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center gap-10 font-serif text-lg italic sm:text-xl">
              {item}
              <span className="text-[#ff9a7b]">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* Introduction */}
      <section className="relative bg-gradient-to-b from-[#f1eaff] to-[#fff1e8] px-5 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c23d1f]">
            Therapy for high-achieving adults in Santa Monica
          </p>

          <h2 className="mt-5 font-serif text-3xl leading-tight md:text-5xl">
            Functional on the outside. Exhausted, anxious, or on edge inside.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-[#5d4d70]">
            Many of the people I work with are high-achieving, thoughtful, and
            self-aware, but internally feel exhausted, stuck in overthinking, or
            emotionally on edge. Therapy can help you understand what you're
            carrying and develop a stronger relationship with yourself.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-5xl">
          <p className="mb-6 text-center font-serif text-xl">Does any of this sound familiar?</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {signs.map((sign) => (
              <div key={sign} className="flex items-start gap-4 rounded-2xl bg-white/80 p-5 shadow-sm">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ffe3d6] text-xs text-[#c23d1f]">
                  ✓
                </span>
                <p className="text-sm leading-6 text-[#4a3b5c] sm:text-base">{sign}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20 sm:px-6 md:py-28 lg:px-12">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c23d1f]">How I can help</p>

          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
            Therapy for anxiety, trauma, and burnout in Santa Monica.
          </h2>

          <p className="mt-5 leading-8 text-[#5d4d70]">
            I integrate evidence-based methods such as CBT, EMDR,
            mindfulness-based practices, and body-oriented techniques to help
            you work with both the emotional and physiological sides of what
            you're experiencing.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.number}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#2b1b3d]/10 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:border-transparent hover:shadow-2xl hover:shadow-[#6a3fd6]/20"
            >
              <div className="relative h-44 overflow-hidden bg-gradient-to-br from-[#e3d8ff] via-[#ffe3d6] to-[#ffd0bd]">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#2b1b3d] font-serif text-sm text-white">
                  {service.number}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-7 md:p-8">
                <h3 className="font-serif text-2xl">{service.title}</h3>
                <p className="mt-4 flex-1 leading-7 text-[#5d4d70]">{service.description}</p>
                <a
                  href="#contact"
                  className="mt-6 inline-block text-sm font-medium text-[#c23d1f] transition group-hover:translate-x-1"
                >
                  Discuss this with me →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* About Dr. Maya */}
      <section
        id="about"
        className="relative scroll-mt-20 overflow-hidden bg-[#2b1b3d] px-5 py-20 text-[#fff8f2] sm:px-6 md:py-28"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#6a3fd6]/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#c9441f]/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl lg:px-12">
          <div className="grid gap-12 md:grid-cols-5 md:items-center">
            <div className="mx-auto w-full max-w-sm md:col-span-2">
              <img
                src="/portrait.png"
                alt="Dr. Maya Reynolds, PsyD, clinical psychologist offering therapy in Santa Monica, CA"
                loading="lazy"
                className="block h-auto w-full rounded-3xl shadow-2xl shadow-black/30"
              />
            </div>

            <div className="md:col-span-3">
              <p className="text-xs uppercase tracking-[0.25em] text-[#ffb29e]">Meet your therapist</p>

              <h2 className="mt-5 font-serif text-4xl leading-tight md:text-5xl">
                Dr. Maya Reynolds, PsyD:{" "}
                <span className="italic text-[#ff9a7b]">clinical psychologist in Santa Monica, CA.</span>
              </h2>

              <p className="mt-6 leading-8 text-white/85">
                I'm a licensed clinical psychologist offering therapy for adults
                who feel overwhelmed by anxiety, stress, or the lingering
                effects of past experiences. I take a warm, collaborative, and
                grounded approach, with sessions structured enough to feel
                supportive while still leaving space for reflection and depth.
              </p>

              <p className="mt-5 leading-8 text-white/85">
                Trauma work is an important part of my practice, alongside
                anxiety, panic, professional burnout, and perfectionism. If
                you're looking for a therapist who combines practical tools with
                depth-oriented work, and who understands the realities of living
                and working in a fast-paced environment, I may be a good fit.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="font-serif text-xl text-[#ffb29e]">Methods I use</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {modalities.map((item) => (
                  <span key={item} className="rounded-full border border-white/25 px-4 py-2 text-sm text-white/90">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="font-serif text-xl text-[#ffb29e]">Who I work with</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {clientTypes.map((item) => (
                  <span key={item} className="rounded-full border border-white/25 px-4 py-2 text-sm text-white/90">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-28 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c23d1f]">My approach</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
            A warm, collaborative, and grounded approach to therapy.
          </h2>
        </div>

        <div className="relative mt-14 grid gap-10 md:grid-cols-3">
          <div className="absolute left-[16%] right-[16%] top-8 hidden border-t-2 border-dashed border-[#c9441f]/40 md:block" />
          {approach.map((step) => (
            <div key={step.number} className="relative text-center">
              <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#c9441f] to-[#b02a63] font-serif text-2xl text-white shadow-lg shadow-[#c9441f]/30">
                {step.number}
              </span>
              <h3 className="mt-6 font-serif text-2xl">{step.title}</h3>
              <p className="mx-auto mt-3 max-w-xs leading-7 text-[#5d4d70]">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Office */}
      <section id="office" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20 sm:px-6 md:py-24 lg:px-12">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="grid grid-cols-2 items-start gap-3 md:gap-5">
            <div className="overflow-hidden rounded-3xl bg-[#e3d8ff] shadow-xl shadow-[#2b1b3d]/15">
              <img
                src="/office1.jpeg"
                alt="Calm Santa Monica therapy office with natural light, sofa, and large windows"
                className="block h-auto w-full transition duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl bg-[#ffd9c9] shadow-xl shadow-[#2b1b3d]/15 md:mt-12">
              <img
                src="/office2.jpeg"
                alt="Comfortable, uncluttered counseling space in Dr. Maya Reynolds' Santa Monica office"
                className="block h-auto w-full transition duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>

          <div className="md:p-4 lg:p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-[#c23d1f]">Our office</p>

            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
              A calm, private therapy space in Santa Monica.
            </h2>

            <p className="mt-5 leading-8 text-[#5d4d70]">
              My Santa Monica office is a quiet, private space designed to feel
              calm and grounding, with natural light and a comfortable,
              uncluttered environment. Clients often share that the space itself
              helps them feel more at ease when they arrive.
            </p>

            <p className="mt-4 leading-8 text-[#5d4d70]">
              In-person sessions are available here, and secure telehealth is
              available for clients located in California.
            </p>

            <div className="mt-6 rounded-2xl border-l-4 border-[#c9441f] bg-white p-5 leading-7 text-[#5d4d70] shadow-md">
              <p className="font-medium text-[#2b1b3d]">Santa Monica Office</p>
              <p>123th Street 45 W</p>
              <p>Santa Monica, CA 90401</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=123th+Street+45+W+Santa+Monica+CA+90401"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-medium text-[#c23d1f] hover:underline"
              >
                Get directions ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faq" className="scroll-mt-20 bg-gradient-to-b from-[#f1eaff] to-[#fff1e8] px-5 py-20 sm:px-6 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c23d1f]">Frequently asked questions</p>

          <h2 className="mt-4 font-serif text-4xl md:text-5xl">
            Questions about therapy with Dr. Maya Reynolds.
          </h2>

          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-2xl bg-white px-6 py-5 shadow-sm transition open:shadow-lg">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-serif text-lg">
                  {faq.q}
                  <span className="faq-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ffe3d6] text-xl text-[#c23d1f] transition">
                    +
                  </span>
                </summary>
                <p className="mt-4 leading-7 text-[#5d4d70]">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-20 px-5 py-20 sm:px-6 md:py-28">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-[#6a3fd6]/20 lg:grid lg:grid-cols-5">
          <div className="bg-gradient-to-br from-[#2b1b3d] via-[#4a2a6b] to-[#7c3a8f] p-8 text-[#fff8f2] sm:p-10 lg:col-span-2 lg:p-12">
            <p className="text-xs uppercase tracking-[0.25em] text-[#ffb29e]">Begin where you are</p>

            <h2 className="mt-5 font-serif text-3xl leading-tight md:text-4xl">
              Ready to start therapy in Santa Monica?
            </h2>

            <p className="mt-5 leading-8 text-white/85">
              If you're looking for a therapist who combines practical tools
              with depth-oriented work, I may be a good fit. Reach out to
              arrange a consultation.
            </p>

            <div className="mt-8 space-y-4 text-sm text-white/90">
              <p>
                <span className="block text-[10px] uppercase tracking-[0.25em] text-[#ffb29e]">Email</span>
                <a href={`mailto:${CONTACT_EMAIL}`} className="break-all hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
              {CONTACT_PHONE && (
                <p>
                  <span className="block text-[10px] uppercase tracking-[0.25em] text-[#ffb29e]">Phone</span>
                  <a href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`} className="hover:underline">
                    {CONTACT_PHONE}
                  </a>
                </p>
              )}
              <p>
                <span className="block text-[10px] uppercase tracking-[0.25em] text-[#ffb29e]">Office</span>
                123th Street 45 W, Santa Monica, CA 90401
              </p>
              <p>
                <span className="block text-[10px] uppercase tracking-[0.25em] text-[#ffb29e]">Sessions</span>
                In-person in Santa Monica · Telehealth throughout California
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-10 lg:col-span-3 lg:p-12">
            <h3 className="font-serif text-2xl md:text-3xl">Request a consultation</h3>
            <p className="mt-2 text-sm leading-6 text-[#5d4d70]">
              Share a few details and I'll be in touch to arrange a first conversation.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">Full name</label>
                <input id="name" name="name" required placeholder="Your name" className={inputClass} />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
                <input id="email" name="email" type="email" required placeholder="you@example.com" className={inputClass} />
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                  Phone <span className="font-normal text-[#8a7d9c]">(optional)</span>
                </label>
                <input id="phone" name="phone" type="tel" placeholder="Best number to reach you" className={inputClass} />
              </div>

              <div>
                <label htmlFor="format" className="mb-2 block text-sm font-medium">Preferred format</label>
                <select id="format" name="format" defaultValue="In-person (Santa Monica)" className={inputClass}>
                  <option>In-person (Santa Monica)</option>
                  <option>Telehealth (California)</option>
                  <option>No preference</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="concern" className="mb-2 block text-sm font-medium">
                  What would you like support with?
                </label>
                <select id="concern" name="concern" defaultValue="Not sure yet" className={inputClass}>
                  {services.map((service) => (
                    <option key={service.number}>{service.title}</option>
                  ))}
                  <option>Not sure yet</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-2 block text-sm font-medium">
                  Anything you'd like me to know <span className="font-normal text-[#8a7d9c]">(optional)</span>
                </label>
                <textarea id="message" name="message" rows={4} placeholder="A few words about what brings you here." className={inputClass} />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={`${primaryButton} w-full disabled:opacity-60 sm:w-auto`}
                >
                  {status === "sending" ? "Sending..." : "Send request ↗"}
                </button>

                {status === "sent" && (
                  <p role="status" className="mt-4 text-sm leading-6 text-[#5d4d70]">
                    Thank you. Your request has been sent and I'll be in touch soon.
                  </p>
                )}

                {status === "error" && (
                  <p role="alert" className="mt-4 text-sm leading-6 text-[#c23d1f]">
                    Something went wrong. Please try again, or email{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium underline">
                      {CONTACT_EMAIL}
                    </a>
                    .
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1d1229] px-5 py-10 text-sm text-white/75 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:px-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="font-serif text-lg text-white">
              Maya Reynolds, PsyD
              <span className="block font-sans text-xs uppercase tracking-[0.2em] text-[#ffb29e]">
                Psychology & Wellbeing
              </span>
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="hover:text-white">
                  {link.label}
                </a>
              ))}
              <a href="#contact" className="hover:text-white">Contact</a>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs md:flex-row md:items-center md:justify-between">
            <p>© 2026 Dr. Maya Reynolds, PsyD · Anxiety, Trauma & Burnout Therapy in Santa Monica, CA</p>
            <p>In-person in Santa Monica · Telehealth throughout California</p>
          </div>
        </div>
      </footer>
    </main>
  );
}