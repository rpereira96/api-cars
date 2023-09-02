import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUserCase } from "./AuthenticateUserUserCase";

let autheticateUserUseCase: AuthenticateUserUserCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    autheticateUserUseCase = new AuthenticateUserUserCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);  
  });

  it("Autenticar um usuário", async () => {
    const user: ICreateUserDTO = {
      driver_license: "00123",
      email: "teste@test.com",
      password: "1234",
      name: "User Test"
    };

    await createUserUseCase.execute(user);

    const result = await autheticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("autenticar um usuario não existente", async () => {
    await expect(autheticateUserUseCase.execute({
        email: "false@email.com",
        password: "1234",
      })).rejects.toEqual(new AppError("Email or password incorrect!"));
  });

  it("autenticar um usuario com a senha incorreta",async () => {
    const user: ICreateUserDTO = {
      driver_license: "999",
      email: "user@user.com",
      password: "1234",
      name: "user test error"
    };

    await createUserUseCase.execute(user);
    
    await expect(autheticateUserUseCase.execute({
        email: "user@user.com",
        password: "seila",
      })).rejects.toEqual(new AppError("Email or password incorrect!"));
  });
});