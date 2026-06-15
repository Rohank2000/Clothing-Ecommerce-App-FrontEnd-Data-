import { useState } from "react";

import useEcommerceContext from "../context/useEcommerceContext";

const useOrderToDatabase = () => {

    const { userId, setCart } = useEcommerceContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleOrder = async (cartItems, totalPrice, chosenAddress) => {
        setLoading(true)
        const url = `${BASE_URL}/api/orders`
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
            const data = await postData.json();

            if (!postData.ok) {

                setError(data.error || data.message || "Unknown server error");
                return false;
            }
            setCart([]);
            setError(null);

            return data.data;
        } catch (error) {

            setError(error.message);
            return false;
        } finally {
            setLoading(false);
        }
    }
return {handleOrder, loading, error}
}

export default useOrderToDatabase;