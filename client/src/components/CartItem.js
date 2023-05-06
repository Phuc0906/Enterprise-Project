import React, {useEffect, useState} from 'react';
import CartProduct from "./CartProduct";
import axios from "axios";

const CartItem = ({shop}) => {
    const [products, setProducts] = useState(shop.productList)
    const [totalPrice, setTotalPrice] = useState(0);
    const productBillingDTO = [];

    useEffect(() => {
        let totalPriceVar = 0
        for (let i = 0; i < shop.productList.length; i++) {
            totalPriceVar += (shop.productList[i].productPrice * shop.productList[i].quantity);
            const productBilling = {
                productId: shop.productList[i].productId,
                quantity: shop.productList[i].quantity,
                size: shop.productList[i].size,
            };
            productBillingDTO.push(productBilling)
        }
        setTotalPrice(totalPriceVar)
    },shop.productList)

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

    function handleBuy() {
        fetch("http://localhost:8080/api/billing", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.token,
            },
            body: JSON.stringify({
                "customerPhoneNumber": localStorage.profile.phone,
                "shopName": shop.shopName,
                "totalPrice": totalPrice,
                "products": productBillingDTO
            })
        })
            .then({
                // delete from cart
            })
    }

    return (
        <>
        <div className="mt-5 text-3xl font-bold">{shop.shopName}</div>
            {products.map((product, index) => <CartProduct product={product} key={index} />)}
            <p>Total price: {splittingPriceNumber(totalPrice.toString()) + " vnd"}</p>
            <button className="py-4 font-semibold text-white rounded-lg bg-slate-900 px-7 hover:bg-gradient-to-r from-violet-800 to-orange-600" onClick={handleBuy}>Buy</button>
        </>
    );
}

export default CartItem;