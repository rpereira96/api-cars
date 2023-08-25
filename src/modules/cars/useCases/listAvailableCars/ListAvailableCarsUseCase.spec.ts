import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("Lista de carros disponíveis", async() => {

    const car = await carsRepositoryInMemory.create({
      name: "fluence braco", 
      description: "carro branco", 
      daily_rate: 110.00, 
      license_plate: "ABC-5678", 
      fine_amount: 100, 
      brand: "Reanult", 
      category_id: "92aee8c3-78e8-4a22-b49b-24f4e1505d8f" 
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("Listar carros pela marca", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "fluence", 
      description: "carro", 
      daily_rate: 110.00, 
      license_plate: "ABC-5678", 
      fine_amount: 100, 
      brand: "Car_brand", 
      category_id: "92aee8c3-78e8-4a22-b49b-24f4e1505d8f" 
    });

    const cars = await listCarsUseCase.execute({
      brand: "Car_brand",
    });

    expect(cars).toEqual([car]);
  });

  it("Listar carros pela nome", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "ferrari", 
      description: "carro", 
      daily_rate: 110.00, 
      license_plate: "ABC-9087", 
      fine_amount: 100, 
      brand: "Car_brand", 
      category_id: "92aee8c3-78e8-4a22-b49b-24f4e1505d8f" 
    });

    const cars = await listCarsUseCase.execute({
      name: "ferrari",
    });

    expect(cars).toEqual([car]);
  });

  it("Listar carros pela categoris", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "ferrari", 
      description: "carro", 
      daily_rate: 110.00, 
      license_plate: "ABC-9087", 
      fine_amount: 100, 
      brand: "Car_brand", 
      category_id: "1234" 
    });

    const cars = await listCarsUseCase.execute({
      category_id: "1234",
    });

    expect(cars).toEqual([car]);
  });
})