import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  })

  it("Criar um novo carro", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car", 
      description: "Description car", 
      daily_rate: 100, 
      license_plate: "AAA-3456", 
      fine_amount: 60, 
      brand: "Brand", 
      category_id: "category"
    });

    expect(car).toHaveProperty("id");
  });

  it("Criar um carro com placa já existente", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car 1", 
        description: "Description car", 
        daily_rate: 100, 
        license_plate: "AAA-3456", 
        fine_amount: 60, 
        brand: "Brand", 
        category_id: "category"
      });

      await createCarUseCase.execute({
        name: "Car 2", 
        description: "Description car", 
        daily_rate: 100, 
        license_plate: "AAA-3456", 
        fine_amount: 60, 
        brand: "Brand", 
        category_id: "category"
      });
    });
  });

  it("Criar um carro com disponibilidade", async () => {
   const car = await createCarUseCase.execute({
    name: "Name Car", 
    description: "Description car", 
    daily_rate: 100, 
    license_plate: "AAA-3456", 
    fine_amount: 60, 
    brand: "Brand", 
    category_id: "category"
   });

   expect(car.available).toBe(true);

  });
});