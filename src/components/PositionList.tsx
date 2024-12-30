import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPositions, deletePosition } from '../lib/api';

interface Position {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
}

const PositionList: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    getPositions()
      .then((response) => setPositions(response.data))
      .catch((error) => console.error('Error fetching positions:', error));
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this position?')) {
      try {
        await deletePosition(id);
        alert('Position deleted successfully!');
        setPositions((prevPositions) =>
          prevPositions.filter((position) => position.id !== id)
        );
      } catch (error) {
        console.error('Error deleting position:', error);
        alert('Failed to delete position');
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Job Positions</h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 text-gray-600 text-sm uppercase font-bold">
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Created At</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm divide-y divide-gray-200">
            {positions.map((position) => (
              <tr key={position.id} className="hover:bg-gray-100">
                <td className="px-6 py-4">{position.title}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      position.status === 'open'
                        ? 'bg-green-100 text-green-800'
                        : position.status === 'closed'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {position.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {new Date(position.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/edit/${position.id}`}
                    className="text-blue-500 hover:text-blue-700 font-semibold mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(position.id)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PositionList;
