import request from "supertest";
import { default as app } from "./app.js";

let test = [];

describe("Test endpoint", () => {
  let id;
  it("buat user baru", async () => {
    const data = {
      name: "hawik",
      email: "hawik@test.com",
      password: "hawik123",
      confPassword: "hawik123",
    };
    const response = await request(app).post("/api/users").send(data);
    test = data;
  });
  it("login", async () => {
    const datalog = {
      email: "hawik@test.com",
      password: "hawik123",
    };
    const response = await request(app).post("/api/login").send(datalog);
    id = response.body.id;
    expect(response.statusCode).toBe(200);
  });
  it("get all data user", async () => {
    const response = await request(app).get("/api/users");
    expect(response.statusCode).toBe(200);
  });
  it("get data user", async () => {
    const response = await request(app).get("/api/users").send(id);
    expect(response.statusCode).toBe(200);
  });
  it("delete user", async () => {
    const response = await request(app).delete("/api/users").send(id);
  });
});
