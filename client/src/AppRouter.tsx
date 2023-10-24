import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";

const AppRouter: React.FC = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/api/scrapeSreality/:pageNumber" element={<App />} />
      </Routes>
    </Router>
  );
};


export default AppRouter;
