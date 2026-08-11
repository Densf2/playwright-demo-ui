import axios from "axios";
import jsonData from "../api-data.json";

export class ApiControllers {
  async getUserById(userId: string | number) {
    const r = await axios.get(`${jsonData.baseUrl}/users/${userId}`);
    expect(r.status).toBe(200);
    return r;
  }

  async getCurrentUser(token: string) {
    return axios.get(`${jsonData.baseUrl}/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async updateUser(
    userId: string | number,
    data: { firstName?: string; lastName?: string; phone?: string },
  ) {
    return axios.put(`${jsonData.baseUrl}/users/${userId}`, data);
  }

  async getProductById(productId: string | number) {
    return axios.get(`${jsonData.baseUrl}/products/${productId}`);
  }

  async getAllProducts() {
    return axios.get(`${jsonData.baseUrl}/products`);
  }

  async searchProducts(query: string) {
    return axios.get(`${jsonData.baseUrl}/products/search`, {
      params: { q: query },
    });
  }

  async getProductsByCategory(categorySlug: string) {
    return axios.get(`${jsonData.baseUrl}/products/category/${categorySlug}`);
  }

  async getProductCategories() {
    return axios.get(`${jsonData.baseUrl}/products/categories`);
  }

  async addProduct(data: Record<string, unknown>) {
    return axios.post(`${jsonData.baseUrl}/products/add`, data);
  }

  async updateProduct(productId: string | number, data: Record<string, unknown>) {
    return axios.put(`${jsonData.baseUrl}/products/${productId}`, data);
  }

  async deleteProduct(productId: string | number) {
    return axios.delete(`${jsonData.baseUrl}/products/${productId}`);
  }
}
