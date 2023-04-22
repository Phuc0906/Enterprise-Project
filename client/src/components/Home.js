import React from "react";
import NavBar from "./NavBar";
import Slider from "./Slider";
import Category from "./Category";

const Home = () => {
    const items = [
        {name: "Home", page: "/home"}
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
