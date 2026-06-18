import { Link } from "react-router-dom";
import useEcommerceContext from "../context/useEcommerceContext";

const ProductCard = ({ productInfo }) => {

    const { wishlist,addToCart, toggleWishlist } = useEcommerceContext();

    const handleAddToCart = (event) => {
        event.preventDefault();
        addToCart(productInfo);
    };

    const handleToggleWishlist = (event) => {
        event.preventDefault();
        toggleWishlist(productInfo);
    };

    return (
        <Link to={`/category/productlist/details/${productInfo._id}`} style={{ textDecoration: "none" }}>
            <div className="card shadow-sm" style={{ aspectRatio: "3/4" }}>
                <div style={{ height: "55%", overflow: "hidden" }}>
                    <img
                        src={productInfo.productImg}
                        alt={productInfo.productName}
                        className="w-100 h-100 object-fit-cover"
                    />
                </div>
                <div className="card-body d-flex flex-column p-2" >
                    <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold" style={{ fontSize: "0.75rem" }}>⭐ {productInfo.rating}</span>
                    </div>
                    <p className="card-title m-0 text-truncate" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                        {productInfo.productName}
                    </p>
                    <p className="card-text m-0">
                        <strong style={{ fontSize: "0.85rem" }}>₹{productInfo.price}</strong>
                    </p>
                    <div className="d-grid gap-1 mt-auto overflow-hidden">
                        <button type="button" className="btn btn-primary btn-sm text-nowrap" style={{ fontSize: "0.6rem" }} onClick={handleAddToCart}>
                            Add To Cart
                        </button>
                        <button type="button" className="btn btn-secondary btn-sm text-nowrap" style={{ fontSize: "0.6rem" }} onClick={handleToggleWishlist}>
                            {wishlist.includes(productInfo._id) ? "Remove from WishList" : "Add To WishList"}
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;