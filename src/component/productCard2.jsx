import { Link } from "react-router-dom";
import useEcommerceContext from "../context/useEcommerceContext";

const ProductCard2 = ({ product }) => {

    const { wishlist, addToCart, toggleWishlist } = useEcommerceContext();

    const handleAddToCart = (event) => {
        event.preventDefault();
        addToCart(product);
    };

    const handleToggleWishlist = (event) => {
        event.preventDefault();
        toggleWishlist(product);
    };

    return (
        <>
            <Link to={`/category/productlist/details/${product._id}`} style={{ textDecoration: "none" }}>
                <div className="card shadow-sm" style={{ aspectRatio: "3/4" }}>
                    <div style={{ height: "55%", overflow: "hidden" }}>
                        <img src={product.productImg} alt={product.productName} className="w-100 h-100 object-fit-cover" />
                    </div>
                    <div className="card-body d-flex flex-column p-2" >
                        <div className="d-flex align-items-center" style={{ fontSize: "0.75rem" }}>
                            <span className="fw-bold me-1">{product.rating}</span>
                            <span>⭐</span>
                        </div>
                        <p className="card-title m-0 text-truncate" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                            {product.productName}
                        </p>
                        <p className="card-text m-0">
                            <strong style={{ fontSize: "0.85rem" }}>₹{product.price}</strong>
                        </p>

                        <div className="d-grid gap-1 mt-auto">
                            <button type="button" className="btn btn-primary py-0" style={{ fontSize: "0.7rem", lineHeight: "1.8" }} onClick={(event) => handleAddToCart(event)}>
                                Add To Cart
                            </button>
                            <button type="button" className="btn btn-secondary py-0" style={{ fontSize: "0.7rem", lineHeight: "1.8" }} onClick={(event) => handleToggleWishlist(event)}>
                                {wishlist.includes(product._id) ? "Remove" : "Add To WishList"}
                            </button>
                        </div>

                    </div>

                </div>
            </Link>
        </>
    );
};

export default ProductCard2;