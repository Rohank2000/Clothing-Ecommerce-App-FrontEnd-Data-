import { Link } from "react-router-dom";
import AddressManager from "../component/addressManager";

const Profile = () => {
	return (
		<div className="container mt-4">
			<div className="row">
				<div className="col-lg-8 mx-auto">
					<h1 className="mb-4">My Profile</h1>
					<div className="bg-secondary-subtle p-4">
						<div className="card mb-4 ">
							<div className="card-body">
								<div className="d-flex align-items-center mb-3">
									<img
										className="img-fluid rounded-circle me-3"
										src="https://i.ibb.co/bjLYcnr5/d8d2e380-22f7-4bfc-914b-e9ecf30f810b.jpg"
										alt="profile-pic"
										style={{ width: "80px" }}
									/>
									<div>
										<h3 className="mb-1">Mukesh Mehra</h3>
										<p className="text-muted">user_001</p>
									</div>
								</div>
								<hr />
								<div className="row">
									<div className="col-md-6 mb-2">
										<strong>Email:</strong>
										<p className="mb-0 text-muted">Example@gmail.com</p>
									</div>
									<div className="col-md-6 mb-2">
										<strong>Phone:</strong>
										<p className="mb-0 text-muted">+91 9876543210</p>
									</div>
								</div>
							</div>
						</div>

						<div className="card mb-4">
							<div className="p-3 d-flex">
								<h5 className="mb-0">Saved Addresses</h5>
							</div>
							<div className="card-body">
								<AddressManager radioOff={true} />
							</div>
						</div>

						<div className="d-grid gap-2 mb-4">
							<Link to="/user/profile/orders" className="btn btn-outline-primary btn-lg">
								View Order History
							</Link>
						</div>
					</div>

				</div>
			</div>
		</div>
	);
}

export default Profile;