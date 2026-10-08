import type { DayPlan, Meal } from "./meal-plan";

export const variedStrategy = {
  summary:
    "At 51–53 kg and 165 cm, you are already light. Mon–Sat structured meals hold weight roughly steady; Sunday is a free cheat day. Breakfast stays small and protein spreads across four eating times Mon–Sat.",
  points: [
    "Plan covers Monday–Saturday. Sunday is your cheat day — no structured meals.",
    "Calories are an estimate for maintenance at your size with light–moderate training, not a target you must force-feed.",
    "Hold uses about 1 cup cooked rice (~150 g) for lunch and dinner. Fuel uses 1½ cups (~225 g).",
    "Lunch and dinner use cooked fish, chicken, pork, or beef plus vegetables — ~120 g on Hold, ~150 g on Fuel.",
    "Snacks are small protein add-ons (yogurt, milk, banana + peanuts), not a fourth full meal. Never stack yogurt and milk as one snack.",
  ],
};

function dayTotals(
  breakfast: Meal,
  lunch: Meal,
  snack: Meal,
  dinner: Meal,
): { protein: number; calories: number } {
  return {
    protein:
      breakfast.protein + lunch.protein + snack.protein + dinner.protein,
    calories:
      breakfast.calories + lunch.calories + snack.calories + dinner.calories,
  };
}

