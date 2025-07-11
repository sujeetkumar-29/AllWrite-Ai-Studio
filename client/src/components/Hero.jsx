import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white dark:bg-gray-900 min-h-[100vh] flex items-center mx-10 px-10">
      <div className="container mx-auto px-6 py-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
            AI-Powered Content Creation <br />
            <span className="text-blue-600">Made Effortless</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
            Generate blogs, product descriptions, social media content, and more in seconds using our advanced AI tools.
          </p>
          <div className="flex justify-center lg:justify-start gap-4">
            <button onClick={() => navigate("/ai")} className="bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-blue-700 transition">
              Get Started
            </button>
            <button className="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Image or Illustration */}
        <div className="flex-1">
          <img
            src={assets.ai_image}
            alt="AI Illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
