import { React, useEffect, useState } from 'react';

import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import { clearTheCart, removeFromDb, getStoredCart } from '../../utilities/fakedb';
import { useHistory } from 'react-router';

const OrderReview = () => {

    // const [products] = useProducts();
    const [cart, setCart] = useState([]);
    const history = useHistory();
    // {let sa= getStoredCart()

    //     console.log(sa.B01LZ2WZGH)}


    useEffect(() => {
        fetch('./products.JSON')
            .then(res => res.json())
            .then(data => {
                // setCart(data);
                // setDisplayProducts(data);
                const savedCart = getStoredCart();
                // console.log(data)
                // console.log(savedCart)
                if (savedCart) {
                    const storedCart = [];
                    for (const key in savedCart) {
                        const addedProduct = data.find(product => product.key === key);
                        // console.log("iam here")
                        if (addedProduct) {
                            // set quantity
                            const quantity = savedCart[key];
                            addedProduct.quantity = quantity;
                            storedCart.push(addedProduct);
                        }
                    }
                    setCart(storedCart);
                    // console.log(cart)
                }

            });




    }, []);

    const handleRemove = key => {
        const newCart = cart.filter(product => product.key !== key);
        setCart(newCart);
        removeFromDb(key);
    }

    const handlePlaceOrder = () => {
        setCart([]);
        clearTheCart();
        history.push('/shipment');
    }

    return (
        <div className="shop-container">

            <div className="product-container">
                {


                    cart.map(product => <ReviewItem
                        key={product.key}
                        product={product}
                        handleRemove={handleRemove}
                    ></ReviewItem>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="btn-regular">Processed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default OrderReview;