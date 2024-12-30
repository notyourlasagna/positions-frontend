import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-gray-800">ATS Dashboard</h1>
        </div>
      </header>
      <main className="container mx-auto py-6">{children}</main>
    </div>
  );
};

export default Layout;