export const variedDays: DayPlan[] = [
  {
    day: "Monday",
    short: "Mon",
    breakfast: {
      title: "Egg, bread, banana",
      items: ["1 boiled egg", "2 slices loaf bread", "1 small banana"],
      protein: 15,
      calories: 320,
    },
    lunch: {
      title: "Chicken adobo, rice, cabbage",
      items: [
        "1 cup cooked rice (~150 g)",
        "~120 g cooked chicken adobo, skin off",
        "1 serving ginisang cabbage with carrot",
      ],
      protein: 33,
      calories: 570,
    },
    snack: {
      title: "Greek yogurt",
      items: ["1 serving Greek yogurt (~150 g / 1 small tub)"],
      protein: 13,
      calories: 140,
    },
    dinner: {
      title: "Grilled tilapia, rice, kangkong",
      items: [
        "1 cup cooked rice (~150 g)",
        "~120 g grilled tilapia",
        "1 serving garlic kangkong",
      ],
      protein: 31,
      calories: 540,
    },
    protein: 92,
    calories: 1570,
    notes:
      "Solid protein day. If Greek yogurt is unavailable, use 1 cup plain yogurt.",
  },
  {
    day: "Tuesday",
    short: "Tue",
    breakfast: {
      title: "Egg, bread, milk",
      items: [
        "1 scrambled egg",
        "2 slices loaf bread",
        "1 glass fresh milk (~240 ml)",
      ],
      protein: 22,
      calories: 370,
    },
    lunch: {
      title: "Pork giniling, rice, sayote",
      items: [
        "1 cup cooked rice (~150 g)",
        "~120 g lean pork giniling",
        "Sayote and tomato cooked with the giniling (1 serving vegetables)",
      ],
      protein: 31,
      calories: 580,
    },
    snack: {
      title: "Banana and peanuts",
      items: ["1 small banana", "Small handful roasted peanuts (~15 g)"],
      protein: 6,
      calories: 180,
    },
    dinner: {
      title: "Chicken tinola, rice",
      items: [
        "1 cup cooked rice (~150 g)",
        "~120 g chicken in tinola broth",
        "Sayote and a small handful malunggay leaves",
      ],
      protein: 32,
      calories: 540,
    },
    protein: 91,
    calories: 1670,
    notes:
      "Breakfast milk covers extra protein without enlarging lunch or dinner.",
  },
  {
    day: "Wednesday",
    short: "Wed",
    breakfast: {
      title: "Egg oatmeal, banana",
      items: [
        "½ cup cooked oatmeal",
        "1 boiled or scrambled egg on the side",
        "1 small banana",
      ],
      protein: 13,
      calories: 300,
    },
    lunch: {
      title: "Tuna, rice, cucumber",
      items: [
        "1 cup cooked rice (~150 g)",
        "1 small can tuna in water, drained (~100–120 g), sautéed with onion and tomato",
        "Cucumber slices, 1 serving",
      ],
      protein: 30,
      calories: 530,
    },
    snack: {
      title: "Glass of milk",
      items: ["1 glass fresh milk (~240 ml)"],
      protein: 8,
      calories: 150,
    },
    dinner: {
      title: "Lean beef and cabbage, rice",
      items: [
        "1 cup cooked rice (~150 g)",
        "~120 g lean beef, sliced and stir-fried",
        "1 serving cabbage",
      ],
      protein: 33,
      calories: 580,
    },
    protein: 84,
    calories: 1560,
    notes:
      "Slightly below the top of the protein range. Add 1 egg at dinner if you skip the milk.",
  },
  {
    day: "Thursday",
    short: "Thu",
    breakfast: {
      title: "Two eggs, one slice bread",
      items: ["2 boiled eggs", "1 slice loaf bread"],
      protein: 16,
      calories: 250,
    },
    lunch: {
      title: "Grilled bangus, rice, eggplant",
      items: [
        "1 cup cooked rice (~150 g)",
        "~120 g grilled bangus (or galunggong)",
        "Grilled eggplant with tomato, 1 serving",
      ],
      protein: 30,
      calories: 580,
    },
    snack: {
      title: "Yogurt and papaya",
      items: [
        "1 serving plain yogurt (~150–200 g)",
        "1 small serving ripe papaya (or banana if papaya is not available)",
      ],
      protein: 9,
      calories: 180,
    },
    dinner: {
      title: "Grilled chicken, rice, mixed vegetables",
      items: [
        "1 cup cooked rice (~150 g)",
        "~120 g grilled chicken (inasal-style seasoning is fine)",
        "1 serving boiled mixed vegetables: carrot, Baguio beans, cabbage",
      ],
      protein: 33,
      calories: 560,
    },
    protein: 88,
    calories: 1570,
    notes: "Light breakfast by design. Snack yogurt is the protein top-up.",
  },
  {
    day: "Friday",
    short: "Fri",
    breakfast: {
      title: "Egg, bread, banana",
      items: [
        "1 fried egg (little oil)",
        "2 slices loaf bread",
        "1 small banana",
      ],
      protein: 15,
      calories: 330,
    },
    lunch: {
      title: "Pork adobo, rice, Baguio beans",
      items: [
        "1 cup cooked rice (~150 g)",
        "~120 g lean pork adobo",
        "1 serving ginisang Baguio beans",
      ],
      protein: 32,
      calories: 590,
    },
    snack: {
      title: "Greek yogurt",
      items: ["1 serving Greek yogurt (~150 g)"],
      protein: 13,
      calories: 140,
    },
    dinner: {
      title: "Fish sinigang, rice",
      items: [
        "1 cup cooked rice (~150 g)",
        "~120 g bangus or tilapia in sinigang",
        "Kangkong and labanos, 1 serving",
      ],
      protein: 30,
      calories: 540,
    },
    protein: 90,
    calories: 1600,
    notes:
      "Sinigang keeps dinner filling with vegetables and broth without a large plate of meat.",
  },
  {
    day: "Saturday",
    short: "Sat",
    breakfast: {
      title: "Egg, bread, milk",
      items: [
        "1 boiled egg",
        "2 slices loaf bread",
        "1 glass fresh milk (~240 ml)",
      ],
      protein: 22,
      calories: 370,
    },
    lunch: {
      title: "Chicken afritada, rice",
      items: [
        "1 cup cooked rice (~150 g)",
        "~120 g chicken afritada",
        "1 small potato and carrot in the ulam (counts as the vegetable serving)",
      ],
      protein: 32,
      calories: 600,
    },
    snack: {
      title: "Banana and peanuts",
      items: ["1 small banana", "Small handful roasted peanuts (~15 g)"],
      protein: 6,
      calories: 180,
    },
    dinner: {
      title: "Lean beef, rice, cabbage",
      items: [
        "1 cup cooked rice (~150 g)",
        "~120 g lean beef with onion",
        "1 serving cabbage",
      ],
      protein: 33,
      calories: 570,
    },
    protein: 93,
    calories: 1720,
    notes:
      "Slightly higher-calorie day from milk, potato, and peanuts. Still a normal Filipino plate size.",
  },
];

