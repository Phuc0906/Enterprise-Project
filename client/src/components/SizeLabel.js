import React, {useEffect} from "react";

const SizeLabel = ({size, setSelected, selectedSize, quantity, index}) => {
    const selectedHandle = () => {
        if (quantity !== 0) {
            if (size === selectedSize) {
                setSelected("")
            }else {
                setSelected(size);
            }
        }

    }

    return <div onClick={selectedHandle} className={`${(quantity === 0 ? 'cursor-not-allowed  opacity-30'  : 'cursor-pointer hover:border-gray-500')} text-lg p-3 border-2 ${(size !== selectedSize) ? 'border-gray-300' : 'border-gray-500'} w-[60px] h-[60px] rounded-full  flex items-center justify-center`}>
        {size}
    </div>
}

export default SizeLabel;