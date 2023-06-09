import React, {useEffect, useState} from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import {Link} from "react-router-dom";
import {useAuthHeader} from "react-auth-kit";
import {getAuthHeaders, shopNavContent, splittingPriceNumber} from "../utils";

const ShopProductPage = () => {
    const items = [
        {name: "Dashboard", page: "/shop/dashboard"},
        {name: "Product", page: "/shop/product"},
        {name: "Orders", page: "/shop/orders"}
    ]
    const [products, setProducts] = useState([]);
    const authHeader = useAuthHeader();

    const RowBuilder = ({product}) => {
        return <tr className="border-b dark:border-neutral-500">
            <th scope="col" className="px-6 py-4">{product.id}</th>
            <th scope="col" className="px-6 py-4">{product.name}</th>
            <th scope="col" className="px-6 py-4">{product.description}</th>
            <th scope="col" className="px-6 py-4">{splittingPriceNumber(product.price.toString())}</th>
            <th scope="col" className="px-6 py-4">{product.categoryname}</th>
            <th scope="col" className="px-6 py-4">
                <Link
                    type="button"
                    to="/product/upload"
                    state={{update: true, product: product}}
                    className="inline-block rounded bg-blue-300 px-4 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                    View Detail
                </Link>
            </th>
        </tr>
    }

    useEffect(() => {
        console.log(JSON.parse(localStorage.profile))

        fetch(`https://${process.env.REACT_APP_API_URL}/api/product/get-products`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            },
            body: JSON.stringify({
                categories: [],
                brands: [JSON.parse(localStorage.profile).id]
            })
            }).then(res => {
            const serverRes = res.json();
            serverRes.then(data => {
                console.log(data);
                setProducts(data)
            })
        }).then(data => {
            console.log(data)
        });
    }, [])

    return <div>
        <NavBar items={items} />
        <div>
            <h2 className="text-3xl mt-8 text-center">Shop Product</h2>
            <div className="mt-8 ml-3">
                <Link
                    to={"/product/upload"}
                    type="button"
                    state={{isUpdate: false}}
                    className="inline-block rounded bg-red-400 px-4 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                    Add Product
                </Link>
            </div>
            <div className="ml-3">
                <div className="flex flex-col overflow-x-auto">
                    <div className="sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left text-sm font-light">
                                    <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">Product No</th>
                                        <th scope="col" className="px-6 py-4">Name</th>
                                        <th scope="col" className="px-6 py-4">Description</th>
                                        <th scope="col" className="px-6 py-4">Price</th>
                                        <th scope="col" className="px-6 py-4">Category</th>
                                        <th scope="col" className="px-6 py-4"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {products.map((product, index) => <RowBuilder key={index} product={product} />)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default ShopProductPage;