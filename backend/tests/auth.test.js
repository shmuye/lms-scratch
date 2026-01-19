import request from "supertest";
import app from '../app.js'

describe("Auth API", () => {
  it("should signup user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        name: "John",
        email: "john@test.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe("john@test.com");
  });
});