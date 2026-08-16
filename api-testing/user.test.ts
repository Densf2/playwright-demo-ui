import jsonData from "../api-data.json";
import { ApiControllers } from "./controller";

const randomString = (prefix: string) =>
  `${prefix}${Math.random().toString(36).slice(2, 8)}`;

const fUserName = randomString("First");
const fLastName = randomString("Last");
const fPhoneN = `+1555${Math.floor(1000000 + Math.random() * 8999999)}`;

describe("tests for users", () => {
  const controllers = new ApiControllers();

  test("get current user", async () => {
    const response = await controllers.getCurrentUser(jsonData.token as string);
    expect(response.status).toBe(200);
    expect(response.data.id).toEqual(expect.any(Number));
    expect(response.data.username).toEqual(expect.any(String));
    expect(response.data.email).toEqual(expect.any(String));
  });

  test("get current user with invalid token", async () => {
    await expect(
      controllers.getCurrentUser("invalid-token"),
    ).rejects.toMatchObject({
      response: { status: 401 },
    });
  });

  test("PUT user data", async () => {
    const response = await controllers.updateUser(4, {
      firstName: fUserName,
      lastName: fLastName,
      phone: fPhoneN,
    });
    expect(response.status).toBe(200);
    expect(response.data.firstName).toBe(fUserName);
    expect(response.data.lastName).toBe(fLastName);
    expect(response.data.phone).toBe(fPhoneN);
  });

  test("user controller", async () => {
    const response = await controllers.getUserById("4");
    expect(response.data.id).toBe(4);
  });
});
