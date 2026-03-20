interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex gap-2 px-6 py-6">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
            i < currentStep
              ? 'bg-primary'
              : i === currentStep
              ? 'bg-primary'
              : 'bg-muted'
          }`}
        />
      ))}
    </div>
  );
}
