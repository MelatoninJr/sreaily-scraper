import React, { useState, useEffect } from "react";
import Card from "./components/card";
import './App.css';
import { useParams, useNavigate } from "react-router-dom";

interface DataItem {
  title: string;
  imageSrc: string;
}

const App: React.FC = () => {
  const { page } = useParams<{ page?: string }>();
  const currentPageFromURL = parseInt(page || '1', 10);

  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const [currentPage, setCurrentPage] = useState(currentPageFromURL);

  useEffect(() => {
    navigate(`/api/scrapeSreality/${currentPage}`);

    const fetchData = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(`http://localhost:3001/api/scrapeSreality/${currentPage}`);
        const result = await response.json();
        
        setData(result.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, navigate]);

  const handleNextPageClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPageClick = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="home-container">
      <div className="container mx-auto flex justify-center">
        <h1 className="text-4xl font-semibold text-center m-8">Current Listings</h1>
      </div>
      <ItemsDisplay loading={loading} itemsToDisplay={data} />
      <div className="container mx-auto flex justify-center m-8">
        <button
          className="btn"
          onClick={handlePreviousPageClick}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <button className="btn" onClick={handleNextPageClick}>
          Next Page
        </button>
      </div>
    </div>
  );
};

const ItemsDisplay: React.FC<{ loading: boolean, itemsToDisplay: DataItem[] }> = ({ loading, itemsToDisplay }) => {
  return (
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
  );
};

export default App;
