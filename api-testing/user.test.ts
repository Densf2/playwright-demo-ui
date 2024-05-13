import axios from "axios";
import jsonData from "../api-data.json";
import { fakerEN } from "@faker-js/faker";
import { ApiControllers } from "./controller";

let fUserName = fakerEN.person.firstName();
let fLastName = fakerEN.person.lastName();
let fPhoneN = fakerEN.phone.number();

describe("tests for users", () => {
  const controllers = new ApiControllers();
  const apiClient = axios.create({
    baseURL: `${jsonData.baseUrl}`,
  });

  apiClient.interceptors.request.use(function (config) {
    console.log(`Request URL: ${config.baseURL}${config.url}`);
    return config;
  });

  test("get current user", async () => {
    let current_user_data = await apiClient
      .get(`/user/me`, {
        headers: {
          Authorization: `Bearer ${jsonData.token}`,
        },
      })
      .then(function (response) {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
      });
  });

  test("get current user with try/catch", async () => {
    try {
      await axios
        .get(`${jsonData.baseUrl}/userGGGG/me`, {
          headers: {
            Authorization: `Bearer ${jsonData.token}`,
          },
        })
        .catch((err) => {
          if (err.response.status == 404) {
            throw new Error("Opa 404 errora");
          }
          throw err;
        });
    } catch (err) {
      console.error(err);
    }
  });

  test("get current user with expect", async () => {
    let reponseT = await axios.get(`${jsonData.baseUrl}/userGGGG/me`, {
      headers: {
        Authorization: `Bearer ${jsonData.token}`,
      },
    });
    expect(reponseT.status).toBe(200);
  });

  test("PUT user data", async () => {
    //     fetch('https://dummyjson.com/users/1', {
    //   method: 'PUT', /* or PATCH */
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     lastName: 'Owais'
    //   })
    // })
    let put_user = await axios.put(
      `${jsonData.baseUrl}/users/4`,
      {
        firstName: fUserName,
        lastName: fLastName,
        phone: fPhoneN,
      },
      {
        headers: {
          Authorization: `Bearer ${jsonData.token}`,
        },
      }
    );
  });

  test("user contoller", async () => {
    await controllers.getUserById("4");
  });
});
