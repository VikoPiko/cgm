import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      {/* Navbar */}
      <header className="w-full bg-indigoDye text-white py-2 ">
        <nav className="mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Left Side */}
          <div className="flex space-x-4 text-lg">
            <Link href="/" className="hover:underline font-medium">
              Personal
            </Link>
            <Link href="#" className="hover:underline">
              Business
            </Link>
          </div>
          {/* Center */}
          <div className="text-3xl font-bold">CGM</div>
          {/* Right Side */}
          <div className="flex space-x-4 text-md text-gray-200">
            <Link
              href="/"
              className="hover:underline decoration-gray-400 duration-700 transition ease-in-out"
            >
              Support
            </Link>
            <Link href="/" className="hover:underline decoration-gray-400">
              About Us
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="w-full bg-gray-100 py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center space-y-0 md:space-y-0 md:space-x-10">
          {/* Image/Banner */}
          <div className="w-full md:w-1/1">
            <img
              src="/hero-temp.jpg"
              alt="Hero"
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>
          {/* Text + Buttons */}
          <div className="w-full md:w-1/2 text-center md:text-center ">
            <h1 className="text-5xl md:text-6xl font-bold mb-2 relative tracking-tighter text-pennBlue">
              CGM <span className="text-6xl relative top-[-5px]">|</span>{" "}
              <span className="text-cerulian ">Connect.</span>
              <span className="text-indigoDye"> Grow.</span>
              <span className="text-pennBlue"> Manage.</span>
            </h1>
            <p className="text-gray-700 text-xl font-bold">
              Centralize all of your banking needs in one place.
            </p>
            <div className="flex justify-center md:justify-center space-x-4 mt-8">
              <div>
                <Link href="/sign-up">
                  <span className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition-all ease-in-out transform hover:scale-105 shadow-lg inline-block">
                    Sign Up
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Login Box */}
          <div className="flex justify-center md:justify-end w-full mt-8">
            <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
              <form className="space-y-4">
                {/* Username Field */}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-left text-lg font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                    placeholder="Enter your username"
                  />
                </div>
                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-left text-lg font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                    placeholder="Enter your password"
                  />
                </div>
                {/* Login Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 mt-4 rounded-xl hover:bg-blue-600 transition duration-150 ease-in-out  transform hover:scale-105 shadow-lg"
                  >
                    Log In
                  </button>
                </div>
                {/* Forgot Password */}
                <div className="mt-2 text-center">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-500 hover:text-blue-700"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="w-full bg-white py-16 text-left">
        <div className="w-full px-4 sm:px-6 lg:px-8 mb-8">
          <h2 className="text-4xl font-bold underline text-center underline-offset-8 group transition-all duration-700 ease-in-out hover:text-indigoDye mb-6">
            Who we are
          </h2>
          <p className="w-full max-w-3xl mx-auto text-lg text-gray-700">
            <span className="text-xl font-bold text-black">Our Goal</span>
            <br />
            Our main goal is to make banking as simple and convenient as
            possible for you. We believe a centralized system such as this one
            would be very convenient for some people.
          </p>
        </div>
      </section>

      {/* Card Section (Template) */}
      <section className="w-full bg-white py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Features</h2>
        </div>
        <div className="w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-4 border rounded shadow">
            <h3 className="font-bold mb-2">Feature 1</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="p-4 border rounded shadow">
            <h3 className="font-bold mb-2">Feature 2</h3>
            <p>Nulla facilisi. Integer consequat turpis sed libero bibendum.</p>
          </div>
          <div className="p-4 border rounded shadow">
            <h3 className="font-bold mb-2">Feature 3</h3>
            <p>Ut non metus velit. Mauris feugiat tortor at eros cursus.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