const fuelLunchByDay: Record<string, Meal> = {
  Monday: {
    title: "Chicken adobo, rice, cabbage",
    items: [
      "1½ cups cooked rice (~225 g)",
      "~150 g cooked chicken adobo, skin off",
      "1 serving ginisang cabbage with carrot",
    ],
    protein: 41,
    calories: 720,
  },
  Tuesday: {
    title: "Pork giniling, rice, sayote",
    items: [
      "1½ cups cooked rice (~225 g)",
      "~150 g lean pork giniling",
      "Sayote and tomato cooked with the giniling (1 serving vegetables)",
    ],
    protein: 39,
    calories: 730,
  },
  Wednesday: {
    title: "Tuna, rice, cucumber",
    items: [
      "1½ cups cooked rice (~225 g)",
      "Tuna in water, drained (~150 g), sautéed with onion and tomato",
      "Cucumber slices, 1 serving",
    ],
    protein: 38,
    calories: 680,
  },
  Thursday: {
    title: "Grilled bangus, rice, eggplant",
    items: [
      "1½ cups cooked rice (~225 g)",
      "~150 g grilled bangus (or galunggong)",
      "Grilled eggplant with tomato, 1 serving",
    ],
    protein: 38,
    calories: 730,
  },
  Friday: {
    title: "Pork adobo, rice, Baguio beans",
    items: [
      "1½ cups cooked rice (~225 g)",
      "~150 g lean pork adobo",
      "1 serving ginisang Baguio beans",
    ],
    protein: 40,
    calories: 740,
  },
  Saturday: {
    title: "Chicken afritada, rice",
    items: [
      "1½ cups cooked rice (~225 g)",
      "~150 g chicken afritada",
      "1 small potato and carrot in the ulam (counts as the vegetable serving)",
    ],
    protein: 40,
    calories: 750,
  },
};

const fuelDinnerByDay: Record<string, Meal> = {
  Monday: {
    title: "Grilled tilapia, rice, kangkong",
    items: [
      "1½ cups cooked rice (~225 g)",
      "~150 g grilled tilapia",
      "1 serving garlic kangkong",
    ],
    protein: 39,
    calories: 690,
  },
  Tuesday: {
    title: "Chicken tinola, rice",
    items: [
      "1½ cups cooked rice (~225 g)",
      "~150 g chicken in tinola broth",
      "Sayote and a small handful malunggay leaves",
    ],
    protein: 40,
    calories: 690,
  },
  Wednesday: {
    title: "Lean beef and cabbage, rice",
    items: [
      "1½ cups cooked rice (~225 g)",
      "~150 g lean beef, sliced and stir-fried",
      "1 serving cabbage",
    ],
    protein: 41,
    calories: 730,
  },
  Thursday: {
    title: "Grilled chicken, rice, mixed vegetables",
    items: [
      "1½ cups cooked rice (~225 g)",
      "~150 g grilled chicken (inasal-style seasoning is fine)",
      "1 serving boiled mixed vegetables: carrot, Baguio beans, cabbage",
    ],
    protein: 41,
    calories: 710,
  },
  Friday: {
    title: "Fish sinigang, rice",
    items: [
      "1½ cups cooked rice (~225 g)",
      "~150 g bangus or tilapia in sinigang",
      "Kangkong and labanos, 1 serving",
    ],
    protein: 38,
    calories: 690,
  },
  Saturday: {
    title: "Lean beef, rice, cabbage",
    items: [
      "1½ cups cooked rice (~225 g)",
      "~150 g lean beef with onion",
      "1 serving cabbage",
    ],
    protein: 41,
    calories: 720,
  },
};

export const variedFuelDays: DayPlan[] = variedDays.map((day) => {
  const lunch = fuelLunchByDay[day.day];
  const dinner = fuelDinnerByDay[day.day];
  const totals = dayTotals(day.breakfast, lunch, day.snack, dinner);
  return {
    ...day,
    lunch,
    dinner,
    ...totals,
    notes: `${day.notes} Fuel: ~225 g rice and ~150 g protein at lunch and dinner.`,
  };
});
