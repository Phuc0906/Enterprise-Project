import React from "react";

const LatestCard = (props) => {
    const { imageUrl, label, desc, button } = props;
    return (
        <div className="max-w-full md:max-w-[50%] h-[400px] w-full relative">
            <img
                className="object-cover w-full h-full rounded-lg"
                src={imageUrl}
                alt=""
            />
            <div className="absolute flex flex-col items-start bottom-1/2 left-[30px] translate-y-[100%] text-white leading-relaxed gap-y-3">
                <h3 className="text-3xl font-extrabold ">{label}</h3>
                <span>{desc}</span>
                <button className="py-3 mt-4 bg-black px-7 rounded-xl hover:shadow-secondary">
                    {button}
                </button>
            </div>
        </div>

    );
};

export default LatestCard;




// <div className="max-w-[50%] h-[400px] w-full relative">
//     <img
//         className="object-cover w-full h-full rounded-lg"
//         src={imageUrl}
//         alt=""
//     />
//     <div className="absolute flex flex-col items-start bottom-1/2 left-[30px] translate-y-[100%] text-white leading-relaxed gap-y-3">
//         <h3 className="text-3xl font-extrabold ">{label}</h3>
//         <span>{desc}</span>
//         <button className="py-3 mt-4 bg-black px-7 rounded-xl hover:shadow-secondary">
//             {button}
//         </button>
//     </div>
// </div>