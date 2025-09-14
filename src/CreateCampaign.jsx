import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

const CreateCampaign = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Health",
    targetAmount: "",
    image: null,
    accountName: "",
    accountNumber: "",
    ifscCode: "",
    upiId: "",
    gpayQr: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [qrPreview, setQrPreview] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Campaign title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.targetAmount || parseFloat(formData.targetAmount) <= 0) {
      newErrors.targetAmount = "Please enter a valid target amount";
    }
    if (!formData.image) newErrors.image = "Campaign image is required";
    if (!formData.accountName.trim()) newErrors.accountName = "Account holder name is required";
    if (!formData.accountNumber.trim()) newErrors.accountNumber = "Account number is required";
    if (!formData.ifscCode.trim()) newErrors.ifscCode = "IFSC code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, image: "Image size should be less than 5MB" }));
        return;
      }

      setFormData(prev => ({ ...prev, image: URL.createObjectURL(file) }));
      setImagePreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, image: "" }));
    }
  };

  const handleQrUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setErrors(prev => ({ ...prev, gpayQr: "QR code size should be less than 2MB" }));
        return;
      }

      setFormData(prev => ({ ...prev, gpayQr: URL.createObjectURL(file) }));
      setQrPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const docRef = await addDoc(collection(db, "campaigns"), {
        ...formData,
        targetAmount: parseFloat(formData.targetAmount),
        createdAt: new Date()
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "Health",
        targetAmount: "",
        image: null,
        accountName: "",
        accountNumber: "",
        ifscCode: "",
        upiId: "",
        gpayQr: null
      });
      setImagePreview(null);
      setQrPreview(null);
      setErrors({});

      alert("Campaign Created Successfully!");
    } catch (error) {
      console.error("Error adding campaign: ", error);
      alert("Failed to create campaign. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-base-100 rounded-xl shadow-xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Create a Campaign
        </h2>
        <p className="text-base-content/70">
          Share your story and start making a difference in the world
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Campaign Details */}
        <div className="bg-base-200/50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-primary flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Campaign Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label" htmlFor="title">
                <span className="label-text font-semibold flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                  </svg>
                  Campaign Title *
                </span>
              </label>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="Enter an engaging title for your campaign"
                className={`input input-bordered w-full focus:input-primary ${errors.title ? 'input-error' : ''}`}
                value={formData.title}
                onChange={handleInputChange}
              />
              {errors.title && <span className="text-error text-sm mt-1">{errors.title}</span>}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="category">
                <span className="label-text font-semibold flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                  </svg>
                  Category *
                </span>
              </label>
              <select
                id="category"
                name="category"
                className="select select-bordered w-full focus:select-primary"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="Health">🏥 Health</option>
                <option value="Education">📚 Education</option>
                <option value="Technology">💻 Technology</option>
                <option value="Environment">🌱 Environment</option>
                <option value="Community">🤝 Community</option>
                <option value="Arts">🎨 Arts & Culture</option>
              </select>
            </div>
          </div>

          <div className="form-control mt-6">
            <label className="label" htmlFor="description">
              <span className="label-text font-semibold flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"/>
                </svg>
                Description *
              </span>
            </label>
            <textarea
              id="description"
              name="description"
              className={`textarea textarea-bordered w-full focus:textarea-primary h-32 ${errors.description ? 'textarea-error' : ''}`}
              placeholder="Tell your story and explain why people should support your campaign..."
              value={formData.description}
              onChange={handleInputChange}
            />
            {errors.description && <span className="text-error text-sm mt-1">{errors.description}</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="form-control">
              <label className="label" htmlFor="targetAmount">
                <span className="label-text font-semibold flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                  </svg>
                  Target Amount (₹) *
                </span>
              </label>
              <input
                id="targetAmount"
                type="number"
                name="targetAmount"
                placeholder="50000"
                className={`input input-bordered w-full focus:input-primary ${errors.targetAmount ? 'input-error' : ''}`}
                value={formData.targetAmount}
                onChange={handleInputChange}
                min="1"
              />
              {errors.targetAmount && <span className="text-error text-sm mt-1">{errors.targetAmount}</span>}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="image">
                <span className="label-text font-semibold flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  Campaign Image *
                </span>
              </label>
              <input
                id="image"
                type="file"
                className={`file-input file-input-bordered w-full focus:file-input-primary ${errors.image ? 'file-input-error' : ''}`}
                accept="image/*"
                onChange={handleImageUpload}
              />
              {errors.image && <span className="text-error text-sm mt-1">{errors.image}</span>}
              {imagePreview && (
                <div className="mt-2">
                  <img src={imagePreview} alt="Preview" className="w-full max-h-48 object-cover rounded-lg shadow-md" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Banking Details Section */}
        <div className="bg-base-200/50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-secondary flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
            </svg>
            Banking Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label" htmlFor="accountName">
                <span className="label-text font-semibold">Account Holder Name *</span>
              </label>
              <input
                id="accountName"
                type="text"
                name="accountName"
                placeholder="John Doe"
                className={`input input-bordered w-full focus:input-primary ${errors.accountName ? 'input-error' : ''}`}
                value={formData.accountName}
                onChange={handleInputChange}
              />
              {errors.accountName && <span className="text-error text-sm mt-1">{errors.accountName}</span>}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="accountNumber">
                <span className="label-text font-semibold">Bank Account Number *</span>
              </label>
              <input
                id="accountNumber"
                type="text"
                name="accountNumber"
                placeholder="1234567890"
                className={`input input-bordered w-full focus:input-primary ${errors.accountNumber ? 'input-error' : ''}`}
                value={formData.accountNumber}
                onChange={handleInputChange}
              />
              {errors.accountNumber && <span className="text-error text-sm mt-1">{errors.accountNumber}</span>}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="ifscCode">
                <span className="label-text font-semibold">IFSC Code *</span>
              </label>
              <input
                id="ifscCode"
                type="text"
                name="ifscCode"
                placeholder="SBIN0001234"
                className={`input input-bordered w-full focus:input-primary ${errors.ifscCode ? 'input-error' : ''}`}
                value={formData.ifscCode}
                onChange={handleInputChange}
              />
              {errors.ifscCode && <span className="text-error text-sm mt-1">{errors.ifscCode}</span>}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="upiId">
                <span className="label-text font-semibold">UPI ID (Optional)</span>
              </label>
              <input
                id="upiId"
                type="text"
                name="upiId"
                placeholder="john@paytm"
                className="input input-bordered w-full focus:input-primary"
                value={formData.upiId}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* GPay QR Code Upload */}
          <div className="form-control mt-6">
            <label className="label" htmlFor="gpayQr">
              <span className="label-text font-semibold flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M12 15h4.01M12 21h4.01M12 18h4.01M12 9h4.01M12 6h4.01M6 3h2.01M6 6h2.01M6 9h2.01M6 12h2.01M6 15h2.01M6 18h2.01M6 21h2.01"/>
                </svg>
                Upload GPay QR Code (Optional)
              </span>
            </label>
            <input
              id="gpayQr"
              type="file"
              className={`file-input file-input-bordered w-full focus:file-input-primary ${errors.gpayQr ? 'file-input-error' : ''}`}
              accept="image/*"
              onChange={handleQrUpload}
            />
            {errors.gpayQr && <span className="text-error text-sm mt-1">{errors.gpayQr}</span>}
            {qrPreview && (
              <div className="mt-2">
                <img src={qrPreview} alt="QR Preview" className="w-32 h-32 object-contain rounded-lg shadow-md border" />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary btn-lg hover:scale-105 transition-all duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                Create Campaign
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
