import React, { useState } from "react";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ShoppingCartIcon, UsersIcon } from "@heroicons/react/24/outline";
import "../Burger.css";
import { useNavigate } from "react-router-dom";
import {useSignOut} from "react-auth-kit";

const NavBar = ({ items }) => {
    const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
    const [menuClass, setMenuClass] = useState("menu unshow");
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    const [isShowDropDown, setIsShopDropDown] = useState(false);
    const navigate = useNavigate();
    const signOut = useSignOut();

    const handleAccountClick = () => {
        setIsShopDropDown(!isShowDropDown);
    }

    const signOutHandle = () => {
        signOut();
        window.location.reload();
    }

    const updateMenu = () => {
        if (!isMenuClicked) {
            setBurgerClass("burger-bar clicked");
            setMenuClass("menu show");
        } else {
            setBurgerClass("burger-bar unclicked");
            setMenuClass("menu unshow");
        }
        setIsMenuClicked(!isMenuClicked);
    };

    const MenuItemsBuilder = ({ item, toPage }) => {
        const navigateToPage = () => {
            navigate(toPage);
            window.location.reload();
        };

        return (
            <div onClick={navigateToPage} className="menu-item">
                {item}
            </div>
        );
    };

    return (
        <div>
            <div className="flex items-center justify-center p-3">
                <div className="flex items-center flex-1">
                    <div
                        style={{
                            width: "100%",
                            height: "5em",
                            padding: "10px",
                        }}>
                        <div className="burger-menu" onClick={updateMenu}>
                            <button className={burgerClass}></button>
                            <button className={burgerClass}></button>
                            <button className={burgerClass}></button>
                        </div>
                    </div>

                    <div
                        className={`flex items-center flex-shrink-0 p-1 ml-3 border min-w-fit transition-all rounded-md`}>
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
                    <h1 className="text-lg font-semibold text-center">
                        Sneaker Market
                    </h1>
                </div>
                <div className="flex items-end justify-end flex-1 p-3 mr-8 gap-x-6">
                    <span className="uppercase font-extralight">Register</span>
                    <span className="uppercase font-extralight">Sign in</span>
                    <div className="relative">
                        <ShoppingCartIcon className="w-6 h-6 "></ShoppingCartIcon>
                        <span className="absolute flex h-5 w-5 top-0 right-0 translate-x-1/2 translate-y-[-70%]">
                            <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-sky-400"></span>
                            <span className="relative inline-flex rounded-full h-5 w-5 bg-sky-500 items-center justify-center text-white text-[9px]">
                                10
                            </span>
                        </span>
                    </div>
                    <div>
                        <UsersIcon className="w-6 h-6 " onClick={handleAccountClick}/>
                        {isShowDropDown && <div
                            className="absolute right-10 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                            <div className="py-1" role="none">
                                <div className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem"
                                     tabIndex="-1" id="menu-item-0 ">Profile</div>
                                <div className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem"
                                     tabIndex="-1" id="menu-item-1">Change Password</div>
                                <div className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem"
                                     tabIndex="-1" id="menu-item-2">Billing History</div>
                                <div className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem"
                                     tabIndex="-1" id="menu-item-2" onClick={signOutHandle}>Sign out</div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
            <div className={menuClass} style={{ zIndex: "9" }}>
                <div className="menu-list">
                    {items.map((item, index) => (
                        <MenuItemsBuilder
                            key={index}
                            item={item.name}
                            toPage={item.page}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default NavBar;
