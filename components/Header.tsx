import React from "react";
import { useRouter } from "next/router";
import { FaRocket, FaArrowLeft } from "react-icons/fa";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false }) => {
  const router = useRouter();

  return (
    <header className="w-screen flex items-center justify-between mb-8 bg-black pt-6 pb-16 px-16 -mx-16 relative">
      {showBackButton ? (
        <button
          onClick={() => router.push("/")}
          className="bg-white text-black text-2xl p-2 rounded-md" 
        >
          <FaArrowLeft />
        </button>
      ) : (
        <div className="w-8"></div> // Placeholder for alignment
      )}
      <div className="flex items-center">
        <FaRocket className="text-white mr-2" />
        <h1 className="text-5xl font-semibold">
          <span className="text-sky-500">Todo</span>{" "}
          <span className="text-purple-600">App</span>
        </h1>
      </div>
      <div className="w-8"></div> {/* Placeholder for alignment */}
    </header>
  );
};

export default Header;