export type Meal = {
  title: string;
  items: string[];
  protein: number;
  calories: number;
};

export type DayPlan = {
  day: string;
  short: string;
  breakfast: Meal;
  lunch: Meal;
  snack: Meal;
  dinner: Meal;
  protein: number;
  calories: number;
  notes: string;
};

export const profile = {
  name: "Lean recomposition plan",
  sex: "Male",
  age: 39,
  height: "5'5\" / 165 cm",
  weight: "51–53 kg",
  location: "Philippines",
  training: "Push-ups (72/session) and 5 kg dumbbell squats",
  proteinTarget: "80–95 g",
  calorieRange: "about 1,550–1,720 kcal (estimate)",
};

export const strategy = {
  summary:
    "At 51–53 kg and 165 cm, you are already light. This plan holds weight roughly steady, keeps breakfast small, and spreads ~85–95 g of protein across four eating times so recovery from push-ups and squats is covered without a bulk or a cut.",
  points: [
    "Calories are an estimate for maintenance at your size with light–moderate training, not a target you must force-feed.",
    "Rice stays at about 1 cup cooked for lunch and dinner. That matches how you already eat and supports training without cutting a staple.",
    "Lunch and dinner use 100–150 g cooked fish, chicken, pork, or beef plus vegetables. That is enough protein without large plates.",
    "Snacks are small protein add-ons (yogurt, milk, banana + peanuts), not a fourth full meal.",
  ],
};

export const days: DayPlan[] = [
  {
    day: "Monday",
    short: "Mon",
    breakfast: {
      title: "Egg, bread, banana",
      items: [
        "1 boiled egg",
        "2 slices loaf bread",
        "1 small banana",
      ],
      protein: 15,
      calories: 320,
    },
    lunch: {
      title: "Chicken adobo, rice, cabbage",
      items: [
        "1 cup cooked rice",
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
        "1 cup cooked rice",
        "~120 g grilled tilapia",
        "1 serving garlic kangkong",
      ],
      protein: 31,
      calories: 540,
    },
    protein: 92,
    calories: 1570,
    notes: "Solid protein day. If Greek yogurt is unavailable, use 1 cup plain yogurt plus 1 glass milk.",
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
        "1 cup cooked rice",
        "~120 g lean pork giniling",
        "Sayote and tomato cooked with the giniling (1 serving vegetables)",
      ],
      protein: 31,
      calories: 580,
    },
    snack: {
      title: "Banana and peanuts",
      items: [
        "1 small banana",
        "Small handful roasted peanuts (~15 g)",
      ],
      protein: 6,
      calories: 180,
    },
    dinner: {
      title: "Chicken tinola, rice",
      items: [
        "1 cup cooked rice",
        "~120 g chicken in tinola broth",
        "Sayote and a small handful malunggay leaves",
      ],
      protein: 32,
      calories: 540,
    },
    protein: 91,
    calories: 1670,
    notes: "Breakfast milk covers extra protein without enlarging lunch or dinner.",
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
        "1 cup cooked rice",
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
        "1 cup cooked rice",
        "~120 g lean beef, sliced and stir-fried",
        "1 serving cabbage",
      ],
      protein: 33,
      calories: 580,
    },
    protein: 84,
    calories: 1560,
    notes: "Slightly below the top of the protein range. Add 1 egg at dinner if you skip the milk.",
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
        "1 cup cooked rice",
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
        "1 cup cooked rice",
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
      items: ["1 fried egg (little oil)", "2 slices loaf bread", "1 small banana"],
      protein: 15,
      calories: 330,
    },
    lunch: {
      title: "Pork adobo, rice, Baguio beans",
      items: [
        "1 cup cooked rice",
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
        "1 cup cooked rice",
        "~120 g bangus or tilapia in sinigang",
        "Kangkong and labanos, 1 serving",
      ],
      protein: 30,
      calories: 540,
    },
    protein: 90,
    calories: 1600,
    notes: "Sinigang keeps dinner filling with vegetables and broth without a large plate of meat.",
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
        "1 cup cooked rice",
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
        "1 cup cooked rice",
        "~120 g lean beef with onion",
        "1 serving cabbage",
      ],
      protein: 33,
      calories: 570,
    },
    protein: 93,
    calories: 1720,
    notes: "Slightly higher-calorie day from milk, potato, and peanuts. Still a normal Filipino plate size.",
  },
  {
    day: "Sunday",
    short: "Sun",
    breakfast: {
      title: "Egg, bread, banana",
      items: ["1 boiled egg", "2 slices loaf bread", "1 small banana"],
      protein: 15,
      calories: 320,
    },
    lunch: {
      title: "Grilled fish, rice, ensalada",
      items: [
        "1 cup cooked rice",
        "~120 g grilled fish (tilapia, bangus, or galunggong)",
        "Tomato–cucumber ensalada, 1 serving",
      ],
      protein: 30,
      calories: 540,
    },
    snack: {
      title: "Glass of milk",
      items: ["1 glass fresh milk (~240 ml)"],
      protein: 8,
      calories: 150,
    },
    dinner: {
      title: "Chicken and pinakbet vegetables, rice",
      items: [
        "1 cup cooked rice",
        "~120 g chicken, simply sautéed or grilled",
        "1 serving pinakbet-style vegetables (sitaw, eggplant, okra, kalabasa)",
      ],
      protein: 32,
      calories: 560,
    },
    protein: 85,
    calories: 1570,
    notes: "If this day lands under 80 g protein (smaller fish portion), add 1 egg at dinner.",
  },
];

export const adjustments = {
  hungry: [
    "Add 1 serving vegetables or a small cup of clear soup (tinola/sinigang broth) before increasing rice.",
    "Add 1 small banana or 1 glass milk between meals rather than doubling lunch.",
    "If still hungry after dinner, add 1 boiled egg — not a second cup of rice first.",
  ],
  losingWeight: [
    "Add 1 glass of milk once per day.",
    "Cook lunch and dinner with 1 extra teaspoon of oil, or keep a little more sauce on the rice.",
    "Do not jump to a bulk. Re-check weight after 10–14 days of the extra milk.",
  ],
  lowProtein: [
    "Add 1 egg (about 6–7 g protein).",
    "Swap regular yogurt for Greek yogurt, or add 1 glass of milk.",
    "Keep fish/meat at the upper end of 150 g cooked, still on 1 cup rice.",
  ],
};

export const hydration = {
  amount: "About 2.0–2.5 liters of water across the day",
  detail:
    "In Philippine heat, drink a glass on waking, a glass with each meal, and extra around your push-up/squat session. Pale-yellow urine is a better guide than forcing 4–5 liters. Skip sugary drinks as the default; unsweetened iced tea or plain water is enough.",
};

export function mealCell(meal: Meal): string {
  return `${meal.title}: ${meal.items.join("; ")}`;
}
