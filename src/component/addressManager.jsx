import { useState, useContext } from "react";
import  useEcommerceContext  from "../context/useEcommerceContext";

import "../App.css";

const AddressManager = () => {
  const { addresses = [], addNewAddress, removeAddress, editAddress } = useContext(ShopContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    FullName: "",
    MobileNumber: "",
    FlatNo: "",
    Area: "",
    Town: "",
    State: "",
    Pincode: "",
    Country: "India",
    Landmark: "",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const openNewAddressForm = () => {
    setEditId(null);
    setFormData({ FullName: "", MobileNumber: "", FlatNo: "", Area: "", Town: "", State: "", Pincode: "", Country: "India", Landmark: "" });
    setIsModalOpen(true);
  };

  const handleEditClick = (address) => {
    setEditId(address._id);
    setFormData(address);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let success = false;
    if (editId) {
      success = await editAddress(editId, formData);
    } else {
      success = await addNewAddress(formData);
    }
    if (success) closeModal();
  };

  return (
    <div className="address-manager">
      <div className="address-header">
        <h3>Saved Addresses</h3>
        <button onClick={openNewAddressForm} className="add-address-btn">+ Add New Address</button>
      </div>

      <div className="address-list">
        {addresses.map((addr) => (
          <div key={addr._id} className="address-card">
            <p><strong>{addr.FullName}</strong></p>
            <p>{addr.FlatNo}, {addr.Area}</p>
            <p>{addr.Town}, {addr.State} - {addr.Pincode}</p>

            <div className="card-actions">
              <button onClick={() => handleEditClick(addr)} className="card-btn">Edit</button>
              <button onClick={() => removeAddress(addr._id)} className="card-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="address-overlay">
          <div className="address-modal-box">
            <h3>{editId ? "Update Address" : "Add New Address"}</h3>

            <form onSubmit={handleSubmit} className="address-form">
              <input name="FullName" value={formData.FullName} onChange={handleChange} placeholder="Full Name" required />
              <input name="FlatNo" value={formData.FlatNo} onChange={handleChange} placeholder="House/Flat No." required />
              <input name="Area" value={formData.Area} onChange={handleChange} placeholder="Area/Locality" />
              <input name="Town" value={formData.Town} onChange={handleChange} placeholder="Town/City" />
              <input name="State" value={formData.State} onChange={handleChange} placeholder="State" />
              <input name="Pincode" value={formData.Pincode} onChange={handleChange} placeholder="Pincode" />

              <div className="address-button-group">
                <button type="submit" className="primary">{editId ? "Update" : "Save"}</button>
                <button type="button" onClick={closeModal} className="secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressManager;