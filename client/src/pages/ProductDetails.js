import React , { useContext }from "react";
import {useParams} from "react-router-dom";

import NavBar from "../components/NavBar";
//Import cart and product

const ProductDetails = () => {
    const items = [
        {name: "Dashboard", page: "/shop/dashboard"},
        {name: "Product", page: "/shop/product"}
    ]

    //get the product id from the url
    const {id} = useParams();
//    const {products} = useContext(Products);
//    const {addToCart} = useContext(Cart);


////      get the specific product based on the product id
//     const product = products.find(item => {
//        return item.id === parseInt(id);
//     })

//// cannot find the product
//    if(!product){
//        return (
//        <section className="h-screen flex justify-center items-center">Loading...</section>
//        );
//    }
//    const{name, price, description, image, cost, categoryname, shopname} = product;

    return (
    <div>
        <NavBar items={items} />
        <section className="pt-32 pb-12 lg:py-32 h-screen flex items-center">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-center">
                    <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
                        <img className="max-w[200px] lg:max-w-sm" src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e777c881-5b62-4250-92a6-362967f54cca/air-force-1-07-womens-shoes-b19lqD.png" alt="image"/>
                    </div>
                    <div className="flex-1 text-center lg:text-left">
                        <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">Nike Air Force 107</h1>
                        <div className="text-xl font-medium mb-6">$110</div>
                        <p className="mb-8">The radiance lives on in the Nike Air Force 1 ’07, the b-ball icon that puts a fresh spin on what you know best: crisp leather, bold colors and the perfect amount of flash to make you shine</p>
                        <button className="bg-black py-4 px-8 text-white rounded-full">Add to cart</button>
                    </div>
                </div>
            </div>
        </section>
    </div>

    );
};

export default ProductDetails;

//                        <img src="../images/hyper.png" alt="image"/>
//                        <img src={} alt="image"/>
