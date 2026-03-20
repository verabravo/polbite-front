import { useState } from 'react';
import { X, Search } from 'lucide-react';

interface Step4FoodProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

const suggestions = ['cerdo', 'mariscos', 'vísceras', 'picante'];
const allergies = ['lactosa', 'gluten', 'frutos secos', 'marisco', 'huevo', 'soja', 'otro'];

export default function Step4Food({ onNext, onBack }: Step4FoodProps) {
  const [excluded, setExcluded] = useState<string[]>([]);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const addExcluded = (item: string) => {
    if (!excluded.includes(item)) {
      setExcluded([...excluded, item]);
    }
    setSearchValue('');
  };

  const removeExcluded = (item: string) => {
    setExcluded(excluded.filter((i) => i !== item));
  };

  const toggleAllergy = (allergy: string) => {
    if (selectedAllergies.includes(allergy)) {
      setSelectedAllergies(selectedAllergies.filter((a) => a !== allergy));
    } else {
      setSelectedAllergies([...selectedAllergies, allergy]);
    }
  };

  return (
    <div className="flex-1 flex flex-col px-6 overflow-y-auto">
      <div className="mb-6">
        <h1 className="font-[family-name:var(--font-display)] text-[28px] mb-2 text-foreground">
          Alimentos y alergias
        </h1>
      </div>

      <div className="mb-6">
        <label className="block mb-3 text-foreground">Alimentos que no quieres</label>

        <div className="relative mb-3">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchValue.trim()) {
                addExcluded(searchValue.trim());
              }
            }}
            placeholder="Buscar alimentos..."
            className="w-full pl-12 pr-4 py-3 bg-input-background rounded-xl border-2 border-transparent focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        {excluded.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {excluded.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/10 text-secondary rounded-full"
              >
                {item}
                <button
                  onClick={() => removeExcluded(item)}
                  className="hover:bg-secondary/20 rounded-full p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {suggestions.map((item) => (
            <button
              key={item}
              onClick={() => addExcluded(item)}
              className={`px-4 py-2 rounded-full border-2 transition-all duration-200 ${
                excluded.includes(item)
                  ? 'border-secondary/30 bg-secondary/5 opacity-50'
                  : 'border-border bg-card hover:border-primary/40'
              }`}
              disabled={excluded.includes(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-3 text-foreground">Alergias</label>
        <div className="flex flex-wrap gap-2">
          {allergies.map((allergy) => (
            <button
              key={allergy}
              onClick={() => toggleAllergy(allergy)}
              className={`px-4 py-2 rounded-full border-2 transition-all duration-200 capitalize ${
                selectedAllergies.includes(allergy)
                  ? 'border-secondary bg-secondary text-secondary-foreground'
                  : 'border-border bg-card hover:border-secondary/40'
              }`}
            >
              {allergy}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          Puedes dejarlo vacío si no tienes restricciones
        </p>
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
              excluded,
              allergies: selectedAllergies,
            })
          }
          className="flex-1 py-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
