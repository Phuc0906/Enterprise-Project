import React from "react";

const Category = () => {
    return (
        <div className="p-4">
            <h2 className="mb-3 text-2xl font-bold text-center">
                The Essentials
            </h2>
            <div className="grid w-full max-w-full grid-cols-3 gap-x-4">
                <div className="relative w-full h-full">
                    <img
                        className="object-cover w-full h-full"
                        src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c2hvZXN8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                        alt=""
                    />

                    <h3 className="absolute text-8xl top-[20px] w-full font-extrabold text-center text-white">
                        Men
                    </h3>
                    <button className="uppercase absolute px-10 py-4 text-white shadow-md bottom-5 rounded-2xl bg-slate-900 left-1/2 translate-x-[-50%] hover:bg-gradient-to-br from-[#1e130c] to-[#9a8478] transition-colors">
                        Shop Now
                    </button>
                </div>
                <div className="relative w-full h-full">
                    <img
                        className="object-cover w-full h-full"
                        src="https://images.unsplash.com/photo-1622760807800-66cf1466fc08?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80"
                        alt=""
                    />
                    <h3 className="absolute text-8xl top-[20px] w-full font-extrabold text-center text-white">
                        Women
                    </h3>
                    <button className="uppercase absolute px-10 py-4 text-white shadow-md bottom-5 rounded-2xl bg-slate-900 left-1/2 translate-x-[-50%] hover:bg-gradient-to-br from-[#1e130c] to-[#9a8478] transition-colors">
                        Shop Now
                    </button>
                </div>
                <div className="relative w-full h-full">
                    <img
                        className="object-cover w-full h-full"
                        src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fHNob2VzfGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                        alt=""
                    />
                    <h3 className="absolute text-8xl top-[20px] w-full font-extrabold text-center text-white">
                        Sale off
                    </h3>
                    <button className="uppercase absolute px-10 py-4 text-white shadow-md bottom-5 rounded-2xl bg-slate-900 left-1/2 translate-x-[-50%] hover:bg-gradient-to-br from-[#1e130c] to-[#9a8478] transition-colors">
                        Shop Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Category;
