import puppeteer from 'puppeteer';

async function scrapeSreality() {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      const url = 'https://www.sreality.cz/en/search/for-sale/apartments#z=7';
  
      await page.goto(url);
  
      // Use Puppeteer to get the entire page's HTML content
      const pageHTML = await page.content();
  
      // Use JSDOM to create a DOM environment for parsing
      const { document } = new JSDOM(pageHTML).window;
  
      // Select and log all elements with the .name class
      await page.waitForSelector('.name'); // Wait for elements with class 'name'
      const nameElements = await page.$$('.name'); // Select all elements with class 'name'
  
      for (let index = 0; index < nameElements.length; index++) {
        const element = nameElements[index];
        console.log(`Element ${index + 1}:`);
        console.log(await element.evaluate(el => el.outerHTML));
        console.log('---------------------');
      }
  
      await browser.close();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

scrapeSreality();
