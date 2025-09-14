import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // Ensure this is correctly imported

const ExploreCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const querySnapshot = await getDocs(collection(db, "campaigns"));
      const campaignsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCampaigns(campaignsData);
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-primary">Explore Campaigns</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {campaigns.map(campaign => (
          <div key={campaign.id} className="card bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden">
            <figure className="px-4 pt-4">
              <img src={campaign.image} alt={campaign.title} className="w-full h-48 object-cover rounded-lg" />
            </figure>
            <div className="card-body p-6">
              <h2 className="card-title text-xl font-bold text-neutral">{campaign.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-3">{campaign.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="badge badge-secondary">{campaign.category}</span>
                <span className="text-lg font-bold text-secondary">₹{campaign.targetAmount}</span>
              </div>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-primary btn-sm hover:btn-primary-focus transition-all">Donate</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreCampaigns;
