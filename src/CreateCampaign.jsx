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
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">Create a Campaign</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campaign Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label font-semibold text-neutral">
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Campaign Title
              </span>
            </label>
            <input type="text" placeholder="Enter title" className="input input-bordered w-full focus:input-primary" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="form-control">
            <label className="label font-semibold text-neutral">
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
                Category
              </span>
            </label>
            <select className="select select-bordered w-full focus:select-primary" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>Health</option>
              <option>Education</option>
              <option>Technology</option>
              <option>Environment</option>
            </select>
          </div>
        </div>

        <div className="form-control">
          <label className="label font-semibold text-neutral">
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
              </svg>
              Description
            </span>
          </label>
          <textarea className="textarea textarea-bordered w-full focus:textarea-primary" placeholder="Enter campaign details" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label font-semibold text-neutral">
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/>
                </svg>
                Target Amount
              </span>
            </label>
            <input type="number" placeholder="Enter target amount" className="input input-bordered w-full focus:input-primary" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} required />
          </div>

          <div className="form-control">
            <label className="label font-semibold text-neutral">
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
                </svg>
                Upload Campaign Image
              </span>
            </label>
            <input type="file" className="file-input file-input-bordered w-full focus:file-input-primary" accept="image/*" onChange={handleImageUpload} required />
            {image && <img src={image} alt="Preview" className="mt-2 w-full max-h-48 object-cover rounded-lg shadow-md" />}
          </div>
        </div>

        {/* Banking Details Section */}
        <h3 className="text-2xl font-semibold mt-8 text-secondary">Banking Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label font-semibold text-neutral">Account Holder Name</label>
            <input type="text" placeholder="Enter account holder name" className="input input-bordered w-full focus:input-primary" value={accountName} onChange={(e) => setAccountName(e.target.value)} required />
          </div>

          <div className="form-control">
            <label className="label font-semibold text-neutral">Bank Account Number</label>
            <input type="text" placeholder="Enter account number" className="input input-bordered w-full focus:input-primary" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} required />
          </div>

          <div className="form-control">
            <label className="label font-semibold text-neutral">IFSC Code</label>
            <input type="text" placeholder="Enter IFSC code" className="input input-bordered w-full focus:input-primary" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} required />
          </div>

          <div className="form-control">
            <label className="label font-semibold text-neutral">UPI ID</label>
            <input type="text" placeholder="Enter UPI ID (optional)" className="input input-bordered w-full focus:input-primary" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
          </div>
        </div>

        {/* GPay QR Code Upload */}
        <div className="form-control">
          <label className="label font-semibold text-neutral">
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h3a1 1 0 011 1v3a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-3zm13-1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd"/>
              </svg>
              Upload GPay QR Code
            </span>
          </label>
          <input type="file" className="file-input file-input-bordered w-full focus:file-input-primary" accept="image/*" onChange={handleQrUpload} />
          {gpayQr && <img src={gpayQr} alt="GPay QR Code" className="mt-2 w-full max-h-48 object-cover rounded-lg shadow-md" />}
        </div>

        <button className="btn btn-primary w-full btn-lg hover:btn-primary-focus transition-all" type="submit">
          Create Campaign
        </button>
      </form>
    </div>
  );
};

export default CreateCampaign;
