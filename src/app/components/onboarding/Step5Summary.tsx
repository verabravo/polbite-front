import { useState, useEffect } from 'react';
import { Pencil, Loader2 } from 'lucide-react';

interface Step5SummaryProps {
  onBack: () => void;
  onEdit: (step: number) => void;
  onComplete: () => void;
  data: {
    goal: string;
    bodyData: any;
    activity: any;
    food: any;
  };
}

const goalLabels: Record<string, string> = {
  perder: 'Perder peso',
  ganar: 'Ganar peso',
  mantener: 'Mantener peso',
  musculo: 'Ganar músculo',
};

const activityLabels: Record<string, string> = {
  sedentario: 'Sedentario',
  ligero: 'Ligeramente activo',
  moderado: 'Moderadamente activo',
  'muy-activo': 'Muy activo',
  extremo: 'Extremadamente activo',
};

const loadingMessages = [
  'Analizando tu perfil...',
  'Diseñando tu plan nutricional...',
  'Calculando macronutrientes...',
  'Personalizando tus recomendaciones...',
];

export default function Step5Summary({ onBack, onEdit, onComplete, data }: Step5SummaryProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleConfirm = () => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      onComplete();
    }, 8000);
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <Loader2 className="w-16 h-16 text-primary animate-spin mb-6" />
        <p className="text-xl text-center text-foreground font-medium">
          {loadingMessages[messageIndex]}
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col px-6 overflow-y-auto">
      <div className="mb-6">
        <h1 className="font-[family-name:var(--font-display)] text-[28px] mb-2 text-foreground">
          Revisa tu perfil
        </h1>
      </div>

      <div className="space-y-3 mb-8">
        <div className="bg-card rounded-2xl p-4 border-2 border-border">
          <div className="flex items-start justify-between mb-2">
            <span className="text-sm text-muted-foreground">Objetivo</span>
            <button
              onClick={() => onEdit(1)}
              className="text-primary hover:bg-primary/10 p-1.5 rounded-lg transition-colors"
            >
              <Pencil className="w-4 h-4" />
            </button>
          </div>
          <p className="font-medium">{goalLabels[data.goal]}</p>
        </div>

        <div className="bg-card rounded-2xl p-4 border-2 border-border">
          <div className="flex items-start justify-between mb-2">
            <span className="text-sm text-muted-foreground">Datos corporales</span>
            <button
              onClick={() => onEdit(2)}
              className="text-primary hover:bg-primary/10 p-1.5 rounded-lg transition-colors"
            >
              <Pencil className="w-4 h-4" />
            </button>
          </div>
          <p className="font-medium">
            {data.bodyData.weight} kg · {data.bodyData.height} cm
          </p>
        </div>

        <div className="bg-card rounded-2xl p-4 border-2 border-border">
          <div className="flex items-start justify-between mb-2">
            <span className="text-sm text-muted-foreground">Actividad física</span>
            <button
              onClick={() => onEdit(3)}
              className="text-primary hover:bg-primary/10 p-1.5 rounded-lg transition-colors"
            >
              <Pencil className="w-4 h-4" />
            </button>
          </div>
          <p className="font-medium">
            {activityLabels[data.activity.activityLevel]} · {data.activity.sport} ·{' '}
            {data.activity.frequency} {data.activity.frequency === 1 ? 'día' : 'días'}/semana
          </p>
        </div>

        <div className="bg-card rounded-2xl p-4 border-2 border-border">
          <div className="flex items-start justify-between mb-2">
            <span className="text-sm text-muted-foreground">Alimentación</span>
            <button
              onClick={() => onEdit(4)}
              className="text-primary hover:bg-primary/10 p-1.5 rounded-lg transition-colors"
            >
              <Pencil className="w-4 h-4" />
            </button>
          </div>
          {data.food.excluded.length > 0 || data.food.allergies.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {data.food.excluded.map((item: string) => (
                <span
                  key={item}
                  className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
              {data.food.allergies.map((allergy: string) => (
                <span
                  key={allergy}
                  className="px-3 py-1 bg-destructive/10 text-destructive rounded-full text-sm capitalize"
                >
                  {allergy}
                </span>
              ))}
            </div>
          ) : (
            <p className="font-medium text-muted-foreground">Sin restricciones</p>
          )}
        </div>
      </div>

      <div className="mt-auto pb-8 flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-4 rounded-xl border-2 border-primary text-primary hover:bg-primary/5 transition-colors"
        >
          Anterior
        </button>
        <button
          onClick={handleConfirm}
          className="flex-1 py-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Confirmar y generar mi dieta
        </button>
      </div>
    </div>
  );
}
