import React from "react";

const SizeLabel = ({size, setSelected, selectedSize}) => {
    const selectedHandle = () => {
        setSelected(size);
    }

    return <div onClick={selectedHandle} className={`cursor-pointer text-lg p-3 border-2 ${(size !== selectedSize) ? 'border-gray-300' : 'border-gray-500'} w-[60px] h-[60px] rounded-full hover:border-gray-500 flex items-center justify-center`}>
        {size}
    </div>
}

export default SizeLabel;