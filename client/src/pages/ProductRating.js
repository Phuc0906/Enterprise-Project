import React, {useContext, useEffect, useState} from "react";

import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Star from "../components/Star";
import NavBar from "../components/NavBar";
import RatingStar from "../components/RatingStar";


const ProductRating = ({ productId, currentRating }) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [rating, setRating] = useState({"rating": 0.0});
    const starCount = [1, 2, 3, 4, 5];
    const [startSelect, setStarSelect] = useState(-1);
    const items = [
        {name: "Dashboard", page: "/shop/dashboard"},
        {name: "Product", page: "/shop/product"},
    ]
    const handleRatingClick = (selectedRating) => {
        setRating(selectedRating);
        addRating(id, selectedRating);
        console.log(id, selectedRating);
    };

    const updateRating = (productId, productInfo) => {
        console.log(productId,productInfo);
        let data = [];
        data.push(rating);

        fetch("http://localhost:8080/api/product/${id}", {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.token,
            },
            body: JSON.stringify(productInfo),
        }).then((res) => {
            console.log(res);
        });


    };

    const addRating = (productId, rating) => {
        const url = `http://localhost:8080/api/product/${id}/rating`;
        const data = { rating: rating };
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.token,
            },
            body: JSON.stringify(data),
        };

        fetch(url, options)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

                // Calculate and update the average rating
                const ratings = data.rating;
                const sum = ratings.reduce((total, rating) => total + rating.value, 0);
                const average = sum / ratings.length;
                updateRating(id, { "rating": average });
            })
            .catch((error) => console.log(error));
    };


    return (
        <div>
            <div>
                <div className="mt-3 ml-3">
                    {starCount.map(star => <RatingStar key={star} idx={star} ratingCount={startSelect} starSelect={setStarSelect} />)}
                    <button className="animate-bounce cursor-pointer bg-gray-400 text-white p-2 rounded-full hover:bg-gray-600 " onClick={() => handleRatingClick(4)}>
                        Rate
                    </button>

                </div>
            </div>

            <div className="pt-12"></div>

            <div className="pr-40">
                {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} onClick={() => handleRatingClick(i)} className={rating >= i ? "filled-star" : "empty-star"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className={`w-8 h-8 hover:w-10 hover:h-10 hover:delay-100`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ProductRating;