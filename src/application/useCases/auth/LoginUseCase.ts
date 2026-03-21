import { type AuthRepository, type LoginCredentials } from '../../../domain/ports/AuthRepository';
import { type User } from '../../../domain/models/User';

export class LoginUseCase {
  constructor(private readonly authRepo: AuthRepository) {}

  async execute(credentials: LoginCredentials): Promise<User> {
    const { user } = await this.authRepo.login(credentials);
    return user;
  }
}
