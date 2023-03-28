import React from "react";
import { useNavigate } from "react-router-dom";
const SecondPage= () => {
    const navigate = useNavigate();
    return (
       <div>
           <h1>hello this is second page</h1>
           <button onClick={() => navigate("/")}>go Home</button>
       </div>
    );
};

export default SecondPage;
