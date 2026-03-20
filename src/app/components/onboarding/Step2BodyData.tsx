import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Step2BodyDataProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function Step2BodyData({ onNext, onBack }: Step2BodyDataProps) {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [expandedMeasures, setExpandedMeasures] = useState(false);
  const [measures, setMeasures] = useState({
    ombligo: '',
    pecho: '',
    cintura: '',
    caderas: '',
    piernas: '',
  });

  const isValid = weight && height;

  return (
    <div className="flex-1 flex flex-col px-6">
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-[28px] mb-2 text-foreground">
          Tus datos corporales
        </h1>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block mb-2 text-foreground">Peso (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="75"
            className="w-full px-4 py-3 bg-input-background rounded-xl border-2 border-transparent focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block mb-2 text-foreground">Altura (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="168"
            className="w-full px-4 py-3 bg-input-background rounded-xl border-2 border-transparent focus:border-primary focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="mb-6">
        <button
          onClick={() => setExpandedMeasures(!expandedMeasures)}
          className="w-full flex items-center justify-between py-3 text-primary"
        >
          <span>Añadir medidas corporales (opcional)</span>
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-200 ${
              expandedMeasures ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedMeasures && (
          <div className="grid grid-cols-2 gap-3 mt-4">
            {Object.keys(measures).map((key) => (
              <div key={key}>
                <label className="block mb-2 text-sm capitalize">{key} (cm)</label>
                <input
                  type="number"
                  value={measures[key as keyof typeof measures]}
                  onChange={(e) =>
                    setMeasures({ ...measures, [key]: e.target.value })
                  }
                  placeholder="0"
                  className="w-full px-4 py-2 bg-input-background rounded-xl border-2 border-transparent focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            ))}
          </div>
        )}
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
              weight,
              height,
              measures: expandedMeasures ? measures : undefined,
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
