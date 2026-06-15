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
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    zIndex: 1000,
                }}
            >
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
                    <div className="text-start">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg>
                        Log Out
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileModal;