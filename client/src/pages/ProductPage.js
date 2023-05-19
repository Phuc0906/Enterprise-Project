import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import CategoryBuilder from "../components/CategoryBuilder";
import BrandsBuilder from "../components/BrandBuilder";
import ProductCards from "../components/ProductCards";
import { userNavContent } from "../utils";
import Pagination from "../components/Pagination";

const ProductPage = () => {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedCategories, setSelectedCategory] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(2);
    const [totalPages, setTotalPages] = useState();

    const getProducts = (categoryArr, brandsArr) => {
        const requestQuery = {
            categories: categoryArr,
            brands: brandsArr,
        };

        fetch(
            `http://${process.env.REACT_APP_API_URL}/api/product/get-products`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.token,
                },
                body: JSON.stringify(requestQuery),
            }
        )
            .then((res) => {
                const serverRes = res.json();
                serverRes.then((data) => {
                    const len = data.length;
                    const tPage = Math.ceil(len / 20);
                    const end = page * 20;
                    const start = end - 20;
                    const loops = Math.min(end, len);

                    setTotalPages(tPage);
                    const newData = data.slice(start, loops);
                    setProducts(newData);
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

        fetch(`http://${process.env.REACT_APP_API_URL}/api/category`, {
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

        fetch(`http://${process.env.REACT_APP_API_URL}/api/shop`, {
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
    }, [page]);

    const handleClick = (index) => {
        setProducts();
        setPage(index);
        console.log(index);
    };

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
                        <div className="flex flex-wrap gap-8 ">
                            {!products ? (
                                <div
                                    role="status"
                                    className="absolute left-1/2 top-1/2">
                                    <svg
                                        aria-hidden="true"
                                        class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-500 fill-blue-500"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"
                                        />
                                    </svg>
                                    <span class="sr-only">Loading...</span>
                                </div>
                            ) : (
                                products.map((product) => (
                                    <ProductCards
                                        key={product.id}
                                        product={product}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {products && (
                <Pagination
                    click={handleClick}
                    totalPages={totalPages}></Pagination>
            )}
        </div>
    );
};

export default ProductPage;
