import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SignIn, SignUp, useUser } from "@clerk/clerk-react";
import Card from "./Card";
import Navbar from "./Navbar";
import CreateCampaign from "./CreateCampaign";
import ExploreCampaigns from "./ExploreCampaigns";
import DonatePage from "./DonatePage";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useUser();
  return isSignedIn ? children : <Navigate to="/sign-in" />;
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Card />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route
              path="/create-campaign"
              element={
                <ProtectedRoute>
                  <CreateCampaign />
                </ProtectedRoute>
              }
            />
            <Route path="/explore" element={<ExploreCampaigns />} />
            <Route path="/donate/:id" element={<DonatePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
