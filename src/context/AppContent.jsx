import { createContext, use, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { dummyProducts } from "../assets/assets"
import toast from "react-hot-toast"
import axios from "axios";

axios.defaults.withCredentials =true;//doubt
axios.defaults.baseURL =import.meta.env.VITE_BACKEND_URL;

export const AppContent = createContext()

export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY;
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

useEffect(()=>{
        console.log(cartItems);

},[cartItems])

// Update Cart Item Quantity
const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
};


//Get Cart Item Count
const getCartCount =() =>{
    let totalCount=0
    for (const item in cartItems){
        totalCount += cartItems[item]
    }
    return totalCount
}


// Get Cart Total Amount
const getCartAmount = () => {
  let totalAmount = 0;

  for (const items in cartItems) {
    let itemInfo = products.find(
      (product) => product._id === items
    );

    if (cartItems[items] > 0) {
      totalAmount += itemInfo.offerPrice * cartItems[items];
    }
  }

  return Math.floor(totalAmount * 100) / 100;
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
        setSearchQuery,
        getCartCount,
        getCartAmount,
        axios
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
