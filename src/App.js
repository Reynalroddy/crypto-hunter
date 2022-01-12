import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Coin } from "./pages";
import Navs from "./components/Nav";
const App = () => {
  return (
    <Router>
      <Navs />
      <Routes>
        <Route path="/" element={<Home />} exact />

        <Route path="/coin/:id" element={<Coin />} />
      </Routes>
    </Router>
  );
};

export default App;
