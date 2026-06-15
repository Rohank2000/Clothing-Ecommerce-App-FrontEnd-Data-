import { useLocation, Link } from "react-router-dom";
import useFetchForGET from "../hooks/useFetchForGET";

const OrderSuccess = () => {
    const location = useLocation();
    const placedOrderData = location.state?.orderData;
    const { data, loading, error } = useFetchForGET(`${BASE_URL}/api/fetch/clothing`, []);
    const productData = data?.data?.clothing || [];

    if (!placedOrderData) {
        return (
            <div className="container mt-4 text-center">
                <h2>No order data found.</h2>
                <Link to="/" className="btn btn-primary mt-3">Go Home</Link>
            </div>
        );
    }

    const order = placedOrderData.orders?.at(placedOrderData.orders.length - 1);

    const orderItems = order?.items?.map((item) => {

        const product = productData.find((prod) => prod._id === item.productId);
        return { ...item, product };
    });

    return (
        <div className="container mt-4">
            <div className="text-center mb-4">
                <h1>Order Placed Successfully!</h1>
                <p className="text-success fs-5">Your order has been confirmed.</p>
            </div>
            <div className="bg-secondary-subtle p-3">
                <div className="card p-4 shadow-sm">
                    <h5>Order Details</h5>
                    <hr />
                    <p><strong>Order ID:</strong> {order?._id}</p>
                    <p><strong>Date:</strong> {new Date(order?.date).toLocaleString()}</p>
                    <p><strong>Total Amount:</strong> ₹{order?.totalAmount}</p>

                    {order?.shippingAddress && (
                        <>
                            <h6 className="mt-3">Shipping Address</h6>
                            <p>{order.shippingAddress.FullName}</p>
                            <p>{order.shippingAddress.FlatNo}, {order.shippingAddress.Area}</p>
                            <p>{order.shippingAddress.Town}, {order.shippingAddress.State} - {order.shippingAddress.Pincode}</p>
                        </>
                    )}

                    <h6 className="mt-3">Items</h6>
                    {loading ? (
                        <div className="spinner-grow spinner-grow-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>) : error ? (
                            <p className="text-danger">Error loading product details.</p>
                        ) : productData.length === 0 ? (
                            <ul>
                                {order?.items?.map((item, index) => (
                                    <li key={index}>Product ID: {item.productId} (x{item.quantity})</li>
                                ))}
                            </ul>
                        ) : (
                        <div className="row">
                            {orderItems?.map((item, index) => (
                                <div className="col-md-6 mb-3" key={index}>
                                    <div className="card h-100 shadow-sm">
                                        <div className="row h-100">
                                            <div className="col-md-5">
                                                <img
                                                    src={item.product?.productImg}
                                                    className="img-fluid rounded-start  h-100"
                                                    alt={item.product?.productName || item.productId}
                                                    style={{ minHeight: "150px" }}
                                                />
                                            </div>
                                            <div className="col-md-7">
                                                <div className="card-body d-flex justify-content-between h-100">
                                                    <h6 className="card-title  me-1">{item.product?.productName || `Product ID: ${item.productId}`}</h6>
                                                    <p className="card-text text-muted mb-1">
                                                        {item.product && <span className="fw-semibold me-3">₹{item.product.price}</span>}
                                                    </p>
                                                    <p className="card-text">
                                                        <span className="badge bg-primary">Qty: {item.quantity}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>


            <div className="text-center mt-4">
                <Link to="/user/profile/orders" className="btn btn-outline-primary me-2">View All Orders</Link>
                <Link to="/" className="btn btn-primary">Continue Shopping</Link>
            </div>
        </div>
    );
}

export default OrderSuccess;