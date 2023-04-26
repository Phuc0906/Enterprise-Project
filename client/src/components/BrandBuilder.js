import React from "react";

const BrandsBuilder = ({brand, idx, onHandleCheckBox}) => {
    const handleCheckBox = (e) => {
        onHandleCheckBox(e.target.checked, idx);
    }

    return <div className="mt-2 flex">
        <input onChange={handleCheckBox} className="h-4 w-4" value={idx} type="checkbox"/>
        <h5 className="ml-4 text-[#222222]">{brand.name}</h5>
    </div>
}

export default BrandsBuilder;