import React, { useEffect, useState } from 'react';
import PositionForm from '../../components/PositionForm';
import { getPosition, updatePosition } from '../../lib/api';
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
      router.push('/'); // Redirige a la página principal después de editar
    } catch (error) {
      console.error('Error updating position:', error);
      alert('Failed to update position');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Position</h1>
      {initialValues ? (
        <PositionForm onSubmit={handleUpdate} initialValues={initialValues} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditPosition;
