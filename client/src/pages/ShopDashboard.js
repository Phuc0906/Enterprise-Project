import React from "react";
import NavBar from "../components/NavBar";
import ShopRecord from "../components/ShopRecord";
import ShopRecordChart from "../components/ShopRecordChart";

const ShopDashboard = () => {
    const items = [
        {name: "Dashboard", page: "/shop/dashboard"},
        {name: "Product", page: "/shop/product"},
        {name: "Orders", page: "/shop/orders"}
    ]

    return <div>
        <NavBar items={items} />
        <ShopRecord />
        <ShopRecordChart/>
    </div>
}

export default ShopDashboard;