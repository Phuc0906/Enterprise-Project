import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import Wrapper from "../components/Wrapper";
import NavBar from "../components/NavBar";
import ProductDetailsCarousel from "../components/ProductDetailsCarousel";
import Footer from "../components/Footer";
import SizeLabel from "../components/SizeLabel";
import RatingStar from "../components/RatingStar";
import {userNavContent} from "../utils";
//Import cart and product

const ProductDetails = () => {
    const {id} = useParams();
    const [product, setProduct] = useState({
        "name": "",
        "description": "",
        "price": 0,
        "shopname": "Nike",
        "categoryname": "",
        "imagesCount": 0
    })
    const [imagesCounting, setImagesCounting] = useState(0);
    const size = ["5.5", "6.0", "6.5", "7", "7.5", "8", "8.5", "9", "9.5"];
    const [sizeSelected, setSizeSelected] = useState("");
    const starCount = [0, 1, 2, 3, 4];
    const [startSelect, setStarSelect] = useState(-1);
    const [quantity, setQuantity] = useState([]);

    useEffect(() => {

    }, [quantity])

    useEffect(() => {
        fetch(`http://localhost:8080/api/product/id/${id}`, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }
        }).then(res => {
            const serverRes = res.json();
            serverRes.then(data => {
                const settingData = data;
                setProduct(settingData)
                setImagesCounting(data.imagesCount);
                console.log(data);
                console.log(data.imagesCount)
            })
        })

        fetch(`http://localhost:8080/api/product/stock?productId=${id}`, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }
        }).then(res => {
            const serverRes = res.json();
            serverRes.then(data => {
                console.log(data);
                const settingData = data;
                setQuantity(settingData);
                console.log(quantity)
            })
        })
    }, [])


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

    const addToCartHandle = () => {

        if (sizeSelected.length === 0) {
            return;
        }

        fetch(`http://localhost:8080/api/in-cart`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            },
            body: JSON.stringify({
                productId: id,
                size: sizeSelected,
                quantity: 1
            })
        }).then(res => {
            const serverRes = res.json();
            console.log(serverRes);
        })
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
                                <ProductDetailsCarousel product={product} imageCount={imagesCounting} productId={id}/>
                            </div>
                            <div className="flex-[1] py-3">
                                <div className="text-3xl font-semibold mb-2">{product.name}</div>
                                <div></div>
                                <div className="text-lg  font-semibold mb-5">{product.categoryname}</div>
                                <div></div>
                                <div className="text-lg font-bold mt-3">{splittingPriceNumber(product.price.toString()) + " vnd"}</div>
                                <div className="text-lg font-light mt-3">
                                  {product.description}
                                </div>
                                <div className="mt-3">
                                    <label className="text-lg font-bold">Size</label>
                                    <div className="mt-3 flex flex-wrap gap-3">
                                        {size.map((size,index) => <SizeLabel key={index} size={size} setSelected={setSizeSelected} selectedSize={sizeSelected} quantity={(quantity.length === 0) ? 0 : quantity[index].quantity} />)}
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <label className="text-lg font-bold">Rating</label>
                                    <div className="flex items-center">
                                        <div className="flex gap-4 mt-2">
                                            {starCount.map(star => <RatingStar key={star} idx={star} ratingCount={startSelect} starSelect={setStarSelect} />)}
                                        </div>
                                        <div className="mt-3 ml-3">
                                            <button className="animate-bounce cursor-pointer bg-gray-400 text-white p-2 rounded-full hover:bg-gray-600">Rate</button>
                                        </div>
                                    </div>

                                </div>
                                <button onClick={addToCartHandle} className="w-full mt-5 bg-black text-white py-3 rounded-full">Add to Cart</button>
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
