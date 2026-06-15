import { createContext, useState, useEffect, useContext } from "react";
import useCartToDatabase from "../hooks/useCartToDatabase";
import useWishlistToDatabase from "../hooks/useWishlistToDatabase";
import useFetchForGET from "../hooks/useFetchForGET";

const EcommerceBrandContext = createContext();

export const EcommerceBrandProvider = ({ children }) => {
    const [userId] = useState("user_001");
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "success", visible: false });

    const triggerAlert = (message, type = "success") => {

        setAlertInfo({ message, type, visible: true });


        setTimeout(() => {

            setAlertInfo((prev) => ({ ...prev, visible: false }));
        }, 3000);
    };

    useCartToDatabase(userId, cart, (msg) => triggerAlert(msg, "danger"));
    useWishlistToDatabase(userId, wishlist, (msg) => triggerAlert(msg, "danger"));

    const { data: cartData, loading: cartLoading } = useFetchForGET(
        `${BASE_URL}/api/fetch/cart?userId=${userId}`,
        []
    );

    useEffect(() => {
        if (cartLoading) return;
        const fetchedCart = cartData?.data?.cart;
        if (fetchedCart && Array.isArray(fetchedCart.cart)) {
            setCart(fetchedCart.cart);
        }
    }, [cartData, cartLoading]);

    const { data: wishlistData, loading: wishlistLoading } = useFetchForGET(
        `${BASE_URL}/api/fetch/wishlist?userId=${userId}`,
        []
    );

    useEffect(() => {
        if (wishlistLoading) return;
        const fetchedWishlist = wishlistData?.data?.wishList;
        if (fetchedWishlist && Array.isArray(fetchedWishlist.wishlist)) {
            setWishlist(fetchedWishlist.wishlist);
        }
    }, [wishlistData, wishlistLoading]);


    const { data } = useFetchForGET(
        `${BASE_URL}/api/fetch/addresses`,
        []
    );

    useEffect(() => {
        const addressArray = data?.data?.address;
        if (Array.isArray(addressArray)) setAddresses(addressArray);
    }, [data]);

    const addToCart = (product, QuantityToggleValue = 1) => {

        const isAlreadyInCart = cart.find((item) => item.productId === product._id);

        if (isAlreadyInCart) {
            const incrementQuantity = cart.map((item) =>
                item.productId === product._id
                    ? { ...item, quantity: item.quantity + QuantityToggleValue }
                    : item)
            setCart(incrementQuantity);
            triggerAlert("Quantity Updated", "info");
        } else {
            const addItemToCart = [...cart, { productId: product._id, quantity: QuantityToggleValue }]
            setCart(addItemToCart);
            triggerAlert("Added to Cart", "success");
        }
    };

    const removeCart = (prod) => {
        setCart((cart) => cart.filter((item) => item.productId != prod._id))
        triggerAlert("Removed from Cart", "warning");
    }

    const toggleWishlist = (product) => {

        const isAlreadyInWishlist = wishlist.find((item) => item === product._id);

        if (isAlreadyInWishlist) {
            const wishlistItemRemove = wishlist.filter((item) => item !== product._id);
            setWishlist(wishlistItemRemove);
            triggerAlert("Removed from Wishlist", "warning");
        } else {
            const wishlistItemAdd = [...wishlist, product._id];
            setWishlist(wishlistItemAdd);
            triggerAlert("Added to Wishlist", "success");
        }
    };


    const addNewAddress = async (newAddressData) => {
        const url = `${BASE_URL}/api/addresses`;
        try {
            const postData = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newAddressData),
            });

            const data = await postData.json();

            if (!postData.ok) {
                triggerAlert("Failed to Add Address", "danger");
                return false;
            }
            setAddresses((prev) => [...prev, data.data.address]);
            triggerAlert("New Address Added", "success");
            return true;
        } catch (error) {
            triggerAlert("Network Error", "danger");
        }
    };

    const editAddress = async (addressId, updatedData) => {
        const url = `${BASE_URL}/api/addresses/${addressId}`;
        try {
            const postData = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });

            const data = await postData.json();

            if (!postData.ok) {
                triggerAlert("Failed to Update Address", "danger");
                return false;
            }

            setAddresses((prevAddresses) =>
                prevAddresses.map((ad) =>
                    ad._id === addressId ? data.data.address : ad
                )
            );
            triggerAlert("Address Updated", "success");
            return true;

        } catch (error) {
            triggerAlert("Network Error", "danger");
        }
    };

    const removeAddress = async (addressId) => {
        const url = `${BASE_URL}/api/remove/addresses`;
        try {
            const deletedData = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ _id: addressId }),
            });

            const data = await deletedData.json();

            if (!deletedData.ok) {
                triggerAlert("Failed to Delete Address", "danger");
                return false;
            }

            setAddresses((prev) => prev.filter((ad) => ad._id !== addressId));
            triggerAlert("Address Deleted", "warning");
            return true;

        } catch (error) {
            triggerAlert("Network Error", "danger");
        }
    };

    return (
        <EcommerceBrandContext.Provider
            value={{
                userId,
                cart,
                setCart,
                wishlist,
                setWishlist,
                addToCart,
                removeCart,
                toggleWishlist,
                addresses,
                addNewAddress,
                editAddress,
                removeAddress,
                totalPrice,
                setTotalPrice,
                alertInfo,
                triggerAlert,
            }}
        >
            {children}
        </EcommerceBrandContext.Provider>
    );
};

const useEcommerceContext = () => useContext(EcommerceBrandContext);
export default useEcommerceContext;
