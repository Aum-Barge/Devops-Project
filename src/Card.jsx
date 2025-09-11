import { useState } from "react";

const Card = () => {
  const goalAmount = 1000; // Set goal amount in dollars
  const currentAmount = 700; // Current progress in dollars
  const progress = (currentAmount / goalAmount) * 100; // Calculate percentage

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[60%] h-auto bg-white shadow-lg p-8 flex items-center space-x-8 rounded-lg">
        {/* Image Section */}
        <img 
          src="https://via.placeholder.com/350" 
          alt="Movie Poster" 
          className="w-72 h-72 object-cover"
        />

        {/* Content Section */}
        <div className="flex flex-col justify-center w-full">
          <h2 className="text-3xl font-bold">Lorem Ipsum</h2>
          <p className="text-gray-600 mt-2">
            Lorem ipsum odor amet, consectetuer adipiscing elit. Montes primis elit ullamcorper purus viverra. Taciti eros congue porttitor lacinia; nam tortor nam turpis. Efficitur penatibus inceptos neque consectetur natoque duis. Suspendisse sapien porta pellentesque euismod praesent. Tempus lorem inceptos; maecenas varius nostra phasellus. Imperdiet nisl sodales varius urna dis placerat. Potenti nec magna porta senectus eget; rutrum arcu. Id taciti nisi maximus sagittis elit arcu amet.
          </p>

          {/* Dollar Amount Above Progress Bar */}
          <p className="text-lg font-semibold text-gray-700 mt-4">
            ${currentAmount} raised out of ${goalAmount}
          </p>

          {/* Progress Bar */}
          <progress 
            className="progress progress-secondary w-full my-2" 
            value={progress} 
            max="100"
          ></progress>

          {/* Percentage Below Progress Bar */}
          <p className="text-sm text-gray-500">{progress.toFixed(2)}% funded</p>

          {/* Donate Button */}
          <button className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 mt-4">
            Donate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
