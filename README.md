REscrape Project
Welcome to the REscrape project! This project is designed to scrape the first 500 real estate listings (specifically flats for sale) from sReality.cz. After scraping, it saves the title and image URL of each listing into a Postgresql database. You can then view these scraped listings through a beautifully designed webpage, all hosted on a local server.

Features:
Scrape listings from sReality.cz with detailed information.
Display these listings on a custom-designed webpage.
Use pagination to navigate through the listings.
Single command deployment using Docker.
Tech Stack:
Backend: TypeScript
Frontend: React
Database: PostgreSQL
Server: Nginx (or any simple HTTP server of choice)
Containerization: Docker
Quick Start:
Clone the Github repository:

bash
Copy code
git clone <repository-url>
cd <repository-directory>
Run using Docker:
Make sure you have Docker and Docker Compose installed on your machine. Then, simply use the command:

bash
Copy code
docker compose up
Access the Webpage:
Open your web browser and navigate to:

arduino
Copy code
http://127.0.0.1:8080
Notes:
Ensure you switch the sReality website to English for accurate scraping.
This project is built for educational and demonstration purposes. Ensure you have the right to scrape and display content from third-party websites.
