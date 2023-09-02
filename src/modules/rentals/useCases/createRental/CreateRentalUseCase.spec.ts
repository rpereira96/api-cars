import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayJsProvider: DayjsDateProvider

describe("Create Rental", () => {
  
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayJsProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory, dayJsProvider, carsRepositoryInMemory
    );

   });
   
   it("Crie uma nova locação", async() => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: dayAdd24Hours
    }); 

    console.log(rental);

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
   });

   it("Não pode ser possível criar um aluguel se já existir um aberto pro mesmo usuário", async() => {

    expect(async () => {
      const rental = await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: dayAdd24Hours
      }); 
  
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: dayAdd24Hours
      }); 
    }).rejects.toBeInstanceOf(AppError);
   });

   it("Não deve ser possível criar um aluguel se já existir um aberto pro mesmo carro", async() => {

    expect(async () => {
      const rental = await createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: dayAdd24Hours
      }); 
  
      await createRentalUseCase.execute({
        user_id: "321",
        car_id: "test",
        expected_return_date: dayAdd24Hours
      }); 
    }).rejects.toBeInstanceOf(AppError);
   });

   it("Não pode deve ser possível criar um aluguel se a data for menor do que 24 horas", async() => {

    expect(async () => {
      const rental = await createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: dayjs().toDate()
      }); 
    }).rejects.toBeInstanceOf(AppError);
   });
});