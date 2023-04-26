import React from "react";

const ProductCards = ({product}) => {
    const IMAGE_URL = "https://gr-project-bucket.s3.ap-southeast-1.amazonaws.com/";

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

    const cardClickedHandle = () => {
        // move to product detail page
    }

    return <div className="relative w-[250px] h-[300px] border-2 flex-wrap p-2 rounded-2xl shadow-lg hover:shadow-2xl">
        <div className="w-full">
            <img className="ml-auto mr-auto w-full h-40 rounded-2xl" src={`${IMAGE_URL}${product.id}-${0}.png`}/>
        </div>
        <div className="ml-5">
            <h1 className="mt-[15.7px] text-sm w-[200px] text-[#003F62] font-bold flex-wrap">{product.name}</h1>
            <h1 className="absolute bottom-4 text-[#4A4A4A]">{splittingPriceNumber(product.price.toString()) + " vnd"}</h1>
        </div>

    </div>
}

export default ProductCards;