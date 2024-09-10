import { test, expect, request } from "@playwright/test";

test("check garage page", async ({ page, request }) => {
  //   page.on("request", (request) =>
  //     console.log(">>", request.method(), request.url())
  //   );
  //   page.on("response", (response) =>
  //     console.log("<<", response.status(), response.url())
  //   );
  //   const responsePromise = page.waitForResponse("**/api/cars");
  //   await page.route("**/*.{png,jpg,jpeg}", (route) => route.abort());

  //   await page.route("**/api/cars", async (route) => {
  //     const headers = route.request().headers();
  //     delete headers["X-Secret"];
  //     await route.continue({ headers });
  //   });

  //mocking the response
  await page.route("**/api/cars", async (route) => {
    const json = {
      status: "ok",
      data: [
        {
          id: 130591,
          carBrandId: 1,
          carModelId: 1,
          initialMileage: 10000,
          updatedMileageAt: "2024-04-26T18:26:22.000Z",
          carCreatedAt: "2024-04-26T18:26:22.000Z",
          mileage: 10000,
          brand: "Audi",
          model: "TT",
          logo: "audi.png",
        },
      ],
    };
    await route.fulfill({ json });
  });

  await page.goto("/panel/garage");
  await expect(page.locator("div.panel-page_heading h1")).toHaveText("Garage");
  await page.screenshot({ path: "screenshot.png", fullPage: true });
  //   const response = await responsePromise;
  const cars = await request.get("/api/cars");
  expect(cars.ok()).toBeTruthy();
  console.log(await cars.text());
});

test("mock response for changed user profile", async ({ page }) => {
  await page.route("**/api/users/profile", async (route) => {
    const json = {
      status: "ok",
      data: {
        userId: 107450,
        photoFilename: "user_photo.jpg",
        name: "FFF",
        lastName: "LLL",
        dateBirth: "2024-03-17T00:00:00.000Z",
        country: "US",
      },
    };
    await route.fulfill({ json });
  });
  await page.goto("/panel/profile");
  await expect(page.locator(".profile_name.display-4")).toHaveText("FFF LLL");
  await page.waitForTimeout(2000);
  await page.screenshot({ path: "screenshot-profile.png", fullPage: true });
});

// test("update user profile is successful", async ({ page, request }) => {
//   const updatedUserData = await request.put("/api/users/profile", {
//     data: {
//       photo: "default-user.png",
//       name: "DDD",
//       lastName: "Profile",
//       dateBirth: "2024-03-17T00:00:00.000Z",
//       country: "US",
//     },
//   });
//   await page.route("**/*.png", (route) =>
//     route.fulfill({ path: "user_photo.jpg" })
//   );
//   await page.goto("/panel/profile");
//   await page.screenshot({ path: "screenshot-profile.png", fullPage: true });
// });

test.skip("mock response 2 for changed user profile", async ({ page }) => {
  // const userProfileJS = {
  //   status: "ok",
  //   data: {
  //     userId: 107450,
  //     photoFilename: "user_photo.jpg",
  //     name: "FFF",
  //     lastName: "LLL",
  //     dateBirth: "2024-03-17T00:00:00.000Z",
  //     country: "US",
  //   },
  // };
  // const jsD2 = JSON.stringify(userProfileJS); // Declare and assign the variable jsD2
  // const json = { jsD2 }; // Use the variable jsD2 in the json object
  const userProfileJS = {
    status: "ok",
    data: {
      userId: 107450,
      photoFilename: "user_photo.jpg",
      name: "Dav",
      lastName: "Span",
      dateBirth: "2024-03-17T00:00:00.000Z",
      country: "US",
    },
  };
  await page.route("/api/users/profile", async (route) => {
    await route.fulfill({ json: userProfileJS });
  });
  await page.goto("/panel/profile");
  await expect(page.locator(".profile_name.display-4")).toHaveText("Dav Span");
  await page.waitForTimeout(2000);
  await page.screenshot({ path: "screenshot-profile-2.png", fullPage: true });
});

test("check instructions page", async ({ page }) => {
  await page.goto("/panel/instructions");
  await expect(page.locator("div.panel-page_heading h1")).toHaveText(
    "Instructions"
  );
  await expect(page.locator("#brandSelectDropdown")).toHaveText("Audi");
  await expect(page.locator("#modelSelectDropdown")).toHaveText("TT");
  await expect(
    page.locator("p.instruction-link_description").nth(0)
  ).toContainText("Audi TT");
});
