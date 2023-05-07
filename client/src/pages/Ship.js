import React, {useEffect, useState} from 'react';
import CartItem from "../components/CartItem";
import BillItem from "../components/BillItem";

const Ship = () => {
    const [bills,setBills] = useState([])
    const [loading,setLoading] = useState(true)
    useEffect(() => {
        fetch("http://localhost:8080/api/billing/1", {
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
        fetch("http://localhost:8080/api/billing/up/"+id, {
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
        <div className="flex flex-col lg:flex-row gap-12 py-10">
            <div className="flex-[2]">
                <div className="text-lg font-bold">Ship</div>
                {bills.map((bill) => <BillItem bill={bill} handleReceived={handleReceived}/>)}
            </div>
        </div>
    );
};

export default Ship;