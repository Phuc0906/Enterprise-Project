import React, {Fragment} from "react";
import {Route, Routes} from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";
import ProductForm from "./components/ProductForm";
import CategoryForm from "./components/CategoryForm";

function App() {
    return (
        <Routes>
            <Route path="/" element={<SignInPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/product/upload" element={<ProductForm/>}/>
            <Route path="/category/upload" element={<CategoryForm/>}/>
        </Routes>
    );
}

export default App;
