import React, {useEffect, useState} from "react";
import axios from "axios";
import {paste} from "@testing-library/user-event/dist/paste";
import Select from "react-select";
import {useLocation} from "react-router-dom";
import {urlToFile} from "../utils";

const ProductForm = () => {
    const IMAGE_URL = "https://gr-project-bucket.s3.ap-southeast-1.amazonaws.com/"
    const location = useLocation();
    const [image, setImage] = useState([undefined]);
    const [categoryList, setCategoryList] = useState([{}]);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [productInfo, setProductInfo] = useState({
        "name": "",
        "description": "",
        "price": 0,
        "shopname": "Adidas",
        "categoryname": ""
    })
    const [imgCount, setImgCount] = useState([0]);

    useEffect(() => {
        const getProductDetail = async () => {
            if (location.state.update) {
                setProductInfo(location.state.product);
                const settingImages = [];
                const imagesCounting = [];
                for (let i = 0; i < location.state.product.imagesCount; i++) {
                    await urlToFile(IMAGE_URL + `${location.state.product.id}-${i}.png`, 'image/png').then(res => {
                        settingImages.push(res);
                        imagesCounting.push(imagesCounting.length);
                    });
                }
                setImage(settingImages);
                setImgCount(imagesCounting);
            }
        }

        getProductDetail();


        axios.get("http://localhost:8080/category").then(res => {
            const categories = res.data;
            for (let i = 0; i < categories.length; i++) {
                if ((location.state.update) && (location.state.product.categoryname === categories[i].name)) {
                    setSelectedCategory({value: categories[i].name, label: categories[i].name})
                }
                setCategoryList(prevCategory => [...prevCategory, {value: categories[i].name, label: categories[i].name}]);
            }
        });
    }, []);



    const onRemoveImage = imgIdx => () => {
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
    }

    const ImageInputGenerator = (props) => {
        return <div className="pt-3">
            <label
                htmlFor="formFile"
                className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
            >Image {props.name + 1}</label>
            <div className="flex justify-center space-x-2">
                <input
                    className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] px-3 text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100"
                    type="file"
                    name={props.name}
                    onChange={handleImgDivChange}
                />
                <div onClick={onRemoveImage(parseInt(props.name))} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                    </svg>

                </div>
            </div>

            {image[parseInt(props.name)] && (
                <img className="pt-3" src={URL.createObjectURL(image[parseInt(props.name)])}/>
            )}
        </div>
    }

    const inputHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setProductInfo(prevInfo => ({
            ...prevInfo,
            [name]: name === 'price' ? parseInt(value) : value
        }));


    }

    const addImageHandle = () => {
        const arrLength = imgCount.length;
        setImgCount(prevArr => [...prevArr, arrLength])
        console.log(imgCount)
    }

    const handleImgDivChange = (event) => {
        const imgIdx = parseInt(event.target.name);
        const imgArr = [...image];
        imgArr[imgIdx] = event.target.files[0];
        setImage(imgArr);
    }


    const onSelectedChangeHandle = (option) => {
        setProductInfo({...productInfo, 'categoryname': option.value})
        setSelectedCategory({value: option.value, label: option.value})
    }


    const uploadProduct = () => {

        // data.files.push(image);
        let data = [];
        data.push(image);
        const imageData = new FormData();
        for (let i = 0; i < image.length; i++) {
            imageData.append('file', image[i]);
        }

        axios.post(`http://localhost:8080/product`, productInfo)
            .then(res => {
                console.log(res);
                const productId = res.data.product_id;
                axios.post(`http://localhost:8080/product/${productId}/image/upload`,
                    imageData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }).then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            })
    }

    const updateProduct = () => {
        let data = [];
        data.push(image);
        const imageData = new FormData();
        for (let i = 0; i < image.length; i++) {
            imageData.append('file', image[i]);
        }

        axios.put(`http://localhost:8080/product`, productInfo).then(res => {
            console.log(res);
        })

        axios.post(`http://localhost:8080/product/${productInfo.id}/image/upload`,
            imageData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    const handleSubmitForm = () => {
        if ((image.length == 1 && image[0] == undefined) || productInfo.name.length == 0 || productInfo.price == 0 || productInfo.categoryname.length == 0) {
            alert("Please Fill Required Information");
            return;
        }
        if (location.state.update) {
            updateProduct()
        }else {
            uploadProduct();
        }

    }


    return <div>
        <h1 className="p-3.5 font-bold text-yellow-600 font-bold text-4xl">Product Information</h1>
        <div className="w-full max-w-xl p-3.5" >
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="w-48 inline-block text-gray-500 font-bold md:left-2 mb-1 md:mb-0 pr-9">
                        Product Name
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name" name="name" value={productInfo.name} type="text" onChange={inputHandleChange} />
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="w-48 inline-block text-gray-500 font-bold md:left-2 mb-1 md:mb-0 pr-9">
                        Product Description
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input
                        className=" p-3.5 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name" name="description" value={productInfo.description} type="text" onChange={inputHandleChange}/>
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="w-48 inline-block text-gray-500 font-bold md:left-2 mb-1 md:mb-0 pr-9">
                        Price
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input
                        className=" p-3.5 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name" name="price" type="number" value={productInfo.price} onChange={inputHandleChange}/>
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="w-48 inline-block text-gray-500 font-bold md:left-2 mb-1 md:mb-0 pr-9">
                        Shop
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input
                        className=" p-3.5 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name" name="shopname" type="text" value={productInfo.shopname}/>
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="w-48 inline-block text-gray-500 font-bold md:left-2 mb-1 md:mb-0 pr-9">
                        Category
                    </label>
                </div>
                <div className="md:w-2/3">
                    <div className="mb-3 xl:w-96">
                        <Select placeholder="Select Category" value={selectedCategory} onChange={onSelectedChangeHandle} options={categoryList} />
                    </div>
                </div>
            </div>
            <div className="border-4 stroke-amber-100">
                <h4 className="w-48 inline-block text-gray-500 font-bold md:left-2 mb-1 md:mb-0 pr-9">Product Image</h4>
                <div >
                    <div className="flex justify-center">
                        <div className="mb-3 w-96">
                            {imgCount.map(count => <ImageInputGenerator key={count} name={count} />)}
                            <div className="pt-6 flex items-end space-x-3">
                                <div  onClick={addImageHandle}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                </div>


                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <button
                type="click"
                onClick={handleSubmitForm}
                className="m-3 pt-3 inline-block rounded-full bg-blue-800 px-6 pt-2.5 pb-2 text-white text-sm font-medium uppercase leading-normal  shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)]">
                Add Product
            </button>
        </div>
    </div>
}

export default ProductForm;