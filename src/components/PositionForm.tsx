import React, { useState, useEffect } from 'react';

interface PositionFormProps {
  onSubmit: (data: any) => void;
  initialValues?: any;
}

interface Client {
  id: number;
  name: string;
}

const PositionForm: React.FC<PositionFormProps> = ({ onSubmit, initialValues = {} }) => {
  const [formData, setFormData] = useState({
    client_id: initialValues.client_id || '',
    title: initialValues.title || '',
    description: initialValues.description || '',
    hiring_number: initialValues.hiring_number || 1,
    work_mode: initialValues.work_mode || 'On-Site',
    location: initialValues.location || '',
    salary: initialValues.salary || '',
    benefits: initialValues.benefits || '',
    status: initialValues.status || 'Open',
  });

  const [clients, setClients] = useState<Client[]>([]); // State to store clients
  const [loading, setLoading] = useState(true); // Loading state for the dropdown

  // Fetch clients on component mount
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('http://localhost:3000/clients'); // URL completa
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchClients();
  }, []);  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Card Header */}
        <div className="bg-gray-100 p-6">
          <h1 className="text-2xl font-bold text-gray-800">Position Form</h1>
          <p className="text-gray-500">Fill in the details to create or update a position.</p>
        </div>

        {/* Card Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Client Dropdown */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">Client</label>
              {loading ? (
                <p className="text-gray-500">Loading clients...</p>
              ) : (
                <select
                  name="client_id"
                  value={formData.client_id}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                >
                  <option value="">Select a client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            {/* Hiring Number */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">Hiring Number</label>
              <input
                type="number"
                name="hiring_number"
                value={formData.hiring_number}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                min={1}
                required
              />
            </div>

            {/* Work Mode */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">Work Mode</label>
              <select
                name="work_mode"
                value={formData.work_mode}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              >
                <option value="On-Site">On-Site</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            {/* Salary */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">Salary</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          </div>

          {/* Benefits */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">Benefits</label>
            <textarea
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              rows={3}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              rows={3}
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
              <option value="Paused">Paused</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded hover:bg-primary-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PositionForm;
