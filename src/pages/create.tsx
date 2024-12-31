import React, { useState } from 'react';
import PositionForm from '../components/PositionForm';
import { createPosition } from '../lib/api';

const CreatePosition: React.FC = () => {
  const [errors, setErrors] = useState<string[]>([]);

  const handleCreate = async (data: any) => {
    try {
      setErrors([]);
      await createPosition(data);
      alert('Position created successfully!');
      window.location.href = '/';
    } catch (error: any) {
      console.error('Error creating position:', error);
      alert('Position was not created, please check the values of the form.');
      if (error.response.status === 422) {
        const validationErrors = error.response.data.errors || ['Failed to create position'];
        setErrors(validationErrors);
      } else {
        alert('Failed to create position');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Position</h1>
      {errors.length > 0 && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          <ul>
            {errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </div>
      )}
      <PositionForm onSubmit={handleCreate} />
    </div>
  );
};

export default CreatePosition;
