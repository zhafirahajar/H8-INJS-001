const app = require("../app");
const request = require("supertest");

let token;
const user = {
	email: "zhafira@gmail.com",
	password: "123",
};

// generate the token
beforeAll((done) => {
	request(app)
		.post("/login")
		.send(user)
		.end((err, res) => {
			if (err) {
				done(err);
			} else {
				token = res.body.token;
				done();
			}
		});
});

// try to send the token
describe("autorized token", () => {
	// token provided --> authorized
	test("should get the order detail", (done) => {
		request(app)
			.get("/orders/1")
			.set("token", `${token}`)
			.end((err, res) => {
				if (err) done(err);
				else {
					console.log(res.body);
					expect(res.body).toHaveProperty("description");
					expect(res.statusCode).toBe(200);
					done();
				}
			});
	});

	test('should unauthorized "JWT must be provided" ', (done) => {
		request(app)
			.get("/orders/1")
			// .set("token", `${token}`)
			.end((err, res) => {
				if (err) done(err);
				else {
					console.log(res.body);
					expect(res.statusCode).toBe(500);
					expect(res.body).toHaveProperty("name");
					done();
				}
			});
	});
});
