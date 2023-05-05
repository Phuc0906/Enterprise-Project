import React, {useState} from 'react';
import CartProduct from "./CartProduct";

const CartItem = ({shop}) => {
    const [products, setProducts] = useState(shop.productList)

    return (
        <>
        <div className="mt-5 text-3xl font-bold">  {shop.shopName} </div>
            {products.map((product, index) => <CartProduct product={product} key={index} />)}
        </>
    );
}

export default CartItem;