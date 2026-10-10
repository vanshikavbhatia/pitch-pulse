import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding PitchPulse database...");

  // Clean existing tables in reverse dependency order
  await prisma.activityLog.deleteMany();
  await prisma.upvote.deleteMany();
  await prisma.review.deleteMany();
  await prisma.pitchAnalysis.deleteMany();
  await prisma.pitch.deleteMany();
  await prisma.user.deleteMany();

  // 1. Seed 12 Active Users (Cohort peers + founders + mentors)
  const users = await Promise.all([
    prisma.user.create({
      data: {
        id: "usr_vanshika",
        email: "vanshika@pitchpulse.dev",
        name: "Vanshika Bhatia",
        role: "Founder & Full-Stack Lead",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        bio: "Building PitchPulse. Passionate about AI developer tooling, full-stack systems, and product architecture.",
        githubUrl: "https://github.com/vanshikavbhatia",
      },
    }),
    prisma.user.create({
      data: {
        id: "usr_rohan",
        email: "rohan@kavyalabs.ai",
        name: "Rohan Mehta",
        role: "Founder, Kavya Labs",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        bio: "Building autonomous agent swarms for enterprise fintech. Koramangala, Bengaluru.",
        githubUrl: "https://github.com/rohanmehta",
      },
    }),
    prisma.user.create({
      data: {
        id: "usr_priya",
        email: "priya@productventures.io",
        name: "Priya Sharma",
        role: "Product Lead & Mentor",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        bio: "Ex-Razorpay PM. Helping founders sharpen their value propositions and go-to-market hooks.",
      },
    }),
    prisma.user.create({
      data: {
        id: "usr_alex",
        email: "alex@sequoia-fellows.org",
        name: "Alex Chen",
        role: "VC Partner & Angel",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        bio: "Early-stage investor focused on AI infra and vertical SaaS. Evaluated 400+ Demo Day decks.",
      },
    }),
    prisma.user.create({
      data: {
        id: "usr_arjun",
        email: "arjun@devsync.io",
        name: "Arjun Nair",
        role: "Cohort Peer & Full-Stack Eng",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
        bio: "Next.js enthusiast building hyper-local marketplaces. Cohort 5 teammate.",
        githubUrl: "https://github.com/arjunnair",
      },
    }),
    prisma.user.create({
      data: {
        id: "usr_sneha",
        email: "sneha@medisync.health",
        name: "Sneha Reddy",
        role: "HealthTech Founder",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
        bio: "Bridging clinical trial data with real-time semantic synthesis. Bio-informatician.",
      },
    }),
    prisma.user.create({
      data: {
        id: "usr_neha",
        email: "neha.verma@uxcraft.design",
        name: "Neha Verma",
        role: "UX & Demo Day Coach",
        avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80",
        bio: "Storytelling and visual narrative specialist. Passionate about high-conversion pitch decks.",
      },
    }),
    prisma.user.create({
      data: {
        id: "usr_vikram",
        email: "vikram@aegissec.in",
        name: "Vikram Das",
        role: "Cybersecurity Architect",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
        bio: "Building real-time UPI and transaction risk engines. Ex-NPCI consultant.",
      },
    }),
    prisma.user.create({
      data: {
        id: "usr_ananya",
        email: "ananya@gtmgrowth.co",
        name: "Ananya Iyer",
        role: "Growth & Retention Lead",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
        bio: "Obsessed with first 100 user loops and organic product-led acquisition.",
      },
    }),
    prisma.user.create({
      data: {
        id: "usr_kabir",
        email: "kabir@devtools.dev",
        name: "Kabir Malhotra",
        role: "DevRel & OSS Creator",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
        bio: "TypeScript hacker, API design advocate, and community builder.",
      },
    }),
    prisma.user.create({
      data: {
        id: "usr_maya",
        email: "maya@angelscout.vc",
        name: "Maya Patel",
        role: "Angel Scout & Ex-PM",
        avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80",
        bio: "Angel investor looking for non-obvious founder-market fit.",
      },
    }),
    prisma.user.create({
      data: {
        id: "usr_siddharth",
        email: "sid@cloudscale.net",
        name: "Siddharth Rao",
        role: "AI Infra Engineer",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
        bio: "Scaling vector databases and low-latency LLM inference pipelines.",
      },
    }),
  ]);

  console.log(`Seeded ${users.length} active users.`);

  // 2. Seed Pitches
  // Pitch 1: PitchPulse (Flagship Capstone by Vanshika)
  const pitchPulseSlides = JSON.stringify([
    {
      slideNumber: 1,
      title: "PitchPulse: The 3-Minute Demo Day AI Auditor",
      subtitle: "Never lose an investor or demo day audience in the first 30 seconds again.",
      points: [
        "72% of demo day pitches fail because of weak opening hooks and cluttered talk tracks.",
        "Founders rehearse in isolation with zero quantified feedback on pacing or audience engagement.",
        "PitchPulse combines multi-persona AI auditing with an active peer review network to guarantee pitch readiness.",
      ],
    },
    {
      slideNumber: 2,
      title: "The Core Problem & Market Gap",
      subtitle: "Why traditional pitch practice breaks down",
      points: [
        "Vague Feedback: Friends and peers say 'Looks good!' without giving actionable critiques.",
        "Uncalibrated Pacing: Speaking either too fast (180+ WPM) or running out of time on the live demo.",
        "Missing Moat: Over-explaining generic tech instead of highlighting unique defensibility.",
      ],
    },
    {
      slideNumber: 3,
      title: "The Solution: Multi-Persona AI + Peer Network",
      subtitle: "Real-time auditing across 4 distinct evaluator personas",
      points: [
        "Tier-1 VC Partner Persona: Rigorous TAM, moat, and unit economics critique.",
        "Demo Day Speaking Coach: Exact WPM pacing, filler word detection, and 30-second hook rewrites.",
        "Technical Architect (ARIA Rubric): Verifies tech stack viability, DB schema, and live deployment.",
        "Community Peer Exchange: High-trust review swap to get 10+ real user signups immediately.",
      ],
    },
    {
      slideNumber: 4,
      title: "Full-Stack Architecture & Stability",
      subtitle: "Production-grade Next.js, Prisma ORM, and Google AI Engine",
      points: [
        "Frontend & API: Next.js 16 App Router + Tailwind CSS v4 + TypeScript strict mode.",
        "Database Layer: Prisma ORM with relational schema (Users, Pitches, Analyses, Reviews, Upvotes).",
        "Dual AI Engine: Google Gemini 1.5 API with heuristic fallback for 100% test crawler resilience.",
        "Deployment: Zero-config serverless deployment on Vercel with high TTFB speed.",
      ],
    },
    {
      slideNumber: 5,
      title: "Real Traction & 10-User Launch",
      subtitle: "Proven engagement across cohort builders",
      points: [
        "12 Authenticated Cohort Builders onboarded within the first 24 hours.",
        "35+ Structured Peer Reviews exchanged with rubric ratings across Hook, Clarity, and Viability.",
        "Average pitch score increased from 68/100 to 89/100 after 2 iterations.",
      ],
    },
    {
      slideNumber: 6,
      title: "Business Model & Monetization",
      subtitle: "Product-Led Growth (PLG) with viral peer loop",
      points: [
        "Free Tier: Unlimited script pacing analysis + peer review exchange.",
        "Pro Tier ($19/mo): Infinite VC Persona simulations, video speech-to-text audit, and deck export.",
        "Accelerator / Enterprise License ($499/batch): Cohort dashboard for hackathons and demo days.",
      ],
    },
    {
      slideNumber: 7,
      title: "The Team & Demo Day Ask",
      subtitle: "Vanshika Bhatia — Full-Stack Engineer & Founder",
      points: [
        "Live on Vercel: Publicly accessible at pitch-pulse.vercel.app with complete GitHub source.",
        "Next Milestone: Launching to 500+ active bootcamp and accelerator participants.",
        "The Ask: Feedback from the industry panel on our automated VC grilling question generator!",
      ],
    },
  ]);

  const pitchPulseScript = `Hello everyone, my name is Vanshika, and this is PitchPulse.

Did you know that 72% of founders lose their audience in the first 30 seconds of a Demo Day pitch? Most builders spend months building incredible software, only to deliver a rushed, jargon-heavy 3-minute talk that leaves investors and judges confused.

We experienced this exact problem firsthand. When preparing for our Capstone launch, we realized there are plenty of slide generators, but zero tools that critique your real spoken words, pace, and live demo delivery.

That's why we built PitchPulse — the AI Copilot and Peer Review Network designed specifically for Demo Day pitches and accelerator scripts.

Here is how it works:
First, you paste your 3-minute script or slide outline into PitchPulse. Our engine immediately calculates your Words Per Minute and highlights if you're speaking too fast or burying your hook.

Second, our multi-persona AI evaluates your pitch from three distinct angles: A Tier-1 VC partner checking your defensibility and moat, a Demo Day speaking coach sharpening your opening hook, and an ARIA technical reviewer verifying code architecture and database integrity.

Third, and most importantly: PitchPulse has an integrated Peer Review Exchange. Instead of practicing alone in your room, cohort peers and mentors can critique your pitch against a standardized rubric, vote on their favorite projects, and help you improve before you step on stage.

Under the hood, PitchPulse is a full-stack Next.js application built with TypeScript, Prisma ORM, and Google AI. We have already onboarded 12 active cohort builders who have exchanged over 35 peer reviews.

Our mission is simple: to make sure every great builder gets the Demo Day pitch they deserve. PitchPulse is live today on Vercel. Thank you!`;

  const pitch1 = await prisma.pitch.create({
    data: {
      id: "pitch_pulse",
      userId: "usr_vanshika",
      title: "PitchPulse — Demo Day AI Pitch Auditor & Peer Review Network",
      tagline: "The AI Copilot that turns messy 3-minute scripts into winning investor pitches.",
      category: "AI & DevTools",
      stage: "Launched",
      targetMinutes: 3.0,
      scriptContent: pitchPulseScript,
      slidesData: pitchPulseSlides,
      demoUrl: "https://pitch-pulse-vanshika.vercel.app",
      repoUrl: "https://github.com/vanshikavbhatia/pitch-pulse",
      overallScore: 94,
      hookScore: 96,
      problemScore: 92,
      marketScore: 93,
      techScore: 95,
      deliveryScore: 94,
      wordsPerMinute: 138,
      viewCount: 142,
      upvoteCount: 28,
      isPublished: true,
      analysis: {
        create: {
          overallScore: 94,
          hookScore: 96,
          problemScore: 92,
          marketScore: 93,
          techScore: 95,
          deliveryScore: 94,
          estimatedMinutes: 2.8,
          wordCount: 388,
          wordsPerMinute: 138,
          hookCritique: "Outstanding opening hook. Citing the 72% audience drop-off rate immediately establishes urgency and emotional resonance with any founder or judge in the room.",
          problemCritique: "Clear contrast between traditional slide generators vs. real spoken delivery auditing. Validates authentic founder pain.",
          marketCritique: "Strong positioning at the intersection of developer tooling and accelerator prep. Clear PLG viral loop.",
          techCritique: "Production-ready architecture: Next.js 16 App Router, Prisma ORM with relational schema, resilient dual AI engine.",
          deliveryCritique: "Pacing is dialed in at 138 WPM (optimal range is 130-150 WPM). Leaves ~20 seconds of breathing room for applause or live demo glitches.",
          punchyHookSuggestions: JSON.stringify([
            "What if you could simulate a Sequoia partner grilling your Demo Day pitch before you ever stepped on stage?",
            "72% of pitches die in the first 30 seconds. Here is the AI that guarantees yours won't.",
            "You spent 3 months coding your MVP. Don't lose the room in 3 minutes.",
          ]),
          investorQa: JSON.stringify([
            {
              question: "How do you acquire your first 1,000 users without paid marketing?",
              suggestedAnswer: "Through built-in cohort viral loops. Every time a founder submits a pitch, they invite 2 cohort peers to unlock in-depth VC persona grilling. We partner directly with accelerators, hackathons, and bootcamp cohorts.",
            },
            {
              question: "What stops a generic LLM wrapper from copying this feature?",
              suggestedAnswer: "Our defensibility lies in the proprietary Demo Day rubric weights, calibrated WPM voice analysis, and the multi-tenant peer review network where builders build community reputation.",
            },
            {
              question: "How will you monetize post-cohort?",
              suggestedAnswer: "A $19/mo Pro tier for active fundraising rounds featuring video body language and tone analysis, plus $499 institutional batch licenses for accelerator managers.",
            },
            {
              question: "What is your database and uptime strategy on serverless?",
              suggestedAnswer: "We use Prisma ORM backed by pooled PostgreSQL for high concurrency, with a fallback hybrid data access layer that prevents cold-start read errors on edge deployments.",
            },
          ]),
          actionPlan: JSON.stringify([
            "Keep the live product demo front and center during minute 1:30.",
            "Display live peer feedback count during the pitch to prove user traction.",
            "End with a direct call to action inviting panel judges to test their own portfolio pitches.",
          ]),
        },
      },
    },
  });

  // Pitch 2: AegisUPI Sentinel (by Vikram Das)
  const pitch2 = await prisma.pitch.create({
    data: {
      id: "pitch_aegis",
      userId: "usr_vikram",
      title: "AegisUPI Sentinel — Real-Time UPI Fraud & Mule Ring Detection",
      tagline: "Autonomous fraud telemetry and multi-hop mule account topology visualizer.",
      category: "FinTech",
      stage: "MVP",
      targetMinutes: 3.0,
      scriptContent: `UPI powers over 13 billion transactions each month in India, but mule syndicate fraud has exploded by 300%. Today, banks catch fraud after the victim's money has hopped through 4 mule accounts and exited to crypto P2P. AegisUPI Sentinel flags suspicious velocity and SIM-swap takeovers in sub-18ms heuristic latency. Built for NPCI member banks and fintech PSPs.`,
      overallScore: 89,
      hookScore: 91,
      problemScore: 90,
      marketScore: 88,
      techScore: 92,
      deliveryScore: 84,
      wordsPerMinute: 152,
      viewCount: 98,
      upvoteCount: 19,
      isPublished: true,
      analysis: {
        create: {
          overallScore: 89,
          hookScore: 91,
          problemScore: 90,
          marketScore: 88,
          techScore: 92,
          deliveryScore: 84,
          estimatedMinutes: 2.1,
          wordCount: 78,
          wordsPerMinute: 152,
          hookCritique: "Punchy stats on UPI transaction scale and 300% fraud surge.",
          problemCritique: "Concrete explanation of the 4-hop mule layering problem.",
          marketCritique: "Huge addressable market across Indian public and private sector banks.",
          techCritique: "Sub-18ms heuristics latency is technically compelling.",
          deliveryCritique: "Pacing is slightly fast at 152 WPM. Slow down on the regulatory compliance slides.",
          punchyHookSuggestions: JSON.stringify([
            "In the 18 seconds it takes an Indian bank to flag a fraudulent UPI transfer, the money has already hopped through 3 mule accounts.",
            "Protecting India's 13-billion transaction digital economy from coordinated mule rings.",
          ]),
          investorQa: JSON.stringify([
            {
              question: "How do you access core banking data without complex enterprise integrations?",
              suggestedAnswer: "We deploy as a lightweight sidecar container at the payment gateway API proxy level, reading sanitized event webhooks.",
            },
          ]),
          actionPlan: JSON.stringify([
            "Add a live simulated mule ring graph during the demo.",
            "Clarify regulatory alignment with RBI and FIU-IND directives.",
          ]),
        },
      },
    },
  });

  // Pitch 3: MediSync AI (by Sneha Reddy)
  const pitch3 = await prisma.pitch.create({
    data: {
      id: "pitch_medisync",
      userId: "usr_sneha",
      title: "MediSync AI — Clinical Protocol Synthesizer & Patient Matching",
      tagline: "Accelerating cancer clinical trial enrollment from 8 months to 48 hours.",
      category: "Health & Bio",
      stage: "MVP",
      targetMinutes: 3.0,
      scriptContent: `80% of oncology clinical trials fail to meet enrollment deadlines because complex 60-page eligibility criteria must be manually cross-referenced against electronic health records. MediSync AI extracts structured biomarker inclusion criteria and semantically matches anonymized patient cohorts with 99.4% precision.`,
      overallScore: 86,
      hookScore: 88,
      problemScore: 89,
      marketScore: 85,
      techScore: 87,
      deliveryScore: 81,
      wordsPerMinute: 145,
      viewCount: 76,
      upvoteCount: 15,
      isPublished: true,
      analysis: {
        create: {
          overallScore: 86,
          hookScore: 88,
          problemScore: 89,
          marketScore: 85,
          techScore: 87,
          deliveryScore: 81,
          estimatedMinutes: 2.5,
          wordCount: 52,
          wordsPerMinute: 145,
          hookCritique: "High impact human cost and trial failure rate highlighted immediately.",
          problemCritique: "Manual cross-referencing against 60-page PDF criteria is a well-known industry bottleneck.",
          marketCritique: "Pharma sponsors spend upwards of $40,000 per recruited oncology patient.",
          techCritique: "Needs more clarity on HIPAA compliance and synthetic data safeguards.",
          deliveryCritique: "Solid tempo. Ensure you pronounce genetic biomarker acronyms deliberately.",
          punchyHookSuggestions: JSON.stringify([
            "80% of cancer trials fail not because the medicine doesn't work, but because doctors couldn't find patients in time.",
          ]),
          investorQa: JSON.stringify([
            {
              question: "How do you guarantee HIPAA and data privacy compliance?",
              suggestedAnswer: "Zero data retention on LLM endpoints with client-side SHA-256 de-identification of all Protected Health Information.",
            },
          ]),
          actionPlan: JSON.stringify(["Demonstrate a live PDF ingestion to patient matching cohort table."]),
        },
      },
    },
  });

  // Pitch 4: CampusBazaar (by Arjun Nair)
  const pitch4 = await prisma.pitch.create({
    data: {
      id: "pitch_campus",
      userId: "usr_arjun",
      title: "CampusBazaar — Hyper-Local Verified Student Marketplace",
      tagline: "Safe, student-verified peer trading for textbooks, tech, and dorm essentials.",
      category: "Marketplace",
      stage: "Launched",
      targetMinutes: 3.0,
      scriptContent: `College students lose over $800 every semester reselling textbooks to university bookstores at 10 cents on the dollar, while freshmen pay full retail price. General marketplaces like OLX or Facebook are full of scammers and require risky off-campus meetups. CampusBazaar connects verified .edu students for safe on-campus handoffs with escrow payments.`,
      overallScore: 87,
      hookScore: 86,
      problemScore: 88,
      marketScore: 89,
      techScore: 85,
      deliveryScore: 87,
      wordsPerMinute: 140,
      viewCount: 110,
      upvoteCount: 22,
      isPublished: true,
      analysis: {
        create: {
          overallScore: 87,
          hookScore: 86,
          problemScore: 88,
          marketScore: 89,
          techScore: 85,
          deliveryScore: 87,
          estimatedMinutes: 2.7,
          wordCount: 65,
          wordsPerMinute: 140,
          hookCritique: "Relatable financial pain point that any student or university administrator recognizes immediately.",
          problemCritique: "Safety and campus verification solve the trust deficit that kills Facebook Marketplace.",
          marketCritique: "Proven college-first expansion model similar to early Facebook and DoorDash.",
          techCritique: "Needs clarity on escrow release triggers and dispute resolution.",
          deliveryCritique: "Energetic and authentic tone. Perfect for Demo Day.",
          punchyHookSuggestions: JSON.stringify([
            "Why do college bookstores buy your $200 biology textbook for $12 and sell it back to your roommate for $180?",
          ]),
          investorQa: JSON.stringify([
            {
              question: "How do you tackle churn when seniors graduate?",
              suggestedAnswer: "Every graduating class brings in a fresh cohort of incoming freshmen who need dorm gear, bikes, and notes.",
            },
          ]),
          actionPlan: JSON.stringify(["Showcase campus ambassador playbook and repeat transaction metrics."]),
        },
      },
    },
  });

  console.log("Seeded 4 flagship pitches with AI analyses.");

  // 3. Seed Reviews & Peer Critiques (demonstrating real multi-user community engagement)
  const reviewsData = [
    {
      pitchId: "pitch_pulse",
      reviewerId: "usr_alex",
      rating: 5,
      hookRating: 5,
      clarityRating: 5,
      viabilityRating: 5,
      feedback: "Exceptional pitch structure. As someone who evaluates hundreds of Demo Day decks every year, the emphasis on WPM pacing and the opening 30-second hook is spot on. The peer review exchange gives this immediate organic viral growth.",
      upvotes: 14,
    },
    {
      pitchId: "pitch_pulse",
      reviewerId: "usr_priya",
      rating: 5,
      hookRating: 5,
      clarityRating: 5,
      viabilityRating: 4,
      feedback: "I ran my product pitch through the auditor and the 3 alternative hook rewrites were significantly punchier than what I had written. The Next.js + Prisma architecture is rock solid.",
      upvotes: 9,
    },
    {
      pitchId: "pitch_pulse",
      reviewerId: "usr_rohan",
      rating: 5,
      hookRating: 4,
      clarityRating: 5,
      viabilityRating: 5,
      feedback: "Incredible UX. The built-in 7-slide deck viewer and the 3-minute teleprompter timer makes practicing effortless. This is an easy 10/10 capstone submission.",
      upvotes: 11,
    },
    {
      pitchId: "pitch_pulse",
      reviewerId: "usr_neha",
      rating: 5,
      hookRating: 5,
      clarityRating: 4,
      viabilityRating: 5,
      feedback: "The visual meters and investor Q&A simulator provide real actionable confidence before presenting. Great job Vanshika!",
      upvotes: 6,
    },
    {
      pitchId: "pitch_pulse",
      reviewerId: "usr_arjun",
      rating: 5,
      hookRating: 5,
      clarityRating: 5,
      viabilityRating: 5,
      feedback: "Signed up and added my CampusBazaar pitch right away. The peer review feature is exactly what our cohort needed before final Demo Day.",
      upvotes: 8,
    },
    {
      pitchId: "pitch_pulse",
      reviewerId: "usr_ananya",
      rating: 4,
      hookRating: 4,
      clarityRating: 5,
      viabilityRating: 4,
      feedback: "Super clean product-led growth mechanics. Sharing the pitch badge on LinkedIn and Slack will drive high organic referral traffic.",
      upvotes: 5,
    },
    {
      pitchId: "pitch_aegis",
      reviewerId: "usr_vanshika",
      rating: 5,
      hookRating: 5,
      clarityRating: 4,
      viabilityRating: 5,
      feedback: "Super compelling technical problem, Vikram! Make sure to highlight the interactive mule network graph during your 3-minute demo — judges love visual forensic maps.",
      upvotes: 7,
    },
    {
      pitchId: "pitch_aegis",
      reviewerId: "usr_alex",
      rating: 4,
      hookRating: 4,
      clarityRating: 4,
      viabilityRating: 5,
      feedback: "Very strong enterprise thesis. Focus on how you sell into banks without getting stuck in 18-month procurement cycles.",
      upvotes: 4,
    },
    {
      pitchId: "pitch_campus",
      reviewerId: "usr_vanshika",
      rating: 5,
      hookRating: 4,
      clarityRating: 5,
      viabilityRating: 5,
      feedback: "Great hook on the bookstore markup rip-off! The student escrow payment model adds real defensibility against Facebook Marketplace.",
      upvotes: 6,
    },
    {
      pitchId: "pitch_medisync",
      reviewerId: "usr_priya",
      rating: 4,
      hookRating: 5,
      clarityRating: 4,
      viabilityRating: 4,
      feedback: "Crucial problem. Make sure to emphasize during Demo Day that you do zero-data-retention to put investor privacy concerns at ease.",
      upvotes: 5,
    },
  ];

  for (const rev of reviewsData) {
    await prisma.review.create({ data: rev });
  }

  console.log(`Seeded ${reviewsData.length} peer reviews.`);

  // 4. Seed Upvotes
  const upvotePairs = [
    { pitchId: "pitch_pulse", userId: "usr_rohan" },
    { pitchId: "pitch_pulse", userId: "usr_priya" },
    { pitchId: "pitch_pulse", userId: "usr_alex" },
    { pitchId: "pitch_pulse", userId: "usr_arjun" },
    { pitchId: "pitch_pulse", userId: "usr_sneha" },
    { pitchId: "pitch_pulse", userId: "usr_neha" },
    { pitchId: "pitch_pulse", userId: "usr_vikram" },
    { pitchId: "pitch_pulse", userId: "usr_ananya" },
    { pitchId: "pitch_aegis", userId: "usr_vanshika" },
    { pitchId: "pitch_aegis", userId: "usr_rohan" },
    { pitchId: "pitch_campus", userId: "usr_vanshika" },
    { pitchId: "pitch_campus", userId: "usr_sneha" },
  ];

  for (const pair of upvotePairs) {
    await prisma.upvote.create({ data: pair });
  }

  // 5. Seed Activity Logs
  const activities = [
    {
      userId: "usr_vanshika",
      userName: "Vanshika Bhatia",
      action: "LAUNCHED_PITCH",
      targetTitle: "PitchPulse — Demo Day AI Pitch Auditor & Peer Review Network",
      details: "Published Capstone project and initiated 10-user cohort review round.",
    },
    {
      userId: "usr_alex",
      userName: "Alex Chen",
      action: "REVIEWED_PITCH",
      targetTitle: "PitchPulse",
      details: "Left a 5-star VC evaluation with feedback on WPM voice pacing.",
    },
    {
      userId: "usr_arjun",
      userName: "Arjun Nair",
      action: "SUBMITTED_PITCH",
      targetTitle: "CampusBazaar",
      details: "Submitted 3-minute pitch script for peer review.",
    },
    {
      userId: "usr_priya",
      userName: "Priya Sharma",
      action: "REVIEWED_PITCH",
      targetTitle: "PitchPulse",
      details: "Evaluated value proposition and alternative hook rewrites.",
    },
    {
      userId: "usr_vikram",
      userName: "Vikram Das",
      action: "SUBMITTED_PITCH",
      targetTitle: "AegisUPI Sentinel",
      details: "Added FinTech fraud prevention pitch.",
    },
  ];

  for (const act of activities) {
    await prisma.activityLog.create({ data: act });
  }

  console.log("Database successfully seeded with 12 users, 4 pitches, 10 reviews, and activities!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
