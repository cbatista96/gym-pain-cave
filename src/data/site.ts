// Non-textual site data: slugs, images, prices. All display text lives in src/messages.

export const CLASS_KEYS = [
  "strength",
  "crossTraining",
  "boxing",
  "hiit",
  "spinning",
  "mobility"
] as const;
export type ClassKey = (typeof CLASS_KEYS)[number];

export const CLASSES: Record<
  ClassKey,
  { image: string; duration: number; level: "all" | "intermediate" | "advanced"; intensity: 1 | 2 | 3 | 4 | 5 }
> = {
  strength: {
    image:
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1600&auto=format&fit=crop",
    duration: 75,
    level: "all",
    intensity: 4
  },
  crossTraining: {
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1600&auto=format&fit=crop",
    duration: 60,
    level: "intermediate",
    intensity: 5
  },
  boxing: {
    image:
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1600&auto=format&fit=crop",
    duration: 60,
    level: "all",
    intensity: 4
  },
  hiit: {
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop",
    duration: 45,
    level: "all",
    intensity: 5
  },
  spinning: {
    image:
      "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?q=80&w=1600&auto=format&fit=crop",
    duration: 50,
    level: "all",
    intensity: 3
  },
  mobility: {
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop",
    duration: 45,
    level: "all",
    intensity: 2
  }
};

export const TRAINER_KEYS = ["marcus", "valeria", "dmitri", "sofia"] as const;
export type TrainerKey = (typeof TRAINER_KEYS)[number];

export const TRAINERS: Record<TrainerKey, { image: string; years: number }> = {
  marcus: {
    image:
      "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1200&auto=format&fit=crop",
    years: 12
  },
  valeria: {
    image:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1200&auto=format&fit=crop",
    years: 9
  },
  dmitri: {
    image:
      "https://images.pexels.com/photos/10006587/pexels-photo-10006587.jpeg?auto=compress&cs=tinysrgb&w=1200",
    years: 15
  },
  sofia: {
    image:
      "https://images.unsplash.com/photo-1609899537878-88d5ba429bdb?q=80&w=1200&auto=format&fit=crop",
    years: 7
  }
};

export const PLAN_IDS = ["basic", "beast", "elite"] as const;
export type PlanId = (typeof PLAN_IDS)[number];

export const PLANS: Record<
  PlanId,
  { amountCents: number; popular: boolean; stripePriceEnv: string }
> = {
  basic: { amountCents: 2900, popular: false, stripePriceEnv: "STRIPE_PRICE_BASIC" },
  beast: { amountCents: 5900, popular: true, stripePriceEnv: "STRIPE_PRICE_BEAST" },
  elite: { amountCents: 9900, popular: false, stripePriceEnv: "STRIPE_PRICE_ELITE" }
};

export const POST_SLUGS = [
  "progressive-overload",
  "protein-myths",
  "first-month-guide",
  "sleep-recovery"
] as const;
export type PostSlug = (typeof POST_SLUGS)[number];

export const POSTS: Record<
  PostSlug,
  { image: string; date: string; authorKey: TrainerKey; readMins: number }
> = {
  "progressive-overload": {
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1600&auto=format&fit=crop",
    date: "2026-05-28",
    authorKey: "marcus",
    readMins: 6
  },
  "protein-myths": {
    image:
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=1600&auto=format&fit=crop",
    date: "2026-05-14",
    authorKey: "sofia",
    readMins: 7
  },
  "first-month-guide": {
    image:
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1600&auto=format&fit=crop",
    date: "2026-04-30",
    authorKey: "valeria",
    readMins: 5
  },
  "sleep-recovery": {
    image:
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1600&auto=format&fit=crop",
    date: "2026-04-12",
    authorKey: "dmitri",
    readMins: 6
  }
};

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2400&auto=format&fit=crop";

// Local, optimized loop (Pexels #34708346, "Dark Gym Workout with Modern Equipment").
// HERO_IMAGE doubles as the poster while the video loads.
export const HERO_VIDEO = {
  webm: "/videos/hero.webm",
  mp4: "/videos/hero.mp4"
};

export const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1600&auto=format&fit=crop";

export const CTA_IMAGE =
  "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=2400&auto=format&fit=crop";
