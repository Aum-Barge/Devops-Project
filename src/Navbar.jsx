import React from "react";
import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-md border-b border-base-300 sticky top-0 z-50 shadow-lg">
      {/* Left Section */}
      <div className="navbar-start">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost lg:hidden hover:bg-base-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl border border-base-300">
            <li><Link to="/explore" className="text-base-content hover:bg-base-200 rounded-lg">Explore</Link></li>
            <li><Link to="/about" className="text-base-content hover:bg-base-200 rounded-lg">About</Link></li>
            {isSignedIn && <li><Link to="/create-campaign" className="text-base-content hover:bg-base-200 rounded-lg">Create Campaign</Link></li>}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl font-bold hover:bg-base-200 transition-all duration-200">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z"/>
            </svg>
          </div>
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Crowdfund
          </span>
        </Link>
      </div>

      {/* Center Section */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <Link to="/explore" className="text-base-content hover:text-primary hover:bg-base-200 rounded-lg px-4 py-2 transition-all duration-200 font-medium">
              Explore
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-base-content hover:text-primary hover:bg-base-200 rounded-lg px-4 py-2 transition-all duration-200 font-medium">
              About
            </Link>
          </li>
          {isSignedIn && (
            <li>
              <Link to="/create-campaign" className="text-base-content hover:text-primary hover:bg-base-200 rounded-lg px-4 py-2 transition-all duration-200 font-medium">
                Create Campaign
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Right Section */}
      <div className="navbar-end space-x-2">
        {!isSignedIn ? (
          <SignInButton>
            <button className="btn btn-primary hover:btn-primary-focus hover:scale-105 transition-all duration-200">
              Sign In
            </button>
          </SignInButton>
        ) : (
          <>
            <Link to="/create-campaign" className="btn btn-secondary hidden sm:inline-flex hover:scale-105 transition-all duration-200">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Create Campaign
            </Link>
            <SignOutButton>
              <button className="btn btn-ghost hover:bg-error hover:text-error-content transition-all duration-200">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                Sign Out
              </button>
            </SignOutButton>
          </>
        )}
      </div>
    </div>
  );
}
