import React from 'react';
import PositionList from '../components/PositionList';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
    <div className="flex justify-between items-center mb-6">
    <h1 className="text-4xl font-extrabold text-primary mb-6">Job Positions</h1>

    </div>
    <PositionList />
    </div>
  );
};

export default Home;
