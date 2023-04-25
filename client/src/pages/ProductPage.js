import React, {useEffect, useState} from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import CategoryBuilder from "../components/CategoryBuilder";
import BrandsBuilder from "../components/BrandBuilder";
import ProductCards from "../components/ProductCards";

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
        axios.post("http://localhost:8080/product/get-products", requestQuery).then(res => {
            const retrievedProducts = res.data;
            setProducts(retrievedProducts);
        })
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



    useEffect(() => {
        console.log("Re-run")
        axios.get('http://localhost:8080/category').then(res => {
            setCategories(res.data);
        })

        axios.get('http://localhost:8080/shop').then(res => {
            setBrands(res.data);
            console.log(res);
        })

        getProducts([], [])

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
                    <div className="flex gap-12 flex-wrap">
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