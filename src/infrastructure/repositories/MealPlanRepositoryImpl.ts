import axios from 'axios';
import { api } from '../api/axiosClient';
import {
  type MealPlanRepository,
  type CreateMealPlanPayload,
  type AddMealPayload,
} from '../../domain/ports/MealPlanRepository';
import { type MealPlan, type DayPlan } from '../../domain/models/MealPlan';

export class MealPlanRepositoryImpl implements MealPlanRepository {
  async getMealPlan(): Promise<MealPlan | null> {
    try {
      const { data } = await api.get<MealPlan>('/api/meal-plans/');
      return data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) return null;
      throw err;
    }
  }

  async getMealPlanForDay(dayOfWeek: number): Promise<DayPlan> {
    const { data } = await api.get<DayPlan>(`/api/meal-plans/day/${dayOfWeek}/`);
    return data;
  }

  async createMealPlan(payload: CreateMealPlanPayload): Promise<void> {
    await api.post('/api/meal-plans/', payload);
  }

  async deleteMealPlan(): Promise<void> {
    await api.delete('/api/meal-plans/');
  }

  async addMeal(meal: AddMealPayload): Promise<void> {
    await api.post('/api/meal-plans/meals/', meal);
  }

  async removeMeal(dayOfWeek: number, order: number): Promise<void> {
    await api.delete(`/api/meal-plans/meals/${dayOfWeek}/${order}/`);
  }

  async updateMeal(dayOfWeek: number, order: number, items: { food_id: string; quantity_grams: number }[]): Promise<void> {
    await api.put(`/api/meal-plans/meals/${dayOfWeek}/${order}/`, { items });
  }
}
