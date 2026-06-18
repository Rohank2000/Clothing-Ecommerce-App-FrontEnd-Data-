import { Link } from "react-router-dom";
import StarRating from "./starRating";
import useEcommerceContext from "../context/useEcommerceContext";
const ProductCard3 = ({ product }) => {

    const {cart, wishlist, setCart, removeCart, toggleWishlist } = useEcommerceContext();

    const decreaseQuantity = (event) => {
        event.preventDefault();
        setCart((cart) => cart.map((item) => item.productId === product._id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item))
    }

    const increaseQuantity = (event) => {
        event.preventDefault();
        setCart((cart) => cart.map((item) => item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item))
    }

    const handleRemoveCart = (event) => {
        event.preventDefault();
        removeCart(product);
    }

    const handleToggleWishlist = (event) => {
        event.preventDefault();
        toggleWishlist(product)
    }

  const currentItemQuantity = cart.find((item)=>item.productId===product._id)?.quantity || 0;

    return (
        <Link to={`/category/productlist/details/${product._id}`} style={{textDecoration:"none"}}>
            <div className="card mb-3 shadow-sm m-0">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={product.productImg} className="img-fluid rounded-start object-fit-cover" alt={product.productName} style={{ height: "100%", width: "100%" }} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{product.productName}</h5>
                            <div className="d-flex pt-3">
                                <p className="card-text me-2">{product.rating}</p>
                                <p>{<StarRating rating={product.rating} />}</p>
                            </div>
                            <p className="fs-3 card-text"><strong>₹ {product.price}</strong></p>
                            <div className="d-flex align-items-center gap-3 my-3">
                                <div className="input-group" style={{ width: 160 }}>
                                    <button className="btn btn-outline-primary" type="button" onClick={decreaseQuantity}>-</button>
                                    <span className="input-group-text">{currentItemQuantity}</span>
                                    <button className="btn btn-outline-primary" type="button" onClick={increaseQuantity}>+</button>
                                </div>
                            </div>
                            <div className="d-grid gap-2 mt-auto">
                                <button type="button" className="btn btn-danger btn-sm text-nowrap" onClick={handleRemoveCart}>
                                    Remove from Cart
                                </button>
                                <button type="button" className="btn btn-secondary btn-sm text-nowrap" onClick={handleToggleWishlist}>
                                    {wishlist.includes(product._id) ? "Remove From WishList" : "Add To WishList"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard3;