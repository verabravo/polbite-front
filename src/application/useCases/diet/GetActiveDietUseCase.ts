import { type DietRepository } from '../../../domain/ports/DietRepository';
import { type Diet } from '../../../domain/models/Diet';

export class GetActiveDietUseCase {
  constructor(private readonly dietRepo: DietRepository) {}

  async execute(userId: string): Promise<Diet | null> {
    return this.dietRepo.getActiveDiet(userId);
  }
}
