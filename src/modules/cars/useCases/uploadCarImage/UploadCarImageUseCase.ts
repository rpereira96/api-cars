import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { inject, injectable } from "tsyringe";

interface Irequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImageRepository: ICarsImagesRepository
  ){}

  async execute({car_id, images_name}: Irequest): Promise<void>{
    images_name.map(async (image) => {
      await this.carsImageRepository.create(car_id, image)
    })
  }
}

export { UploadCarImageUseCase }