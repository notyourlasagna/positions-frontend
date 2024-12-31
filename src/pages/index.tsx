import React from 'react';
import PositionList from '../components/PositionList';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
    <div className="flex flex-col items-start mb-6">
        <h1 className="text-4xl font-extrabold text-black mb-2">Job Positions</h1>
        <p className="text-gray-600">Manage and review all of your positions efficiently.</p>
    </div>

    <PositionList />
    </div>
  );
};

export default Home;
