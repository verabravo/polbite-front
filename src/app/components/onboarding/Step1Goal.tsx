import { useState } from 'react';
import { ArrowDown, ArrowUp, Scale, Dumbbell } from 'lucide-react';

interface Step1GoalProps {
  onNext: (goal: string) => void;
}

const goals = [
  { id: 'perder', label: 'Perder peso', icon: ArrowDown },
  { id: 'ganar', label: 'Ganar peso', icon: ArrowUp },
  { id: 'mantener', label: 'Mantener peso', icon: Scale },
  { id: 'musculo', label: 'Ganar músculo', icon: Dumbbell },
];

export default function Step1Goal({ onNext }: Step1GoalProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex-1 flex flex-col px-6">
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-[28px] mb-2 text-foreground">
          ¿Cuál es tu objetivo?
        </h1>
        <p className="text-muted-foreground">
          Esto nos ayuda a personalizar tu dieta
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {goals.map((goal) => {
          const Icon = goal.icon;
          return (
            <button
              key={goal.id}
              onClick={() => setSelected(goal.id)}
              className={`p-6 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center justify-center gap-3 min-h-[140px] ${
                selected === goal.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-card hover:border-primary/40'
              }`}
            >
              <Icon
                className={`w-8 h-8 ${
                  selected === goal.id ? 'text-primary' : 'text-muted-foreground'
                }`}
              />
              <span className="text-center">{goal.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-auto pb-8">
        <button
          onClick={() => selected && onNext(selected)}
          disabled={!selected}
          className={`w-full py-4 rounded-xl transition-all duration-200 ${
            selected
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
