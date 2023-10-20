import express from 'express';
import bodyParser from 'body-parser';
import puppeteer from 'puppeteer';
const { JSDOM } = require('jsdom');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// ...

async function scrapeSreality(pageNumber: number) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Construct the URL with the provided page number
        const url = `https://www.sreality.cz/en/search/for-sale/apartments?page=${pageNumber}#z=7`;
        await page.goto(url);

        // Use Puppeteer to get the entire page's HTML content
        const pageHTML = await page.content();

        // Use JSDOM to create a DOM environment for parsing
        const { document } = new JSDOM(pageHTML).window;

        // Select all property listings
        const propertyListings = document.querySelectorAll('.property');

        propertyListings.forEach((listing: Element, index: number) => {
            // Get the title of the listing
            const title = listing.querySelector('.name')?.textContent;

            if (title) {
                console.log(`Listing ${index + 1}:`);
                console.log(`Title: ${title}`);
            }

            // Extract image URLs
            const imageLinks = listing.querySelectorAll('a[href^="/en/detail/sale/flat"]');
            imageLinks.forEach((link: Element, i: number) => {
                const imageSrc = link.querySelector('img')?.getAttribute('src');
                if (imageSrc) {
                    console.log(`Image ${i + 1}: ${imageSrc}`);
                }
            });

            console.log('---------------------');
        });

        await browser.close();
    } catch (error) {
        console.error('An error occurred:', error);
    }
}




// ...

app.get('/api/scrapeSreality/:pageNumber', async (req, res) => {
    try {
        const pageNumber = parseInt(req.params.pageNumber) || 1; // Parse as an integer
        await scrapeSreality(pageNumber);

        res.status(200).json({ message: 'Scraping complete' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error during scraping' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
