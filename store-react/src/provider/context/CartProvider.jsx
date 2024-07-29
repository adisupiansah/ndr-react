import { createContext, useState, useContext, useEffect } from "react";
import { useLogin } from "./LoginProvider";
import { database } from "../../sdk/Firebase/FirebaseSDK";
import { ref, onValue, set, get } from "firebase/database";


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useLogin();
    const userId = user?.uid;

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        if (userId) {
            const cartRef = ref(database, `carts/${userId}`);
            onValue(cartRef, (snapshot) => {
                const data = snapshot.val();
                setCartItems(data ? data : []);
        })
    }
    }, [userId]);

    const upateCartInDatabase = (cart) => {
        if (userId) {
            const cartRef = ref(database, `carts/${userId}`);
            set(cartRef, cart);
        }
    }

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.findIndex((i) => i.id === item.id);

            if (existingItem !== -1) {
                const updateItems = [...prevItems];
                updateItems[existingItem].quantity += 1;
                upateCartInDatabase(updateItems);
                return updateItems;
            }
            const newCart = [...prevItems, { ...item, quantity: 1 }];
            upateCartInDatabase(newCart);
            return newCart;
        });
    }

    const tambahKuantitas = (id) => {
       setCartItems((prevItems) => {
        const update = prevItems.map((item) => 
        item.id === id
        ? {...item, quantity: item.quantity + 1}
        : item
         );
         upateCartInDatabase(update);
        return update;
       });
    };

    const kurangKuantitas = (id) => {
      setCartItems((prevItems) => {
        const update = prevItems.map((item) => 
            item.id = id
            ? {...item, quantity: Math.max(item.quantity - 1, 1)}
            : item
        )
        .filter((item) => item.quantity > 0);
        upateCartInDatabase(update);
        return update
      })
    }

    const removeItem = (id) => {
        setCartItems((prevItems) => {
            const updateItems = prevItems.filter((item) => item.id !== id);
            upateCartInDatabase(updateItems);
            return updateItems;
        })
    }
    const clearCart = () => {
        setCartItems([]);
        upateCartInDatabase([]);
    }

    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);


    return (
        <CartContext.Provider value={{ cartItems, addToCart, tambahKuantitas, kurangKuantitas, removeItem, totalQuantity, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);
