"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  calorieBands,
  daysForBand,
  hydration,
  mealPlanLineups,
  profile,
  type CalorieBandId,
  type LineupId,
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

function MealBlock({ label, meal }: { label: string; meal: Meal }) {
  return (
    <div className="rounded-lg border border-border/80 bg-card p-4">
      <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
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

function MealTableCell({ meal }: { meal: Meal }) {
  return (
    <div className="space-y-1.5">
      <p className="font-medium text-foreground leading-snug">{meal.title}</p>
      <ul className="list-disc space-y-0.5 pl-4 text-muted-foreground">
        {meal.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function MobileMealSlot({ label, meal }: { label: string; meal: Meal }) {
  return (
    <div className="space-y-1">
      <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <MealTableCell meal={meal} />
    </div>
  );
}

function EnergyBandSwitch({
  value,
  onChange,
  todayCalories,
}: {
  value: CalorieBandId;
  onChange: (id: CalorieBandId) => void;
  todayCalories: number;
}) {
  const fill = Math.min(
    100,
    Math.max(8, ((todayCalories - 1400) / (2000 - 1400)) * 100),
  );

  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Energy band
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Same dishes. Fuel uses bigger rice and protein portions.
          </p>
        </div>
        <p className="text-sm font-medium tabular-nums">
          ~{todayCalories.toLocaleString()} kcal today
        </p>
      </div>
      <div
        role="radiogroup"
        aria-label="Energy band"
        className="mt-4 grid grid-cols-2 gap-2"
      >
        {calorieBands.map((band) => {
          const active = band.id === value;
          return (
            <button
              key={band.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(band.id)}
              className={`rounded-xl border px-3 py-3 text-left transition-colors ${
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:bg-muted"
              }`}
            >
              <span className="block text-sm font-semibold">{band.label}</span>
              <span
                className={`mt-0.5 block text-xs ${
                  active ? "text-primary-foreground/80" : "text-muted-foreground"
                }`}
              >
                {band.rangeLabel}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-amber-500 transition-[width] duration-300"
          style={{ width: `${fill}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {calorieBands.find((band) => band.id === value)?.description}
      </p>
    </div>
  );
}

const LINEUP_KEY = "ph-lean-lineup";
const BAND_KEY = "ph-lean-energy-band";

export function MealPlanView() {
  const [lineupId, setLineupId] = useState<LineupId>("simple");
  const [bandId, setBandId] = useState<CalorieBandId>("hold");
  const [prefsReady, setPrefsReady] = useState(false);
  const todayRowRef = useRef<HTMLTableRowElement | null>(null);
  const todayCardRef = useRef<HTMLButtonElement | null>(null);
  const lineup =
    mealPlanLineups.find((entry) => entry.id === lineupId) ?? mealPlanLineups[0];
  const band = calorieBands.find((entry) => entry.id === bandId) ?? calorieBands[0];
  const days = daysForBand(lineup, bandId);
  const { strategy } = lineup;
  const calendarToday = useMemo(() => todayName(), []);
  const isCheatDay = calendarToday === "Sunday";

  useEffect(() => {
    const storedLineup = window.localStorage.getItem(LINEUP_KEY);
    const storedBand = window.localStorage.getItem(BAND_KEY);
    if (storedLineup === "simple" || storedLineup === "varied") {
      setLineupId(storedLineup);
    }
    if (storedBand === "hold" || storedBand === "fuel") {
      setBandId(storedBand);
    }
    setPrefsReady(true);
  }, []);

  useEffect(() => {
    if (!prefsReady) return;
    window.localStorage.setItem(LINEUP_KEY, lineupId);
  }, [lineupId, prefsReady]);

  useEffect(() => {
    if (!prefsReady) return;
    window.localStorage.setItem(BAND_KEY, bandId);
  }, [bandId, prefsReady]);

  const defaultDay = useMemo(() => {
    if (calendarToday === "Sunday") return "Monday";
    return calendarToday;
  }, [calendarToday]);
  const [selected, setSelected] = useState(defaultDay);

  useEffect(() => {
    const target = todayCardRef.current ?? todayRowRef.current;
    target?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, []);

  const plan = days.find((d) => d.day === selected) ?? days[0];
  const isCalendarToday = (dayName: string) => dayName === calendarToday;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 sm:gap-10 sm:px-6 sm:py-12">
      <header className="flex flex-col gap-4 sm:gap-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Personal plan</Badge>
          <Badge variant="outline">Not a bulk</Badge>
          <Badge variant="outline">Not a cut</Badge>
        </div>
        <div className="max-w-3xl space-y-3">
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-balance sm:text-4xl">
            6-day meal plan for lean recomposition
          </h1>
          <p className="text-sm text-muted-foreground text-pretty sm:text-base">
            Built for a 39-year-old, 5&apos;5&quot; Filipino male at 51–53 kg
            with a small appetite, current push-up and dumbbell-squat work, and
            a lean, defined, athletic look — not bodybuilding bulk. Structured
            meals Mon–Sat; Sunday is cheat day.
          </p>
        </div>
        {isCheatDay ? (
          <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950">
            <p className="font-medium">Today is Sunday — cheat day</p>
            <p className="mt-1 text-amber-900/80">
              No structured meals today. Showing Monday so you can peek ahead.
            </p>
          </div>
        ) : null}
        <dl className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-4">
          {[
            ["Weight target", "Hold ~51–53 kg"],
            ["Protein", profile.proteinTarget],
            ["Calories", band.rangeLabel],
            ["Training", "Push-ups + 5 kg squats"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl border border-border bg-card px-3 py-3"
            >
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd className="mt-1 text-sm font-medium leading-snug">{value}</dd>
            </div>
          ))}
        </dl>
        <EnergyBandSwitch
          value={bandId}
          onChange={setBandId}
          todayCalories={plan.calories}
        />
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
              {bandId === "fuel" ? (
                <li>
                  Fuel band bakes in 1½ cups cooked rice (~225 g) and ~150 g
                  cooked protein at lunch and dinner. Snacks stay a single light
                  item — no yogurt plus milk stack.
                </li>
              ) : null}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4" id="week">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h2 className="font-heading text-xl font-semibold">
              2. Mon–Sat meal plan
            </h2>
            <p className="text-sm text-muted-foreground">{lineup.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            {mealPlanLineups.map((entry) => {
              const active = entry.id === lineupId;
              return (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => setLineupId(entry.id)}
                  className={`rounded-full border px-3 py-2 text-sm transition-colors sm:py-1.5 ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:bg-muted"
                  }`}
                >
                  {entry.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile: stacked day cards — desktop keeps the table */}
        <div className="space-y-3 md:hidden">
          {days.map((day) => {
            const today = isCalendarToday(day.day);
            const selectedCard = day.day === selected;
            return (
              <button
                key={day.day}
                type="button"
                ref={today ? todayCardRef : undefined}
                onClick={() => setSelected(day.day)}
                className={`w-full rounded-xl border bg-card p-4 text-left transition-colors ${
                  today
                    ? "border-l-4 border-border border-l-primary bg-primary/8"
                    : selectedCard
                      ? "border-primary/40 bg-muted/40"
                      : "border-border"
                }`}
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{day.day}</p>
                    {today ? <Badge variant="default">Today</Badge> : null}
                  </div>
                  <p className="text-xs text-muted-foreground tabular-nums">
                    ~{day.protein} g · ~{day.calories.toLocaleString()} kcal
                  </p>
                </div>
                <div className="grid gap-3 text-sm">
                  <MobileMealSlot label="Breakfast" meal={day.breakfast} />
                  <MobileMealSlot label="Lunch" meal={day.lunch} />
                  <MobileMealSlot label="Snack" meal={day.snack} />
                  <MobileMealSlot label="Dinner" meal={day.dinner} />
                </div>
              </button>
            );
          })}
        </div>

        <div className="hidden rounded-xl border border-border bg-card md:block">
          <Table className="table-fixed text-sm">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[13%]">Day</TableHead>
                <TableHead className="w-[22%]">Breakfast</TableHead>
                <TableHead className="w-[22%]">Lunch</TableHead>
                <TableHead className="w-[21%]">Snack</TableHead>
                <TableHead className="w-[22%]">Dinner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {days.map((day) => {
                const today = isCalendarToday(day.day);
                const selectedRow = day.day === selected;
                return (
                  <TableRow
                    key={day.day}
                    ref={today ? todayRowRef : undefined}
                    className={
                      today
                        ? "border-l-4 border-l-primary bg-primary/8"
                        : selectedRow
                          ? "bg-muted/60"
                          : undefined
                    }
                  >
                    <TableCell className="align-top font-medium whitespace-normal">
                      <div className="flex flex-col gap-1">
                        <span>{day.day}</span>
                        {today ? (
                          <Badge variant="default" className="w-fit">
                            Today
                          </Badge>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell className="align-top whitespace-normal">
                      <MealTableCell meal={day.breakfast} />
                    </TableCell>
                    <TableCell className="align-top whitespace-normal">
                      <MealTableCell meal={day.lunch} />
                    </TableCell>
                    <TableCell className="align-top whitespace-normal">
                      <MealTableCell meal={day.snack} />
                    </TableCell>
                    <TableCell className="align-top whitespace-normal">
                      <MealTableCell meal={day.dinner} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="space-y-4" id="today">
        <h2 className="font-heading text-xl font-semibold">Day detail</h2>
        <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-2 sm:overflow-x-auto sm:pb-1">
          {days.map((day) => {
            const active = day.day === selected;
            const today = isCalendarToday(day.day);
            return (
              <button
                key={day.day}
                type="button"
                onClick={() => setSelected(day.day)}
                className={`min-h-11 rounded-full border px-3 py-2 text-sm transition-colors sm:min-h-0 sm:shrink-0 sm:py-1.5 ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : today
                      ? "border-primary/60 bg-primary/10 text-foreground ring-2 ring-primary/30"
                      : "border-border bg-card text-foreground hover:bg-muted"
                }`}
              >
                <span className="flex items-center justify-center gap-1.5">
                  {day.short}
                  {today ? (
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wide ${
                        active
                          ? "text-primary-foreground/80"
                          : "text-primary"
                      }`}
                    >
                      Today
                    </span>
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="flex flex-wrap items-center gap-2">
              {plan.day}
              {isCalendarToday(plan.day) ? (
                <Badge variant="default">Today</Badge>
              ) : null}
            </CardTitle>
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
          oil. They are not exact. Target band: 80–95 g protein; calories follow
          the {band.label.toLowerCase()} energy switch ({band.rangeLabel}).
        </p>
        <div className="space-y-2 md:hidden">
          {days.map((day) => {
            const today = isCalendarToday(day.day);
            return (
              <div
                key={day.day}
                className={`rounded-xl border bg-card px-4 py-3 ${
                  today
                    ? "border-l-4 border-border border-l-primary bg-primary/8"
                    : "border-border"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{day.day}</p>
                    {today ? <Badge variant="default">Today</Badge> : null}
                  </div>
                  <p className="text-sm tabular-nums">
                    {day.protein} g · {day.calories.toLocaleString()} kcal
                  </p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{day.notes}</p>
              </div>
            );
          })}
        </div>

        <div className="hidden rounded-xl border border-border bg-card md:block">
          <Table className="table-fixed text-sm">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[18%]">Day</TableHead>
                <TableHead className="w-[16%] text-right whitespace-normal">
                  Approx. protein
                </TableHead>
                <TableHead className="w-[16%] text-right whitespace-normal">
                  Approx. calories
                </TableHead>
                <TableHead className="w-[50%]">Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {days.map((day) => {
                const today = isCalendarToday(day.day);
                return (
                  <TableRow
                    key={day.day}
                    className={
                      today ? "border-l-4 border-l-primary bg-primary/8" : undefined
                    }
                  >
                    <TableCell className="align-top font-medium whitespace-normal">
                      <div className="flex flex-col gap-1">
                        <span>{day.day}</span>
                        {today ? (
                          <Badge variant="default" className="w-fit">
                            Today
                          </Badge>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell className="align-top text-right">
                      {day.protein} g
                    </TableCell>
                    <TableCell className="align-top text-right">
                      {day.calories.toLocaleString()} kcal
                    </TableCell>
                    <TableCell className="align-top text-muted-foreground whitespace-normal">
                      {day.notes}
                    </TableCell>
                  </TableRow>
                );
              })}
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
