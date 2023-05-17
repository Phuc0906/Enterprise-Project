import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import CategoryBuilder from "../components/CategoryBuilder";
import BrandsBuilder from "../components/BrandBuilder";
import ProductCards from "../components/ProductCards";
import {userNavContent} from "../utils";

const ProductPage = () => {

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedCategories, setSelectedCategory] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [products, setProducts] = useState([]);

    const getProducts = (categoryArr, brandsArr) => {
        const requestQuery = {
            categories: categoryArr,
            brands: brandsArr,
        };

        fetch("http://localhost:8080/api/product/get-products", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.token,
            },
            body: JSON.stringify(requestQuery),
        })
            .then((res) => {
                const serverRes = res.json();
                serverRes.then((data) => {
                    console.log(data);
                    setProducts(data);
                });
            })
            .then((data) => {
                console.log(data);
            });
    };

    const handleCheckBox = async (isChecked, idx) => {
        let selectedCat = [...selectedCategories];
        if (isChecked) {
            selectedCat.push(idx);
        } else {
            selectedCat = selectedCat.filter((cat) => cat != idx);
        }
        await setSelectedCategory(selectedCat);
        getProducts(selectedCat, selectedBrands);
    };

    const handleBrandCheckBox = async (isCheck, idx) => {
        let selectedBrd = [...selectedBrands];
        if (isCheck) {
            selectedBrd.push(idx);
        } else {
            selectedBrd = selectedBrd.filter((brand) => brand != idx);
        }
        await setSelectedBrands(selectedBrd);
        console.log(selectedBrd);
        getProducts(selectedCategories, selectedBrd);
    };

    useEffect(() => {
        console.log("Re-run");

        fetch("http://localhost:8080/api/category", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.token,
            },
        }).then((res) => {
            const serverRes = res.json();
            serverRes.then((data) => {
                const settingcate = data;
                setCategories(settingcate);
            });
        });

        fetch("http://localhost:8080/api/shop", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.token,
            },
        }).then((res) => {
            const serverRes = res.json();
            serverRes.then((data) => {
                const settingShop = data;
                setBrands(settingShop);
            });
        });

        getProducts([], []);
    }, []);

    return (
        <div>
            <NavBar items={userNavContent} />
            <div className="mt-10 ml-10">
                <div className="flex">
                    <div>
                        <div className="border-b-2 border-[#BDBDBD] w-40 pb-5 pr-16">
                            <h3 className="text-xl text-[#003F62]">
                                Categories
                            </h3>
                            <div>
                                {categories.map((category, index) => (
                                    <CategoryBuilder
                                        onHandleCheckbox={handleCheckBox}
                                        key={category.id}
                                        category={category}
                                        idx={category.id}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="border-b-2 border-[#BDBDBD] mt-3 w-40 pb-5 pr-16">
                            <h3 className="text-xl text-[#003F62]">Brands</h3>
                            <div>
                                {brands.map((brand, index) => (
                                    <BrandsBuilder
                                        onHandleCheckBox={handleBrandCheckBox}
                                        key={index}
                                        brand={brand}
                                        idx={brand.id}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    {/*Product Cards*/}
                    <div className="ml-10">
                        <div className="flex flex-wrap gap-8">
                            {products.map((product) => (
                                <ProductCards
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
