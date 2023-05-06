import React from "react";
import NavBar from "../components/NavBar";
import Slider from "../components/Slider";
import Category from "../components/Category";
import HomeProducts from "../components/HomeProducts";
import HomeLastest from "../components/HomeLastest";
import HomeFooter from "../components/HomeFooter";

const Home = () => {
    const items = [
        { name: "Home", page: "/" },
        { name: "Products", page: "/products" },
    ];

    return (
        <div>
            <NavBar items={items} />
            <Slider></Slider>
            <Category></Category>
            <HomeProducts></HomeProducts>
            <HomeLastest></HomeLastest>
            <HomeFooter></HomeFooter>
        </div>
    );
};

export default Home;
