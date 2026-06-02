import { useEffect } from "react";

const useWishlistToDatabase = (userId, wishlist) => {
    useEffect(() => {
        const wishlistDataToDatabase = async () => {

            const url = "https://clothing-ecommerce-app-back-end-dat.vercel.app/api/wishlist";

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
                    console.log("Error Occured While Syncing WishList to Database", data.error);

                }

            } catch (error) {
                console.log("Network Error Occured While Syncing WishList to Database", error.message);
            }
        }
        wishlistDataToDatabase();
    }, [wishlist]);
}

export default useWishlistToDatabase;