import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const ExploreCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "campaigns"));
        const campaignsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCampaigns(campaignsData);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const filteredCampaigns = filter === "All" ? campaigns : campaigns.filter(campaign => campaign.category === filter);
  const categories = ["All", ...new Set(campaigns.map(campaign => campaign.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Explore Campaigns
        </h1>
        <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
          Discover amazing causes and support projects that matter to you. Every contribution makes a difference.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`btn ${
              filter === category
                ? 'btn-primary'
                : 'btn-outline btn-primary hover:btn-primary'
            } transition-all duration-200`}
          >
            {category}
          </button>
        ))}
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div className="card bg-base-200 shadow-xl animate-pulse">
            <div className="card-body">
              <div className="h-48 bg-base-300 rounded-lg mb-4"></div>
              <div className="h-6 bg-base-300 rounded mb-2"></div>
              <div className="h-4 bg-base-300 rounded mb-4"></div>
              <div className="h-10 bg-base-300 rounded"></div>
            </div>
          </div>
          <div className="card bg-base-200 shadow-xl animate-pulse">
            <div className="card-body">
              <div className="h-48 bg-base-300 rounded-lg mb-4"></div>
              <div className="h-6 bg-base-300 rounded mb-2"></div>
              <div className="h-4 bg-base-300 rounded mb-4"></div>
              <div className="h-10 bg-base-300 rounded"></div>
            </div>
          </div>
          <div className="card bg-base-200 shadow-xl animate-pulse">
            <div className="card-body">
              <div className="h-48 bg-base-300 rounded-lg mb-4"></div>
              <div className="h-6 bg-base-300 rounded mb-2"></div>
              <div className="h-4 bg-base-300 rounded mb-4"></div>
              <div className="h-10 bg-base-300 rounded"></div>
            </div>
          </div>
          <div className="card bg-base-200 shadow-xl animate-pulse">
            <div className="card-body">
              <div className="h-48 bg-base-300 rounded-lg mb-4"></div>
              <div className="h-6 bg-base-300 rounded mb-2"></div>
              <div className="h-4 bg-base-300 rounded mb-4"></div>
              <div className="h-10 bg-base-300 rounded"></div>
            </div>
          </div>
        </div>
      )}

      {!loading && filteredCampaigns.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl border border-base-300 group animate-fade-in"
            >
              <figure className="px-6 pt-6">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={campaign.image || "https://via.placeholder.com/400x250"}
                    alt={campaign.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="badge badge-secondary shadow-lg">
                      {campaign.category}
                    </span>
                  </div>
                </div>
              </figure>
              <div className="card-body p-6">
                <h2 className="card-title text-xl font-bold text-primary group-hover:text-primary-focus transition-colors line-clamp-2">
                  {campaign.title}
                </h2>
                <p className="text-base-content/70 line-clamp-3 text-sm leading-relaxed">
                  {campaign.description}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-base-content/50">Target</span>
                    <span className="text-lg font-bold text-secondary">₹{campaign.targetAmount}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                    <span className="text-sm text-base-content/60">Active</span>
                  </div>
                </div>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary btn-sm hover:btn-primary-focus hover:scale-105 transition-all duration-200 w-full">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                    Support Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredCampaigns.length === 0 && (
        <div className="text-center py-16">
          <div className="text-8xl mb-6">🔍</div>
          <h3 className="text-3xl font-bold text-base-content/70 mb-4">
            {filter === "All" ? "No campaigns found" : `No ${filter} campaigns`}
          </h3>
          <p className="text-base-content/50 mb-8 max-w-md mx-auto">
            {filter === "All"
              ? "Be the first to create an amazing campaign!"
              : `No campaigns in the ${filter} category yet. Check back later or explore other categories.`
            }
          </p>
          {filter !== "All" && (
            <button
              onClick={() => setFilter("All")}
              className="btn btn-primary btn-lg mr-4"
            >
              View All Campaigns
            </button>
          )}
          <button className="btn btn-outline btn-primary btn-lg">
            Create Campaign
          </button>
        </div>
      )}
    </div>
  );
};

export default ExploreCampaigns;
