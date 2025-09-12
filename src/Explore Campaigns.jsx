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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Explore Campaigns</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map(campaign => (
          <div key={campaign.id} className="card bg-base-100 shadow-md p-4">
            <img src={campaign.image} alt={campaign.title} className="w-full h-48 object-cover rounded-lg mb-2"/>
            <h2 className="text-lg font-semibold">{campaign.title}</h2>
            <p className="text-sm text-gray-600">{campaign.description}</p>
            <p className="text-sm font-bold mt-2">Target: ₹{campaign.targetAmount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreCampaigns;
