import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

type Metric = "peso" | "ombligo" | "pecho" | "cintura" | "caderas" | "piernas";

interface WeightRecord {
  date: string;
  weight: number;
  displayDate: string;
}

const weightData = [
  { date: "20 Ene", weight: 75.0 },
  { date: "27 Ene", weight: 74.6 },
  { date: "3 Feb", weight: 74.2 },
  { date: "10 Feb", weight: 73.8 },
  { date: "17 Feb", weight: 73.5 },
  { date: "24 Feb", weight: 73.4 },
  { date: "3 Mar", weight: 73.2 },
  { date: "10 Mar", weight: 73.2 },
];

const records: WeightRecord[] = [
  { date: "2026-03-10", weight: 73.2, displayDate: "10 Mar" },
  { date: "2026-03-03", weight: 73.2, displayDate: "3 Mar" },
  { date: "2026-02-24", weight: 73.4, displayDate: "24 Feb" },
  { date: "2026-02-17", weight: 73.5, displayDate: "17 Feb" },
  { date: "2026-02-10", weight: 73.8, displayDate: "10 Feb" },
  { date: "2026-02-03", weight: 74.2, displayDate: "3 Feb" },
  { date: "2026-01-27", weight: 74.6, displayDate: "27 Ene" },
  { date: "2026-01-20", weight: 75.0, displayDate: "20 Ene" },
];

export default function ProgressTab() {
  const [selectedMetric, setSelectedMetric] = useState<Metric>("peso");
  const [isEmpty, setIsEmpty] = useState(false);

  const metrics: { key: Metric; label: string }[] = [
    { key: "peso", label: "Peso" },
    { key: "ombligo", label: "Ombligo" },
    { key: "pecho", label: "Pecho" },
    { key: "cintura", label: "Cintura" },
    { key: "caderas", label: "Caderas" },
    { key: "piernas", label: "Piernas" },
  ];

  const currentWeight = 73.2;
  const previousWeight = 75.0;
  const weightChange = currentWeight - previousWeight;

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
            <path d="M3 3v16a2 2 0 0 0 2 2h16" />
            <path d="m19 9-5 5-4-4-3 3" />
          </svg>
        </div>
        <h2 className="text-2xl font-serif text-[#2d3319] mb-3">
          Registra tu primer peso
        </h2>
        <p className="text-[#6b7058] text-center mb-8 max-w-sm">
          Comienza a hacer seguimiento de tu progreso registrando tus medidas
          corporales
        </p>
        <button
          onClick={() => setIsEmpty(false)}
          className="bg-[#7a956b] text-white px-8 py-4 rounded-3xl font-medium hover:bg-[#6b8359] transition-colors shadow-lg"
        >
          Añadir registro
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 pb-8">
      {/* Header */}
      <h1 className="text-2xl font-serif text-[#2d3319] mb-4">Tu progreso</h1>

      {/* Summary card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8e5df] mb-6">
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="text-5xl font-serif text-[#2d3319] mb-1">
              {currentWeight} kg
            </div>
            <div className="text-sm text-[#6b7058]">Hace 3 días</div>
          </div>
          <div className="flex items-center gap-1 text-[#4A7C59] bg-[#4A7C59]/10 px-3 py-2 rounded-full">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M19 9l-7 7-7-7" transform="rotate(180 12 12.5)" />
            </svg>
            <span className="font-medium">{weightChange.toFixed(1)} kg</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e8e5df] mb-4">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={weightData}>
            <defs>
              <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7a956b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7a956b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8e5df" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#6b7058", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#e8e5df" }}
            />
            <YAxis
              domain={[72, 76]}
              tick={{ fill: "#6b7058", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#e8e5df" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e8e5df",
                borderRadius: "12px",
                fontSize: "14px",
              }}
              labelStyle={{ color: "#2d3319", fontWeight: "500" }}
            />
            <Area
              type="monotone"
              dataKey="weight"
              stroke="#7a956b"
              strokeWidth={2}
              fill="url(#weightGradient)"
              dot={{ fill: "#7a956b", strokeWidth: 2, r: 4, stroke: "white" }}
              activeDot={{ r: 6, fill: "#7a956b", stroke: "white", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Metric selector pills */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {metrics.map((metric) => (
          <button
            key={metric.key}
            onClick={() => setSelectedMetric(metric.key)}
            className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all ${
              selectedMetric === metric.key
                ? "bg-[#7a956b] text-white shadow-md"
                : "bg-white text-[#7a956b] border border-[#e8e5df] hover:border-[#7a956b]"
            }`}
          >
            {metric.label}
          </button>
        ))}
      </div>

      {/* Record list */}
      <div className="space-y-3">
        <h2 className="text-lg font-serif text-[#2d3319] mb-3">Historial</h2>
        {records.map((record, index) => {
          const previousRecord = records[index + 1];
          const change = previousRecord ? record.weight - previousRecord.weight : 0;

          return (
            <div
              key={record.date}
              className="bg-white rounded-2xl p-4 shadow-sm border border-[#e8e5df] flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#7a956b]/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-[#7a956b]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                </div>
                <div>
                  <div className="text-[#2d3319] font-medium">
                    {record.weight} kg
                  </div>
                  <div className="text-sm text-[#6b7058]">{record.displayDate}</div>
                </div>
              </div>

              {change !== 0 && (
                <div
                  className={`flex items-center gap-1 ${
                    change < 0 ? "text-[#4A7C59]" : "text-[#d07654]"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    style={{
                      transform: change < 0 ? "rotate(180deg)" : "none",
                    }}
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="text-sm font-medium">
                    {Math.abs(change).toFixed(1)} kg
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Floating action button */}
      <button className="fixed bottom-24 right-6 bg-[#7a956b] text-white w-14 h-14 rounded-full shadow-2xl hover:bg-[#6b8359] transition-all hover:scale-105 flex items-center justify-center">
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </div>
  );
}
