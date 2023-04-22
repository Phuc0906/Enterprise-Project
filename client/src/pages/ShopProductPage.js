import React from "react";
import NavBar from "../components/NavBar";

const ShopProductPage = () => {
    const items = [
        {name: "Dashboard", page: "/shop/dashboard"},
        {name: "Product", page: "/shop/product"}
    ]

    return <div>
        <NavBar items={items} />
    </div>
}

export default ShopProductPage;