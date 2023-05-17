import React, {useEffect, useState} from 'react';
import BillItem from "../components/BillItem";
import NavBar from "../components/NavBar";

const Ship = () => {
    const items = [
        { name: "At shop", page: "/at-shop" },
        { name: "Shipping", page: "/ship" },
        { name: "Delivered", page: "/delivered" },
    ];
    const [bills,setBills] = useState([])
    const [loading,setLoading] = useState(true)
    useEffect(() => {
        console.log(localStorage.profile);
        fetch("http://localhost:8080/api/billing/shipper/"+JSON.parse(localStorage.profile).phone+"/2", {
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
        fetch("http://localhost:8080/api/billing/up/"+id+"?phone="+JSON.parse(localStorage.profile).phone, {
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

    function handleCancel(id) {
        fetch("http://localhost:8080/api/billing/down/"+id+"?phone="+JSON.parse(localStorage.profile).phone, {
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
                <div className="flex-[2] mx-4">
                    <h1 className="text-xl font-bold text-center pb-6">Ship</h1>
                    {bills.map((bill, index) => <BillItem key={index} bill={bill} handleReceived={handleReceived} handleCancel={handleCancel}/>)}
                </div>
            </div>
        </>
    );
};

export default Ship;