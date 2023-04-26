import React, {useState} from "react";

const CategoryBuilder = ({category, idx, onHandleCheckbox}) => {

    const handleCategorySelected = (e) => {
        onHandleCheckbox(e.target.checked, idx);
    }

    return <div className="mt-2 flex">
        <input onChange={handleCategorySelected} className="h-4 w-4" type="checkbox"/>
        <h5 className="ml-4 text-[#222222]">{category.name}</h5>
    </div>
}

export default CategoryBuilder;