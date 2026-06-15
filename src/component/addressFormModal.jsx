import IndianStatesData from "../component/indianStates";

const AddressFormModal = ({ formData, onChange, onSubmit, isSubmitting, editId, onClose }) => {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
    >
      <div className="bg-white rounded p-4 shadow" style={{ width: "100%", maxWidth: "500px", maxHeight: "90vh", overflowY: "auto" }}>
        <h4 className="mb-3">{editId ? "Update Address" : "Add New Address"}</h4>

        <form className="row g-3" onSubmit={onSubmit}>
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              placeholder="Mukesh Chhabra"
              maxLength="50"
              className="form-control"
              name="FullName"
              value={formData.FullName}
              onChange={onChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Mobile Number</label>
            <input
              type="tel"
              placeholder="8594650214"
              className="form-control"
              name="MobileNumber"
              inputMode="numeric"
              maxLength="10"
              pattern="[0-9]{10}"
              onInput={(event) => event.target.value = event.target.value.replace(/\D/g, "")}
              value={formData.MobileNumber}
              onChange={onChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">House / Flat No.</label>
            <input
              type="text"
              maxLength="30"
              placeholder="55"
              className="form-control"
              name="FlatNo"
              value={formData.FlatNo}
              onChange={onChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Area / Locality</label>
            <input
              type="text"
              placeholder="Sambhajinagar"
              maxLength="50"
              className="form-control"
              name="Area"
              value={formData.Area}
              onChange={onChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Landmark</label>
            <input
              type="text"
              placeholder="Near Taj Hotel"
              maxLength="50"
              className="form-control"
              name="Landmark"
              value={formData.Landmark}
              onChange={onChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Town / City</label>
            <input
              type="text"
              placeholder="Surat"
              maxLength="50"
              className="form-control"
              name="Town"
              value={formData.Town}
              onChange={onChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">State</label>
            <select
              className="form-select"
              name="State"
              value={formData.State}
              onChange={onChange}
              required
            >
              <option value="" disabled>Select State</option>
              {IndianStatesData.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Pincode</label>
            <input
              type="text"
              placeholder="800050"
              inputMode="numeric"
              maxLength={6}
              onInput={(event) => event.target.value = event.target.value.replace(/\D/g, "")}
              className="form-control"
              name="Pincode"
              value={formData.Pincode}
              onChange={onChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Country</label>
            <select
              className="form-select"
              name="Country"
              value={formData.Country}
              onChange={onChange}
            >
              <option value="India">India</option>
            </select>
          </div>

          <div className="col-12 d-flex gap-2 justify-content-end">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : editId ? "Update" : "Save"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressFormModal;
