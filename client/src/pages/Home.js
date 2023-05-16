import React from "react";
import NavBar from "../components/NavBar";
import Slider from "../components/Slider";
import Category from "../components/Category";
import HomeProducts from "../components/HomeProducts";
import HomeLastest from "../components/HomeLastest";
import HomeFooter from "../components/HomeFooter";
import Footer from "../components/Footer";
import {userNavContent} from "../utils";
import {Layer} from "recharts";

const Home = () => {

    return (
        <div className>
            <NavBar items={userNavContent}/>
            <Slider></Slider>
            <Category></Category>
            <HomeProducts></HomeProducts>
            <HomeLastest></HomeLastest>
            <Footer></Footer>
        </div>


    );
};

export default Home;





