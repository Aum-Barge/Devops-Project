import React, { useState } from "react";
import { db } from "./firebase"; // Import Firestore instance
import { collection, addDoc } from "firebase/firestore"; // Firestore functions

const CreateCampaign = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Health");
  const [targetAmount, setTargetAmount] = useState("");
  const [image, setImage] = useState(null);
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [upiId, setUpiId] = useState("");
  const [gpayQr, setGpayQr] = useState(null); // For QR Code upload

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleQrUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGpayQr(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "campaigns"), {
        title,
        description,
        category,
        targetAmount,
        image,
        accountName,
        accountNumber,
        ifscCode,
        upiId,
        gpayQr,
        createdAt: new Date()
      });

      console.log("Campaign Created with ID: ", docRef.id);
      alert("Campaign Created Successfully!");
    } catch (error) {
      console.error("Error adding campaign: ", error);
      alert("Failed to create campaign");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-6">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Create a Campaign</h2>
        <form onSubmit={handleSubmit}>
          {/* Campaign Details */}
          <div className="form-control mb-4">
            <label className="label font-semibold">Campaign Title</label>
            <input type="text" placeholder="Enter title" className="input input-bordered w-full" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="form-control mb-4">
            <label className="label font-semibold">Description</label>
            <textarea className="textarea textarea-bordered w-full" placeholder="Enter campaign details" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
          </div>

          <div className="form-control mb-4">
            <label className="label font-semibold">Category</label>
            <select className="select select-bordered w-full" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>Health</option>
              <option>Education</option>
              <option>Technology</option>
              <option>Environment</option>
            </select>
          </div>

          <div className="form-control mb-4">
            <label className="label font-semibold">Target Amount</label>
            <input type="number" placeholder="Enter target amount" className="input input-bordered w-full" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} required />
          </div>

          <div className="form-control mb-4">
            <label className="label font-semibold">Upload Campaign Image</label>
            <input type="file" className="file-input file-input-bordered w-full" accept="image/*" onChange={handleImageUpload} required />
            {image && <img src={image} alt="Preview" className="mt-2 w-full max-h-48 object-cover rounded-lg" />}
          </div>

          {/* Banking Details Section */}
          <h3 className="text-lg font-semibold mt-6">Banking Details</h3>

          <div className="form-control mb-4">
            <label className="label font-semibold">Account Holder Name</label>
            <input type="text" placeholder="Enter account holder name" className="input input-bordered w-full" value={accountName} onChange={(e) => setAccountName(e.target.value)} required />
          </div>

          <div className="form-control mb-4">
            <label className="label font-semibold">Bank Account Number</label>
            <input type="text" placeholder="Enter account number" className="input input-bordered w-full" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} required />
          </div>

          <div className="form-control mb-4">
            <label className="label font-semibold">IFSC Code</label>
            <input type="text" placeholder="Enter IFSC code" className="input input-bordered w-full" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} required />
          </div>

          <div className="form-control mb-4">
            <label className="label font-semibold">UPI ID</label>
            <input type="text" placeholder="Enter UPI ID (optional)" className="input input-bordered w-full" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
          </div>

          {/* GPay QR Code Upload */}
          <div className="form-control mb-4">
            <label className="label font-semibold">Upload GPay QR Code</label>
            <input type="file" className="file-input file-input-bordered w-full" accept="image/*" onChange={handleQrUpload} />
            {gpayQr && <img src={gpayQr} alt="GPay QR Code" className="mt-2 w-full max-h-48 object-cover rounded-lg" />}
          </div>

          <button className="btn btn-primary w-full" type="submit">
            Create Campaign
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaign;
