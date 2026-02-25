import axios from "axios";

export class ApiControllers {
  async getUserById(userId: string | number) {
    const r = await axios.get(`https://dummyjson.com/users/${userId}`);
    expect(r.status).toBe(200);
  }
}
