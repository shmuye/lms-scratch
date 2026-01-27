import supertest from 'supertest'
const request = supertest(app)
import app from '../app.js'



describe("Auth API", () => {
  
  it("should signup user", async () => {
    const res = await request
      .post("/auth/register")
      .send({
        name: "John",
        email: "john@test.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe("john@test.com");
  });

  it("should login user", async () => {
    const res = await request
      .post("/auth/login")
      .send({
        email: "john@test.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe("john@test.com");
});
});