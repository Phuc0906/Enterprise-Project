import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SecondPage from "./pages/SecondPage";

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/second" element={<SecondPage/>}/>
      </Routes>
  );
}

export default App;
