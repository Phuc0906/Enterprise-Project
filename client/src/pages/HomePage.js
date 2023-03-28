import React from "react";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
    const navigate = useNavigate();
    return (
       <div>
           <h1>hello</h1>
           <button onClick={() => navigate("/second")}>Go to second page</button>
       </div>
    );
};

export default HomePage;
