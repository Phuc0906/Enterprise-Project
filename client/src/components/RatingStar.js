import React, { useEffect } from "react";
import axios from "axios";


const RatingStar = ({ratingCount, idx, starSelect}) => {

    const startClickHandle = () => {
        console.log("star click " + (idx+1));
        starSelect(idx);
    }



    return <div onClick={startClickHandle} className="">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className={`w-8 h-8 ${(idx <= ratingCount) ? 'fill-yellow-400' : ''}  hover:w-10 hover:h-10 hover:delay-100`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
    </div>
}

export default RatingStar;