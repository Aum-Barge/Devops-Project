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
      <Navbar />
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
    </Router>
  );
}
