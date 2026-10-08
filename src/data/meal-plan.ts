import { variedDays, variedFuelDays, variedStrategy } from "./meal-plan-varied";

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

export const simpleStrategy = {
  summary:
    "At 51–53 kg and 165 cm, you are already light. This is a Mon–Sat plan with Sunday as a free cheat day. Same simple meals Mon–Sat — only lunch and dinner protein rotates — so it is easier to shop for and repeat.",
  points: [
    "Plan covers Monday–Saturday. Sunday is your cheat day — no structured meals.",
    "Breakfast is almost always 1 egg, 2 slices bread, plus either a small banana or 1 glass milk.",
    "Lunch and dinner follow one template: cooked rice (weighed), cooked protein, and 1 serving vegetables.",
    "Protein rotates through chicken, fish, lean pork, and lean beef. Cook it however you already do at home — adobo, grilled, sautéed, or sinigang-style is fine.",
    "Snacks stay small: Greek yogurt, milk, fruit, or a small handful of nuts — not a fourth full meal.",
    "Hold uses ~150 g cooked rice and ~120 g protein per main meal. Fuel uses ~225 g rice and ~150 g protein to land near 1,900 kcal.",
  ],
};

const breakfastBanana: Meal = {
  title: "Egg, bread, banana",
  items: ["1 egg", "2 slices bread", "1 small banana"],
  protein: 15,
  calories: 320,
};

const breakfastMilk: Meal = {
  title: "Egg, bread, milk",
  items: ["1 egg", "2 slices bread", "1 glass milk (~240 ml)"],
  protein: 22,
  calories: 370,
};

const holdLunchChicken: Meal = {
  title: "Rice, chicken, vegetables",
  items: [
    "1 cup cooked rice (~150 g)",
    "~120 g cooked chicken",
    "1 serving vegetables",
  ],
  protein: 33,
  calories: 570,
};

const holdLunchPork: Meal = {
  title: "Rice, lean pork, vegetables",
  items: [
    "1 cup cooked rice (~150 g)",
    "~120 g cooked lean pork",
    "1 serving vegetables",
  ],
  protein: 31,
  calories: 580,
};

const holdLunchFish: Meal = {
  title: "Rice, fish, vegetables",
  items: [
    "1 cup cooked rice (~150 g)",
    "~120 g cooked fish",
    "1 serving vegetables",
  ],
  protein: 30,
  calories: 540,
};

const holdDinnerFish: Meal = {
  title: "Rice, fish, vegetables",
  items: [
    "1 cup cooked rice (~150 g)",
    "~120 g cooked fish",
    "1 serving vegetables",
  ],
  protein: 30,
  calories: 540,
};

const holdDinnerBeef: Meal = {
  title: "Rice, lean beef, vegetables",
  items: [
    "1 cup cooked rice (~150 g)",
    "~120 g cooked lean beef",
    "1 serving vegetables",
  ],
  protein: 33,
  calories: 570,
};

const holdDinnerChicken: Meal = {
  title: "Rice, chicken, vegetables",
  items: [
    "1 cup cooked rice (~150 g)",
    "~120 g cooked chicken",
    "1 serving vegetables",
  ],
  protein: 33,
  calories: 560,
};

const fuelLunchChicken: Meal = {
  title: "Rice, chicken, vegetables",
  items: [
    "1½ cups cooked rice (~225 g)",
    "~150 g cooked chicken",
    "1 serving vegetables",
  ],
  protein: 41,
  calories: 720,
};

const fuelLunchPork: Meal = {
  title: "Rice, lean pork, vegetables",
  items: [
    "1½ cups cooked rice (~225 g)",
    "~150 g cooked lean pork",
    "1 serving vegetables",
  ],
  protein: 39,
  calories: 730,
};

const fuelLunchFish: Meal = {
  title: "Rice, fish, vegetables",
  items: [
    "1½ cups cooked rice (~225 g)",
    "~150 g cooked fish",
    "1 serving vegetables",
  ],
  protein: 38,
  calories: 690,
};

const fuelDinnerFish: Meal = {
  title: "Rice, fish, vegetables",
  items: [
    "1½ cups cooked rice (~225 g)",
    "~150 g cooked fish",
    "1 serving vegetables",
  ],
  protein: 38,
  calories: 690,
};

const fuelDinnerBeef: Meal = {
  title: "Rice, lean beef, vegetables",
  items: [
    "1½ cups cooked rice (~225 g)",
    "~150 g cooked lean beef",
    "1 serving vegetables",
  ],
  protein: 41,
  calories: 720,
};

