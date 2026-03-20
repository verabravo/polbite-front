import { useState } from 'react';

interface Step3ActivityProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

const activityLevels = [
  {
    id: 'sedentario',
    title: 'Sedentario',
    description: 'Trabajo de oficina, poco movimiento',
  },
  {
    id: 'ligero',
    title: 'Ligeramente activo',
    description: 'Paseos, actividad ligera',
  },
  {
    id: 'moderado',
    title: 'Moderadamente activo',
    description: 'Ejercicio 3-4 veces/semana',
  },
  {
    id: 'muy-activo',
    title: 'Muy activo',
    description: 'Ejercicio intenso 5-6 veces/semana',
  },
  {
    id: 'extremo',
    title: 'Extremadamente activo',
    description: 'Atleta o trabajo muy físico',
  },
];

const sports = [
  'gimnasio',
  'running',
  'natación',
  'ciclismo',
  'fútbol',
  'yoga',
  'ninguno',
  'otro',
];

export default function Step3Activity({ onNext, onBack }: Step3ActivityProps) {
  const [activityLevel, setActivityLevel] = useState<string | null>(null);
  const [sport, setSport] = useState<string | null>(null);
  const [frequency, setFrequency] = useState(3);

  const isValid = activityLevel && sport;

  return (
    <div className="flex-1 flex flex-col px-6 overflow-y-auto">
      <div className="mb-6">
        <h1 className="font-[family-name:var(--font-display)] text-[28px] mb-2 text-foreground">
          Tu nivel de actividad
        </h1>
      </div>

      <div className="space-y-3 mb-6">
        {activityLevels.map((level) => (
          <button
            key={level.id}
            onClick={() => setActivityLevel(level.id)}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
              activityLevel === level.id
                ? 'border-primary bg-primary/5'
                : 'border-border bg-card hover:border-primary/40'
            }`}
          >
            <div className="font-medium mb-1">{level.title}</div>
            <div className="text-sm text-muted-foreground">{level.description}</div>
          </button>
        ))}
      </div>

      <div className="mb-6">
        <label className="block mb-3 text-foreground">Tipo de deporte</label>
        <div className="flex flex-wrap gap-2">
          {sports.map((s) => (
            <button
              key={s}
              onClick={() => setSport(s)}
              className={`px-4 py-2 rounded-full border-2 transition-all duration-200 capitalize ${
                sport === s
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card hover:border-primary/40'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <label className="block mb-3 text-foreground">Frecuencia</label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="7"
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value))}
            className="flex-1 h-2 bg-muted rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer"
          />
          <span className="min-w-[80px] text-center font-medium">
            {frequency} {frequency === 1 ? 'día' : 'días'}/semana
          </span>
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
          onClick={() =>
            onNext({
              activityLevel,
              sport,
              frequency,
            })
          }
          disabled={!isValid}
          className={`flex-1 py-4 rounded-xl transition-all duration-200 ${
            isValid
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
