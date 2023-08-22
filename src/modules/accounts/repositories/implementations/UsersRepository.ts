import { Repository, getRepository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository{
  private repository: Repository<User>;

  constructor(){
    this.repository = getRepository(User);
  }
  
  async create({ 
    name, 
    // username, 
    email, 
    driver_license, 
    password,
    avatar,
    id
  }: ICreateUserDTO): Promise<void> {
    
    const user = this.repository.create({
      name, 
      // username, 
      email, 
      driver_license, 
      password,
      avatar,
      id
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.repository.findOne({email});
    return user;
  }

  async findById(usr_id: string): Promise<User> {
    const user = this.repository.findOne(usr_id);
    return user;   
  }
}

export { UsersRepository  }