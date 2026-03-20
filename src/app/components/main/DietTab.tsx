import { useState } from "react";

type Day = "L" | "M" | "X" | "J" | "V" | "S" | "D";

interface Meal {
  label: string;
  name: string;
  ingredients: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const mealsData: Record<Day, Meal[]> = {
  L: [
    {
      label: "Desayuno",
      name: "Tostada integral con tomate y aceite de oliva",
      ingredients: "Pan integral, tomate maduro, aceite de oliva virgen extra",
      calories: 320,
      protein: 12,
      carbs: 48,
      fat: 9,
    },
    {
      label: "Comida",
      name: "Pollo al ajillo con patatas asadas",
      ingredients: "Pechuga de pollo, ajo, patatas, aceite de oliva, perejil",
      calories: 580,
      protein: 45,
      carbs: 52,
      fat: 18,
    },
    {
      label: "Cena",
      name: "Merluza a la plancha con verduras salteadas",
      ingredients: "Merluza fresca, calabacín, pimiento, cebolla, limón",
      calories: 385,
      protein: 42,
      carbs: 28,
      fat: 12,
    },
  ],
  M: [
    {
      label: "Desayuno",
      name: "Yogur griego con frutos secos y miel",
      ingredients: "Yogur griego natural, almendras, nueces, miel",
      calories: 340,
      protein: 18,
      carbs: 32,
      fat: 15,
    },
    {
      label: "Comida",
      name: "Lentejas estofadas con verduras",
      ingredients: "Lentejas, zanahoria, cebolla, pimiento, tomate",
      calories: 520,
      protein: 28,
      carbs: 78,
      fat: 8,
    },
    {
      label: "Cena",
      name: "Tortilla de espinacas con ensalada mixta",
      ingredients: "Huevos, espinacas frescas, lechuga, tomate cherry",
      calories: 380,
      protein: 24,
      carbs: 18,
      fat: 22,
    },
  ],
  X: [],
  J: [],
  V: [],
  S: [],
  D: [],
};

export default function DietTab() {
  const [selectedDay, setSelectedDay] = useState<Day>("L");
  const [isEmpty, setIsEmpty] = useState(false);

  const days: Day[] = ["L", "M", "X", "J", "V", "S", "D"];
  const meals = mealsData[selectedDay];

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0);

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6">
        <div className="w-40 h-40 mb-8 rounded-full bg-gradient-to-br from-[#7a956b]/10 to-[#d07654]/10 flex items-center justify-center">
          <svg
            className="w-20 h-20 text-[#7a956b]/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3v18M3 12h18" />
          </svg>
        </div>
        <h2 className="text-2xl font-serif text-[#2d3319] mb-3">
          Aún no tienes una dieta
        </h2>
        <p className="text-[#6b7058] text-center mb-8 max-w-sm">
          Crea tu primera dieta personalizada basada en tus objetivos y
          preferencias
        </p>
        <button
          onClick={() => setIsEmpty(false)}
          className="bg-[#7a956b] text-white px-8 py-4 rounded-3xl font-medium hover:bg-[#6b8359] transition-colors shadow-lg"
        >
          Generar mi primera dieta
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 pb-8">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-serif text-[#2d3319] mb-4">Tu dieta</h1>

        {/* Daily summary card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e8e5df]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#6b7058] text-sm">Hoy</span>
            <span className="text-2xl font-serif text-[#2d3319]">
              ~{totalCalories} kcal
            </span>
          </div>

          {/* Macro bars */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#6b7058] w-4">P</span>
              <div className="flex-1 h-2 bg-[#faf8f5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#d07654]"
                  style={{ width: `${(totalProtein / 150) * 100}%` }}
                />
              </div>
              <span className="text-xs text-[#6b7058] w-12 text-right">
                {totalProtein}g
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#6b7058] w-4">C</span>
              <div className="flex-1 h-2 bg-[#faf8f5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#8fa882]"
                  style={{ width: `${(totalCarbs / 200) * 100}%` }}
                />
              </div>
              <span className="text-xs text-[#6b7058] w-12 text-right">
                {totalCarbs}g
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#6b7058] w-4">G</span>
              <div className="flex-1 h-2 bg-[#faf8f5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#e8945f]"
                  style={{ width: `${(totalFat / 80) * 100}%` }}
                />
              </div>
              <span className="text-xs text-[#6b7058] w-12 text-right">
                {totalFat}g
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Day selector */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`flex-shrink-0 w-12 h-12 rounded-full font-medium transition-all ${
              selectedDay === day
                ? "bg-[#7a956b] text-white shadow-md"
                : "bg-white text-[#7a956b] border border-[#e8e5df] hover:border-[#7a956b]"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Meal list */}
      {meals.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[#6b7058]/60">No hay comidas planificadas para este día</p>
        </div>
      ) : (
        <div className="space-y-4">
          {meals.map((meal, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 shadow-sm border border-[#e8e5df]"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs uppercase tracking-wide text-[#d07654] font-medium">
                  {meal.label}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-[#2d3319]">
                    {meal.calories} kcal
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-serif text-[#2d3319] mb-2 leading-snug">
                {meal.name}
              </h3>

              <p className="text-sm text-[#6b7058] mb-3">{meal.ingredients}</p>

              <div className="flex gap-2">
                <span className="px-2 py-1 bg-[#d07654]/10 text-[#d07654] text-xs rounded-full font-medium">
                  P: {meal.protein}g
                </span>
                <span className="px-2 py-1 bg-[#8fa882]/10 text-[#6b7058] text-xs rounded-full font-medium">
                  C: {meal.carbs}g
                </span>
                <span className="px-2 py-1 bg-[#e8945f]/10 text-[#e8945f] text-xs rounded-full font-medium">
                  G: {meal.fat}g
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating action button */}
      <button className="fixed bottom-24 right-6 bg-[#7a956b] text-white px-6 py-4 rounded-full shadow-2xl hover:bg-[#6b8359] transition-all hover:scale-105 font-medium flex items-center gap-2">
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
        </svg>
        Refinar dieta
      </button>
    </div>
  );
}
