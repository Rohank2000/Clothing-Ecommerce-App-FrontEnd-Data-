import { Link } from "react-router-dom";

const ProfileModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <>
            <div
                onClick={onClose}
                style={{
                    position: 'fixed', inset: 0, zIndex: 999,
                    background: 'transparent'
                }}
            />
            <div
                className="card border border-primary border-4 shadow p-3 mb-5 bg-body-tertiary rounded text-Dark"
                style={{
                    width: '290px',
                    maxWidth: '90vw',
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    zIndex: 1000,
                }}
            >
                <button
                    onClick={onClose}
                    type="button"
                    className="btn-close position-absolute top-0 end-0 m-2"
                    aria-label="Close"
                />
                <div className="card-body text-start">
                    <div className="d-flex justify-content-start align-items-center card-title">
                        <img className="img-fluid rounded-circle w-25 p-3" src="https://i.ibb.co/bjLYcnr5/d8d2e380-22f7-4bfc-914b-e9ecf30f810b.jpg" alt="profile-pic" />
                        <h5>Mukesh Mehra</h5>
                    </div>
                    <div className="text-muted text-start">
                        <span><p>Example@gmail.com</p></span>
                        <span><p>user_001</p></span>
                    </div>
                    <hr />
                    <Link to="/user/profile" className="text-start" style={{textDecoration:"none", color:"inherit"}}>Profile</Link>
                    <br />
                    <br />
                    <Link to="/user/profile/orders" className="text-start" style={{textDecoration:"none", color:"inherit"}}>
                    Orders
                    </Link>
                    <br />
                    <br />
                </div>
            </div>
        </>
    )
}

export default ProfileModal;