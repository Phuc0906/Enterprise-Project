import React, { useState } from 'react';
import '../Burger.css';

const ShopBurgerNav = () => {
    const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
    const [menuClass, setMenuClass] = useState("menu unshow");
    const [isMenuClicked, setIsMenuClicked] = useState(false);

    const updateMenu = () => {
        if (!isMenuClicked) {
            setBurgerClass("burger-bar clicked");
            setMenuClass("menu show")
        }else {
            setBurgerClass("burger-bar unclicked");
            setMenuClass("menu unshow")
        }
        setIsMenuClicked(!isMenuClicked);
    }


    return (
        <div>
                <nav>
                    <div className="burger-menu" onClick={updateMenu}>
                        <button className={burgerClass} ></button>
                        <button className={burgerClass}></button>
                        <button className={burgerClass}></button>
                    </div>
                </nav>
                <div className={menuClass}>
                    <div className="menu-list">
                        <div className="menu-item">
                            Home
                        </div>
                        <div className="menu-item">
                            Home
                        </div>
                        <div className="menu-item">
                            Home
                        </div>
                        <div className="menu-item">
                            Home
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default ShopBurgerNav;
