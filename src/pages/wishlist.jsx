import useFetchForGET from "../hooks/useFetchForGET";
import ProductCard from "../component/productCard";
import useEcommerceContext from "../context/useEcommerceContext";

const WishList = () => {

	const { wishlist } = useEcommerceContext();

	const { data, loading, error } = useFetchForGET(`${BASE_URL}/api/fetch/clothing`, []);

	const productData = data?.data?.clothing || [];

	const productInfoForWishlist = productData.filter((item) => wishlist.includes(item._id));

	return (
		<div className="container mt-4"  >
			<h1 className="mb-4">Wishlist</h1>
			<div className="flex-grow-1 align-items-center justify-content-center bg-secondary-subtle">
				{loading ? (
					<div className="text-center">
						<div className="spinner-border" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
					</div>
				) : error ? "Error Occurred..." : productInfoForWishlist.length === 0 ? (
					<div className="text-primary d-flex">
						<p className="text-center m-3">No Product Available in Wishlist</p>
					</div>
				) : (
                    <div className="row g-3 bg-secondary-subtle p-2 p-md-4">
                        {productInfoForWishlist?.map((item, index) => (
                            <div className="col-6 col-md-4 col-lg-3" key={index}>
                                <ProductCard productInfo={item} />
                            </div>
                        ))}

					</div>
				)}
			</div>
		</div>
	)
}

export default WishList;