const fuelDinnerChicken: Meal = {
  title: "Rice, chicken, vegetables",
  items: [
    "1½ cups cooked rice (~225 g)",
    "~150 g cooked chicken",
    "1 serving vegetables",
  ],
  protein: 41,
  calories: 710,
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

const snackYogurt: Meal = {
  title: "Greek yogurt",
  items: ["1 serving Greek yogurt (~150 g)"],
  protein: 13,
  calories: 140,
};

const snackBananaNuts: Meal = {
  title: "Banana and nuts",
  items: ["1 small banana", "Small handful of nuts (~15 g)"],
  protein: 6,
  calories: 180,
};

const snackBananaYogurt: Meal = {
  title: "Banana and Greek yogurt",
  items: ["1 small banana", "1 serving Greek yogurt (~150 g)"],
  protein: 14,
  calories: 220,
};

const snackMilkBanana: Meal = {
  title: "Milk and banana",
  items: ["1 glass milk (~240 ml)", "1 small banana"],
  protein: 10,
  calories: 280,
};

const snackYogurtFruit: Meal = {
  title: "Greek yogurt and fruit",
  items: ["1 serving Greek yogurt (~150 g)", "1 small serving fruit"],
  protein: 13,
  calories: 180,
};

export const simpleHoldDays: DayPlan[] = [
  (() => {
    const lunch = holdLunchChicken;
    const dinner = holdDinnerFish;
    const snack = snackYogurt;
    const totals = dayTotals(breakfastBanana, lunch, snack, dinner);
    return {
      day: "Monday",
      short: "Mon",
      breakfast: breakfastBanana,
      lunch,
      snack,
      dinner,
      ...totals,
      notes:
        "Template day: egg + bread breakfast, rice + protein + veg for lunch and dinner.",
    };
  })(),
  (() => {
    const lunch = holdLunchPork;
    const dinner = holdDinnerFish;
    const snack = snackBananaNuts;
    const totals = dayTotals(breakfastMilk, lunch, snack, dinner);
    return {
      day: "Tuesday",
      short: "Tue",
      breakfast: breakfastMilk,
      lunch,
      snack,
      dinner,
      ...totals,
      notes: "Same structure as Monday. Only lunch protein and snack change.",
    };
  })(),
  (() => {
    const lunch = holdLunchChicken;
    const dinner = holdDinnerBeef;
    const snack = snackYogurt;
    const totals = dayTotals(breakfastBanana, lunch, snack, dinner);
    return {
      day: "Wednesday",
      short: "Wed",
      breakfast: breakfastBanana,
      lunch,
      snack,
      dinner,
      ...totals,
      notes: "Beef at dinner instead of fish. Breakfast and lunch match Monday.",
    };
  })(),
  (() => {
    const lunch = holdLunchFish;
    const dinner = holdDinnerChicken;
    const snack = snackBananaYogurt;
    const totals = dayTotals(breakfastMilk, lunch, snack, dinner);
    return {
      day: "Thursday",
      short: "Thu",
      breakfast: breakfastMilk,
      lunch,
      snack,
      dinner,
      ...totals,
      notes: "Fish at lunch, chicken at dinner. Snack combines banana and yogurt.",
    };
  })(),
  (() => {
    const lunch = holdLunchPork;
    const dinner = holdDinnerFish;
    const snack = snackMilkBanana;
    const totals = dayTotals(breakfastBanana, lunch, snack, dinner);
    return {
      day: "Friday",
      short: "Fri",
      breakfast: breakfastBanana,
      lunch,
      snack,
      dinner,
      ...totals,
      notes: "Back to fish at dinner. Pork at lunch like Tuesday.",
    };
  })(),
  (() => {
    const lunch = holdLunchChicken;
    const dinner = holdDinnerBeef;
    const snack = snackYogurtFruit;
    const totals = dayTotals(breakfastMilk, lunch, snack, dinner);
    return {
      day: "Saturday",
      short: "Sat",
      breakfast: breakfastMilk,
      lunch,
      snack,
      dinner,
      ...totals,
      notes:
        "Weekend version of the same template. Beef at dinner like Wednesday.",
    };
  })(),
];

export const simpleFuelDays: DayPlan[] = [
  (() => {
    const lunch = fuelLunchChicken;
    const dinner = fuelDinnerFish;
    const snack = snackYogurt;
    const totals = dayTotals(breakfastBanana, lunch, snack, dinner);
    return {
      day: "Monday",
      short: "Mon",
      breakfast: breakfastBanana,
      lunch,
      snack,
      dinner,
      ...totals,
      notes:
        "Fuel portions: ~225 g rice and ~150 g protein at lunch and dinner.",
    };
  })(),
  (() => {
    const lunch = fuelLunchPork;
    const dinner = fuelDinnerFish;
    const snack = snackBananaNuts;
    const totals = dayTotals(breakfastMilk, lunch, snack, dinner);
    return {
      day: "Tuesday",
      short: "Tue",
      breakfast: breakfastMilk,
      lunch,
      snack,
      dinner,
      ...totals,
      notes: "Fuel day. Same rotation as Hold — only rice and protein weights up.",
    };
  })(),
  (() => {
    const lunch = fuelLunchChicken;
    const dinner = fuelDinnerBeef;
    const snack = snackYogurt;
    const totals = dayTotals(breakfastBanana, lunch, snack, dinner);
    return {
      day: "Wednesday",
      short: "Wed",
      breakfast: breakfastBanana,
      lunch,
      snack,
      dinner,
      ...totals,
      notes: "Fuel beef dinner. Snack stays yogurt only — no milk stack.",
    };
  })(),
  (() => {
    const lunch = fuelLunchFish;
    const dinner = fuelDinnerChicken;
    const snack = snackBananaYogurt;
    const totals = dayTotals(breakfastMilk, lunch, snack, dinner);
    return {
      day: "Thursday",
      short: "Thu",
      breakfast: breakfastMilk,
      lunch,
      snack,
      dinner,
      ...totals,
      notes: "Fuel portions on fish lunch and chicken dinner.",
    };
  })(),
  (() => {
    const lunch = fuelLunchPork;
    const dinner = fuelDinnerFish;
    const snack = snackMilkBanana;
    const totals = dayTotals(breakfastBanana, lunch, snack, dinner);
    return {
      day: "Friday",
      short: "Fri",
      breakfast: breakfastBanana,
      lunch,
      snack,
      dinner,
      ...totals,
      notes: "Fuel day. Milk appears only in the snack, not stacked on yogurt.",
    };
  })(),
  (() => {
    const lunch = fuelLunchChicken;
    const dinner = fuelDinnerBeef;
    const snack = snackYogurtFruit;
    const totals = dayTotals(breakfastMilk, lunch, snack, dinner);
    return {
      day: "Saturday",
      short: "Sat",
      breakfast: breakfastMilk,
      lunch,
      snack,
      dinner,
      ...totals,
      notes: "Weekend Fuel plates — bigger rice and meat, snack still light.",
    };
  })(),
];

/** @deprecated Prefer simpleHoldDays / daysForBand — kept as Hold alias */
export const simpleDays = simpleHoldDays;

export const adjustments = {
  hungry: [
    "Add 1 serving vegetables or a small cup of clear soup (tinola/sinigang broth) before increasing rice.",
    "Add 1 small banana or 1 glass milk between meals rather than doubling lunch.",
    "If still hungry after dinner, add 1 boiled egg — not a second cup of rice first.",
  ],
  losingWeight: [
    "Switch to Fuel (~1,900 kcal) or add 1 glass of milk once per day on Hold.",
    "Cook lunch and dinner with 1 extra teaspoon of oil, or keep a little more sauce on the rice.",
    "Do not jump to a bulk. Re-check weight after 10–14 days of the higher band.",
  ],
  lowProtein: [
    "Add 1 egg (about 6–7 g protein).",
    "Swap regular yogurt for Greek yogurt, or add 1 glass of milk.",
    "Keep fish/meat at the Fuel end of ~150 g cooked on 1½ cups rice (~225 g).",
  ],
};

export const hydration = {
  amount: "About 2.0–2.5 liters of water across the day",
  detail:
    "In Philippine heat, drink a glass on waking, a glass with each meal, and extra around your push-up/squat session. Pale-yellow urine is a better guide than forcing 4–5 liters. Skip sugary drinks as the default; unsweetened iced tea or plain water is enough.",
};

export type LineupId = "simple" | "varied";

export type MealPlanLineup = {
  id: LineupId;
  label: string;
  description: string;
  strategy: {
    summary: string;
    points: string[];
  };
  holdDays: DayPlan[];
  fuelDays: DayPlan[];
};

export const mealPlanLineups: MealPlanLineup[] = [
  {
    id: "simple",
    label: "Simple template",
    description:
      "Mon–Sat simple meals — only lunch/dinner protein rotates. Sunday is cheat day (not listed). Breakfast is usually 1 egg, 2 slices bread, plus banana or milk.",
    strategy: simpleStrategy,
    holdDays: simpleHoldDays,
    fuelDays: simpleFuelDays,
  },
  {
    id: "varied",
    label: "Varied dishes",
    description:
      "Mon–Sat Filipino dishes — adobo, tinola, sinigang, and more — same rice/protein/veg structure. Sunday is cheat day (not listed).",
    strategy: variedStrategy,
    holdDays: variedDays,
    fuelDays: variedFuelDays,
  },
];

export function daysForBand(
  lineup: MealPlanLineup,
  band: CalorieBandId,
): DayPlan[] {
  return band === "fuel" ? lineup.fuelDays : lineup.holdDays;
}

export function getMealPlanLineup(id: LineupId): MealPlanLineup {
  return mealPlanLineups.find((lineup) => lineup.id === id) ?? mealPlanLineups[0];
}

export type CalorieBandId = "hold" | "fuel";

export const calorieBands = [
  {
    id: "hold" as const,
    label: "Hold",
    rangeLabel: "1,550–1,720 kcal",
    description:
      "Lighter plates: ~150 g cooked rice and ~120 g protein per main meal.",
  },
  {
    id: "fuel" as const,
    label: "Fuel",
    rangeLabel: "~1,900 kcal",
    description:
      "Bigger plates: ~225 g cooked rice and ~150 g protein at lunch and dinner. Snacks stay light.",
  },
];

export function getCalorieBand(id: CalorieBandId) {
  return calorieBands.find((band) => band.id === id) ?? calorieBands[0];
}
