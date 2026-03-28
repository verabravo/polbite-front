export type AIRecommendation = 'KEEP_PLAN' | 'ADJUST_PLAN' | 'NEW_PLAN';

export interface WeeklyReview {
  id: string;
  user_id: string;
  weight_kg: number;
  height_cm: number | null;
  week_comment: string | null;
  diet_feedback: string | null;
  ai_analysis: string;
  ai_recommendation: AIRecommendation;
  created_at: string;
}
