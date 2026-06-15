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
			<h2 className="mb-4">Product Details</h2>
			<div className="row gap-5 p-3 bg-secondary-subtle">
				<div className="col-12 col-md-3 col-lg-4">
					{loading ? (
						<div className="text-center">
							<div className="spinner-grow spinner-grow-sm" role="status">
								<span className="visually-hidden"></span>
							</div>
						</div>
					) : error ? "Error Occurred" : !productInfo ? (
						<p className="text-muted">Product not found.</p>
					) : (
						<div className="card h-100 shadow-sm" style={{ width: "100%", maxHeight: "500px" }}>
							<img src={productInfo.productImg} alt={productInfo.productName} className="card-img-top object-fit-cover" style={{
								height: "400px",
								width: "100%"
							}}
							/>
							<div className="card-body" >

								<div className="d-grid gap-2 mt-3">
									<button type="button" className="btn btn-primary btn-sm btn-equal" onClick={() => handleToggleValue(productInfo, QuantityToggleValue)}>
										Add To Cart
									</button>
									<button type="button" className="btn btn-secondary btn-sm btn-equal" onClick={() => toggleWishlist(productInfo)}>
										{wishlist.includes(productInfo._id) ? "Remove From WishList" : "Add To WishList"}
									</button>
								</div>

							</div>

						</div>)}
				</div>
				<div className="col-12 col-md-3 col-lg-4">
					{loading ? "" : error ? "Error Occurred" : !productInfo ? (
						<p className="text-muted">Product not found.</p>
					) : (
						<div style={{ height: "500px" }}>
							<h3>{productInfo.productName}</h3>
							<p className="d-flex"><strong className="me-2">{productInfo.rating}</strong><StarRating rating={productInfo.rating} /></p>
							<p className="fs-3"><strong>₹ {productInfo.price}</strong></p>
							<div className="d-flex align-items-center gap-3 my-3">
								<div className="input-group" style={{ width: 160 }}>
									<button className="btn btn-outline-primary" type="button" onClick={decreaseQuantity}>-</button>
									<span className="input-group-text">{QuantityToggleValue}</span>
									<button className="btn btn-outline-primary" type="button" onClick={increaseQuantity}>+</button>
								</div>
							</div>
							<div className="mb-3">
								<strong className="me-2">Sizes:</strong>
								{sizesArray.map((size, index) => (
									<button key={index} className="btn btn-outline-danger me-2" style={{ height: "20%" }}>{size}</button>
								))}
							</div>

							<strong>Description : </strong><p className="text-body-secondary">{productInfo.description}</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default ProductDetails;