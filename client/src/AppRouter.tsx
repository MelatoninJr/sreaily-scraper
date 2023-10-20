import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/api/scrapeSreality/:pageNumber" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
