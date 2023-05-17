import React, {useEffect, useState} from 'react';
import CartProduct from "./CartProduct";
import axios from "axios";
import {splittingPriceNumber} from "../utils";

const CartItem = ({shop, onProductQuantityChange, shopIdx}) => {
    const [products, setProducts] = useState(shop.productList)
    const [totalPrice, setTotalPrice] = useState(0);
    const [billingProducts, setBillingProducts] = useState([]);
    const [isQuantityChange, setQuantityChange] = useState(false);

    useEffect(() => {
        let totalPriceVar = 0;
        const productBillingDTO = [];
        for (let i = 0; i < shop.productList.length; i++) {
            totalPriceVar += (shop.productList[i].productPrice * shop.productList[i].quantity);
            const productBilling = {
                productId: shop.productList[i].productId,
                quantity: shop.productList[i].quantity,
                size: parseFloat(shop.productList[i].size),
            };
            productBillingDTO.push(productBilling)

        }
        setTotalPrice(totalPriceVar)
        setBillingProducts(productBillingDTO)
    },[shop.productList, isQuantityChange]);


    function handleBuy() {
        fetch("http://localhost:8080/api/billing", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.token,
            },
            body: JSON.stringify({
                "customerPhoneNumber": localStorage.phoneNumber,
                "shopName": shop.shopName,
                "totalPrice": totalPrice,
                "products": billingProducts
            })
        })
            .then({
                // delete from cart
            })
    }

    const onQuantityChange = () => {
        setQuantityChange(!isQuantityChange);
    }

    return (
        <div className="border-2 border-slate-300 p-4 rounded-xl">
        <div className="mt-5 text-3xl font-bold">{shop.shopName}</div>
            {products.map((product, index) => <CartProduct product={product} key={index} onProductQuantityChange={onProductQuantityChange} shopIdx={shopIdx} productIdx={index} onQuantityChange={onQuantityChange} />)}
            <p>Total price: {splittingPriceNumber(totalPrice.toString()) + " vnd"}</p>
            <button className="py-4 font-semibold text-white rounded-lg bg-slate-900 px-7 hover:bg-gradient-to-r from-violet-800 to-orange-600" onClick={handleBuy}>Buy</button>
        </div>
    );
}

export default CartItem;