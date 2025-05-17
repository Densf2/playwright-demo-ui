import axios from "axios";
import jsonpath from "jsonpath";
import fs from "fs-extra";
import jsonData from "../api-data.json";

interface JsonData {
  baseUrl: string;
  token?: string;
}
// Cast jsonData to the interface
const typedJsonData = jsonData as JsonData;

let userName: string;
let userPass: string;

describe("authorization", () => {
  test("get all users", async () => {
    const all_users_response = await axios.get(`${jsonData.baseUrl}/users`);
    userName = String(
      jsonpath.query(all_users_response.data, "$..users[3].username")
    );
    const userName12 = String(
      jsonpath.query(all_users_response.data, "$..users[?(@.id==12)].username")
    );
    userPass = String(
      jsonpath.query(all_users_response.data, "$..users[3].password")
    );
    console.log(userName + " pass: " + userPass);
    console.log(userName12);
    expect(all_users_response.status).toEqual(200);
  });

  test("get auth token", async () => {
    const auth_token_response = await axios.post(
      `${jsonData.baseUrl}/auth/login`,
      {
        username: userName,
        password: userPass,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    typedJsonData.token = auth_token_response.data.token;
    fs.writeJSONSync("api-data.json", typedJsonData);
  });
});
