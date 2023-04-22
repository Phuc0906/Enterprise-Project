import React, { useState } from "react";
import hyper from "../images/hyper.png";
import {
    ArrowRightCircleIcon,
    ArrowLeftCircleIcon,
} from "@heroicons/react/24/outline";
const Slider = () => {
    const [posX, setPosX] = useState(0);
    const lenElements = 2;
    const limit = lenElements * 100 - 100;

    const handleRightClick = async (e) => {
        const slider = document.querySelector(".slider");
        if (slider) {
            slider.style.transform = `translateX(${posX - 100}vw)`;
        }
        setPosX((prev) => (prev = prev - 100));
    };
    const handleLeftClick = (e) => {
        const slider = document.querySelector(".slider");
        if (slider) {
            slider.style.transform = `translateX(${posX + 100}vw)`;
        }
        setPosX((prev) => (prev = prev + 100));
    };

    return (
        <div className="relative w-full h-screen overflow-hidden max-w-screen">
            <div
                className={`flex items-center w-full h-full transition-all slide  slider`}>
                <div className="flex items-center flex-shrink-0 w-screen h-screen bg-gradient-to-br from-black to-slate-800">
                    <div className="flex flex-col text-white ml-[200px] mt-30 gap-y-3 flex-shrink-0 w-1/3">
                        <h2 className="text-[100px] font-bold leading-tight">
                            Hyper Adapt
                        </h2>
                        <p className="mt-4 leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Aspernatur pariatur dolor placeat perspiciatis
                            autem quam iusto excepturi incidunt explicabo iure
                            cum quae magnam, blanditiis eligendi! Saepe facilis
                            obcaecati unde laudantium?
                        </p>
                        <div className="flex items-center mt-4 gap-x-4">
                            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-slate-800 rounded-xl">
                                Get This Product
                            </button>
                        </div>
                    </div>
                    <div className="w-full h-full max-w-full">
                        <img
                            src={`${hyper}`}
                            className="w-full h-full select-none"
                            alt=""
                        />
                    </div>
                </div>
                <div className="flex-shrink-0 w-screen h-screen bg-red-500"></div>
            </div>
            <button
                className="absolute left-3 top-1/2 translate-y-[-1/2]"
                onClick={handleLeftClick}
                disabled={posX === 0 ? true : false}>
                <ArrowLeftCircleIcon
                    className={`transition-all w-12 h-12 text-gray-200  ${
                        posX === 0 ? "opacity-20" : ""
                    }
                `}></ArrowLeftCircleIcon>
            </button>
            <button
                className="absolute right-3 top-1/2 translate-y-[-1/2]"
                onClick={handleRightClick}
                disabled={Math.abs(posX) === limit ? true : false}>
                <ArrowRightCircleIcon
                    className={`transition-all w-12 h-12 text-gray-200  ${
                        Math.abs(posX) === limit ? "opacity-20" : ""
                    }
                `}></ArrowRightCircleIcon>
            </button>
        </div>
    );
};

export default Slider;
