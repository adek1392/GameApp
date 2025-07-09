import { useCart } from "../store/CartContext";
export default function Cart() {
     
    const {
        cartItems,          
        removeFromCart,    
        increaseQuantity,   
        decreaseQuantity,   
        clearCart,          
        getTotalItems,      
        getTotalPrice       
    } = useCart();

    const totalItems = getTotalItems();  
    const totalPrice = getTotalPrice(); 

    return (
        <div >
            <h2>Your Cart</h2>
            {totalItems === 0 ? (
                <p>Cart is empty. Add some games!</p>
            ) : (
                <>
                    <ul >
                       
                        {cartItems.map(item => (
                            <li key={item.id} >
                                <div >
                                    <h4 >{item.name}</h4>
                                    <p >{item.price}$</p>
                                    <p >Quantity: {item.quantity}</p>
                                </div>
                                <div >
                                    
                                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                                    <button onClick={() => removeFromCart(item.id)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div >
                        <h3>Total number of items: {totalItems}</h3>
                        <h3>Total value: {totalPrice}$</h3>
                    </div>
                    <div className="cartButtons">
                        <button onClick={clearCart}>Empty your cart</button> 
                        <button >Go to checkout</button>
                    </div>
                </>
            )}
        </div>
    );
}