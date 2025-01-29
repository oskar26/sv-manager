import React, { useState } from 'react';
import { useBanTypeStore } from '../store/banTypeStore';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { BanType } from '../types';

export function BanTypeManager() {
  const { banTypes, addBanType, updateBanType, deleteBanType } = useBanTypeStore();
  const [showForm, setShowForm] = useState(false);
  const [editingBanType, setEditingBanType] = useState<BanType | null>(null);
  const [newBanType, setNewBanType] = useState({
    name: '',
    defaultDuration: 1,
    description: '',
    severity: 'low' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBanType) {
      updateBanType(editingBanType.id, newBanType);
    } else {
      addBanType(newBanType);
    }
    setNewBanType({
      name: '',
      defaultDuration: 1,
      description: '',
      severity: 'low',
    });
    setEditingBanType(null);
    setShowForm(false);
  };

  const handleEdit = (banType: BanType) => {
    setEditingBanType(banType);
    setNewBanType({
      name: banType.name,
      defaultDuration: banType.defaultDuration,
      description: banType.description,
      severity: banType.severity,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this ban type?')) {
      deleteBanType(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Ban Types</h2>
        <button
          onClick={() => {
            setEditingBanType(null);
            setNewBanType({
              name: '',
              defaultDuration: 1,
              description: '',
              severity: 'low',
            });
            setShowForm(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Ban Type
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">
              {editingBanType ? 'Edit Ban Type' : 'Add New Ban Type'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={newBanType.name}
                  onChange={(e) =>
                    setNewBanType({ ...newBanType, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Default Duration (days)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={newBanType.defaultDuration}
                  onChange={(e) =>
                    setNewBanType({
                      ...newBanType,
                      defaultDuration: parseInt(e.target.value),
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  required
                  value={newBanType.description}
                  onChange={(e) =>
                    setNewBanType({ ...newBanType, description: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Severity
                </label>
                <select
                  value={newBanType.severity}
                  onChange={(e) =>
                    setNewBanType({
                      ...newBanType,
                      severity: e.target.value as 'low' | 'medium' | 'high',
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingBanType(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  {editingBanType ? 'Update' : 'Add'} Ban Type
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Severity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {banTypes.map((banType) => (
              <tr key={banType.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {banType.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {banType.defaultDuration} days
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      banType.severity === 'high'
                        ? 'bg-red-100 text-red-800'
                        : banType.severity === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {banType.severity}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {banType.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(banType)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(banType.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}