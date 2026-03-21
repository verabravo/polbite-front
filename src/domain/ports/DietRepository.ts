import { type Diet } from '../models/Diet';

export interface DietRepository {
  getActiveDiet(userId: string): Promise<Diet | null>;
  getDiet(dietId: string): Promise<Diet>;
  generateDiet(userId: string): Promise<Diet>;
  refineDiet(dietId: string, instructions: string): Promise<Diet>;
}
