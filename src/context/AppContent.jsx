import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { dummyProducts } from "../assets/assets"

export const AppContent = createContext()

export const AppContextProvider = ({ children }) => {
    const currency = import.meta.VITE_CURRENCY;
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin,setShowUserLogin] = useState(false)
    const [products,setProducts] = useState([])
    const [cartItems,setCartItems] = useState({})
    const [searchQuery,setSearchQuery] = useState({})

    //fetch all Products
    const fetchProducts = async () => {
        setProducts(dummyProducts)
    }

    // Add product to Cart
const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
        cartData[itemId] += 1;
    } else {
        cartData[itemId] = 1;
    }

    setCartItems(cartData);
    toast.success("Added to Cart");
};

// Update Cart Item Quantity
const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
};

// Remove Product from Cart
const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
        cartData[itemId] -= 1;

        if (cartData[itemId] === 0) {
            delete cartData[itemId];
        }
    }

    setCartItems(cartData);
    toast.success("Removed from Cart");
};

    useEffect(() => {
        console.log("Updated user:", user);
    }, [user]);
    
    useEffect(()=>{
        fetchProducts()
    },[])
    const value = {
        navigate,
        user,
        setUser,
        isSeller,
        setIsSeller,
        showUserLogin,
        setShowUserLogin,
        products,
        currency,
        addToCart,
        updateCartItem,
        removeFromCart,
        cartItems,
        searchQuery,
        setSearchQuery
    }

    return (
        <AppContent.Provider value={value}>
            {children}
        </AppContent.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContent)
}
