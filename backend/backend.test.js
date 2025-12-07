const request = require("supertest");
const app = require("./backend");

describe("Test route /clients", () => {
  it("Doit retourner tous les clients", async () => {
    const res = await request(app).get("/clients");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
