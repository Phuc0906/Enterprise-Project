import React, {useEffect, useState} from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import CategoryBuilder from "../components/CategoryBuilder";
import BrandsBuilder from "../components/BrandBuilder";
import ProductCards from "../components/ProductCards";
import qs from 'qs';

const ProductPage = () => {
    const items = [
        {name: "Home", page: "/home"},
        {name: "Products", page: "/products"}
    ]

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedCategories, setSelectedCategory] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [products, setProducts] = useState([]);



    const getProducts = (categoryArr, brandsArr) => {
        const requestQuery = {
            categories: categoryArr,
            brands: brandsArr
        };

        console.log(requestQuery);
        // fetch('http://localhost:8080/product/get-products', {
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     credentials: "include",
        //     body: JSON.stringify(requestQuery)
        // }).then(res => {
        //     const serverRes = res.json();
        //     serverRes.then(data => {
        //         console.log(data);
        //         setProducts(data)
        //     })
        // }).then(data => {
        //     console.log(data)
        // });
        // axios.post("http://localhost:8080/product/get-products", requestQuery, {
        //     withCredentials: true
        // }).then(res => {
        //     const retrievedProducts = res.data;
        //     setProducts(retrievedProducts);
        // })

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/product/get-products", true);
        // xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        // xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.withCredentials = true

        xhr.onload = () => {
            const data = xhr.response;
            console.log(data);
        }

        // xhr.send(qs.stringify({
        //     test: requestQuery
        // }));
        xhr.send(JSON.stringify({
            test: 1
        }))

    }


    const handleCheckBox = async (isChecked, idx) => {
        let selectedCat = [...selectedCategories];
        if (isChecked) {
            selectedCat.push(idx);
        }else {
            selectedCat = selectedCat.filter(cat => cat != idx);
        }
        await setSelectedCategory(selectedCat);
        getProducts(selectedCat, selectedBrands)
    }

    const handleBrandCheckBox = async (isCheck, idx) => {
        let selectedBrd = [...selectedBrands];
        if (isCheck) {
            selectedBrd.push(idx);
        }else {
            selectedBrd = selectedBrd.filter(brand => brand != idx);
        }
        await setSelectedBrands(selectedBrd);
        console.log(selectedBrd);
        getProducts(selectedBrd, selectedCategories)
    }

    const getCategory = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/category");
        xhr.withCredentials = true

        xhr.onload = () => {
            const data = xhr.response;
            setCategories(JSON.parse(data))
        }

        xhr.send();
    }

    const getBrand = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/shop");
        xhr.withCredentials = true

        xhr.onload = () => {
            const data = xhr.response;
            setBrands(JSON.parse(data))
        }

        xhr.send();
    }


    useEffect(() => {
        console.log("Re-run")
        // axios.get('http://localhost:8080/category', {
        //     withCredentials: true
        // }).then(res => {
        //     setCategories(res.data);
        // })
        //
        // axios.get('http://localhost:8080/shop', {
        //     withCredentials: true
        // }).then(res => {
        //     setBrands(res.data);
        //     console.log(res);
        // })

        // getProducts([], [])
        // getCategory();
        // getBrand();
        getProducts([],[]);

    }, [])


    return <div>
        <NavBar items={items}/>
        <div className="mt-10 ml-10">
            <div className="flex">
                <div>
                    <div className="border-b-2 border-[#BDBDBD] w-40 pb-5 pr-16">
                        <h3 className="text-xl text-[#003F62]">Categories</h3>
                        <div>
                            {categories.map((category, index) => <CategoryBuilder onHandleCheckbox={handleCheckBox} key={category.id} category={category} idx={category.id} />)}
                        </div>
                    </div>
                    <div className="border-b-2 border-[#BDBDBD] mt-3 w-40 pb-5 pr-16">
                        <h3 className="text-xl text-[#003F62]">Brands</h3>
                        <div>
                            {brands.map((brand, index) => <BrandsBuilder onHandleCheckBox={handleBrandCheckBox} key={index} brand={brand} idx={brand.id} />)}
                        </div>
                    </div>
                </div>
                {/*Product Cards*/}
                <div className="ml-10">
                    <div className="flex gap-8 flex-wrap">
                        {products.map(product => <ProductCards key={product.id} product={product} />)}
                        {products.map(product => <ProductCards key={product.id} product={product} />)}
                        {products.map(product => <ProductCards key={product.id} product={product} />)}
                        {products.map(product => <ProductCards key={product.id} product={product} />)}
                    </div>
                </div>
            </div>

        </div>
    </div>
}

export default ProductPage;