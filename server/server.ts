import express from 'express';
import bodyParser from 'body-parser';
import { Pool } from 'pg';
import cors from 'cors';
import fs from 'fs';
import puppeteer from 'puppeteer'; // Import puppeteer
import { JSDOM } from 'jsdom'; // Import JSDOM
import dotenv from 'dotenv';

const app = express();
const port = 3001;
dotenv.config();

const corsOptions: cors.CorsOptions = {
    origin: 'https://melatoninjr.github.io/sreaily-scraper', // Replace with the origin of your frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  };
  
  // Use the CORS middleware with your Express app
app.use(cors(corsOptions));
app.use(bodyParser.json());

const pool = new Pool({
    connectionString: "postgres://MelatoninJr:SYuMcRJZ0GW9@ep-noisy-wind-52667273.us-east-2.aws.neon.tech/neondb?sslmode=require",
});

const schemaName = "public";

async function createSchema() {
    try {
        const client = await pool.connect();

        // Read and execute the SQL schema file
        const schemaFilePath = 'schema/create_schema.sql'; // Provide the correct path
        const schemaSQL = fs.readFileSync(schemaFilePath, 'utf-8');
        await client.query(schemaSQL);

        client.release();
    } catch (error) {
        console.error('Error creating the database schema:', error);
    }
}

// Define the clearDataInDatabase function
async function clearDataInDatabase() {
    try {
        const client = await pool.connect();
        const query = `DELETE FROM ${schemaName}.listing_pages`;
        await client.query(query);
        client.release();
    } catch (error) {
        console.error('Error clearing data from the database:', error);
    }
}

// Define the insertDataIntoDatabase function with explicit parameter types
async function insertDataIntoDatabase(pageNumber: number, listingName: string, imageUrl: string) {
    try {
        const client = await pool.connect();

        const query = {
            text: `INSERT INTO ${schemaName}.listing_pages (page_number, listing_name, image_url) VALUES ($1, $2, $3)`,
            values: [pageNumber, listingName, imageUrl]
        };

        await client.query(query);
        client.release();
    } catch (error) {
        console.error('Error inserting data into the database:', error);
    }
}

// Define the scrapeSreality function before calling it
// Define the scrapeSreality function with a return value
// Define the scrapeSreality function with a return value
async function scrapeSreality(pageNumber: number): Promise<Array<{ title: string; imageSrc: string }>|null> {
    try {
        console.log(`Scraping page ${pageNumber}...`);

        await clearDataInDatabase(); // Clear existing data

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
               
        const page = await browser.newPage();

        const url = `https://www.sreality.cz/en/search/for-sale/apartments?page=${pageNumber}#z=7`;
        await page.goto(url);
        const pageHTML = await page.content();
        const { document } = new JSDOM(pageHTML).window;

        const scrapedData: Array<{ title: string; imageSrc: string }> = []; // Initialize an array to collect the scraped data

        const propertyListings = document.querySelectorAll('.property');

        propertyListings.forEach((listing: Element, index: number) => {
            const title = listing.querySelector('.name')?.textContent;

            if (title) {
                console.log(`Listing ${index + 1}:`);
                console.log(`Title: ${title}`);
                // Extract only the first image URL
                const firstImageLink = listing.querySelector('a[href^="/en/detail/sale/flat"]');
                const firstImageSrc = firstImageLink?.querySelector('img')?.getAttribute('src');
                if (firstImageSrc) {
                    console.log(`Image: ${firstImageSrc}`);
                    // Collect the data in an object and add it to the array
                    scrapedData.push({ title, imageSrc: firstImageSrc });
                }
            }
        });

        await browser.close();

        // Return the scraped data array
        return scrapedData;
    } catch (error) {
        console.error('An error occurred:', error);
        return null; // Return null to indicate a failure
    }
}


// The rest of your code remains the same

// ...

let databaseCleared = false; // Flag to track whether the database has been cleared

// ...

app.get('/api/scrapeSreality/:pageNumber', async (req, res) => {
    try {
        const pageNumber = parseInt(req.params.pageNumber) || 1; // Get the page number from the URL parameter
        const maxPageNumber = 25; // Define the maximum page number (adjust as needed)

        if (pageNumber >= 1 && pageNumber <= maxPageNumber) {
            // Wait for the scraping to finish using async/await
            const scrapedData = await scrapeSreality(pageNumber);

            if (Array.isArray(scrapedData)) { // Assert that scrapedData is an array
                res.status(200).json({ data: scrapedData, total_items: scrapedData.length });
            } else {
                res.status(500).json({ error: 'Scraping failed' });
            }
        } else {
            res.status(400).json({ error: 'Invalid page number' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error during scraping' });
    }
});




  

  
  
  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Call the function to create the schema before starting the server
createSchema();
