import { chromium} from "@playwright/test";
import { LoginPage } from "../../pages/login-page";
import { users } from "../../utils/test-data/users";

async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  await page.goto(`${process.env.BASE_URL}`, {
    waitUntil: "domcontentloaded",
  });
  await loginPage.enterLoginCredentials(
    users.standard.username,
    users.standard.password,
  );
  await loginPage.clickToLogin();
  await page.waitForURL("**/inventory.html");
  await context.storageState({ path: "storage/auth.json" });
  await browser.close();
}
export default globalSetup;
