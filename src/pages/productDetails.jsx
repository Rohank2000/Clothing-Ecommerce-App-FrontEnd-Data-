import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchForGET from "../hooks/useFetchForGET";
import StarRating from "../component/starRating";
import useEcommerceContext from "../context/useEcommerceContext";

const ProductDetails = () => {

	const { wishlist, toggleWishlist } = useEcommerceContext();


	const [QuantityToggleValue, setQuantityToggleValue] = useState(1);

	const increaseQuantity = () => {
		setQuantityToggleValue((toggleValue) => toggleValue + 1);
	}

	const decreaseQuantity = () => {
		setQuantityToggleValue((toggleValue) => toggleValue > 1 ? toggleValue - 1 : toggleValue);
	}

	const handleToggleValue = (productInfo, QuantityToggleValue) => {
		addToCart(productInfo, QuantityToggleValue);
		setQuantityToggleValue(1);
	}

	const { clothingId } = useParams();

	const { addToCart } = useEcommerceContext();

	const { data, loading, error } = useFetchForGET(
		`${BASE_URL}/api/fetch/clothing`,
		[]
	);

	const productData = data?.data?.clothing || [];

	const productInfo = productData.find((prod) => prod._id === clothingId);

	// 	 Data Normalization for Product Sizes
	//   Checks if sizes is already an array. If yes then it keeps it.
	//    If it's a string then it splits it by commas, trims whitespace, and removes empty slots.
	//   Uses optional chaining (?.) to prevent crashes if the data has not loaded yet.


	const sizesArray = Array.isArray(productInfo?.sizes)
		? productInfo?.sizes
		: (productInfo?.sizes || "").split(",").map((s) => s.trim()).filter(Boolean);

	return (
		<div className="container mt-4">
			<h3 className="mb-5">Product Details</h3>
			<div className="row g-4 p-3 bg-secondary-subtle">
				<div className="col-12 col-md-5 col-lg-4">
					{loading ? (
						<div className="text-center">
							<div className="spinner-grow spinner-grow-sm" role="status">
								<span className="visually-hidden"></span>
							</div>
						</div>
					) : error ? "Error Occurred" : !productInfo ? (
						<p className="text-muted">Product not found.</p>
					) : (
						<div className="card shadow-sm">
							<img src={productInfo.productImg} alt={productInfo.productName} className="card-img-top object-fit-cover" style={{
								height: "300px",
								width: "100%"
							}}
							/>
							<div className="card-body" >
								<div className="d-grid gap-2">
                                    <button type="button" className="btn btn-primary btn-sm text-nowrap" onClick={() => handleToggleValue(productInfo, QuantityToggleValue)}>
                                        Add To Cart
                                    </button>
                                    <button type="button" className="btn btn-secondary btn-sm text-nowrap" onClick={() => toggleWishlist(productInfo)}>
										{wishlist.includes(productInfo._id) ? "Remove From WishList" : "Add To WishList"}
									</button>
								</div>
							</div>
						</div>)}
				</div>
				<div className="col-12 col-md-7 col-lg-8">
					{loading ? "" : error ? "Error Occurred" : !productInfo ? (
						<p className="text-muted">Product not found.</p>
					) : (
						<div>
							<h5 className="fw-semibold">{productInfo.productName}</h5>
							<p className="d-flex align-items-center"><strong className="me-2">{productInfo.rating}</strong><StarRating rating={productInfo.rating} /></p>
							<p className="fs-3"><strong>₹ {productInfo.price}</strong></p>
							<div className="d-flex align-items-center gap-3 my-3">
								<div className="input-group" style={{ width: 140 }}>
									<button className="btn btn-outline-primary" type="button" onClick={decreaseQuantity}>-</button>
									<span className="input-group-text">{QuantityToggleValue}</span>
									<button className="btn btn-outline-primary" type="button" onClick={increaseQuantity}>+</button>
								</div>
							</div>
							<div className="mb-3">
								<strong className="me-2">Sizes:</strong>
								{sizesArray.map((size, index) => (
									<button key={index} className="btn btn-outline-danger me-2 mb-1">{size}</button>
								))}
							</div>
							<strong>Description : </strong><p className="text-body-secondary m-0">{productInfo.description}</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default ProductDetails;