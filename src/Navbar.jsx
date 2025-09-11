import React from "react";
import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      {/* Left Section */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><Link to="/explore">Explore</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl font-bold">Crowdfund</Link>
      </div>

      {/* Center Section */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/explore" className="hover:text-primary">Explore</Link></li>
          <li><Link to="/about" className="hover:text-primary">About</Link></li>
          {isSignedIn && <li><Link to="/create-campaign" className="hover:text-primary">Create Campaign</Link></li>}
        </ul>
      </div>

      {/* Right Section */}
      <div className="navbar-end space-x-2">
        {!isSignedIn ? (
          <SignInButton>
            <button className="btn btn-secondary">Log in</button>
          </SignInButton>
        ) : (
          <>
            <Link to="/create-campaign" className="btn btn-primary">Create Campaign</Link>
            <SignOutButton>
              <button className="btn btn-error">Sign Out</button>
            </SignOutButton>
          </>
        )}
      </div>
    </div>
  );
}
