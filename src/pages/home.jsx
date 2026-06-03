import useFetchForGET from "../hooks/useFetchForGET";
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { Carousel } from 'bootstrap';



export default function Home() {
	const { Data, Loading, Error } = useFetchForGET(
		"https://clothing-ecommerce-app-back-end-dat.vercel.app/api/fetch/categories",
		[]
	);

	const categories = Data?.data?.category || [];

	useEffect(() => {
		if (categories.length > 4) {
			const el = document.getElementById('carouselExample');
			new Carousel(el); // re-run the Carousel after the full load
		}
	}, [categories]);

	return (
		<div className="container py-4">
			<h1>Home</h1>

			<h3>Top Categories</h3>
			<section className="d-flex justify-content-center">


				{Loading ? (
					"Loading"
				) : Error ? (
					"Error Occured"
				) : (
					<div className="row">
						{categories.slice(0, 4).map((cat, index) => (
							<div className="col-3" key={index}>
								<div className="card mb-3" style={{ width: 140, height: 140, borderRadius: 8 }}>
									<img
										src={cat.img}
										className="img-fluid rounded-start"
										alt={cat.name}
										style={{ width: "100%", height: "100%", objectFit: "cover" }}
									/>
									<p className="text-center mt-1">{cat.name}</p>
								</div>
							</div>
						))}
						<div></div>
					</div>
				)}
			</section>
			<br />
			<section>

				<h3>Featured Collections</h3>

				<div id="carouselExample" class="carousel slide">
					<div class="carousel-inner">
						{categories.slice(4, 8).map((cat, index) => (
							<div
								className={index === 0 ? "carousel-item active" : "carousel-item"}
								key={index}
							>
								<img src={cat.img} className="d-block w-100" alt={cat.name} />
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
				<div class="row row-cols-1 row-cols-md-2 g-4">
					{categories.slice(8, 10).map((cat, index) => (
						<div class="col">
							<div class="card h-100 container">

								<img src={cat.img} class="card-img-top" alt={cat.name} />
								<h5 class="card-title">{cat.name}</h5>


								<p class="card-text mb-2">{cat.des}</p>


							</div>
						</div>
					))}

				</div>

			</section >
		</div >
	);
}