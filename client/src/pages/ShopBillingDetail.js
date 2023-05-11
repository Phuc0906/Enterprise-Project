import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {splittingPriceNumber} from "../utils";

const ShopBillingDetail = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [billing, setBilling] = useState({
        "date": "",
        "customer": {
            "address": "",
            "name": ""
        },
        "totalPrice": "",
        "status": 0
    });

    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log(billing)

    }, [billing])

    useEffect(() => {
        console.log(location.state);
        setBilling(location.state.billing);

        fetch("http://localhost:8080/api/product/billing/product?billing=" + location.state.billing.id, {
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
                    setProducts(data);
                })
            })

    }, [])

    const onShopApproved = () => [
        fetch("http://localhost:8080/api/billing/up/"+billing.id+"?phone="+billing.customer.phone,  {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.token,
            }
        })
            .then(res => {
                navigate(-1);
                // window.location.reload();
                // setLoading(!loading);
            })

    ]

    const onShopCancel = () => {
        navigate(-1);
    }

    const InfoBox = ({label, text}) => {
        return <div className="flex flex-col text-left">
            <label className="text-gray-400 text-xl">{label}</label>
            <label>{text}</label>
        </div>
    }

    const ItemCard = ({product}) => {
        return <div className="flex items-center mb-4">
            <img className="w-[130px] h-[130px] rounded-2xl" src={'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Giay_Superstar_trang_FV3284_01_standard.jpg'}/>
            <div className="flex flex-col gap-3 ml-5  w-2/3">
                <label className="w-full leading-6" style={{wordWrap: 'break-word'}}>SUPERSTARSUPERSTARSUPERSTARSUPERSTARSUPERSTARvSUPERSTARSUPERSTARSUPERSTARSUPERSTARSUPERSTARSUPERSTARSUPERSTARvSUPERSTARSUPERSTAR</label>
                <label className="text-gray-400">Category</label>
            </div>
            <label className="ml-4">Qty 3</label>
            <label className="ml-4">2,500,000 vnd</label>
        </div>
    }

    return <div className=" bg-gray-50 w-screen h-screen">
        <div className="ml-auto mr-auto bg-white border-2 border-gray-400 text-center w-3/4 pt-5">
            <label className="text-2xl mt-5 mr-16 ml-16" >Order Summary</label>
            <div className="flex gap-16 mr-10 ml-10 mt-6 border-b-2 border-b-gray-200 mb-5 pb-5 items-center">
                <InfoBox label={'Order Date'} text={billing.date}/>
                <InfoBox label={'Address'} text={billing.customer.address}/>
                <InfoBox label={'Customer Name'} text={billing.customer.name}/>
            </div>
            <div className="text-left mt-5 mr-16 ml-10 border-b-2 border-b-gray-200 pb-5">
                {products.map((product, index) => <ItemCard product={product} key={index} />)}
            </div>
            <div className="mt-5 mb-5 mr-16 ml-10 border-b-2 border-b-gray-200 pb-5">
                <div className="flex justify-between ">
                    <label className="">Total</label>
                    <label>{splittingPriceNumber(billing.totalPrice.toString())} vnd</label>
                </div>
            </div>
            <div className="mb-5">
                <div>
                    {(billing.status === 0) ? <button onClick={onShopApproved} className="bg-green-500 p-2 text-xl mr-5 rounded-xl hover:bg-green-300">Approve</button> : null}
                    <button onClick={onShopCancel} className="border-[1px] border-solid border-blue-300 p-2 text-xl ml-5 rounded-xl hover:bg-blue-300">Cancel</button>
                </div>
            </div>
        </div>
    </div>
}

export default ShopBillingDetail;