import React from "react";
import NavBar from "./NavBar";

const Home = () => {
    const items = [
        {name: "Home", page: "/home"}
    ]

    return (
        <div>
            <NavBar items={items} />
        </div>
    );
};

export default Home;
