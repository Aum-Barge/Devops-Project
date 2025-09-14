import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "./firebase";

const Card = () => {
  const [featuredCampaigns, setFeaturedCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCampaigns = async () => {
      try {
        const q = query(collection(db, "campaigns"), orderBy("createdAt", "desc"), limit(3));
        const querySnapshot = await getDocs(q);
        const campaigns = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFeaturedCampaigns(campaigns);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCampaigns();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 px-4">
        <div className="container mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow">
            Make a Difference
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Join thousands of supporters helping bring dreams to life. Every contribution counts towards creating positive change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/explore" className="btn btn-secondary btn-lg hover:scale-105 transition-transform">
              Explore Campaigns
            </Link>
            <Link to="/create-campaign" className="btn btn-outline btn-lg hover:bg-white hover:text-primary transition-all">
              Start Your Campaign
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-slide-up">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-lg text-base-content/70">Campaigns Funded</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold text-secondary mb-2">₹2M+</div>
              <div className="text-lg text-base-content/70">Funds Raised</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-accent mb-2">10K+</div>
              <div className="text-lg text-base-content/70">Supporters</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">Featured Campaigns</h2>

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

          {!loading && featuredCampaigns.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCampaigns.map((campaign, index) => (
                <div
                  key={campaign.id}
                  className="card bg-base-100 shadow-xl hover:shadow-2xl border border-base-300 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <figure className="px-6 pt-6">
                    <img
                      src={campaign.image || "https://via.placeholder.com/400x250"}
                      alt={campaign.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title text-xl font-bold text-primary">{campaign.title}</h3>
                    <p className="text-base-content/70 line-clamp-3">{campaign.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="badge badge-secondary">{campaign.category}</span>
                      <span className="text-lg font-bold text-secondary">₹{campaign.targetAmount}</span>
                    </div>
                    <div className="card-actions justify-end mt-4">
                      <Link
                        to={`/donate/${campaign.id}`}
                        className="btn btn-primary btn-sm hover:btn-primary-focus"
                      >
                        Donate Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && featuredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-base-content/70 mb-4">No campaigns yet</h3>
              <p className="text-base-content/50 mb-6">Be the first to create a campaign and make a difference!</p>
              <Link to="/create-campaign" className="btn btn-primary btn-lg">
                Create First Campaign
              </Link>
            </div>
          )}

          {featuredCampaigns.length > 0 && (
            <div className="text-center mt-12">
              <Link to="/explore" className="btn btn-outline btn-lg hover:btn-primary transition-all">
                View All Campaigns
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Make an Impact?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Whether you're looking to support a cause or start your own campaign, we're here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/explore" className="btn bg-white text-primary hover:bg-gray-100 btn-lg">
              Browse Campaigns
            </Link>
            <Link to="/create-campaign" className="btn btn-outline btn-lg border-white text-white hover:bg-white hover:text-primary">
              Start Campaign
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Card;
