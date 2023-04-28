import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import NavBar from "../components/NavBar";
//Import cart and product

const ProductDetails = () => {
    const IMAGE_URL = "https://gr-project-bucket.s3.ap-southeast-1.amazonaws.com/";
    const items = [
        {name: "Dashboard", page: "/shop/dashboard"},
        {name: "Product", page: "/shop/product"}
    ]

    //get the product id from the url
    const {id} = useParams();
    const [product, setProduct] = useState({
        "name": "",
        "description": "",
        "price": 0,
        "shopname": "Nike",
        "categoryname": ""
    })


    useEffect(() => {
        fetch(`http://localhost:8080/api/product/id/${id}`, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }
        }).then(res => {
            const serverRes = res.json();
            serverRes.then(data => {
                setProduct(data)

            })
        })
    }, [])

    //get products


//    const {products} = useContext(Products);
//    const {addToCart} = useContext(Cart);


////      get the specific product based on the product id
//     const product = products.find(item => {
//        return item.id === parseInt(id);
//     })

//// cannot find the product
//    if(!product){
//        return (
//        <section className="h-screen flex justify-center items-center">Loading...</section>
//        );
//    }
//    const{name, price, description, image, cost, categoryname, shopname} = product;

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

    return (
    <div>
        <NavBar items={items} />
        <section className="pt-32 pb-12 lg:py-32 h-screen flex items-center">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-center">
                    <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
                        <img className="max-w[200px] lg:max-w-sm" src={`${IMAGE_URL}${product.id}-0.png`} alt="image"/>
                    </div>
                    <div className="flex-1 text-center lg:text-left">
                        <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">{product.name}</h1>
                        <div className="text-xl font-medium mb-6">{splittingPriceNumber(product.price) + "vnd"}</div>
                        <p className="mb-8">{product.description}</p>
                        <button className="bg-black py-4 px-8 text-white rounded-full">Add to cart</button>
                    </div>
                </div>
            </div>
        </section>
    </div>

    );
};

export default ProductDetails;

//                        <img src="../images/hyper.png" alt="image"/>
//                        <img src={} alt="image"/>
