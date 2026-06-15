import { useState } from "react";
import { Link } from "react-router-dom";
import useEcommerceContext from "../context/useEcommerceContext";
import ProfileModal from "../component/profileModal";
import useFetchForGET from "../hooks/useFetchForGET";

const Header = () => {

    const [searchText, setSearchText] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { wishlist, cart } = useEcommerceContext();

    const totalQuantity = cart.reduce((acc, curr) => acc + curr.quantity, 0);

    const { data, loading, error } = useFetchForGET(`${BASE_URL}/api/fetch/clothing`, []);
    const { data: catData } = useFetchForGET(`${BASE_URL}/api/fetch/categories`, []);

    const Products = data?.data?.clothing || [];
    const categories = catData?.data?.category || [];

    const searchData = searchText.trim().toLowerCase();

    const filteredData = searchData
        ? Products.filter(prod => {
            const nameMatch = prod.productName?.toLowerCase().includes(searchData);
            const category = categories.find(cat => cat._id === prod.categoryId);
            const categoryMatch = category?.name?.toLowerCase().includes(searchData);
            return nameMatch || categoryMatch;
        })
        : [];

    const handleSearch = (e) => {
        e.preventDefault();
    };

    return (
        <header>
            <nav className="navbar bg-dark">
                <div className="container-fluid">
                    <div className="row w-100 align-items-center">
                        <div className="col text-start">
                            <Link className="navbar-brand" to="/"><img style={{ height: 60 }} src="https://i.ibb.co/0jrTH47w/e441cf04-f545-4b39-99fb-447d2b4a2b3e.jpg" alt="Ecommerce Clothing Brand Logo" /></Link>
                        </div>

                        <div className="col text-center position-relative">
                            <form className="d-flex justify-content-center" role="search" onSubmit={handleSearch}>
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    value={searchText}
                                    onChange={(event) => setSearchText(event.target.value)}
                                    style={{ maxWidth: "80%" }}
                                />
                                <button className="btn btn-outline-success" type="submit">
                                    Search
                                </button>
                            </form>

                            {searchData && (
                                <div className="position-absolute bg-light text-dark w-75 shadow rounded"
                                    style={{ top: "100%", left: "10%", zIndex: 1000, maxHeight: 300, overflowY: "auto" }}>
                                    {loading ? (
                                        <div className="spinner-border spinner-border-sm" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>) : error ? (
                                            <div className="p-2 text-muted small">Error loading results</div>
                                        ) : filteredData.length === 0 ? (
                                            <div className="p-2 text-muted small">No products found</div>
                                        ) : (
                                        filteredData.map(prod => (
                                            <Link
                                                key={prod._id}
                                                to={`/category/productlist/details/${prod._id}`}
                                                className="d-flex align-items-center gap-2 p-2 text-decoration-none text-dark border-bottom"
                                                onClick={() => setSearchText("")}
                                            >
                                                <img
                                                    src={prod.productImg}
                                                    alt={prod.productName}
                                                    style={{ width: 40, height: 40 }}
                                                />
                                                <div className="text-start">
                                                    <div className="fw-medium">{prod.productName}</div>
                                                    <div className="text-secondary small">₹{prod.price}</div>
                                                </div>
                                            </Link>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="col text-end">
                            <Link className="position-relative d-inline-block me-3" to="/user/wishlist">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                                    <path d="M480-388q51-47 82.5-77.5T611-518q17-22 23-38.5t6-35.5q0-36-26-62t-62-26q-21 0-40.5 8.5T480-648q-12-15-31-23.5t-41-8.5q-36 0-62 26t-26 62q0 19 5.5 35t22.5 38q17 22 48 52.5t84 78.5ZM200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z" />
                                </svg>

                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.65rem" }}>
                                    {wishlist.length}
                                </span>
                            </Link>

                            <Link className="position-relative d-inline-block me-4" to="/user/cart">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M223.5-103.5Q200-127 200-160t23.5-56.5Q247-240 280-240t56.5 23.5Q360-193 360-160t-23.5 56.5Q313-80 280-80t-56.5-23.5Zm400 0Q600-127 600-160t23.5-56.5Q647-240 680-240t56.5 23.5Q760-193 760-160t-23.5 56.5Q713-80 680-80t-56.5-23.5ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" /></svg>

                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.65rem" }}>
                                    {totalQuantity}
                                </span>
                            </Link>

                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <button className="bg-transparent" onClick={() => setIsModalOpen(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm146.5-204.5Q340-521 340-580t40.5-99.5Q421-720 480-720t99.5 40.5Q620-639 620-580t-40.5 99.5Q539-440 480-440t-99.5-40.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm100-95.5q47-15.5 86-44.5-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160q53 0 100-15.5ZM523-537q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm-43-43Zm0 360Z" />
                                    </svg>
                                </button>
                                <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                            </div>

                        </div>
                    </div>
                </div>

            </nav>

        </header>
    );
};

export default Header;
