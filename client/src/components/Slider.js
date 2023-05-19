import React, { useState } from "react";
import hyper from "../images/hyper.png";
import jodan from "../images/AireJordanNike.png";

import {
    ArrowRightCircleIcon,
    ArrowLeftCircleIcon,
} from "@heroicons/react/24/outline";
import SliderItem from "./SliderItem";
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
                <SliderItem
                    name="Hyper Adapt"
                    desc="Riding the momentum of last year's hit auto-lacing basketball shoe, the Nike Adapt BB 2.0 delivers the same consistent, customized fit, now with more of the game-changing technology revealed. Ultra-responsive cushioning is curved to follow the natural motion of your foot, providing continuous energy return on the court."
                    image={hyper}></SliderItem>
                <SliderItem
                    name="Jordan Retro 1 High"
                    desc="The Legend The Men's Air Jordan Retro 1 High OG is Michael Jordan’s iconic first signature shoe in its truest form. Accept no substitutes when it comes the legendary sneaker. The Air Jordan 1 Retro in its High OG iteration is designed to best replicate the shape, quality, and materials of the original release of the shoe in 1985. The Air Jordan 1 Retro High OG features the accurate height and shape of the original ’85 version, as well as the original “Nike Air” logo branding on the tongue tag to best represent the pairs Jordan wore on court for his rookie season when he and his Air Jordan line first became a national phenomenon. Don’t miss out on it in its purest form."
                    image={jodan}></SliderItem>
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
