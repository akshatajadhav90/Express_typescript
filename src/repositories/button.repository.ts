// src/repositories/product.repository.ts
import { AppDataSource } from "../config/database";
import { Button } from "../entities/buttons.entity";
import { Repository } from "typeorm";

export class ButtonRepository {
  private buttonRepository: Repository<Button>;

  constructor() {
    this.buttonRepository = AppDataSource.getRepository(Button);
  }

  public async createNewButton(data: object): Promise<Button> {
    try{
    const newProduct = this.buttonRepository.create(data);
    return await this.buttonRepository.save(newProduct);
    }
    catch(error)
    {
      throw error;
    }
  }
}
