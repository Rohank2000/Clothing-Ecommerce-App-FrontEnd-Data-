import { useEffect, useRef } from "react";

const useWishlistToDatabase = (userId, wishlist, onError) => {

    const mountCount = useRef(0);

    useEffect(() => {
        mountCount.current += 1;
        if (mountCount.current <= 2) return;

        const wishlistDataToDatabase = async () => {

            const url = `${BASE_URL}/api/wishlist`;

            const wishListData = {
                userId: userId, wishlistArray: wishlist
            }

            try {
                const postData = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(wishListData),
                });

                const data = await postData.json();

                if (!postData.ok) {

                    if (onError) onError("Failed to sync wishlist data");
                }

            } catch (error) {

                if (onError) onError("Network error while syncing wishlist");
            }
        }
        wishlistDataToDatabase();
    }, [wishlist]);
}

export default useWishlistToDatabase;