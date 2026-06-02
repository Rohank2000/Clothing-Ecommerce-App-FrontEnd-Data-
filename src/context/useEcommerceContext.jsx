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

    useCartToDatabase(userId, cart);
    useWishlistToDatabase(userId, wishlist);

    const { Data } = useFetchForGET(
        "https://clothing-ecommerce-app-back-end-dat.vercel.app/api/fetch/addresses",
        []
    );

    useEffect(() => {
        if (Array.isArray(Data)) setAddresses(Data);
    }, [Data]);

    const addNewAddress = async (newAddressData) => {
        const url = "https://clothing-ecommerce-app-back-end-dat.vercel.app/api/addresses";
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
                console.log("Error Occured While Syncing Address Data To Database", data.error);
                return false;
            }
            setAddresses((prev) => [...prev, data.data.address]);
            return true;
        } catch (error) {
            console.log("Network Error Occured While Syncing Cart Data To Database", error.message);
        }
    };

    const editAddress = async (addressId, updatedData) => {
        const url = `https://clothing-ecommerce-app-back-end-dat.vercel.app/api/addresses/${addressId}`;
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
                console.log("Backend Error While Syncing Update Address Data To Database", data.error);
                return false;
            }

            setAddresses((prevAddresses) =>
                prevAddresses.map((ad) =>
                    ad._id === addressId ? data.data.address : ad
                )
            );
            return true;

        } catch (error) {
            console.log("Network Error Occured While Syncing Update Address Data To Database", error.message);
        }
    };

    const removeAddress = async (addressId) => {
        const url = "https://clothing-ecommerce-app-back-end-dat.vercel.app/api/remove/addresses";
        try {
            const deletedData = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ addressId }),
            });

            const data = await deletedData.json();

            if (!deletedData.ok) {
                console.log("Backend Error While Deleting Address Data From the Database", data.error);
                return false;
            }

            setAddresses((prev) => prev.filter((ad) => ad._id !== addressId));
            return true;

        } catch (error) {
            console.log("Network Error While Deleting Address Data From the Database", error.message);
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
                addresses,
                addNewAddress,
                editAddress,
                removeAddress,
            }}
        >
            {children}
        </EcommerceBrandContext.Provider>
    );
};

const useEcommerceContext = () => useContext(EcommerceBrandContext);
export default useEcommerceContext;
