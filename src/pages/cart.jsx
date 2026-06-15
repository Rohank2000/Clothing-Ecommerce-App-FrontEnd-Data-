import { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetchForGET from "../hooks/useFetchForGET";
import useEcommerceContext from "../context/useEcommerceContext";
import ProductCard3 from "../component/productCard3";

const Cart = () => {

  const { cart, setTotalPrice, totalPrice } = useEcommerceContext();

  const { data, loading, error } = useFetchForGET(`${BASE_URL}/api/fetch/clothing`, []);

  const productData = data?.data?.clothing || [];

  const cartData = productData.filter((pditem) => cart.some((cartItem) => cartItem.productId === pditem._id))

  useEffect(() => {
    const cartItemTotal = cart.reduce((acc, curr) => {
      const cartItem = cartData.find((item) => item.productId === curr._id);

      return acc + (cartItem ? cartItem.price * curr.quantity : 0)
    }, 0);

    setTotalPrice(cartItemTotal);

  }, [cartData, setTotalPrice]);


  const totalQuantity = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Cart</h1>
      <div className="row gap-5 bg-secondary-subtle">
        <div className="col text-start">
          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? "Error Occurred" : cartData.length === 0 ? (
            <p className="text-primary mt-3">No Products Available In Cart</p>
          ) : (
            cartData.map((item, index) => (
              <ProductCard3 key={index} product={item} />
            ))
          )}
        </div>

        {cartData.length > 0 && (
          <div className="col text-end m-4" >
            <div className="card shadow-sm" style={{ width: "100%", maxWidth: "370px" }}>
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

                <Link
                  to={`/user/profile/checkout`}
                  className="btn btn-warning w-100"
                >
                  Proceed To Buy
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Cart;