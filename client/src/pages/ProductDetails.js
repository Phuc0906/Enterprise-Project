import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Wrapper from "../components/Wrapper";
import NavBar from "../components/NavBar";
import ProductDetailsCarousel from "../components/ProductDetailsCarousel";
import Footer from "../components/Footer";
import SizeLabel from "../components/SizeLabel";
import RatingStar from "../components/RatingStar";
import { splittingPriceNumber, userNavContent } from "../utils";
//Import cart and product

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: 0,
        shopname: "Nike",
        categoryname: "",
        imagesCount: 0,
    });
    const [imagesCounting, setImagesCounting] = useState(0);
    const size = ["5.5", "6.0", "6.5", "7", "7.5", "8", "8.5", "9", "9.5"];
    const [sizeSelected, setSizeSelected] = useState("");
    const starCount = [0, 1, 2, 3, 4];
    const [startSelect, setStarSelect] = useState(-1);
    const [quantity, setQuantity] = useState([]);
    const [ratingCheck, setRatingCheck] = useState([]);

    useEffect(() => {}, [quantity]);

    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_API_URL}/api/product/id/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.token,
            },
        }).then((res) => {
            const serverRes = res.json();
            serverRes.then((data) => {
                const settingData = data;
                setProduct(settingData);
                setImagesCounting(data.imagesCount);
            });
        });

        fetch(`http://${process.env.REACT_APP_API_URL}/api/product/stock?productId=${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.token,
            },
        }).then((res) => {
            const serverRes = res.json();
            serverRes.then((data) => {
                const settingData = data;
                settingData.sort(function (a, b) {
                    return parseFloat(a.type) - parseFloat(b.type);
                });
                setQuantity(settingData);
            });
        });

        fetch(`http://${process.env.REACT_APP_API_URL}/api/billing/check-bought/${id}/${JSON.parse(localStorage.profile).phone}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.token,
            },
        }).then((res) => {
            const serverRes = res.json();
            serverRes.then((data) => {
                console.log(data);
                setRatingCheck(data);
            });
        });


    }, []);

    const addToCartHandle = () => {
        if (sizeSelected.length === 0) {
            return;
        }
        fetch(`http://${process.env.REACT_APP_API_URL}/api/in-cart`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.token,
            },
            body: JSON.stringify({
                productId: id,
                size: sizeSelected,
                quantity: 1,
            }),
        }).then((res) => {
            const serverRes = res.json();
            console.log(serverRes);
            localStorage.cart = (parseInt(localStorage.cart) + 1).toString();
            window.location.reload();
        });
    };

    const onRating = () => {
        console.log(startSelect);
        fetch(`http://${process.env.REACT_APP_API_URL}/api/product/rating/${id}/${JSON.parse(localStorage.profile).phone}/${startSelect + 1}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.token,
            }
        }).then((res) => {
            const serverRes = res.json();
            serverRes.then(data => {
                console.log(data);
            })
        });
    }

    return (
        <div>
            <NavBar items={userNavContent} />
            <div className="flex flex-col min-h-screen">
                <div className="flex-grow mb-4">
                    <div className="w-full">
                        <Wrapper>
                            <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
                                <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
                                    <ProductDetailsCarousel
                                        product={product}
                                        imageCount={imagesCounting}
                                        productId={id}
                                    />
                                </div>
                                <div className="flex-[1] py-3">
                                    <div className="mb-2 text-3xl font-semibold">
                                        {product.name}
                                    </div>
                                    <div></div>
                                    <div className="mb-5 text-lg font-semibold">
                                        {product.categoryname}
                                    </div>
                                    <div></div>
                                    <div className="mt-3 text-lg font-bold">
                                        {splittingPriceNumber(
                                            product.price.toString()
                                        ) + " vnd"}
                                    </div>
                                    <div className="mt-3 text-lg font-light">
                                        {product.description}
                                    </div>
                                    <div className="mt-3">
                                        <label className="text-lg font-bold">
                                            Size
                                        </label>
                                        <div className="flex flex-wrap gap-3 mt-3">
                                            {quantity.map((qty, index) => (
                                                <SizeLabel
                                                    index={index}
                                                    key={index}
                                                    size={qty.type}
                                                    setSelected={
                                                        setSizeSelected
                                                    }
                                                    selectedSize={sizeSelected}
                                                    quantity={qty.quantity}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    {(ratingCheck.length !== 0) ? <div className="mt-3">
                                        <label className="text-lg font-bold">
                                            Rating
                                        </label>
                                        <div className="flex items-center">
                                            <div className="flex gap-4 mt-2">
                                                {starCount.map((star) => (
                                                    <RatingStar
                                                        key={star}
                                                        idx={star}
                                                        ratingCount={
                                                            startSelect
                                                        }
                                                        starSelect={
                                                            setStarSelect
                                                        }
                                                        isDetail={true}
                                                    />
                                                ))}
                                            </div>
                                            <div className="mt-3 ml-3">
                                                <button onClick={onRating} className="p-2 text-white bg-gray-400 rounded-full cursor-pointer animate-bounce hover:bg-gray-600">
                                                    Rate
                                                </button>
                                            </div>
                                        </div>
                                    </div> : null}
                                    <button
                                        onClick={addToCartHandle}
                                        className="w-full py-3 mt-5 text-white bg-black rounded-full">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default ProductDetails;
