import { ApiControllers } from "./controller";

describe("tests for products", () => {
  const controllers = new ApiControllers();

  test("get product by id", async () => {
    const response = await controllers.getProductById(1);
    expect(response.status).toBe(200);
    expect(response.data.id).toBe(1);
    expect(response.data.title).toEqual(expect.any(String));
    expect(response.data.category).toEqual(expect.any(String));
    expect(response.data.price).toBeGreaterThan(0);
  });

  test("get all products", async () => {
    const response = await controllers.getAllProducts();
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data.products)).toBe(true);
    expect(response.data.products.length).toBeGreaterThan(0);
    expect(response.data.total).toBeGreaterThanOrEqual(
      response.data.products.length,
    );
  });

  test("search products", async () => {
    const query = "phone";
    const response = await controllers.searchProducts(query);
    expect(response.status).toBe(200);
    expect(response.data.products.length).toBeGreaterThan(0);
    for (const product of response.data.products) {
      const haystack =
        `${product.title} ${product.description} ${product.category} ${product.brand}`.toLowerCase();
      expect(haystack).toContain(query);
    }
  });

  test("get products by category", async () => {
    const category = "beauty";
    const response = await controllers.getProductsByCategory(category);
    expect(response.status).toBe(200);
    expect(response.data.products.length).toBeGreaterThan(0);
    for (const product of response.data.products) {
      expect(product.category).toBe(category);
    }
  });

  test("get product categories", async () => {
    const response = await controllers.getProductCategories();
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data[0]).toHaveProperty("slug");
    expect(response.data[0]).toHaveProperty("name");
    expect(response.data[0]).toHaveProperty("url");
  });

  test("add product", async () => {
    const newProduct = { title: "Test Product", category: "test-category" };
    const response = await controllers.addProduct(newProduct);
    expect(response.status).toBe(201);
    expect(response.data.title).toBe(newProduct.title);
    expect(response.data.id).toEqual(expect.any(Number));
  });

  test("update product", async () => {
    const updatedTitle = "Updated Product Title";
    const response = await controllers.updateProduct(1, {
      title: updatedTitle,
    });
    expect(response.status).toBe(200);
    expect(response.data.id).toBe(1);
    expect(response.data.title).toBe(updatedTitle);
  });

  test("delete product", async () => {
    const response = await controllers.deleteProduct(1);
    expect(response.status).toBe(200);
    expect(response.data.id).toBe(1);
    expect(response.data.isDeleted).toBe(true);
    expect(response.data).toHaveProperty("deletedOn");
  });
});
