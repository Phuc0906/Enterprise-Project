import React from "react";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const NavBar = () => {
    return (
        <div className="flex items-center justify-center p-3">
            <div className="flex items-center flex-1">
                <Bars3Icon className="w-6 h-6"></Bars3Icon>
                <div
                    className={`flex items-center p-1 ml-3 border min-w-fit transition-all rounded-md`}>
                    <input
                        type="text"
                        name="searchBar"
                        className="focus:w-full"
                        placeholder="Searching something"
                        onFocus={(e) => {
                            const parent = e.target.parentElement;
                            parent.classList.add("w-full");
                        }}
                        onBlur={(e) => {
                            const parent = e.target.parentElement;
                            parent.classList.remove("w-full");
                        }}
                    />
                    <MagnifyingGlassIcon className="flex-shrink-0 w-6 h-6"></MagnifyingGlassIcon>
                </div>
            </div>
            <div className="flex-1">
                <h1 className="text-lg font-semibold text-center">Lazada</h1>
            </div>
            <div className="flex items-end justify-end flex-1 p-3 mr-8 gap-x-3">
                <span className="uppercase font-extralight">Register</span>
                <span className="uppercase font-extralight">Sign in</span>
                <div className="relative">
                    <ShoppingCartIcon className="w-6 h-6 "></ShoppingCartIcon>
                    <span class="absolute flex h-5 w-5 top-0 right-0 translate-x-1/2 translate-y-[-70%]">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-5 w-5 bg-sky-500 items-center justify-center text-white text-[9px]">
                            10
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
};
export default NavBar;
