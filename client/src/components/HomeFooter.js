import React from "react";
import FooterItem from "./FooterItem";
import Facebook from "../images/Facebook.png";
import Twitter from "../images/Twitter.png";
import Insta from "../images/Instagram.png";
import Tiktok from "../images/TikTok.png";
import { useNavigate } from "react-router-dom";

const HomeFooter = () => {
    const navigate = useNavigate();
    return (
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
            <div className="h-[370px] bg-[#16161A] p-[50px]">
                <div className="max-w-[900px] w-full mx-auto">
                    <div className="flex items-start text-white gap-x-[6rem] ">
                        <FooterItem
                            title="Product"
                            items={["Men", "Women", "Sale off"]}></FooterItem>
                        <FooterItem
                            title="About us"
                            items={[
                                "About Sneaker Market",
                                "Careers",
                            ]}></FooterItem>
                        <FooterItem
                            title="Support"
                            items={[
                                "FAQ",
                                "Information Security",
                                "General policy",
                                "Order tracking",
                            ]}></FooterItem>
                        <div>
                            <FooterItem
                                title="Contact"
                                items={[
                                    "Email: sneakermarket@gmail.com",
                                    "Phone number: 0988 123 456",
                                ]}></FooterItem>
                            <p className="mt-4 font-semibold">
                                Sneaker Market Social

                            </p>
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
            </div>
        </div>

    );
};

export default HomeFooter;
// <div className="p-4">
//     <div className="h-[130px] relative">
//         <img
//             className="object-cover w-full h-full"
//             src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1213&q=80"
//             alt=""
//         />
//         <div className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50"></div>
//         <div className="flex items-center justify-center gap-x-4 absolute top-1/2 translate-y-[-50%] left-0 right-0 z-50">
//             <h2 className="text-4xl font-extrabold text-center text-orange-500 uppercase ">
//                 Become a memebr & get 15% off
//             </h2>
//             <button
//                 onClick={() => navigate("/login")}
//                 className="py-4 font-semibold text-white rounded-lg bg-slate-900 px-7 hover:bg-gradient-to-r from-violet-800 to-orange-600">
//                 Sign Up
//             </button>
//         </div>
//     </div>
//     <div className="h-[370px] bg-[#16161A] p-[50px]">
//         <div className="max-w-[900px] w-full mx-auto">
//             <div className="flex items-start text-white gap-x-[6rem] ">
//                 <FooterItem
//                     title="Product"
//                     items={["Men", "Women", "Sale off"]}></FooterItem>
//                 <FooterItem
//                     title="About us"
//                     items={[
//                         "About Sneaker Market",
//                         "Careers",
//                     ]}></FooterItem>
//                 <FooterItem
//                     title="Support"
//                     items={[
//                         "FAQ",
//                         "Information Security",
//                         "General policy",
//                         "Order tracking",
//                     ]}></FooterItem>
//                 <div>
//                     <FooterItem
//                         title="Contact"
//                         items={[
//                             "Email: sneakermarket@gmail.com",
//                             "Phone number: 0988 123 456",
//                         ]}></FooterItem>
//                     <p className="mt-4 font-semibold">
//                         Sneaker Market Social
//                         <ul className="flex items-center mt-4 gap-x-4">
//                             <li>
//                                 <img src={Facebook} alt="" />
//                             </li>
//                             <li>
//                                 <img src={Twitter} alt="" />
//                             </li>
//                             <li>
//                                 <img src={Insta} alt="" />
//                             </li>
//                             <li>
//                                 <img src={Tiktok} alt="" />
//                             </li>
//                         </ul>
//                     </p>
//
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>