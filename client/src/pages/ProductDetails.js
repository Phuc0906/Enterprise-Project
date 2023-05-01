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


//// get the specific product based on the product id
// const product = products.find(item => {
// return item.id === parseInt(id);
// })

//// cannot find the product
// if(!product){
// return (
// <section className="h-screen flex justify-center items-center">Loading...</section>
// );
// }
// const{name, price, description, image, cost, categoryname, shopname} = product;

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
                            <div className="text-3xl font-semibold mb-2">Nike Air Force 1 '07 LV8</div>
                            <div></div>
                            <div className="text-lg  font-semibold mb-5">Running</div>
                            <div></div>
                            <div className="text-lg font-bold mt-3">$120</div>
                            <div className="text-lg font-light mt-3">The radiance lives on in the Nike Air Force 1 ’07,
                                the b-ball icon that puts a fresh spin on what you know best: crisp leather, bold colors
                                and the perfect amount of flash to make you shine.
                                Air Force 1 Origins. Debuting in 1982, the AF1 was the first basketball shoe to house
                                Nike Air, revolutionizing the game while rapidly gaining traction around the world.
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