import React from "react";
import NavBar from "../components/NavBar";
import Slider from "../components/Slider";
import Category from "../components/Category";

const Home = () => {
    const items = [
        {name: "Home", page: "/home"},
        {name: "Products", page: "/products"}
    ]

    return (
        <div>
            <NavBar items={items}/>
            <Slider></Slider>
            <Category></Category>
        </div>
    );
};

export default Home;
