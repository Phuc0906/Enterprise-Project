import React from "react";

const LatestCard = (props) => {
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Optional: Add smooth scrolling animation
        });
    }

    const { imageUrl, label, desc, button } = props;
    return (
        <div className="max-w-[50%] h-[400px] w-full relative">
            <img
                className="object-cover w-full h-full rounded-lg"
                src={imageUrl}
                alt=""
            />
            <div className="absolute flex flex-col items-start bottom-1/2 left-[30px] translate-y-[100%] text-white leading-relaxed gap-y-3">
                <h3 className="text-3xl font-extrabold ">{label}</h3>
                <span>{desc}</span>
                <button
                    onClick={scrollToTop}
                    className="py-3 mt-4 bg-black px-7 rounded-xl hover:shadow-secondary">
                    {button}
                </button>
            </div>
        </div>
    );
};

export default LatestCard;
