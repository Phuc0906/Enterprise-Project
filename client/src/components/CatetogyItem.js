import React from "react";
import { useNavigate } from "react-router";

const CatetogyItem = ({ image, title }) => {
    const navigate = useNavigate();
    return (
        <div className="relative w-full h-full">
            <img className="object-cover w-full h-full" src={image} alt="" />

            <h3 className="absolute text-8xl top-[20px] w-full font-extrabold text-center text-white">
                {title}
            </h3>
            <button
                onClick={() => navigate("/products")}
                className="uppercase absolute px-10 py-4 text-white shadow-md bottom-5 rounded-2xl bg-slate-900 left-1/2 translate-x-[-50%] hover:bg-gradient-to-br from-[#1e130c] to-[#9a8478] transition-colors">
                Shop Now
            </button>
        </div>
    );
};

export default CatetogyItem;
