// src/repositories/user.repository.ts
import { AppDataSource } from "../config/database";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";

export class UserRepository {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  /* Register User */
  public async registerUser(userData: Partial<User>) {
    return await this.userRepository.save(userData);
  }

  /* Login User */
  public async loginUser(email: string, password: string) {
    return await this.userRepository.findOne({ where: { email } });
  }
}
