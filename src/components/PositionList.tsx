import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPositions, deletePosition } from '../lib/api';
import { FiEdit, FiEye, FiTrash2, FiMapPin, FiUsers, FiSearch } from 'react-icons/fi';

interface Client {
  id: number;
  name: string;
  logo: string;
}

interface Position {
  id: number;
  client: Client;
  title: string;
  hiring_number: number;
  work_mode: string;
  location: string;
  status: string;
}

const PositionList: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [filteredPositions, setFilteredPositions] = useState<Position[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
    getPositions()
      .then((response) => {
        setPositions(response.data);
        setFilteredPositions(response.data);
      })
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterPositions(query, statusFilter);
  };

  const handleStatusFilter = (status: string | null) => {
    setStatusFilter(status);
    filterPositions(searchQuery, status);
  };

  const filterPositions = (query: string, status: string | null) => {
    let filtered = positions;

    if (query) {
      filtered = filtered.filter((position) =>
        position.title.toLowerCase().includes(query)
      );
    }

    if (status) {
      filtered = filtered.filter((position) => position.status === status);
    }

    setFilteredPositions(filtered);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        {/* Filters */}
        <div className="flex items-center space-x-4">
        <div className="relative">
  <input
    type="text"
    placeholder="Search by title..."
    value={searchQuery}
    onChange={handleSearch}
    className="pl-10 pr-4 py-2 border rounded-lg w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
  />
  <FiSearch
    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
    size={20}
  />
</div>


          {/* Status Filter */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleStatusFilter(null)}
              className={`px-4 py-2 rounded-lg shadow-sm transition ${
                !statusFilter
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              <FiEye className="inline-block mr-2" /> All
            </button>
            <button
              onClick={() => handleStatusFilter('Open')}
              className={`px-4 py-2 rounded-lg shadow-sm transition ${
                statusFilter === 'Open'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Open
            </button>
            <button
              onClick={() => handleStatusFilter('Paused')}
              className={`px-4 py-2 rounded-lg shadow-sm transition ${
                statusFilter === 'Paused'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Paused
            </button>
            <button
              onClick={() => handleStatusFilter('Closed')}
              className={`px-4 py-2 rounded-lg shadow-sm transition ${
                statusFilter === 'Closed'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Closed
            </button>
          </div>
        </div>

        {/* Create Button */}
        <Link href="/create">
          <button className="px-6 py-2 bg-primary text-white rounded hover:bg-primary-600">
            Create New Position
          </button>
        </Link>
      </div>

      {/* Positions Table */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 text-gray-600 text-sm uppercase font-bold">
            <tr>
              <th className="px-6 py-3 text-left">Client</th>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-center">Hiring Number</th>
              <th className="px-6 py-3 text-center">Work Mode</th>
              <th className="px-6 py-3 text-left">Location</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm divide-y divide-gray-200">
  {filteredPositions.map((position) => (
    <tr
      key={position.id}
      className="hover:bg-gray-50 cursor-pointer transition-all duration-200"
      onClick={() => window.location.href = `/position/${position.id}`}
    >
      <td className="px-6 py-4">
        <img
          src={position.client.logo}
          alt={position.client.name}
          className="w-12 h-12 object-contain"
        />
      </td>
      <td className="px-6 py-4">{position.title}</td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-center space-x-2">
          <FiUsers className="text-gray-500" size={20} />
          <span>{position.hiring_number}</span>
        </div>
      </td>
      <td className="px-6 py-4 capitalize text-center">{position.work_mode}</td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          <FiMapPin className="text-gray-500" size={20} />
          <span>{position.location}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            position.status === 'Open'
              ? 'bg-green-100 text-green-800'
              : position.status === 'Closed'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {position.status}
        </span>
      </td>
      <td className="px-6 py-4 text-center">
        <div
          className="flex justify-center space-x-4"
          onClick={(e) => e.stopPropagation()} // Evita que los clics en los botones activen la navegación de la fila
        >

          {/* Edit */}
          <Link href={`/edit/${position.id}`} className="text-gray-500 hover:text-gray-700">
            <FiEdit size={20} />
          </Link>

          {/* Delete */}
          <button
            onClick={() => handleDelete(position.id)}
            className="text-red-500 hover:text-red-700"
          >
            <FiTrash2 size={20} />
          </button>
        </div>
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
