import { type AuthRepository, type AuthTokens } from '../../../domain/ports/AuthRepository';

export class CheckAuthUseCase {
  constructor(private readonly repo: AuthRepository) {}

  async hasValidSession(): Promise<boolean> {
    const tokens = await this.repo.getStoredTokens();
    return tokens !== null;
  }

  async getStoredUserId(): Promise<string | null> {
    return this.repo.getStoredUserId();
  }
}
