import { useEffect } from "react";

const useCartToDatabase = (userId, cart) => {
    useEffect(() => {
        const cartToDatabase = async () => {

            const url = "https://clothing-ecommerce-app-back-end-dat.vercel.app/api/cart";

            const payload = { userId: userId, cartArray: cart };
            try {
                const postData = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });


                const data = await postData.json();

                if (!postData.ok) {
                    console.log("Error Occured While Syncing Cart Data To Database", data.error);

                }

            } catch (error) {
                console.log("Network Error Occured While Syncing Cart Data To Database", error.message);
            }
        }
        cartToDatabase();

    }, [cart]);
}

export default useCartToDatabase;