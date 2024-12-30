import React from 'react';
import PositionForm from '../components/PositionForm';
import { createPosition } from '../lib/api';

const CreatePosition: React.FC = () => {
  const handleCreate = async (data: any) => {
    try {
      await createPosition(data);
      alert('Position created successfully!');
      window.location.href = '/'; // Redirige a la página principal después de crear
    } catch (error) {
      console.error('Error creating position:', error);
      alert('Failed to create position');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Position</h1>
      <PositionForm onSubmit={handleCreate} />
    </div>
  );
};

export default CreatePosition;
