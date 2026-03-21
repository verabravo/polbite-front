export interface WeeklyReview {
  id: string;
  userId: string;
  dietId: string;
  weekStartDate: string;
  adherencePercent: number;
  weightKg?: number;
  energyLevel: 1 | 2 | 3 | 4 | 5;
  hungerLevel: 1 | 2 | 3 | 4 | 5;
  notes?: string;
  createdAt: string;
}
