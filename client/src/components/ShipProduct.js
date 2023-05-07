import React from 'react';
import {IoTrashOutline} from "react-icons/io5";

const ShipProduct = ({product}) => {
    const IMAGE_URL = `https://gr-project-bucket.s3.ap-southeast-1.amazonaws.com/`;
    return (
        <div className="flex py-5 gap-3 md:gap-5 border-b">
            {/*images*/}
            <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
                <img src={`${IMAGE_URL}${product.productId}-0.png`} alt="image"/>
            </div>

            <div className="w-full flex flex-col">
                <div className="flex item-center justify-between mt-4">
                    <div className="flex item-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
                        <div className="flex items-center gap-1">
                            <div className="font-semibold mr-4">ID: {product.productId}</div>
                            <div className="font-semibold mr-4">Quantity: {product.quantity}</div>
                            <div className="font-semibold mr-4">Size: {product.size}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ShipProduct;