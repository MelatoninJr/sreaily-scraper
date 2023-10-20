import express from 'express';
import bodyParser from 'body-parser';
import puppeteer from 'puppeteer';
const { JSDOM } = require('jsdom');
import { Pool } from 'pg';
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const pool = new Pool({
    connectionString: "postgres://MelatoninJr:SYuMcRJZ0GW9@ep-noisy-wind-52667273.us-east-2.aws.neon.tech/neondb?sslmode=require",
});

const schemaFilePath = path.join(__dirname, 'schema/create_schema.sql'); // Correct the path as needed

// Define an interface for the data you want to store
interface ListingData {
    title: string;
    // Add other properties as needed
}

const schemaName = "public"; // Replace with the actual schema name

// Define the createSchema function
async function createSchema() {
    try {
        const client = await pool.connect();

        // Read and execute the SQL schema file
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

// Define the insertDataIntoDatabase function
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
async function scrapeSreality(pageNumber: number) {
    try {
        await clearDataInDatabase(); // Clear existing data

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const url = `https://www.sreality.cz/en/search/for-sale/apartments?page=${pageNumber}#z=7`;
        await page.goto(url);
        const pageHTML = await page.content();
        const { document } = new JSDOM(pageHTML).window;

        const propertyListings = document.querySelectorAll('.property');

        propertyListings.forEach(async (listing: Element, index: number) => {
            const title = listing.querySelector('.name')?.textContent;

            if (title) {
                console.log(`Listing ${index + 1}:`);
                console.log(`Title: ${title}`);
                // Extract only the first image URL
                const firstImageLink = listing.querySelector('a[href^="/en/detail/sale/flat"]');
                const firstImageSrc = firstImageLink?.querySelector('img')?.getAttribute('src');
                if (firstImageSrc) {
                    console.log(`Image: ${firstImageSrc}`);
                    // Insert data into the database
                    insertDataIntoDatabase(pageNumber, title, firstImageSrc);
                }
            }
        });

        await browser.close();
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// The rest of your code remains the same

// ...

app.get('/api/scrapeSreality/:pageNumber', async (req, res) => {
    try {
        const pageNumber = parseInt(req.params.pageNumber) || 1;
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

// Call the function to create the schema before starting the server
createSchema();
