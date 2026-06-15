import { Link } from "react-router-dom";
import useFetchForGET from "../hooks/useFetchForGET";
import useEcommerceContext from "../context/useEcommerceContext";

const Order = () => {
    const { userId } = useEcommerceContext();
    const { data: ordersData, loading: ordersLoading, error: ordersError } = useFetchForGET(
        `${BASE_URL}/api/fetch/orders?userId=${userId}`,
        []
    );
    const { data: productData, loading: productLoading } = useFetchForGET(
        `${BASE_URL}/api/fetch/clothing`,
        []
    );

    const products = productData?.data?.clothing || [];
    const orders = ordersData?.data?.cart?.[0]?.orders || []

    const findProduct = (productId) => products.find((prod) => prod._id === productId);

    const formatPrice = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
        }).format(amount);

    return (
        <div className="container mt-4">
            <h1 className="mb-4">My Orders</h1>

            <div className="bg-secondary-subtle p-4">
                {ordersLoading ? (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : ordersError ? (
                    <div className="container mt-4 text-center">
                        <h2>Error loading orders.</h2>
                        <p className="text-danger">{ordersError}</p>
                        <Link to="/" className="btn btn-primary mt-3">Go Home</Link>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-5">
                        <p className="text-muted">No orders found.</p>
                        <Link to="/" className="btn btn-primary">Start Shopping</Link>
                    </div>
                ) : (
                    <div className="row">
                        {orders.map((order) => (
                            <div className="col-12 mb-4" key={order._id}>
                                <div className="card shadow-sm">
                                    <div className="m-3">
                                        <div className="d-flex justify-content-between">
                                            <small className="text-muted">Order ID: {order._id}</small>
                                            <small className="text-muted">{new Date(order.date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</small>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between mb-3">
                                            <h5 className="mb-0">Total: <span className="text-success">{formatPrice(order.totalAmount)}</span></h5>
                                            <span className="badge bg-success fs-6">Delivered</span>
                                        </div>

                                        {order.shippingAddress && (
                                            <div className="mb-3 p-3">
                                                <h6 className="mb-2">Shipping Address</h6>
                                                <p className="mb-1">{order.shippingAddress.FullName}</p>
                                                <p className="mb-1">{order.shippingAddress.FlatNo}, {order.shippingAddress.Area}</p>
                                                <p className="mb-0">{order.shippingAddress.Town}, {order.shippingAddress.State} - {order.shippingAddress.Pincode}</p>
                                            </div>
                                        )}

                                        <h6 className="mb-3">Items</h6>
                                        {productLoading ? (
                                            <p className="text-muted">Loading product details...</p>
                                        ) : (
                                            <div className="row">
                                                {order.items?.map((item) => {
                                                    const product = findProduct(item.productId);
                                                    return (
                                                        <div className="col-md-6 mb-3" key={item.productId}>
                                                            <div className="card h-100 shadow-sm">
                                                                <div className="row h-100">
                                                                    <div className="col-4">
                                                                        <img
                                                                            src={product?.productImg}
                                                                            className="img-fluid rounded-start object-fit-cover h-100"
                                                                            alt={product?.productName || item.productId}
                                                                            style={{ minHeight: "100px" }}
                                                                        />
                                                                    </div>
                                                                    <div className="col-8">
                                                                        <div className="card-body py-2">
                                                                            <h6 className="card-title mb-1">
                                                                                {product?.productName || `Product ID: ${item.productId}`}
                                                                            </h6>
                                                                            {product && (
                                                                                <p className="card-text text-muted mb-1">
                                                                                    ₹{product.price}
                                                                                </p>
                                                                            )}
                                                                            <span className="badge bg-primary">Qty: {item.quantity}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
            <div className="text-center mt-3 mb-4">
                <Link to="/" className="btn btn-outline-primary me-2">Continue Shopping</Link>
            </div>
        </div>
    );
}

export default Order;