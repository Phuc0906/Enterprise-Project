import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

import ProductForm from "./components/ProductForm";
import CategoryForm from "./components/CategoryForm";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";

function App() {
    return (
        <Routes>
            <Route path="/" element={<SignInForm />} />
            <Route path="/register" element={<SignUpForm />} />
            <Route path="/product/upload" element={<ProductForm />} />
            <Route path="/category/upload" element={<CategoryForm />} />
        </Routes>
    );
}

export default App;
