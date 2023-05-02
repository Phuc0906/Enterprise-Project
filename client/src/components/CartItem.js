import React from 'react';
import { IoTrashOutline } from 'react-icons/io5';

const CartItem = ({product}) => {
    const IMAGE_URL = `https://gr-project-bucket.s3.ap-southeast-1.amazonaws.com/`;


    const splittingPriceNumber = (price) => {
        let splittingNum = "";
        let countDigit = 0;
        for (let i = price.length - 1; i >= 0; i--) {
            if (countDigit > 2) {
                countDigit = 0;
                splittingNum = ',' + splittingNum;
            }
            splittingNum = price[i] + splittingNum;
            countDigit++;
        }
        return splittingNum;
    }

    return (
        <div className="flex py-5 gap-3 md:gap-5 border-b">
            {/*images*/}
            <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
                <img src={`${IMAGE_URL}${product.productId}-0.png`} alt="image"/>
            </div>

            <div className="w-full flex flex-col">
                <div className="flex flex-col md:flex-row justify-between">
                    {/*Title*/}
                    <div className="text-lg md:text-xl font-semibold  text-black/[0.8]">
                        {product.productName}
                    </div>

                    {/*Category*/}
                    {/*<div className="text-sm md:text-md font-medium text-black/[0.5] hidden">{product.categoryName}</div>*/}

                    {/*Price*/}
                    <div className="text-lg md:text-xl font-semibold text-black/[0.8]">{splittingPriceNumber(product.productPrice.toString()) + " vnd"}</div>
                </div>
                {/*Category*/}
                <div className="text-md font-medium text-black/[0.5] hidden md:block ">{product.categoryName}</div>
                <div className="text-md font-medium text-black/[0.5] hidden md:block mt-2">
                    {"Size " + product.size}
                </div>

                <div className="flex item-center justify-between mt-4">
                    <div className="flex item-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
                        <div className="flex items-center gap-1">
                            <div className="font-semibold">Quantity</div>
                            <select className="hover:text-black">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            </div>
                        </div>
                        <IoTrashOutline className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]" />
                    </div>

                </div>
            </div>

    );
}

export default CartItem;