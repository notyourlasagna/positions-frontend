import React, { useState } from 'react';
import Link from 'next/link';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">ATS Dashboard</h1>
          {/* Menu Button */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-600"
            >
              Menu
            </button>
            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg">
                <Link
                  href="/"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/create"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Create Position
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="container mx-auto py-6">{children}</main>
    </div>
  );
};

export default Layout;
