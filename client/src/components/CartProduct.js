import React, {useEffect, useState} from 'react';
import {IoTrashOutline} from "react-icons/io5";
import {splittingPriceNumber} from "../utils";

const CartProduct = ({product, onProductQuantityChange, productIdx, shopIdx, onQuantityChange}) => {
    const IMAGE_URL = `https://gr-project-bucket.s3.ap-southeast-1.amazonaws.com/`;
    const [quantityArrow, setQuantityArrow] = useState(false);
    const defaultQuantity = [1,2, 3, 4];
    const [selectedQuantity, setSelectedQuantity] = useState(product.quantity);
    const [productStatus, setProductStatus] = useState("This product is out of stock");
    const [showStatus, setShowStatus] = useState(false);
    const [leftQuantity, setLeftQuantity] = useState(0);


    const quantityArrowHandle = () => {
        setQuantityArrow(!quantityArrow)
    }

    useEffect(() => {
        checkStock(product.quantity);
        console.log("in")
        if (leftQuantity < 0) {
            if (Math.abs(leftQuantity) < selectedQuantity) {
                console.log("In greater " + Math.abs(leftQuantity) + " = " + selectedQuantity)
                setProductStatus(`Only ${selectedQuantity - Math.abs(leftQuantity)} products left`);
                setShowStatus(true);
            }else if ((Math.abs(leftQuantity) === selectedQuantity)) {
                console.log("In equal")
                setProductStatus(`Out of stock`);
                setShowStatus(true);
            }else {
                setShowStatus(false);
            }
        }else {
            setShowStatus(false);
        }
    }, [leftQuantity])


    const onQuantitySelectedChange = (e) => {
        let leftQuantity = 0;
        console.log(typeof parseInt(e.target.ariaValueText))
        onQuantityChange();
        setSelectedQuantity(parseInt(e.target.ariaValueText))
        onProductQuantityChange(parseInt(e.target.ariaValueText), shopIdx, productIdx);
        setQuantityArrow(!quantityArrow);
        checkStock(e.target.ariaValueText);

    }

    const checkStock = (quantity) => {
        console.log("Size type:" + typeof product.size);
        fetch(`https://${process.env.REACT_APP_API_URL}/api/in-stock?productId=${product.productId}&size=${(product.size.includes('.') ? product.size : product.size + '.0')}&quantity=${quantity}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.token,
            }
        })
            .then((res) => {
                const serverRes = res.json();
                serverRes.then((data) => {
                    setLeftQuantity(data.left);
                });
            })
    }

    const deleteProduct = () => {
        fetch(`https://${process.env.REACT_APP_API_URL}/api/in-cart`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.token,
            },
            body: JSON.stringify({
                productId: product.productId,
                size: product.size
            }),
        })
            .then((res) => {
                const serverRes = res.json();
                serverRes.then((data) => {
                    console.log(data);
                });
                localStorage.cart = (parseInt(localStorage.cart) - 1).toString();
                window.location.reload();
            })
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
                    <div className="text-lg md:text-xl font-semibold text-black/[0.8]">{splittingPriceNumber((product.productPrice * selectedQuantity).toString()) + " vnd"}</div>
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
                            <div>
                                <div className="ml-3 text-lg flex items-center">
                                    <div>
                                        {selectedQuantity}
                                    </div>
                                    <div onClick={quantityArrowHandle} className={` pl-3 `}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 ${!quantityArrow ? 'rotate-0' : 'rotate-180'} transition duration-300`}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                                        </svg>
                                    </div>
                                </div>
                                {quantityArrow && <div className="relative">
                                    <div
                                        onClick={onQuantitySelectedChange}
                                        className=" absolute z-10 mt-1 w-full text-center origin-top-right border-1 border-gray-400  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                        <div className="py-1" role="none">
                                            {defaultQuantity.map((quantity, index) => <div aria-valuetext={quantity} key={index} className="cursor-pointer text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem"
                                                tabIndex="-1" id="menu-item-0 ">{quantity}</div>)}
                                        </div>
                                    </div>
                                </div>}
                            </div>

                        </div>
                    </div>
                    <IoTrashOutline onClick={deleteProduct} className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]" />
                </div>
                {showStatus && <div>
                    <label className="text-orange-500">{productStatus}</label>
                </div>}

            </div>
        </div>
    );
};

export default CartProduct;