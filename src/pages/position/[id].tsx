import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getPosition } from '../../lib/api';

interface Client {
  id: number;
  name: string;
  logo: string;
}

interface Position {
  id: number;
  client: Client;
  title: string;
  description: string;
  status: string;
  salary: number;
  location: string;
  benefits: string;
  work_mode: string;
  hiring_number: number;
  created_at: string;
}

const PositionDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [position, setPosition] = useState<Position | null>(null);

  useEffect(() => {
    if (id) {
      getPosition(Number(id))
        .then((response) => setPosition(response.data))
        .catch((error) => console.error('Error fetching position:', error));
    }
  }, [id]);

  if (!position) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Card Header */}
        <div className="flex items-center bg-gray-100 p-6">
          <img
            src={position.client.logo}
            alt={position.client.name}
            className="w-16 h-16 object-contain mr-4"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{position.title}</h1>
            <p className="text-gray-500">{position.client.name}</p>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 font-semibold">Status</p>
              <p
                className={`text-sm px-3 py-1 rounded-full font-medium w-fit ${
                  position.status === 'open'
                    ? 'bg-green-100 text-green-800'
                    : position.status === 'closed'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {position.status}
              </p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Salary</p>
              <p>${position.salary.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Work Mode</p>
              <p>{position.work_mode}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Location</p>
              <p>{position.location}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Hiring Number</p>
              <p>{position.hiring_number}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Created At</p>
              <p>{new Date(position.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          <div>
            <p className="text-gray-600 font-semibold">Benefits</p>
            <p>{position.benefits}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Description</p>
            <p>{position.description}</p>
          </div>
        </div>

        {/* Card Footer */}
        <div className="flex justify-between bg-gray-100 p-4">
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Home
          </button>
          <button
            onClick={() => router.push(`/edit/${position.id}`)}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-600"
          >
            Edit Position
          </button>
        </div>
      </div>
    </div>
  );
};

export default PositionDetail;
