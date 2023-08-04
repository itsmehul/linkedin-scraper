import puppeteer from "puppeteer";

interface ScrapeResponse {
  aboutUs: string;
}

const scrape = async (companyName: string): Promise<ScrapeResponse> => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto("https://www.google.com/");
  await page.type("input", `${companyName} Linkedin`);
  await page.keyboard.press("Enter");
  await page.waitForNavigation({ waitUntil: "networkidle2" });

  await page.click("#rso a");
  const dismissButton = await page.$('[aria-label="Dismiss"]');

  if (dismissButton) {
    await page.click('[aria-label="Dismiss"]');
  }

  const aboutUsSection = await page.$('[data-test-id="about-us"]');
  // Select the first paragraph in the section
  if (!aboutUsSection) {
    throw new Error("About us section not found");
  }
  const firstParagraph = await aboutUsSection.$("p");
  if (!firstParagraph) {
    throw new Error("First paragraph not found");
  }
  let aboutUs = await page.evaluate(
    (element) => element.textContent,
    firstParagraph
  );

  if (!aboutUs) {
    aboutUs = "";
  }

  await browser.close();
  return {
    aboutUs,
  };
};

export default scrape;
