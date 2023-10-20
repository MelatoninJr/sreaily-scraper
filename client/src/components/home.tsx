import React, { useState } from "react";

const data = [
    {
      id: 1,
      title: "Listing 1",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Listing 2",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Listing 3",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      title: "Listing 4",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      title: "Listing 5",
      image: "https://via.placeholder.com/150",
    },
  ];

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 3;

  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = data.slice(indexOfFirstListing, indexOfLastListing);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / listingsPerPage); i++) {
    pageNumbers.push(i);
  }

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-8">
      <header className="py-4 text-2xl font-semibold">My Listings</header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentListings.map((listing) => (
          <div key={listing.id} className="bg-white rounded-md p-4 shadow-md">
            <img src={listing.image} alt={listing.title} className="mb-2" />
            <h2 className="text-lg font-semibold">{listing.title}</h2>
          </div>
        ))}
      </div>
      <ul className="mt-4">
        {pageNumbers.map((number) => (
          <li key={number} className="inline-block mx-2">
            <button
              className={`${
                number === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } px-3 py-2 rounded-md`}
              onClick={() => changePage(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
