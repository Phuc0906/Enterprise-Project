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
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import {RequireAuth} from "react-auth-kit";
import ProductDetails from "./pages/ProductDetails";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<SignInForm />} />
            <Route path="/" element={<RequireAuth loginPath="/login"><Home/></RequireAuth>} />
            <Route path="/register" element={<SignUpForm />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/product/upload" element={<RequireAuth loginPath="/login"><ProductForm/></RequireAuth>} />
            <Route path="/category/upload" element={<RequireAuth loginPath="/login"><CategoryForm/></RequireAuth>} />
            <Route path="/home/shop" element={<RequireAuth loginPath="/login"><ShopHomePage/></RequireAuth>} />
            <Route path="/shop/dashboard" element={<RequireAuth loginPath="/login"><ShopDashboard/></RequireAuth>} />
            <Route path="/shop/product" element={<RequireAuth loginPath="/login"><ShopProductPage/></RequireAuth>} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
    );
}

export default App;
