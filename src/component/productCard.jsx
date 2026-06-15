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
            <div className="card h-100 shadow-sm">
                <img
                    src={productInfo.productImg}
                    alt={productInfo.productName}
                    className="card-img-top object-fit-cover"
                />
                <div className="card-body d-flex flex-column" >
                    <p className="card-text">
                        <strong>⭐ {productInfo.rating}</strong>
                    </p>
                    <h5 className="card-title">
                        {productInfo.productName}
                    </h5>
                    <p className="card-text">
                        <strong>₹{productInfo.price}</strong>
                    </p>
                    <div className="d-grid gap-2 mt-auto">
                        <button type="button" className="btn btn-primary btn-sm btn-equal" onClick={handleAddToCart}>
                            Add To Cart
                        </button>
                        <button type="button" className="btn btn-secondary btn-sm btn-equal" onClick={handleToggleWishlist}>
                            {wishlist.includes(productInfo._id) ? "Remove From WishList" : "Add To WishList"}
                        </button>
                    </div>
                </div>
            </div>
        </Link>


    );
};

export default ProductCard;