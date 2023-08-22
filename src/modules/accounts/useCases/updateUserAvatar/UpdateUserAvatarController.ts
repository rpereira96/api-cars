import { Request, Response } from "express";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";
import { container } from "tsyringe";

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response>{
    const { id } = request.user;
    const avatarFile = request.file.filename;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({user_id: id, avatarFile});

    return response.status(204).send();
  }
}

export { UpdateUserAvatarController }