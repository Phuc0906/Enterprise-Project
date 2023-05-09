import React, {useEffect, useState} from 'react';
import BillItem from "../components/BillItem";
import NavBar from "../components/NavBar";

const Delivered = () => {
    const items = [
        { name: "At shop", page: "/at-shop" },
        { name: "Shipping", page: "/ship" },
        { name: "Delivered", page: "/delivered" },
    ];
    const [bills,setBills] = useState([])
    const [loading,setLoading] = useState(true)
    useEffect(() => {
        fetch("http://localhost:8080/api/billing/shipper/"+localStorage.phone+"/3", {
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
                    setBills(data)
                    console.log(data);
                })
            })
    },[loading])

    function handleReceived(id) {
        fetch("http://localhost:8080/api/billing/up/"+id+"?phone="+localStorage.phone, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.token,
            }
        })
            .then(res => {
                setLoading(!loading);
            })
    }

    return (
        <>
            <NavBar items={items} />
            <div className="flex flex-col lg:flex-row gap-12 py-10">
                <div className="flex-[2] mx-4 justify-content: center align-items: center">
                    <h1 className="text-xl font-bold text-center pb-6">Delivered</h1>
                    {bills.map((bill) => <BillItem bill={bill} handleReceived={handleReceived}/>)}
                </div>
            </div>
        </>
    );
};

export default Delivered;