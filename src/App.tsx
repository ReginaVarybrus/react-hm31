import "./App.css";

import HomePage from "./pages/HomePage";
import HttpHeroComponent from "./pages/HeroComponent";
import EpisodesComponent from "./pages/EpisodesComponent";
import Navigation from "./components/Navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage
            text={"Hello, TypeScript"}
            src={"https://user-images.githubusercontent.com/3335181/207145814-7b4fc81f-fb35-4e56-83d8-51e6419eb629.svg"}
          />} />
          <Route path="/heroes" element={<HttpHeroComponent />} />
          <Route path="/episodes" element={<EpisodesComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;



