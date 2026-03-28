import { type AuthRepository } from '../../../domain/ports/AuthRepository';
import { type User } from '../../../domain/models/User';

export class CheckAuthUseCase {
  constructor(private readonly repo: AuthRepository) {}

  async hasValidSession(): Promise<boolean> {
    const tokens = await this.repo.getStoredTokens();
    return tokens !== null;
  }

  async getStoredUserId(): Promise<string | null> {
    return this.repo.getStoredUserId();
  }

  async getStoredUser(): Promise<Pick<User, 'name' | 'email'> | null> {
    return this.repo.getStoredUser();
  }
}
