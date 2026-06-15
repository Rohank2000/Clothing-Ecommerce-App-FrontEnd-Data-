import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useOrderToDatabase from "../hooks/useOrderToDatabase";
import useFetchForGET from "../hooks/useFetchForGET";
import useEcommerceContext from "../context/useEcommerceContext";
import AddressManager from "../component/addressManager";

const Checkout = () => {

	const [selectedAddressId, setSelectedAddressId] = useState(null);

	const { cart, totalPrice, addresses } = useEcommerceContext();

	const { handleOrder, loading: orderLoading } = useOrderToDatabase();

	const navigate = useNavigate();

	const { data, loading, error } = useFetchForGET(`${BASE_URL}/api/fetch/clothing`, []);

	const productData = data?.data?.clothing || [];

	const cartData = productData.filter((pditem) => cart.some((cartItem) => cartItem.productId === pditem._id))

	const totalQuantity = cart.reduce((acc, curr) => acc + curr.quantity, 0);

	const formatPrice = (amount) =>
		new Intl.NumberFormat("en-IN", {
			style: "currency",
			currency: "INR",
			minimumFractionDigits: 2,
		}).format(amount);

	const handleProceedToBuy = async () => {
		const chosenAddress = addresses.find(address => address._id === selectedAddressId);
		if (!chosenAddress) return;
		const orderResult = await handleOrder(cart, totalPrice, chosenAddress);
		if (orderResult) {
			navigate("/user/profile/order-success", { state: { orderData: orderResult } });
		}
	};

	return (
		<div className="container mt-4 pb-5 pb-md-0">
			<div className="my-2">
				<h1>Checkout</h1>

			</div>
			{error && (
				<div className="alert alert-danger mt-3" role="alert">
					Failed to load product data. Please try again later.
				</div>
			)}
			<h4 className="pb-4">Saved Addresses</h4>
			<div className="row g-4 bg-secondary-subtle p-3">
				<div className="col-12 col-lg-7">
					<AddressManager selectedAddressId={selectedAddressId}
						onSelect={setSelectedAddressId} />
				</div>
				<div className="col-12 col-lg-5 d-none d-md-block">
					{cartData.length > 0 && (
						<div className="card shadow-sm">
							<div className="card-body">
								<h6 className="border-bottom pb-2 mb-3">
									<strong>Price Details</strong>
								</h6>

								<div className="d-flex justify-content-between mb-2">
									<span>
										Price ({totalQuantity} item{totalQuantity > 1 ? "s" : ""})
									</span>
									<span className="fw-semibold">
										{formatPrice(totalPrice)}
									</span>
								</div>

								<div className="d-flex justify-content-between mb-2">
									<span>Delivery</span>
									<span className="text-success fw-semibold">Free</span>
								</div>

								<hr />

								<div className="d-flex justify-content-between mb-3">
									<strong>Total Amount</strong>
									<strong className="fs-5">
										{formatPrice(totalPrice)}
									</strong>
								</div>

								<button
									className="btn btn-warning w-100"
									onClick={handleProceedToBuy}
									disabled={orderLoading || !selectedAddressId}
								>
									{orderLoading ? "Placing Order..." : "Place Your Order"}
								</button>
							</div>
						</div>
					)}
				</div>
			</div>

			{cartData.length > 0 && (
				<div className="d-md-none position-fixed bottom-0 start-0 w-100 bg-white border-top shadow p-0" style={{ zIndex: 1030 }}>
					<div className="d-flex justify-content-between align-items-center mb-2">
						<strong>Total Amount</strong>
						<strong className="fs-5">{formatPrice(totalPrice)}</strong>
					</div>
					<button
						className="btn btn-warning w-100"
						onClick={handleProceedToBuy}
						disabled={orderLoading || !selectedAddressId}
					>
						{orderLoading ? "Placing Order..." : "Place Your Order"}
					</button>
				</div>
			)}
		</div>

	)
}

export default Checkout;