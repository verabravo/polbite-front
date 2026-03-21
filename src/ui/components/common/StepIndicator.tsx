import React from 'react';
import { View } from 'react-native';

interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

export function StepIndicator({ totalSteps, currentStep }: StepIndicatorProps) {
  return (
    <View className="flex-row gap-1.5 mb-8">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <View
          key={i}
          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
            i < currentStep ? 'bg-primary' : 'bg-muted'
          }`}
        />
      ))}
    </View>
  );
}
