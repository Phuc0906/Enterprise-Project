import React from "react";
import NavBar from "../components/NavBar";

const ShopHomePage = () => {
    const items = [
        {name: "Dashboard", page: "/shop/dashboard"},
        {name: "Product", page: "/shop/product"},
        {name: "Orders", page: "/shop/orders"}
    ]

    return <div>
        <NavBar items={items} />
    </div>
}

export default ShopHomePage;