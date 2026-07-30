import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { dummyProducts } from "../assets/assets"
import toast from "react-hot-toast"
import axios from "axios";

axios.defaults.withCredentials =true;//doubt
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:4000";

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

    //Fetch Seller Status
    const fetchSeller= async ()=>{
        try {
            const {data} =await axios.get('/api/seller/is-auth')
            if(data.success){
                setIsSeller(true)
            }else{
                setIsSeller(false)
            }
        } catch (error) {
            setIsSeller(false)
        }
    }
        // Fetch User Auth Status, User Data and Cart Items
    const fetchUser = async () => {
        try {
           const {data}= await axios.get('/api/user/is-auth');
           if(data.success){
            setUser(data.user)
            setCartItems(data.user.cartItems)
           }
        } catch (error) {
            setUser(null)
        }
    }

    //fetch all Products
    const fetchProducts = async () => {
        try {
            const {data}= await axios.get('/api/product/list')
            if(data.success){
                setProducts(data.products)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
               setProducts(dummyProducts)
        }
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
      totalAmount += (itemInfo?.offerPrice || 0) * cartItems[items];
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


//Update the cart to DB
    useEffect(() => {
        const updateCart = async () => {
            try {
                const { data } = await axios.post('/api/cart/update', { cartItems })
                if (!data.success) {
                    if (data.message === "Not Authorized") {
                        setUser(null)
                        return
                    }
                    toast.error(data.message)
                }
            } catch (error) {
                const message = error.response?.data?.message || error.message
                if (message === "Not Authorized") {
                    setUser(null)
                    return
                }
                toast.error(message)
            }
        }
        if (user) {
            updateCart()
        }
    }, [cartItems])

    useEffect(() => {
        fetchUser();
        fetchProducts()
        fetchUser()
        
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
        axios,
        fetchProducts,
        setCartItems
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
