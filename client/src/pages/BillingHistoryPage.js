import React, {useEffect, useState} from "react";
import NavBar from "../components/NavBar";

const BillingHistoryPage = () => {
    const IMAGE_URL = `https://gr-project-bucket.s3.ap-southeast-1.amazonaws.com/`;
    const [billingStatus, setBillingStatus] = useState(0);
    const items = [
        { name: "Home", page: "/" },
        { name: "Products", page: "/products" },
    ];

    const [billings, setBilling] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8080/api/billing/"+localStorage.phoneNumber+"/"+billingStatus, {
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
                    setBilling(data);
                })
            })
    },[billingStatus]);

    const splittingPriceNumber = (price) => {
        let splittingNum = "";
        let countDigit = 0;
        for (let i = price.length - 1; i >= 0; i--) {
            if (countDigit > 2) {
                countDigit = 0;
                splittingNum = ',' + splittingNum;
            }
            splittingNum = price[i] + splittingNum;
            countDigit++;
        }
        return splittingNum;
    }

    const Billing = ({billing}) => {
        const [products, setProducts] = useState([]);

        useEffect(() => {
            fetch("http://localhost:8080/api/product/billing/product?billing=" + billing.id, {
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

        return <div className="border-2 border-gray-300 p-3 rounded-xl mb-5">
            <div className="mb-5 border-b-2 border-gray-300 pb-5">
                <label className="text-2xl">Billing No: {billing.id}</label>
            </div>
            <div className="ml-5 border-b-2 border-gray-300 pb-5">
                <div>
                    {products.map((product, index) => <ItemCard key={index} product={product} />)}
                </div>
            </div>
            <div className="flex justify-between mb-5 pb-5 mt-5">
                <label className="text-2xl ">Total</label>
                <label className="text-2xl ">{splittingPriceNumber(billing.totalPrice.toString())} vnd</label>
            </div>
        </div>
    }

    const ItemCard = ({product}) => {
        return <div className="flex items-center mb-4 ">
            <img className="w-[130px] h-[130px] rounded-2xl" src={`${IMAGE_URL}${product.productId}-0.png`}/>
            <div className="flex flex-col gap-3 ml-5  w-2/3">
                <label className="max-w-[430px] leading-6" style={{wordWrap: 'break-word'}}>{product.name}</label>
                <label className="text-gray-400">{product.categoryname}</label>
            </div>
            <label className="ml-9">Qty {product.quantity}</label>
            <label className="ml-4">{splittingPriceNumber(product.price.toString())} vnd</label>

        </div>
    }

    return <div>
        <NavBar items={items}/>
        <div className="mt-10 ml-10">
            <div className="flex">
                <div className="w-[300px] h-[500px] p-5 flex flex-col gap-8 border-r-2 border-gray-300">
                    <div onClick={() => setBillingStatus(0)} className="flex gap-5 items-center hover:bg-gray-200 p-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                        </svg>
                        <label>Processing</label>
                    </div>

                    <div onClick={() => setBillingStatus(1)} className="flex gap-5 items-center hover:bg-gray-200 p-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                        </svg>
                        <label>Shipping</label>
                    </div>
                    <div onClick={() => setBillingStatus(2)} className="flex gap-5 items-center hover:bg-gray-200 p-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                        </svg>

                        <label>Bought Products</label>
                    </div>
                </div>
                <div className="ml-10 w-full mr-10">
                    {billings.map((billing, index) => <Billing key={index} billing={billing} />)}
                </div>
            </div>
        </div>
    </div>
}

export default BillingHistoryPage;