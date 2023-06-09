import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { splittingPriceNumber } from "../utils";
import Slider from "react-slick";
import { Carousel } from "react-responsive-carousel";
import RatingStar from "./RatingStar";

const ProductCards = ({ product }) => {
    const IMAGE_URL =
        "https://gr-project-bucket.s3.ap-southeast-1.amazonaws.com/";
    const navigate = useNavigate();
    const [currentIdx, setCurrentIdx] = useState(0);
    const timeRef = useRef(null);
    const [item, setItem] = useState(0);
    const [images, setImages] = useState([]);
    const starCount = [0, 1, 2, 3, 4];
    const cardClickedHandle = () => {
        navigate(`/product/${product.id}`);
        window.location.reload();
    };

    useEffect(() => {
        const urlArr = [];
        for (let i = 0; i < product.imagesCount; i++) {
            urlArr.push(`${IMAGE_URL}${product.id}-${i}.png`);
        }
        setImages(urlArr);

        timeRef.current = setTimeout(() => {
            setItem(1);
        }, 500);
    }, [currentIdx]);

    return (
        <div
            onClick={cardClickedHandle}
            className="cursor-pointer relative w-[250px] h-[300px] border-2 flex-wrap p-2 rounded-2xl shadow-lg hover:shadow-2xl">
            <div className="w-full">
                <Carousel
                    infiniteLoop={true}
                    showIndicators={false}
                    showStatus={false}
                    showThumbs={false}
                    thumbWidth={90}
                    autoPlay={true}
                    autoFocus={true}
                    interval={2500}
                    selectedItem={item}
                    className="productCarousel">
                    {images.map((image, index) => (
                        <img
                            className="object-cover w-full h-40 ml-auto mr-auto duration-500 ease-in-out rounded-2xl"
                            key={index}
                            src={image}
                            alt="image"
                        />
                    ))}
                </Carousel>
            </div>
            <div className="ml-5">
                <h1 className="mt-[15.7px] text-sm w-[200px] text-[#003F62] font-bold flex-wrap line-clamp-1">
                    {product.name}
                </h1>
                <div className="flex gap-1 mt-2">
                    {starCount.map((star) => (
                        <RatingStar
                            ratingCount={product.rating - 1}
                            idx={star}
                            key={star}
                        />
                    ))}
                </div>
                <h1 className="absolute bottom-4 text-[#4A4A4A]">
                    {splittingPriceNumber(product.price.toString()) + " vnd"}
                </h1>
            </div>
        </div>
    );
};

export default ProductCards;
