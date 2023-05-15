import React, {useEffect} from 'react';

const BillItem = ({bill,handleReceived,handleCancel}) => {
    const IMAGE_URL = `https://gr-project-bucket.s3.ap-southeast-1.amazonaws.com/`;
    const [customer, setCustomer] = React.useState(bill.customer)
    const [shop, setShop] = React.useState(bill.shop)
    const [products, setProducts] = React.useState([])
    const [show, setShow] = React.useState(false)

    function handleShowProducts() {
        setShow(!show);
    }

    const splittingPriceNumber = (price) => {
        let splittingNum = "";
        let countDigit = 0;
        for (let i = price.length - 1; i >= 0; i--) {
            if (countDigit > 2) {
                countDigit = 0;
                splittingNum = ',' + splittingNum;
            }
            splittingNum = price[i] + splittingNum;
            countDigit++;
        }
        return splittingNum;
    }

    useEffect(() => {
        fetch("http://localhost:8080/api/product/billing/product?billing=" + bill.id, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.token,
            }
        })
            .then(res => {
                const serverRes = res.json();
                serverRes.then(data => {
                    setProducts(data);
                })
            })
    }, [])
    const ItemCard = ({product}) => {
        return <div className="flex items-center mb-4 ">
            <img className="w-[130px] h-[130px] rounded-2xl" src={`${IMAGE_URL}${product.productId}-0.png`}/>
            <div className="flex flex-col gap-3 ml-5  w-2/3">
                <label className="max-w-[430px] leading-6" style={{wordWrap: 'break-word'}}>{product.name}</label>
                <label className="text-gray-400">{product.categoryname}</label>
            </div>
            <label className="ml-9 mr-6">Qty {product.quantity}</label>
            <label className="ml-4 ">{splittingPriceNumber(product.price.toString())} vnd</label>
        </div>
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
            <p>{splittingPriceNumber(bill.totalPrice.toString())} vnd</p>
            <div className="flex justify-between mb-2">
                <button onClick={()=>{handleShowProducts()}} className="bg-blue-500  text-white p-2 rounded-md mt-4">Show Products</button>
                {window.location.pathname==="/at-shop" && <button onClick={()=>{handleReceived(bill.id)}} className="bg-green-500 text-white p-2 rounded-md mt-4">Received</button>}
                {window.location.pathname==="/ship" && <button onClick={()=>{handleReceived(bill.id)}} className="bg-teal-500 text-white p-2 rounded-md mt-4">Delivered</button>}
                {window.location.pathname==="/ship" && <button onClick={()=>{handleCancel(bill.id)}} className="bg-red-500 text-white p-2 rounded-md mt-4">Cancel</button>}
            </div>
            {show && products.map((product) => <ItemCard product={product}/>)}
        </div>
    );
};

export default BillItem;