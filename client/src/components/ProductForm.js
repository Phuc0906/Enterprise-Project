import React, { useEffect, useState } from "react";
import axios from "axios";
import { paste } from "@testing-library/user-event/dist/paste";
import Select from "react-select";
import { Link, useLocation } from "react-router-dom";
import { urlToFile } from "../utils";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
    const navigate = useNavigate();

    const IMAGE_URL =
        "https://gr-project-bucket.s3.ap-southeast-1.amazonaws.com/";
    const location = useLocation();
    const navigate =  useNavigate();
    const [image, setImage] = useState([undefined]);
    const [categoryList, setCategoryList] = useState([{}]);
    const [selectedCategory, setSelectedCategory] = useState({});
    const size = ["5.5", "6.0", "6.5", "7", "7.5", "8", "8.5", "9", "9.5"];
    const [imgCount, setImgCount] = useState([0]);
    const [arrowSpin, setArrowSpin] = useState(false);
    const [categoryArrow, setCategoryArrow] = useState(false);
    const [selectSize, setSelectSize] = useState("");
    const [selectedSizeIdx, setSelectedSizeIdx] = useState(-1);
    const [sizeQuantity, setSizeQuantity] = useState([
        0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);
    const [selectedCat, setSelectedCat] = useState("");
    const shopName = JSON.parse(localStorage.profile).name;
    const [productInfo, setProductInfo] = useState({
        name: "",
        description: "",
        price: 0,
        shopname: shopName,
        categoryname: "",
        size: [],
    });

    useEffect(() => {}, [productInfo]);

    useEffect(() => {
        const getProductDetail = async () => {
            if (location.state.update) {
                setProductInfo(location.state.product);
                const settingImages = [];
                const imagesCounting = [];
                for (let i = 0; i < location.state.product.imagesCount; i++) {
                    await urlToFile(
                        IMAGE_URL + `${location.state.product.id}-${i}.png`,
                        "image/png"
                    ).then((res) => {
                        settingImages.push(res);
                        imagesCounting.push(imagesCounting.length);
                    });
                }
                setImage(settingImages);
                setImgCount(imagesCounting);

                setSelectedCat(location.state.product.categoryname);

                fetch(
                    `http://localhost:8080/api/product/stock?productId=${location.state.product.id}`,
                    {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + localStorage.token,
                        },
                    }
                ).then((res) => {
                    const serverRes = res.json();
                    serverRes.then((data) => {
                        const settingData = data;
                        const settingQuantity = sizeQuantity;
                        for (let i = 0; i < settingData.length; i++) {
                            settingQuantity[i] = settingData[i].quantity;
                        }
                        setSizeQuantity(settingQuantity);
                    });
                });
            }
        };

        getProductDetail();

        axios
            .get("http://localhost:8080/api/category", {
                headers: {
                    Authorization: "Bearer " + localStorage.token,
                },
            })
            .then((res) => {
                const categories = res.data;
                for (let i = 0; i < categories.length; i++) {
                    if (
                        location.state.update &&
                        location.state.product.categoryname ===
                            categories[i].name
                    ) {
                        setSelectedCategory({
                            value: categories[i].name,
                            label: categories[i].name,
                        });
                    }
                    setCategoryList((prevCategory) => [
                        ...prevCategory,
                        {
                            value: categories[i].name,
                            label: categories[i].name,
                        },
                    ]);
                }
            });
    }, []);

    const onRemoveImage = (imgIdx) => () => {
        const imgArr = [...image];
        // shift image to delete
        if (imgArr.length == 1) {
            imgArr[imgIdx] = undefined;
            setImage(imgArr);
            return;
        }

        for (let i = imgIdx; i < imgArr.length - 1; i++) {
            imgArr[i] = imgArr[i + 1];
        }

        if (imgArr.length != 1) {
            imgArr.pop();
            imgCount.pop();
            setImage(imgArr);
        }
    };

    const ImageInputGenerator = (props) => {
        return (
            <div className="pt-3">
                <label
                    htmlFor="formFile"
                    className="inline-block mb-2 text-neutral-700 dark:text-neutral-200">
                    Image {props.name + 1}
                </label>
                <div className="flex justify-center space-x-2">
                    <input
                        className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] px-3 text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100"
                        type="file"
                        name={props.name}
                        onChange={handleImgDivChange}
                    />
                    <div onClick={onRemoveImage(parseInt(props.name))}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                        </svg>
                    </div>
                </div>

                {image[parseInt(props.name)] && (
                    <img
                        className="pt-3"
                        src={URL.createObjectURL(image[parseInt(props.name)])}
                    />
                )}
            </div>
        );
    };

    const inputHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProductInfo((prevInfo) => ({
            ...prevInfo,
            [name]: name === "price" ? parseInt(value) : value,
        }));
    };

    const addImageHandle = () => {
        const arrLength = imgCount.length;
        setImgCount((prevArr) => [...prevArr, arrLength]);
        console.log(imgCount);
    };

    const handleImgDivChange = (event) => {
        const imgIdx = parseInt(event.target.name);
        const imgArr = [...image];
        imgArr[imgIdx] = event.target.files[0];
        setImage(imgArr);
    };

    const onSelectedChangeHandle = (e) => {
        setSelectedCat(e.target.ariaValueText);
        setProductInfo({
            ...productInfo,
            categoryname: e.target.ariaValueText,
        });
        setSelectedCategory({
            value: e.target.ariaValueText,
            label: e.target.ariaValueText,
        });
        setCategoryArrow(!categoryArrow);
    };

    const uploadProduct = () => {
        // data.files.push(image);
        let data = [];
        data.push(image);
        const imageData = new FormData();
        for (let i = 0; i < image.length; i++) {
            imageData.append("file", image[i]);
        }

        fetch("http://localhost:8080/api/product", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.token,
            },
            body: JSON.stringify(productInfo),
        })
            .then((res) => {
                const serverRes = res.json();
                serverRes.then((data) => {
                    console.log(data);
                    axios
                        .post(
                            `http://localhost:8080/api/product/${data.product_id}/image/upload`,
                            imageData,
                            {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                    Authorization:
                                        "Bearer " + localStorage.token,
                                },
                                withCredentials: true,
                            }
                        )
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                });
            })
            .then((data) => {
                console.log(data);
            });
        navigate("/shop/product");
    };

    const updateProduct = () => {
        let data = [];
        data.push(image);
        const imageData = new FormData();
        for (let i = 0; i < image.length; i++) {
            imageData.append("file", image[i]);
        }

        fetch("http://localhost:8080/api/product", {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.token,
            },
            body: JSON.stringify(productInfo),
        }).then((res) => {
            console.log(res);
        });

        axios
            .post(
                `http://localhost:8080/api/product/${productInfo.id}/image/upload`,
                imageData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: "Bearer " + localStorage.token,
                    },
                    withCredentials: true,
                }
            )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        navigate("/shop/product")
    };

    const handleSubmitForm = () => {
        if (
            image.length == 1 &&
            image[0] == undefined &&
            productInfo.name.length == 0 &&
            productInfo.price == 0 &&
            productInfo.categoryname.length == 0 &&
            sizeQuantity.toString().length === 0 &&
            selectSize.length === 0
        ) {
            alert("Please Fill Required Information");
            return;
        }
        if (location.state.update) {
            updateProduct();
        } else {
            uploadProduct();
        }
        location.reload();
    };

    const sizeArrowHandle = () => {
        setArrowSpin(!arrowSpin);
    };

    const onSizeChange = (e) => {
        const sizeQuanArr = sizeQuantity;
        sizeQuanArr[selectedSizeIdx] =
            e.target.value.length === 0 ? 0 : parseInt(e.target.value);
        setSizeQuantity(sizeQuanArr);
        console.log(sizeQuantity);
        setProductInfo((prevInfo) => ({ ...prevInfo, size: sizeQuanArr }));
    };

    const sizeSelectHandle = (e) => {
        console.log(e.target.ariaValueText);
        setSelectSize(e.target.innerText);
        setSelectedSizeIdx(e.target.ariaValueText);
        setArrowSpin(!arrowSpin);
    };

    const categoryArrowHandle = () => {
        setCategoryArrow(!categoryArrow);
    };

    return (
        <div className="flex items-center justify-center ">
            <div className="w-full max-w-xl p-3.5">
                <h1 className="p-3.5 text-yellow-600 font-bold text-4xl text-center">
                    Product Information
                </h1>
                <div className="mb-6 md:flex md:items-center">
                    <div className="md:w-1/3">
                        <label className="inline-block w-48 mb-1 font-bold text-gray-500 md:left-2 md:mb-0 pr-9">
                            Product Name
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            name="name"
                            value={productInfo.name}
                            type="text"
                            onChange={inputHandleChange}
                        />
                    </div>
                </div>
                <div className="mb-6 md:flex md:items-center">
                    <div className="md:w-1/3">
                        <label className="inline-block w-48 mb-1 font-bold text-gray-500 md:left-2 md:mb-0 pr-9">
                            Product Description
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className=" p-3.5 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            name="description"
                            value={productInfo.description}
                            type="text"
                            onChange={inputHandleChange}
                        />
                    </div>
                </div>
                <div className="mb-6 md:flex md:items-center">
                    <div className="md:w-1/3">
                        <label className="inline-block w-48 mb-1 font-bold text-gray-500 md:left-2 md:mb-0 pr-9">
                            Price
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className=" p-3.5 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            name="price"
                            type="number"
                            value={productInfo.price}
                            onChange={inputHandleChange}
                        />
                    </div>
                </div>
                <div className="mb-6 md:flex md:items-center">
                    <div className="md:w-1/3">
                        <label className="inline-block w-48 mb-1 font-bold text-gray-500 md:left-2 md:mb-0 pr-9">
                            Shop
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className=" p-3.5 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            name="shopname"
                            type="text"
                            value={productInfo.shopname}
                        />
                    </div>
                </div>
                <div className="mb-6 md:flex md:items-center">
                    <div className="md:w-1/3">
                        <label className="inline-block w-48 mb-1 font-bold text-gray-500 md:left-2 md:mb-0 pr-9">
                            Category
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <div className="mb-3 mt-3  bg-gray-200 p-3.5 flex justify-between items-center rounded">
                            <label
                                className={`${
                                    selectedCat.length !== 0
                                        ? "text-gray-700"
                                        : "text-gray-500"
                                }`}>
                                {selectedCat.length !== 0
                                    ? selectedCat
                                    : "Select Category"}
                            </label>
                            <div
                                onClick={categoryArrowHandle}
                                className={`border-l-2 border-l-gray-700 pl-3 `}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className={`w-5 h-5 ${
                                        !categoryArrow
                                            ? "rotate-0"
                                            : "rotate-180"
                                    } transition duration-300`}>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                                    />
                                </svg>
                            </div>
                        </div>
                        {categoryArrow && (
                            <div className="relative">
                                <div
                                    onClick={onSelectedChangeHandle}
                                    className="absolute z-10 w-full mt-1 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="menu-button"
                                    tabIndex="-1">
                                    <div className="py-1" role="none">
                                        {categoryList.map((category, index) => (
                                            <div
                                                aria-valuetext={category.value}
                                                key={index}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                                tabIndex="-1"
                                                id="menu-item-0 ">
                                                {category.value}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="mb-6 md:flex md:items-center">
                    <div className="md:w-1/3">
                        <label className="inline-block w-48 mb-1 font-bold text-gray-500 md:left-2 md:mb-0 pr-9">
                            Size
                        </label>
                    </div>
                    <div className="xl:w-1/3">
                        <div className="mb-3 mt-3  bg-gray-200 p-3.5 flex justify-between items-center rounded">
                            <label
                                className={`${
                                    selectSize.length !== 0
                                        ? "text-gray-700"
                                        : "text-gray-500"
                                }`}>
                                {selectSize.length !== 0
                                    ? selectSize
                                    : "Select Size"}
                            </label>
                            <div
                                onClick={sizeArrowHandle}
                                className={`border-l-2 border-l-gray-700 pl-3 `}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className={`w-5 h-5 ${
                                        !arrowSpin ? "rotate-0" : "rotate-180"
                                    } transition duration-300`}>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                                    />
                                </svg>
                            </div>
                        </div>
                        {arrowSpin && (
                            <div className="relative">
                                <div
                                    onClick={sizeSelectHandle}
                                    className="absolute z-10 w-full mt-1 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="menu-button"
                                    tabIndex="-1">
                                    <div className="py-1" role="none">
                                        {size.map((sizeElement, index) => (
                                            <div
                                                aria-valuetext={index}
                                                key={index}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                                tabIndex="-1"
                                                id="menu-item-0 ">
                                                {sizeElement}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {selectSize && (
                        <div className="flex items-center ml-2">
                            <label>Qty</label>
                            <input
                                onChange={onSizeChange}
                                className="ml-3 p-3.5 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-1/3 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-full-name"
                                name="shopname"
                                value={
                                    sizeQuantity[selectedSizeIdx] === 0
                                        ? ""
                                        : sizeQuantity[selectedSizeIdx]
                                }
                                type="number"
                            />
                        </div>
                    )}
                </div>
                <div className="border-4 stroke-amber-100">
                    <h4 className="inline-block w-48 mb-1 font-bold text-gray-500 md:left-2 md:mb-0 pr-9">
                        Product Image
                    </h4>
                    <div>
                        <div className="flex justify-center">
                            <div className="mb-3 w-96">
                                {imgCount.map((count) => (
                                    <ImageInputGenerator
                                        key={count}
                                        name={count}
                                    />
                                ))}
                                <div className="flex items-end pt-6 space-x-3">
                                    <div onClick={addImageHandle}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-8 h-8">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="click"
                        onClick={handleSubmitForm}
                        className="m-3 pt-3 inline-block rounded-full bg-blue-800 px-6 pb-2 text-white text-sm font-medium uppercase leading-normal  shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)]">
                        Add Product
                    </button>
                    <button
                        type="click"
                        onClick={() => navigate("/shop/dashboard")}
                        className="m-3 pt-3 inline-block rounded-full bg-blue-800 px-6 pb-2 text-white text-sm font-medium uppercase leading-normal  shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)]">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
