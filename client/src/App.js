import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

import ProductForm from "./components/ProductForm";
import CategoryForm from "./components/CategoryForm";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import Home from "./pages/Home";
import ShopHomePage from "./pages/ShopHomePage";
import ShopDashboard from "./pages/ShopDashboard";
import ShopProductPage from "./pages/ShopProductPage";
import ProductDetails from "./pages/ProductDetails";

function App() {
    return (
        <Routes>
            <Route path="/" element={<SignInForm />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<SignUpForm />} />
            <Route path="/product/upload" element={<ProductForm />} />

            <Route path="/product/:id" element={<ProductDetails />} />

            <Route path="/category/upload" element={<CategoryForm />} />
            <Route path="/home/shop" element={<ShopHomePage />} />
            <Route path="/shop/dashboard" element={<ShopDashboard />} />
            <Route path="/shop/product" element={<ShopProductPage />} />
        </Routes>
    );
}

export default App;
