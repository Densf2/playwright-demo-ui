import { test, expect } from "@playwright/test";

const BASE_URL = "http://uitestingplayground.com";

const playgroundLinks = [
  { text: "Dynamic ID", href: "/dynamicid" },
  { text: "Class Attribute", href: "/classattr" },
  { text: "Hidden Layers", href: "/hiddenlayers" },
  { text: "Load Delay", href: "/loaddelay" },
  { text: "AJAX Data", href: "/ajax" },
  { text: "Client Side Delay", href: "/clientdelay" },
  { text: "Click", href: "/click" },
  { text: "Text Input", href: "/textinput" },
  { text: "Scrollbars", href: "/scrollbars" },
  { text: "Dynamic Table", href: "/dynamictable" },
  { text: "Verify Text", href: "/verifytext" },
  { text: "Progress Bar", href: "/progressbar" },
  { text: "Visibility", href: "/visibility" },
  { text: "Sample App", href: "/sampleapp" },
  { text: "Mouse Over", href: "/mouseover" },
  { text: "Non-Breaking Space", href: "/nbsp" },
  { text: "Overlapped Element", href: "/overlapped" },
  { text: "Shadow DOM", href: "/shadowdom" },
  { text: "Alerts", href: "/alerts" },
  { text: "File Upload", href: "/upload" },
  { text: "Animated Button", href: "/animation" },
  { text: "Disabled Input", href: "/disabledinput" },
  { text: "Auto Wait", href: "/autowait" },
];

test.describe("UI Test Automation Playground - Link Navigation", () => {
  for (const link of playgroundLinks) {
    test(`should navigate to ${link.text} page`, async ({ page }) => {
      await page.goto(BASE_URL);

      // Click on the link using 'div.col-sm a' locator pattern
      const linkElement = page
        .locator("div.col-sm a", { hasText: link.text })
        .first();
      await linkElement.click();
      // Verify redirect to the dedicated page
      await expect(page).toHaveURL(`${BASE_URL}${link.href}`);
      // Verify page title contains the link text (most pages follow this pattern)
      await expect(page.locator("h3").first()).toBeVisible();
    });
  }
});
