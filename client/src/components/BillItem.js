import React from 'react';
import CartProduct from "./CartProduct";
import ShipProduct from "./ShipProduct";

const BillItem = ({bill,handleReceived}) => {
    const [customer, setCustomer] = React.useState(bill.customer)
    const [shop, setShop] = React.useState(bill.shop)
    const [products, setProducts] = React.useState(bill.products)
    const [show, setShow] = React.useState(false)

    function handleShowProducts() {
        setShow(!show);
    }


    return (
        <div className="bg-white shadow-md rounded-lg p-6 border-2">
            <div className="flex justify-between mb-2">
                <div className="user">
                    <p className="font-bold text-xl">Customer</p>
                    <p>{customer.name}</p>
                    <p>{customer.phoneNumber}</p>
                    <p>{customer.address}</p>
                </div>
                <div className="shop">
                    <p className="font-bold text-xl">Shop</p>
                    <p>{shop.name}</p>
                </div>
            </div>
            <p className="font-bold text-xl">Total Price</p>
            <p>{bill.totalPrice}</p>
            <div className="flex justify-between mb-2">
                <button onClick={()=>{handleShowProducts()}} className="bg-blue-500  text-white p-2 rounded-md mt-4">Show Products</button>
                <button onClick={()=>{handleReceived(bill.id)}} className="bg-green-500 text-white p-2 rounded-md mt-4">Received</button>
            </div>
            {show && products.map((product, index) => <ShipProduct product={product}/>)}
        </div>
    );
};

export default BillItem;