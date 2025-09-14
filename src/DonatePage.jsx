import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

const DonatePage = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        setError(null);
        const docRef = doc(db, "campaigns", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCampaign(docSnap.data());
        } else {
          setError("Campaign not found");
        }
      } catch (error) {
        console.error("Error fetching campaign:", error);
        setError("Failed to load campaign");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  const handleDonation = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid donation amount");
      return;
    }
    setShowQR(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-base-content/70">Loading campaign...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-base-content mb-4">Oops!</h2>
          <p className="text-base-content/70 mb-6">{error}</p>
          <Link to="/explore" className="btn btn-primary">
            Back to Campaigns
          </Link>
        </div>
      </div>
    );
  }

  if (!campaign) return null;

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <Link to="/explore" className="btn btn-ghost text-white hover:bg-white/10 mb-4">
            ← Back to Campaigns
          </Link>
          <h1 className="text-4xl font-bold mb-2">{campaign.title}</h1>
          <div className="flex items-center space-x-4">
            <span className="badge badge-secondary">{campaign.category}</span>
            <span className="text-lg">Target: ₹{campaign.targetAmount}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Campaign Details */}
          <div className="space-y-6">
            <div className="card bg-base-100 shadow-xl">
              <figure className="px-6 pt-6">
                <img
                  src={campaign.image || "https://via.placeholder.com/600x400"}
                  alt={campaign.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-2xl text-primary">About This Campaign</h2>
                <p className="text-base-content/80 leading-relaxed">{campaign.description}</p>
              </div>
            </div>
          </div>

          {/* Donation Section */}
          <div className="space-y-6">
            <div className="card bg-base-100 shadow-xl border-2 border-primary/20">
              <div className="card-body">
                <h2 className="card-title text-2xl text-primary mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                  Make a Donation
                </h2>

                <div className="form-control">
                  <label className="label" htmlFor="donation-amount">
                    <span className="label-text font-semibold">Donation Amount (₹)</span>
                  </label>
                  <input
                    id="donation-amount"
                    type="number"
                    placeholder="Enter amount"
                    className="input input-bordered input-primary w-full text-lg py-3"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                  />
                </div>

                <button
                  onClick={handleDonation}
                  disabled={!amount || parseFloat(amount) <= 0}
                  className="btn btn-primary btn-lg w-full mt-6 hover:scale-105 transition-all duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Donate Now
                </button>

                {amount && (
                  <div className="mt-4 p-4 bg-success/10 border border-success/20 rounded-lg">
                    <p className="text-success font-semibold">
                      You're about to donate ₹{amount} to {campaign.title}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* QR Code Section */}
            {showQR && (
              <div className="card bg-base-100 shadow-xl border-2 border-accent/20 animate-slide-up">
                <div className="card-body text-center">
                  <h3 className="card-title text-xl text-accent justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M12 15h4.01M12 21h4.01M12 18h4.01M12 9h4.01M12 6h4.01M6 3h2.01M6 6h2.01M6 9h2.01M6 12h2.01M6 15h2.01M6 18h2.01M6 21h2.01"/>
                    </svg>
                    Complete Your Donation
                  </h3>

                  {campaign.gpayQr ? (
                    <div className="space-y-4">
                      <p className="text-base-content/70">
                        Scan the QR code below with your UPI app to complete the donation of ₹{amount}
                      </p>
                      <div className="bg-white p-4 rounded-lg inline-block">
                        <img
                          src={campaign.gpayQr}
                          alt="GPay QR Code"
                          className="w-48 h-48 object-contain"
                        />
                      </div>
                      <div className="text-sm text-base-content/60 space-y-1">
                        <p>Or use these details:</p>
                        <p><strong>UPI ID:</strong> {campaign.upiId || 'Not provided'}</p>
                        <p><strong>Account:</strong> {campaign.accountName || 'Not provided'}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-6xl">💳</div>
                      <h4 className="text-lg font-semibold">Bank Transfer Details</h4>
                      <div className="bg-base-200 p-4 rounded-lg text-left space-y-2">
                        <p><strong>Account Name:</strong> {campaign.accountName || 'Not provided'}</p>
                        <p><strong>Account Number:</strong> {campaign.accountNumber || 'Not provided'}</p>
                        <p><strong>IFSC Code:</strong> {campaign.ifscCode || 'Not provided'}</p>
                        <p><strong>UPI ID:</strong> {campaign.upiId || 'Not provided'}</p>
                      </div>
                      <p className="text-sm text-base-content/60">
                        Please mention "Donation to {campaign.title}" in the transfer description
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => setShowQR(false)}
                    className="btn btn-outline btn-accent mt-4"
                  >
                    Back to Donation Form
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;

