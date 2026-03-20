import { useState } from 'react';
import { useNavigate } from 'react-router';
import StepIndicator from './StepIndicator';
import Step1Goal from './Step1Goal';
import Step2BodyData from './Step2BodyData';
import Step3Activity from './Step3Activity';
import Step4Food from './Step4Food';
import Step5Summary from './Step5Summary';

export default function OnboardingScreen() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    goal: '',
    bodyData: null,
    activity: null,
    food: null,
  });

  const handleStep1Next = (goal: string) => {
    setFormData({ ...formData, goal });
    setCurrentStep(1);
  };

  const handleStep2Next = (bodyData: any) => {
    setFormData({ ...formData, bodyData });
    setCurrentStep(2);
  };

  const handleStep3Next = (activity: any) => {
    setFormData({ ...formData, activity });
    setCurrentStep(3);
  };

  const handleStep4Next = (food: any) => {
    setFormData({ ...formData, food });
    setCurrentStep(4);
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleEdit = (step: number) => {
    setCurrentStep(step - 1);
  };

  const handleComplete = () => {
    // Navigate to main app or dashboard
    console.log('Onboarding completed with data:', formData);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[390px] mx-auto">
      <StepIndicator currentStep={currentStep} totalSteps={5} />

      {currentStep === 0 && <Step1Goal onNext={handleStep1Next} />}
      {currentStep === 1 && <Step2BodyData onNext={handleStep2Next} onBack={handleBack} />}
      {currentStep === 2 && <Step3Activity onNext={handleStep3Next} onBack={handleBack} />}
      {currentStep === 3 && <Step4Food onNext={handleStep4Next} onBack={handleBack} />}
      {currentStep === 4 && formData.goal && formData.bodyData && formData.activity && formData.food && (
        <Step5Summary
          onBack={handleBack}
          onEdit={handleEdit}
          onComplete={handleComplete}
          data={{
            goal: formData.goal,
            bodyData: formData.bodyData,
            activity: formData.activity,
            food: formData.food,
          }}
        />
      )}
    </div>
  );
}
