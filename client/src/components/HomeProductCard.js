import React, { useEffect } from "react";
import {
    InformationCircleIcon,
    EllipsisHorizontalCircleIcon,
} from "@heroicons/react/24/solid";
import { splittingPriceNumber } from "../utils";
import { useNavigate } from "react-router-dom";
const HomeProductCard = (props) => {
    const IMAGE_URL =
        "https://gr-project-bucket.s3.ap-southeast-1.amazonaws.com/";
    const { key, product } = props;
    const navigate = useNavigate();

    const onDetailClick = () => {
        navigate(`/product/${product.id}`);
        window.location.reload();
    };

    const onListClick = () => {
        navigate("/products");
        window.location.reload();
    };

    const handleAddToCard = () => {
        if (localStorage.length === 0 || localStorage.role !== "USER") {
            navigate("/login");
        } else {
            navigate(`/product/${product.id}`);
            window.location.reload();
        }
    };

    return (
        <div className="relative flex flex-col h-full max-h-[400px] border rounded-lg shadow-primary group">
            <div className="absolute top-0 bottom-0 left-0 right-0 z-40 invisible p-4 leading-relaxed text-white transition-all bg-black rounded-lg opacity-80 group-hover:visible">
                <div onClick={onDetailClick} className="flex flex-col h-[350px]">
                    <p className="flex-shrink-0 text-xl font-semibold">
                        {product.shopname}
                    </p>
                    <p className="max-w-full mt-3 line-clamp-3">
                        {product.description}
                    </p>
                </div>
            </div>
            <div className="h-full max-h-full">
                <div className="mt-8 p-3 h-[50%] flex items-center justify-center ">
                    <img
                        className="object-cover h-full "
                        src={`${IMAGE_URL}${product.id}-${0}.png`}
                        alt=""
                    />
                </div>
                <div className="p-3 text-center">
                    <h2 className="text-lg font-semibold line-clamp-1">
                        {product.name}
                    </h2>
                    <span className="mt-[20px] block text-yellow-400">
                        {`${splittingPriceNumber(
                            product.price.toString()
                        )} VND`}
                    </span>
                </div>
            </div>
            <button
                onClick={handleAddToCard}
                className="absolute bottom-0 left-1/2 translate-x-[-50%] translate-y-[50%] max-w-[150px] max-h-[48px] w-full h-full rounded-[18px] bg-slate-800 text-white z-50 hover:shadow-secondary transition-all line-clamp-1">
                View detail
            </button>
        </div>
    );
};

export default HomeProductCard;
