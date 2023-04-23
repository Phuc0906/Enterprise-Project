import React, {useState} from 'react';
import axios from "axios";

const EditProductForm = ({ selectedProduct, handleCloseForm }) => {
    const [name, setName] = useState(selectedProduct.name);
    const [description, setDescription] = useState(selectedProduct.description);
    const [price, setPrice] = useState(selectedProduct.price);
    const [shopname, setShopname] = useState(selectedProduct.shopname);
    const [categoryname, setCategoryname] = useState(selectedProduct.categoryname);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedProduct = {
            "id": selectedProduct.id,
            "name": name,
            "description": description,
            "price": price,
            "shopname": shopname,
            "categoryname": categoryname
        };

        try {
            const apiUrl = 'http://localhost:8080/product/';
            const response = await axios.post(apiUrl, updatedProduct);

            console.log(response);

            handleCloseForm();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div>
            <div className="bg-white mt-10 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Name:
                        </label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Description:
                        </label>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Price:
                        </label>
                        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Shop:
                        </label>
                        <input type="text" value={shopname} onChange={(e) => setShopname(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Category:
                        </label>
                        <input type="text" value={categoryname} onChange={(e) => setCategoryname(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="flex items-center space-x-4">
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg shadow">Save</button>
                        <button type="button" onClick={handleCloseForm} className="bg-red-500 text-white px-4 py-2 rounded-lg shadow">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductForm;
