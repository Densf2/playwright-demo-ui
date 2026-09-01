import { type Page, type Locator } from "@playwright/test";

export class TypesOfBugsPage {
  private page: Page;
  heading: Locator;
  subheading: Locator;
  tiles: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "Types of Bugs", exact: true });
    this.subheading = page.getByText(
      "Learn the different types of bugs that commonly occur in websites and apps.",
    );
    this.tiles = page.locator(".types-of-bugs-tile-div:visible");
  }

  async open() {
    await this.page.goto("https://academybugs.com/types/");
  }

  private tileHeading(tile: Locator): Locator {
    return tile.locator(".types-of-bugs-tile-heading");
  }

  private tileDescription(tile: Locator): Locator {
    return tile.locator(".types-of-bugs-tile-subtext");
  }

  async getBugTypeNames(): Promise<string[]> {
    const tiles = await this.tiles.all();
    const names: string[] = [];
    for (const tile of tiles) {
      names.push((await this.tileHeading(tile).innerText()).trim());
    }
    return names;
  }

  async getBugTypeDescriptions(): Promise<string[]> {
    const tiles = await this.tiles.all();
    const descriptions: string[] = [];
    for (const tile of tiles) {
      descriptions.push((await this.tileDescription(tile).innerText()).trim());
    }
    return descriptions;
  }
}
