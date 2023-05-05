import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import NavBar from "../components/NavBar";
import ProductDetailsCarousel from "../components/ProductDetailsCarousel";
import Footer from "../components/Footer";
import CartItem from "../components/CartItem";
//Import cart and product

const Cart = () => {
    const items = [
        {name: "Dashboard", page: "/shop/dashboard"},
        {name: "Product", page: "/shop/product"}
    ]
    const [shops, setShops] = useState([]);
    const [isLoadShop, setLoad] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/api/in-cart', {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }
        }).then(res => {
            const serverRes = res.json();
            serverRes.then(data => {
                const shopSetting = data;
                console.log(data);
                setShops(shopSetting);
                setLoad(true);
            })
        })
    }, [])

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
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow mb-4">
                <div className="w-full md:py-20">
                    <Wrapper>
                        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
                            <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">Shopping Cart</div>
                        </div>
                            <div className="flex flex-col lg:flex-row gap-12 py-10">
                                <div className="flex-[2]">
                                    <div className="text-lg font-bold">Cart Item</div>
                                    {shops.map((shop, index) => <CartItem shop={shop} key={index} />)}
                                </div>
                            </div>

                        {/*If the cart is empty*/}
                        <div className={`flex-[2] flex flex-col items-center pb-[50px] md:-mt-14 ${(!isLoadShop) ? '' : 'hidden'}`}>
                            <img src="https://www.99fashionbrands.com/wp-content/uploads/2020/12/empty_cart.png" width={500} height={500} className="w-[500px] md:w-[400px]"/>
                            <span className="text-xl font-bold">Look like your cart is empty</span>
                            <span className="text-center mt-4">Go ahead and explore top categories</span>
                            <Link to="/products">
                                <button className="w-full px-8 mt-8 bg-black text-white py-4 rounded-full text:lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75">Shopping</button>
                            </Link>
                        </div>

                    </Wrapper>
                </div>
            </div>
            <Footer />
        </div>
    </div>
    );
};
export default Cart;