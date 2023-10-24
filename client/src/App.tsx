import React, { useState, useEffect } from "react";
import Card from "./components/card";
import Header from './components/header';
import Footer from './components/footer';
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
    
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(`https://sreaily-scraper-production.up.railway.app/api/scrapeSreality/${currentPage}`, {
            signal: abortController.signal,
            mode: 'no-cors', // Add this line to set the mode to 'no-cors'
        });        
        const result = await response.json();
        
        setData(result.data);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          // Fetch was aborted
          return;
        }
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();

    // Clean up function to abort fetch on component unmount or if the currentPage changes
    return () => abortController.abort();

  }, [currentPage, navigate]);

  const handleNextPageClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPageClick = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="home-container flex flex-col flex-grow items-center justify-between" data-theme="corporate">
      <Header />
      <div className="container mx-auto flex justify-center">
        <h1 className="text-4xl font-semibold text-center m-8">Current Listings</h1>
      </div>
      <ItemsDisplay loading={loading} itemsToDisplay={data} />
      <div className="container mx-auto flex justify-center m-8 gap-4">
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
          disabled={currentPage === 25}
        >
          Next Page
        </button>
      </div>
      <Footer />
    </div>
  );
};

const ItemsDisplay: React.FC<{ loading: boolean, itemsToDisplay: DataItem[] }> = ({ loading, itemsToDisplay }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 flex wrap item">
      {loading ? (
        <div className="col-span-full flex justify-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        itemsToDisplay.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            imageSrc={item.imageSrc}
            description="The Best Apartment."
            tags={["Real-Estate", "Local"]}
            isNew={true}
          />
        ))
      )}
    </div>
  );
};

export default App;
