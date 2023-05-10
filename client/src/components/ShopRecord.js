import React, {useEffect, useState} from "react";
// rating total
// current rating
// total product sells

const ProductSellingStatus = ({ title, value, theme }) => {
    return (
        <div className={"rounded-lg w-fit pl-8 pt-4 pb-4 pr-8" + " " + theme}>
            <h4 className="mb-3 font-serif text-lg">{title}</h4>
            <h2 className="text-4xl text-[#1C1C1C] font-bold mr-20">{value}</h2>
        </div>
    );
};

const ShopRecord = ({data}) => {

    const [totalProduct, setTotalProduct] = useState([]);

    useEffect(() => {
        let totalProductSetting = 0;
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            console.log(data[i]);
            totalProductSetting += data[i].billingResponses.length;
        }
        setTotalProduct(totalProductSetting);
    }, [data])

    return (
        <section className="flex justify-center item-center gap-x-[9rem]">
            <ProductSellingStatus
                title={"Sold"}
                value={totalProduct}
                theme={"bg-violet-200"}
            />
            <ProductSellingStatus
                title={"Rating Count"}
                value={"200K"}
                theme={"bg-yellow-200"}
            />
            <ProductSellingStatus
                title={"Sold"}
                value={"200K"}
                theme={"bg-green-200"}
            />
        </section>
    );
};

export default ShopRecord;
