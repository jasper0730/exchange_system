"use client";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";

export default function Navbar({ onMenuToggle }) {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-gray-900 flex items-center justify-between px-6 shadow-md xl:hidden z-10">
      <div className="text-xl font-bold text-white select-none">Logo</div>
      <button
        onClick={onMenuToggle}
        className="p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 cursor-pointer"
      >
        <FiMenu className="text-2xl text-white" />
      </button>
    </nav>
  );
}
