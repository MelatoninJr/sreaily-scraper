import React, { useState, useEffect } from "react";
import Card from "./components/card";
import './App.css';
import { useNavigate } from "react-router-dom";

// Define the type for the expected data structure
interface DataItem {
  title: string;
  imageSrc: string;
}

const App: React.FC = () => {
  const itemsPerPage = 20; // Number of items to display per page
  const [data, setData] = useState<DataItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Fetch data from your API
    const fetchData = async () => {
      try {
        setLoading(true);

        // Replace this URL with the actual API endpoint
        const response = await fetch(`http://localhost:3001/api/scrapeSreality/${currentPage}`);
        const result = await response.json();

        setData(result.data); // Assuming your API returns an object with a "data" property
        setTotalPages(Math.ceil(result.data.length / itemsPerPage));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPageClick = () => {
      setCurrentPage(currentPage + 1);

  };

  const handlePreviousPageClick = () => {
      setCurrentPage(currentPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = data.slice(startIndex, endIndex);

  return (
    <div className="home-container">
      <div className="container mx-auto flex justify-center">
        <h1 className="text-4xl font-semibold text-center m-8">Current Listings</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="container grow mx-auto flex justify-center">
            <p>Loading...</p>
          </div>
        ) : (
          itemsToDisplay.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              imageSrc={item.imageSrc}
              description="Description goes here"
              tags={["Fashion", "Products"]}
              isNew={true}
            />
          ))
        )}
      </div>

      <div className="container mx-auto flex justify-center m-8">
        <button
          className="btn"
          onClick={handlePreviousPageClick}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <button
          className="btn"
          onClick={handleNextPageClick}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default App;
