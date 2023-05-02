import React from 'react';
import { IoTrashOutline } from 'react-icons/io5';


const CartItem = () => {
    return (
        <div className="flex py-5 gap-3 md:gap-5 border-b">
            {/*images*/}
            <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
                <img src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/dddfe7a5-318b-40ea-8374-623b53314ff3/air-force-1-07-lv8-womens-shoes-PsnCh2.png" alt="image"/>
            </div>

            <div className="w-full flex flex-col">
                <div className="flex flex-col md:flex-row justify-between">
                    {/*Title*/}
                    <div className="text-lg md:text-xl font-semibold  text-black/[0.8]">
                        Nike Air Force 1 '07 LV8
                    </div>

                    {/*Category*/}
                    <div className="text-sm md:text-md font-medium text-black/[0.5] hidden">Running</div>

                    {/*Price*/}
                    <div className="text-lg md:text-xl font-semibold text-black/[0.8]">$120</div>
                </div>
                {/*Category*/}
                <div className="text-md font-medium text-black/[0.5] hidden md:block ">Running</div>

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