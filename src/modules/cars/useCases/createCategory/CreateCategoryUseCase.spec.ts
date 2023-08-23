import { AppError } from "@errors/AppError";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

describe("Create Category", () => {
  
  let createCategoryUseCase: CreateCategoryUseCase;
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  })

  it("Criar uma nova categoria", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test"
    }
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);
    console.log(categoryCreated);

    expect(categoryCreated).toHaveProperty("id");
  });

  it("Criar uma nova categoria com nome existente", async () => {
    expect(async () => {
      const category = {
        name: "Category Test",
        description: "Category description Test"
      }
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      });
  
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      });  
    }).rejects.toBeInstanceOf(AppError);
  });
});