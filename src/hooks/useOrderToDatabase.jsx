import { useState, useContext } from "react";

import useEcommerceContext from "./context/useEcommerceContext";

const useOrderToDatabase = () => {

    const { userId, setCart } = useEcommerceContext();

    const [Loading, setLoading] = useState(false);
    const [Error, setError] = useState(null);

    const handleOrder = async (cartItems, totalPrice, chosenAddress) => {
        setLoading(true)
        const url = "https://clothing-ecommerce-app-back-end-dat.vercel.app/api/orders"
        const cartPackage = {
            userId: userId,
            cartItems: cartItems,
            totalPrice: totalPrice,
            chosenAddress: chosenAddress,

        }
        try {
            const postData = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cartPackage),
            });
            const data = postData.json();

            if (!postData.ok) {
                console.log("Failed to place order|Error Occured in Backend While Uploading order Data to Datbase.", data.error);
            }
            setCart([]);
            setError(null);

            return true;
        } catch (error) {
            console.log("Order Failed", error.message);
            return false;
        }
      setLoading(false);  
    }
return {handleOrder, Loading, Error}
}

export default useOrderToDatabase;