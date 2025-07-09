import { createContext, useReducer, useContext, useState } from "react";

const CartContext = createContext({
    cartItems: [],
    addToCart: () => { },
    removeFromCart: () => { },
    increaseQuantity: () => { },
    decreaseQuantity: () => { },
    clearCart: () => { },
    getTotalItems: () => 0,
    getTotalPrice: () => '0,00'
})

export function CartContextProvider({ children }) {
    const [cartItems, setCartItems] = useState([])
    
    const addToCart = (gameToAdd) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === gameToAdd.id)
            
            if (existingItem) {
                return prevItems.map(item => item.id ===gameToAdd.id ? {...item, quantity: item.quantity + 1 }: item)
            } else {
                return [...prevItems, { ...gameToAdd, quantity: 1 }];
            }
        }) 
    }

     
    const removeFromCart = (gameId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== gameId));
    };

    
    const increaseQuantity = (gameId) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === gameId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    
    const decreaseQuantity = (gameId) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === gameId);

            if (existingItem && existingItem.quantity > 1) {
                return prevItems.map(item =>
                    item.id === gameId ? { ...item, quantity: item.quantity - 1 } : item
                );
            } else {
                
                return prevItems.filter(item => item.id !== gameId);
            }
        });
    };

    
    const clearCart = () => {
        setCartItems([]);
    };

    
    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

   
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0).toFixed(2);
    };


    const contextValue = {
        cartItems,          
        addToCart,          
        removeFromCart,     
        increaseQuantity,   
        decreaseQuantity,   
        clearCart,          
        getTotalItems,      
        getTotalPrice,      
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext);
}