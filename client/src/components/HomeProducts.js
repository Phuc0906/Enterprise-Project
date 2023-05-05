import React, { useEffect, useState } from "react";
import { FireIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import HomeProductCard from "./HomeProductCard";

const HomeProducts = () => {
    const [products, setProducts] = useState([]);
    const getProducts = () => {
        fetch(`http://localhost:8080/api/product/get`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.token,
            },
        })
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        getProducts();
    }, []);
    const maxLength = 8;
    const len = Math.min(products.length, maxLength);
    return (
        <div className="px-4 py-7">
            <div className="flex items-center gap-2 mb-4">
                <FireIcon className="text-red-500 h-7 w-7"></FireIcon>
                <h2 className="text-xl font-bold">Hot Item</h2>
            </div>
            <div className=" max-h-[400px] h-full grid grid-cols-4 gap-x-5 gap-y-12">
                {products &&
                    products.map((item, idx) => {
                        if (idx < len) {
                            return (
                                <HomeProductCard
                                    product={item}></HomeProductCard>
                            );
                        }
                    })}
            </div>
            <div className="flex items-center justify-end mr-4 mt-7 gap-x-2">
                <span className="font-bold text-right cursor-pointer select-none ">
                    Go shopping
                </span>
                <ChevronDoubleRightIcon className="w-6 h-6 font-bold cursor-pointer"></ChevronDoubleRightIcon>
            </div>
        </div>
    );
};

export default HomeProducts;
