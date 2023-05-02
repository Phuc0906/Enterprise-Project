import React , { useContext }from "react";
import {useParams} from "react-router-dom";

import Wrapper from "../components/Wrapper";
import NavBar from "../components/NavBar";
import ProductDetailsCarousel from "../components/ProductDetailsCarousel";
import Footer from "../components/Footer";
//Import cart and product

const ProductDetails = () => {
const items = [
{name: "Dashboard", page: "/shop/dashboard"},
{name: "Product", page: "/shop/product"}
]

//get the product id from the display page
const {id} = useParams();
// const {products} = useContext(Products);
// const {addToCart} = useContext(Cart);


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
                setProduct(data)

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
        fetch(`http://localhost:8080/api/in-cart`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            },
            body: JSON.stringify({
                productId: product.id,
                size: '5.5',
                quantity: 1
            })
        }).then(res => {
            const serverRes = res.json();
            console.log(serverRes);
        })
    }
return (
<div>
    <NavBar items={items} />
    <div className="flex flex-col min-h-screen">
        <div className="flex-grow mb-4">
            <div className="w-full">
                <Wrapper>
                    <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
                        <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
                            <ProductDetailsCarousel />
                        </div>
                        <div className="flex-[1] py-3">
                            <div className="text-3xl font-semibold mb-2">{product.name}</div>
                            <div></div>
                            <div className="text-lg  font-semibold mb-5">Running</div>
                            <div></div>
                            <div className="text-lg font-bold mt-3">{splittingPriceNumber(product.price) + "vnd"}</div>
                            <div className="text-lg font-light mt-3">
                              {product.description}
                            </div>
                            <button className="w-full mt-5 bg-black text-white py-3 rounded-full">Add to Cart</button>
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


// image: image_id_index.png