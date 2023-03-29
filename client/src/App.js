import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SecondPage from "./pages/SecondPage";
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";
import ProductFormPage from "./pages/ProductFormPage";

function App() {
  return (
      <Routes>
        <Route path="/" element={<SignInPage/>}/>
        <Route path="/" element={<RegisterPage/>}/>
        <Route path="/second" element={<SecondPage/>}/>
        <Route path="/product/upload" element={<ProductFormPage/>}/>
      </Routes>
  );
}

export default App;
