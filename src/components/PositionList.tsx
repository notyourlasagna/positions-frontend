import React, { useEffect, useState } from 'react';
import { getPositions, deletePosition } from '../lib/api';
import { FiSearch, FiChevronLeft, FiChevronRight, FiUsers, FiMapPin, FiTrash2, FiPlus } from 'react-icons/fi';
import Link from 'next/link';


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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const fetchPositions = async (page = 1, query = '', status: string | null = null) => {
    try {
      const params: any = { page };
      if (query) params.search = query;
      if (status) params.status = status;

      const response = await getPositions(params);
      const data = response.data;
      setPositions(data.positions);
      setTotalPages(data.total_pages);
      setCurrentPage(data.current_page);
    } catch (error) {
      console.error('Error fetching positions:', error);
    }
  };

  useEffect(() => {
    fetchPositions(currentPage, searchQuery, statusFilter);
  }, [currentPage, searchQuery, statusFilter]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page
  };

  const handleStatusFilter = (status: string | null) => {
    setStatusFilter(status);
    setCurrentPage(1); // Reset to first page
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this position?')) {
      try {
        await deletePosition(id);
        alert('Position deleted successfully!');
        fetchPositions(currentPage, searchQuery, statusFilter); // Refetch after deletion
      } catch (error) {
        console.error('Error deleting position:', error);
        alert('Failed to delete position');
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        {/* Filters */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 border rounded-lg w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleStatusFilter(null)}
              className={`px-4 py-2 rounded-lg shadow-sm ${
                !statusFilter ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleStatusFilter('Open')}
              className={`px-4 py-2 rounded-lg shadow-sm ${
                statusFilter === 'Open' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              Open
            </button>
            <button
              onClick={() => handleStatusFilter('Paused')}
              className={`px-4 py-2 rounded-lg shadow-sm ${
                statusFilter === 'Paused' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              Paused
            </button>
            <button
              onClick={() => handleStatusFilter('Closed')}
              className={`px-4 py-2 rounded-lg shadow-sm ${
                statusFilter === 'Closed' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              Closed
            </button>
          </div>
        </div>

        {/* Create Button */}
        <Link href="/create">
          <button className="px-6 py-2 bg-primary text-white rounded-lg shadow-sm flex items-center space-x-2 hover:bg-primary-600 transition">
            <FiPlus size={20} className="text-white" />
            <span>Create New Position</span>
          </button>
        </Link>
      </div>

      {/* Table */}
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
            {positions.map((position) => (
              <tr
                key={position.id}
                className="hover:bg-gray-50 cursor-pointer transition"
                onClick={() => (window.location.href = `/position/${position.id}`)}
              >
                <td className="px-6 py-4">
                  <img src={position.client.logo} alt={position.client.name} className="w-12 h-12 object-contain" />
                </td>
                <td className="px-6 py-4">{position.title}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <FiUsers className="text-gray-500" size={20} />
                    <span>{position.hiring_number}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">{position.work_mode}</td>
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
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row navigation
                      handleDelete(position.id);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-4 mt-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded-lg"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FiChevronLeft /> Prev
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded-lg"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default PositionList;
