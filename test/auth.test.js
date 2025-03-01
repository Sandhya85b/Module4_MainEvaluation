const request = require("supertest");
const app = require("../index");
describe("Auth routes", () => {
  Test("User Should register", async () => {
    const res = (await request(pp).post("/auth/register")).setEncoding({
      name: "testing",
      email: "testing@gmail.com",
      password: "test123",
    });
  });
  expect(res.statusCode).toBe(201);
  Test("User Should register", async () => {
    const res = (await request(pp).post("/auth/register")).setEncoding({
      email: "testing@gmail.com",
      password: "test123",
    });
  });
  expect(res.statusCode).toBe(201);
});
