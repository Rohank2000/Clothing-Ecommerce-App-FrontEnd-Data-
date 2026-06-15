import { useEffect, useRef } from "react";

const useCartToDatabase =  (userId, cart, onError) => {
    const mountCount = useRef(0);

    useEffect(() => {
        mountCount.current += 1;
        if (mountCount.current <= 2) return;

        const cartToDatabase = async () => {

            const url = `${BASE_URL}/api/cart`;

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

                    if (onError) onError("Failed to sync cart data");
                }

            } catch (error) {

                if (onError) onError("Network error while syncing cart");
            }
        }
        cartToDatabase();

    }, [cart]);
}

export default useCartToDatabase;