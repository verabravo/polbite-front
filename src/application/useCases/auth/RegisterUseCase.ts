import { type AuthRepository, type RegisterCredentials } from '../../../domain/ports/AuthRepository';
import { type User } from '../../../domain/models/User';

export class RegisterUseCase {
  constructor(private readonly authRepo: AuthRepository) {}

  async execute(credentials: RegisterCredentials): Promise<User> {
    const { user } = await this.authRepo.register(credentials);
    return user;
  }
}
