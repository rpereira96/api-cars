import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateUserUseCase { 
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}
  
  async execute({name, email, password, driver_license}: ICreateUserDTO): Promise<void>{
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if(userAlreadyExists){
      throw new AppError("User already exists");
    }

    const passwordHash = await hash(password, 8);

    await this.userRepository.create({
      name, 
      // username, 
      email, 
      password: passwordHash, 
      driver_license
    });
  }
}

export { CreateUserUseCase }