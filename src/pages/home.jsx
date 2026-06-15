import useFetchForGET from "../hooks/useFetchForGET";
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { Carousel } from 'bootstrap';



const Home = () => {
	const { data, loading, error } = useFetchForGET(
		`${BASE_URL}/api/fetch/categories`,
		[]
	);

	const categories = data?.data?.category || [];

	useEffect(() => {
		if (categories.length > 4) {
			const el = document.getElementById('carouselExample');
			new Carousel(el);
		}
	}, [categories]);

	return (
		<div className="bg-body-tertiary">
			<div className="container py-4">
				<h1>Home</h1>

				<h3>Top Categories</h3>
				<section className="d-flex justify-content-center">


					{loading ? (
						<button className="btn btn-primary" type="button" disabled>
  <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
  <span role="status">Loading...</span>
</button>) : error ? (
							"Error Occurred"
						) : (
						<div className="row">
							{categories.slice(0, 4).map((cat, index) => (
								<div className="col-2 me-4" key={index}>
									<Link to={`/category/productlist/${cat._id}`}>
										<div className="card mb-3" style={{ width: 140, height: 140, borderRadius: 8 }}>
											<img
												src={cat.img}
												className="img-fluid rounded-start"
												alt={cat.name}
												style={{ width: "100%", height: "100%", objectFit: "cover" }}

											/>
										</div>
									</Link>

								</div>
							))}
							<div className="col-2 mt-4">
								<Link className="btn btn-outline-success btn-lg" to={`/category/productlist/all`}>All Products</Link>
							</div>
						</div>
					)}
				</section>
				<br />
				<section>

					<h3>Featured Collections</h3>

					<div id="carouselExample" className="carousel slide">
						<div className="carousel-inner">
							{categories.slice(4, 8).map((cat, index) => (
								<div key={index}>
									<Link to={`/category/productlist/${cat._id}`}>
										<div
											className={index === 0 ? "carousel-item active" : "carousel-item"}
											key={index}
										>
											<img src={cat.img} className="d-block w-100" alt={cat.name} />
										</div>
									</Link>
								</div>

							))}
						</div>
						<button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
							<span className="carousel-control-prev-icon" aria-hidden="true"></span>
							<span className="visually-hidden">Previous</span>
						</button>
						<button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
							<span className="carousel-control-next-icon" aria-hidden="true"></span>
							<span className="visually-hidden">Next</span>
						</button>
					</div>

				</section>
				<br />
				<section>
					<h3>Curated Picks</h3>
					<div className="row row-cols-1 row-cols-md-2 g-4">
						{categories.slice(8, 10).map((cat, index) => (
							<div key={index} className="col">
								<Link to={`/category/productlist/${cat._id}`} style={{ textDecoration: "none" }}>
									<div className="card h-100 container">

										<img src={cat.img} className="card-img-top" alt={cat.name} />
										<h5 className="card-title">{cat.name}</h5>


										<p className="card-text mb-2">{cat.des}</p>


									</div>
								</Link>
							</div>
						))}

					</div>

				</section >
			</div >

		</div>);
}

export default Home;