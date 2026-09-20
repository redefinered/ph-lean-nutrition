"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  adjustments,
  days,
  hydration,
  mealCell,
  profile,
  strategy,
  type Meal,
} from "@/data/meal-plan";

const weekdayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function todayName() {
  return weekdayNames[new Date().getDay()];
}

function MealBlock({
  label,
  meal,
}: {
  label: string;
  meal: Meal;
}) {
  return (
    <div className="rounded-lg border border-border/80 bg-card p-4">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </p>
        <p className="text-xs text-muted-foreground">
          ~{meal.protein} g protein · ~{meal.calories} kcal
        </p>
      </div>
      <h3 className="font-medium">{meal.title}</h3>
      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
        {meal.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function MealPlanView() {
  const defaultDay = useMemo(() => {
    const today = todayName();
    return days.some((d) => d.day === today) ? today : "Monday";
  }, []);
  const [selected, setSelected] = useState(defaultDay);
  const plan = days.find((d) => d.day === selected) ?? days[0];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8 sm:px-6 sm:py-12">
      <header className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Personal plan</Badge>
          <Badge variant="outline">Not a bulk</Badge>
          <Badge variant="outline">Not a cut</Badge>
        </div>
        <div className="max-w-3xl space-y-3">
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            7-day meal plan for lean recomposition
          </h1>
          <p className="text-muted-foreground text-pretty">
            Built for a 39-year-old, 5&apos;5&quot; Filipino male at 51–53 kg
            with a small appetite, current push-up and dumbbell-squat work, and
            a lean, defined, athletic look — not bodybuilding bulk.
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["Weight target", "Hold ~51–53 kg"],
            ["Protein", profile.proteinTarget],
            ["Calories", profile.calorieRange],
            ["Training", "Push-ups + 5 kg squats"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl border border-border bg-card px-3 py-3"
            >
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd className="mt-1 text-sm font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <section className="space-y-4" id="strategy">
        <h2 className="font-heading text-xl font-semibold">1. Strategy</h2>
        <Card>
          <CardHeader>
            <CardTitle>Why this fits you</CardTitle>
            <CardDescription>{strategy.summary}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              {strategy.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4" id="week">
        <div className="flex flex-col gap-1">
          <h2 className="font-heading text-xl font-semibold">
            2. 7-day meal plan
          </h2>
          <p className="text-sm text-muted-foreground">
            Portions are practical estimates, not lab measurements. Lunch and
            dinner stay at 1 cup cooked rice plus about 100–150 g cooked
            protein and one vegetable serving.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-24">Day</TableHead>
                <TableHead className="min-w-52">Breakfast</TableHead>
                <TableHead className="min-w-56">Lunch</TableHead>
                <TableHead className="min-w-44">Snack</TableHead>
                <TableHead className="min-w-56">Dinner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {days.map((day) => (
                <TableRow
                  key={day.day}
                  className={day.day === selected ? "bg-muted/60" : undefined}
                >
                  <TableCell className="font-medium align-top">
                    {day.day}
                  </TableCell>
                  <TableCell className="align-top text-muted-foreground">
                    {mealCell(day.breakfast)}
                  </TableCell>
                  <TableCell className="align-top text-muted-foreground">
                    {mealCell(day.lunch)}
                  </TableCell>
                  <TableCell className="align-top text-muted-foreground">
                    {mealCell(day.snack)}
                  </TableCell>
                  <TableCell className="align-top text-muted-foreground">
                    {mealCell(day.dinner)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="space-y-4" id="today">
        <h2 className="font-heading text-xl font-semibold">Day detail</h2>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {days.map((day) => {
            const active = day.day === selected;
            return (
              <button
                key={day.day}
                type="button"
                onClick={() => setSelected(day.day)}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:bg-muted"
                }`}
              >
                {day.short}
              </button>
            );
          })}
        </div>
        <Card>
          <CardHeader className="border-b">
            <CardTitle>{plan.day}</CardTitle>
            <CardDescription>
              ~{plan.protein} g protein · ~{plan.calories} kcal · {plan.notes}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 pt-6 sm:grid-cols-2">
            <MealBlock label="Breakfast" meal={plan.breakfast} />
            <MealBlock label="Lunch" meal={plan.lunch} />
            <MealBlock label="Snack" meal={plan.snack} />
            <MealBlock label="Dinner" meal={plan.dinner} />
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4" id="nutrition">
        <h2 className="font-heading text-xl font-semibold">
          3. Daily protein &amp; calories
        </h2>
        <p className="text-sm text-muted-foreground">
          Numbers are realistic kitchen estimates, including typical home-cooking
          oil. They are not exact. Target band: 80–95 g protein; calories stay
          near maintenance for your size.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                <TableHead className="text-right">Approx. protein</TableHead>
                <TableHead className="text-right">Approx. calories</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {days.map((day) => (
                <TableRow key={day.day}>
                  <TableCell className="font-medium">{day.day}</TableCell>
                  <TableCell className="text-right">{day.protein} g</TableCell>
                  <TableCell className="text-right">
                    {day.calories.toLocaleString()} kcal
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {day.notes}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="space-y-4" id="adjustments">
        <h2 className="font-heading text-xl font-semibold">
          4. Simple adjustments
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>If you are too hungry</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {adjustments.hungry.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>If you are losing weight</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {adjustments.losingWeight.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>If protein is short</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {adjustments.lowProtein.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-4" id="hydration">
        <h2 className="font-heading text-xl font-semibold">5. Hydration</h2>
        <Card>
          <CardHeader>
            <CardTitle>{hydration.amount}</CardTitle>
            <CardDescription>{hydration.detail}</CardDescription>
          </CardHeader>
        </Card>
      </section>

      <Separator />
      <p className="text-xs text-muted-foreground">
        This is food coaching for a healthy adult, not medical nutrition therapy.
        Portions are approximate. No protein powder or supplements are required.
      </p>
    </div>
  );
}
