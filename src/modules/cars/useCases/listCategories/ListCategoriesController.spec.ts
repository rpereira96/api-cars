import request from "supertest";  

import { Connection } from "typeorm";
import { hash } from "bcryptjs";
import { v4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;
describe("List Categories", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const password = await hash("admin", 8);
    const id = v4();

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at,      driver_license)
      values(
        '${id}', 
        'admin', 
        'admin@cars.com.br', 
        '${password}', 
        true, 
        'now()',
        'XXXXXX'
      )`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Listar todas as categorias", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: 'admin@cars.com.br',
      password: 'admin',
    });
    
    const { token } = responseToken.body;
    
    await request(app).post("/categories")
    .send({
      name: "SuperTest",
      description: "SuperTest"
    }).set({
      Authorization: `Bearer ${token}`,
    });
    
    const response = await request(app).get("/categories");

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("SuperTest");
  });  
})