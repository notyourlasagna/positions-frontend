import React, { useState } from 'react';

interface PositionFormProps {
  onSubmit: (data: any) => void;
  initialValues?: any;
}

const PositionForm: React.FC<PositionFormProps> = ({ onSubmit, initialValues = {} }) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
      </div>
      <div>
        <label className="block font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
      </div>
      <div>
        <label className="block font-medium">Status</label>
        <select
          name="status"
          value={formData.status || ''}
          onChange={handleChange}
          className="w-full border p-2"
          required
        >
          <option value="">Select status</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
          <option value="paused">Paused</option>
        </select>
      </div>
      <div>
        <label className="block font-medium">Salary</label>
        <input
          type="number"
          name="salary"
          value={formData.salary || ''}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
        Submit
      </button>
    </form>
  );
};

export default PositionForm;
