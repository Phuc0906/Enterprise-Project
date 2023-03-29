import React, {useState} from "react";
import axios from "axios";

const ProductFormPage = () => {
    const [image, setImage] = useState();

    const imageHandle = (images) => {
        const file = images.target.files[0];
        setImage(file);
        console.log(file);
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

        axios.post(`http://localhost:8080/api/product`, fakeProduct)
            .then(res => {
                console.log(res);
                const productId = res.data.product_id;
                axios.post(`http://localhost:8080/api/product/${productId}/image/upload`,
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
        <div>
            <input type="file" multiple placeholder="Drag your images" onChange={imageHandle}/>
        </div>
        <div>
            <button onClick={uploadImage}>Upload</button>
        </div>
    </div>
}

export default ProductFormPage;