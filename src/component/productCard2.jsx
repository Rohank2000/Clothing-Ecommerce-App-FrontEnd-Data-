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
                <div className="card h-100 shadow-sm">
                    <img src={product.productImg} alt={product.productName} className="card-img-top object-fit-cover"
 />
                    <div className="card-body d-flex flex-column" >
                        <h4>{product.productName}</h4>

                        <div className="d-grid gap-2 mt-auto">
                            <button type="button" className="btn btn-primary btn-sm btn-equal" onClick={(event) => handleAddToCart(event)}>
                                Add To Cart
                            </button>
                            <button type="button" className="btn btn-secondary btn-sm btn-equal" onClick={(event) => handleToggleWishlist(event)}>
                                {wishlist.includes(product._id) ? "Remove From WishList" : "Add To WishList"}
                            </button>
                        </div>

                    </div>

                </div>
            </Link>
        </>
    );
};

export default ProductCard2;