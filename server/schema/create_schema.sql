-- Create a schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS public;

-- Create the "Listings" table within the schema
CREATE TABLE IF NOT EXISTS public.listing_pages (
    id SERIAL PRIMARY KEY,
    page_number INT,
    listing_name TEXT,
    image_url TEXT    -- Add other columns as needed
);
