import React, {useEffect, useState} from "react";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ShoppingCartIcon, UsersIcon } from "@heroicons/react/24/outline";
import "../Burger.css";

import { Link, useNavigate } from "react-router-dom";
import { useSignOut } from "react-auth-kit";
import { Outlet } from "react-router-dom";

import Cart from "../pages/Cart";

const NavBar = ({ items }) => {
    const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
    const [menuClass, setMenuClass] = useState("menu unshow");
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    const [isShowDropDown, setIsShopDropDown] = useState(false);
    const navigate = useNavigate();
    const signOut = useSignOut();

    useEffect(() => {
        console.log(localStorage.role);
    }, [])

    const handleAccountClick = () => {
        setIsShopDropDown(!isShowDropDown);
    };

    const signOutHandle = () => {
        signOut();
        window.location.reload();
    };

    const updateMenu = () => {
        if (!isMenuClicked) {
            setBurgerClass("burger-bar clicked");
            setMenuClass("menu show");
        } else {
            setBurgerClass("burger-bar unclicked");
            setMenuClass("menu unshow");
        }
        document.body.classList.toggle("overflow-hidden");
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
                        className={`flex items-center flex-shrink-0 p-1 ml-3 border min-w-fit  rounded-md`}>
                        <input
                            type="text"
                            name="searchBar"
                            className="transition-all focus:w-full"
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
                    <h1 className="text-lg font-semibold text-center select-none">
                        Sneaker Market
                    </h1>
                </div>
                <div className="flex items-end justify-end flex-1 p-3 mr-8 gap-x-6">
                    {!localStorage.token && (
                        <div className="flex items-center gap-x-2">
                            <span
                                onClick={navigate("/register")}
                                className="uppercase select-none font-extralight">
                                Register
                            </span>
                            <span
                                onClick={navigate("/register")}
                                className="uppercase select-none font-extralight">
                                Sign in
                            </span>
                        </div>
                    )}
                    {localStorage.role === 'USER' && (
                        <div className="relative">
                            <Link to="/cart">
                                <ShoppingCartIcon className="w-6 h-6 "></ShoppingCartIcon>
                            </Link>

                            <span className="absolute flex h-5 w-5 top-0 right-0 translate-x-1/2 translate-y-[-70%]">
                                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-sky-400"></span>
                                <span className="relative inline-flex rounded-full h-5 w-5 bg-sky-500 items-center justify-center text-white text-[9px]">
                                    10
                                </span>
                            </span>
                        </div>
                    )}
                    <div>
                        <UsersIcon
                            className="w-6 h-6 "
                            onClick={handleAccountClick}
                        />
                        {isShowDropDown && (
                            <div
                                className="absolute z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg right-10 ring-1 ring-black ring-opacity-5 focus:outline-none"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="menu-button"
                                tabIndex="-1">
                                <div className="py-1" role="none">
                                    <Link
                                        to={"/profile"}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                        tabIndex="-1"
                                        id="menu-item-0 ">
                                        Profile
                                    </Link>
                                    <Link
                                        to={"/billing-history"}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                        tabIndex="-1"
                                        id="menu-item-2">
                                        Billing History
                                    </Link>
                                    <div
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                        tabIndex="-1"
                                        id="menu-item-2"
                                        onClick={signOutHandle}>
                                        Sign out
                                    </div>
                                </div>
                            </div>
                        )}
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
