import React, {useState} from "react";
import axios from "axios";
import {paste} from "@testing-library/user-event/dist/paste";

const ProductForm = () => {
    const [image, setImage] = useState([undefined]);
    const [imageTest, setImageTest] = useState(null);
    const [productInfo, setProductInfo] = useState({
        "name": "",
        "description": "",
        "price": 0,
        "shopname": "",
        "categoryname": ""
    })
    const [imgCount, setImgCount] = useState([0]);

    const onRemoveImage = (imgIdx) => {

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
                <div onChange={onRemoveImage(parseInt(props.name))} className="inline-block rounded bg-red-700 px-2 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-primary hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-yellow-500" >Remove</div>
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
        setImageTest(event.target.files[0]);
        const imgIdx = parseInt(event.target.name);
        const imgArr = [...image];
        imgArr[imgIdx] = event.target.files[0];
        setImage(imgArr);
    }


    const uploadImage = () => {
        const fakeProduct = {
            "name": "Shoes 2",
            "description": "Running shoes",
            "price": 2000000,
            "shopname": "Adidas",
            "categoryname": "Running"
        }

        // data.files.push(image);
        let data = [];
        data.push(image);
        const imageData = new FormData();
        imageData.append("file", image);
        imageData.append("file", image);

        axios.post(`http://localhost:8080/product`, fakeProduct)
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

    return <div>
        <h1 className="p-3.5 font-bold text-yellow-600 font-bold text-4xl">Product Information</h1>
        <form className="w-full max-w-xl p-3.5">
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="w-48 inline-block text-gray-500 font-bold md:left-2 mb-1 md:mb-0 pr-9">
                        Product Name
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name" name="name" type="text" onChange={inputHandleChange} />
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
                        id="inline-full-name" name="description" type="text" onChange={inputHandleChange}/>
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
                        id="inline-full-name" name="price" type="number" onChange={inputHandleChange}/>
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
                        id="inline-full-name" name="shopname" type="text" value="Adidas"/>
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="w-48 inline-block text-gray-500 font-bold md:left-2 mb-1 md:mb-0 pr-9">
                        Category
                    </label>
                </div>
                <div className="md:w-2/3">
                    <div className="flex justify-center">
                        <div className="mb-3 xl:w-96">
                            <select name="categoryname" onChange={inputHandleChange} className="p-3.5 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" data-te-select-init>

                            </select>
                        </div>
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
        </form>
    </div>
}

export default ProductForm;