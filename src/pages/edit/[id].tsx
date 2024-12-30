import React, { useEffect, useState } from 'react';
import PositionForm from '../../components/PositionForm';
import { getPosition, updatePosition, deletePosition } from '../../lib/api';
import { useRouter } from 'next/router';

const EditPosition: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [initialValues, setInitialValues] = useState<any>(null);

  useEffect(() => {
    if (id) {
      getPosition(Number(id))
        .then((response) => setInitialValues(response.data))
        .catch((error) => console.error('Error fetching position:', error));
    }
  }, [id]);

  const handleUpdate = async (data: any) => {
    try {
      await updatePosition(Number(id), data);
      alert('Position updated successfully!');
      router.push('/');
    } catch (error) {
      console.error('Error updating position:', error);
      alert('Failed to update position');
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this position?')) {
      try {
        await deletePosition(Number(id));
        alert('Position deleted successfully!');
        router.push('/');
      } catch (error) {
        console.error('Error deleting position:', error);
        alert('Failed to delete position');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Edit Position</h1>
      {initialValues ? (
        <>
          <PositionForm onSubmit={handleUpdate} initialValues={initialValues} />
          {/* Buttons */}
          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Home
            </button>
            <button
              onClick={handleDelete}
              className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete Position
            </button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditPosition;
