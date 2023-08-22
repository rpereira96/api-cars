import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";
import { AppError } from "../errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAutheticated(request: Request, response: Response, next: NextFunction) {
  
  const authHeader = request.headers.authorization;

  if(!authHeader){
    throw new AppError("Token missing", 401);
  }

  const [bearer, token] = authHeader.split(" ");
  
  try {
    const { sub: user_id } = verify(token, "8aef63d277a81a4627a6d9908d7b6872") as IPayload;
    
    const usersRepository = new UsersRepository();
    const userAlreadyExists = usersRepository.findById(user_id);

    if(!userAlreadyExists){
      throw new AppError("User does not exists!", 401);
    }

    next();
  } catch (error) {
    throw new AppError("Invalid token!", 401);
  }
}