import React from 'react';
import FooterItem from "./FooterItem";
import Facebook from "../images/Facebook.png";
import Twitter from "../images/Twitter.png";
import Insta from "../images/Instagram.png";
import Tiktok from "../images/TikTok.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    return (
        <footer class="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600" className="bg-black text-white p-4">
            <div className="p-4">
                <div className="h-[130px] relative">
                    <img
                        className="object-cover w-full h-full"
                        src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1213&q=80"
                        alt=""
                    />
                    <div className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50"></div>
                    <div className="flex items-center justify-center gap-x-4 absolute top-1/2 translate-y-[-50%] left-0 right-0 z-50">
                        <h2 className="text-4xl md:text-2xl font-extrabold text-center text-orange-500 uppercase ">
                            Become a member & get 15% off
                        </h2>
                        <button
                            onClick={() => navigate("/login")}
                            className="py-4 font-semibold text-white rounded-lg bg-slate-900 px-7 hover:bg-gradient-to-r from-violet-800 to-orange-600">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
                    <div className="container mx-auto">
                        <div className="flex flex-wrap">
                            <div className="w-full md:w-1/3">
                                <h3 className="text-lg font-semibold mb-2">Product</h3>
                                <p className="text-sm">Men</p>
                                <p className="text-sm">Women</p>
                                <p className="text-sm">Sale off</p>
                            </div>

                            <div className="w-full md:w-1/3">
                                <h3 className="text-lg font-semibold mb-2">Support</h3>
                                <p className="text-sm">FAQ</p>
                                <p className="text-sm">Information</p>
                                <p className="text-sm">Security</p>
                                <p className="text-sm">General policy</p>
                                <p className="text-sm">Order tracking</p>
                            </div>

                            <div className="w-full md:w-1/3">
                                <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                                <p className="text-sm">Email: support@example.com</p>
                                <p className="text-sm">Phone: +1 (123) 456-7890</p>
                                <ul className="flex items-center mt-4 gap-x-4 md:gap-x-8">
                                    <li>
                                        <img src={Facebook} alt="" />
                                    </li>
                                    <li>
                                        <img src={Twitter} alt="" />
                                    </li>
                                    <li>
                                        <img src={Insta} alt="" />
                                    </li>
                                    <li>
                                        <img src={Tiktok} alt="" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
        </footer>
    );
};

export default Footer;