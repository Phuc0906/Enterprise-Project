import React from "react";

const SliderItem = ({ name, desc, image }) => {
    return (
        <div className="flex items-center flex-shrink-0 w-screen h-screen bg-gradient-to-br from-black to-slate-800">
            <div className="flex flex-col text-white ml-[200px] mt-30 gap-y-3 flex-shrink-0 w-1/3">
                <h2 className="text-[100px] font-bold leading-tight">{name}</h2>
                <p className="mt-4 leading-relaxed">{desc}</p>
                <div className="flex items-center mt-4 gap-x-4"></div>
            </div>
            <div className="w-full h-full max-w-full">
                <img src={image} className="w-full h-full select-none" alt="" />
            </div>
        </div>
    );
};

export default SliderItem;
