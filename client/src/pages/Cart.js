import React , { useContext }from "react";
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

return (
<div>
{/**/}
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
                                <CartItem/>
                                <CartItem/>
                                <CartItem/>
{/*
//                                {cartItems.map((item) => (
//                                    <CartItem key={item.id} data={item} />
//                                ))}
*/}

                            </div>

                            <div className="flex-[1]">
                                <div className="text-lg font-bold">Summary</div>
                                <div className="p-5 my-5 bg-black/[0.9] rounded-xl">
                                    <div className="flex justify-between">
                                        <div className="uppercase text-md font-medium text-white">Subtotal</div>
                                        <div className="uppercase text-md font-medium text-white">$120</div>
                                    </div>
                                    <div className="text-sm md:text-md py-5 border-t mt-5 text-white">The subtotal reflects the total price of your order before any applicable discounts. It does not include shipping costs and taxes</div>
                                </div>
                                <button className="w-full mt-5 bg-black text-white py-4 rounded-full text:lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75">Check out</button>
                            </div>
                        </div>

                    {/*If the cart is empty*/}
                    <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
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