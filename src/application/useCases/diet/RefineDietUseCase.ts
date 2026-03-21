import { type DietRepository } from '../../../domain/ports/DietRepository';
import { type Diet } from '../../../domain/models/Diet';

export class RefineDietUseCase {
  constructor(private readonly dietRepo: DietRepository) {}

  async execute(dietId: string, instructions: string): Promise<Diet> {
    return this.dietRepo.refineDiet(dietId, instructions);
  }
}
