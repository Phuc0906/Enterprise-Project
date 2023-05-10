import React, {useEffect, useState} from "react";
import NavBar from "../components/NavBar";
import ShopRecord from "../components/ShopRecord";
import ShopRecordChart from "../components/ShopRecordChart";
import {shopNavContent} from "../utils";

const ShopDashboard = () => {
    const items = [
        {name: "Dashboard", page: "/shop/dashboard"},
        {name: "Product", page: "/shop/product"},
        {name: "Orders", page: "/shop/orders"}
    ]

    const [record, setRecord] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/billing/shop-record/"+JSON.parse(localStorage.profile).name, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.token,
            }
        })
            .then(res => {
                const serverRes = res.json();
                serverRes.then(data => {
                    console.log(data);
                    setRecord(data);
                })
            })
    }, [])

    return <div>
        <NavBar items={shopNavContent} />
        <ShopRecord data={record} />
        <ShopRecordChart recordData={record}/>
    </div>
}

export default ShopDashboard;