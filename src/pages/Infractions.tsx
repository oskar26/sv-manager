import React, { useState } from 'react';
import { useStudentStore } from '../store/studentStore';
import { format, addDays } from 'date-fns';
import { AlertTriangle } from 'lucide-react';

const INFRACTION_TYPES = [
  {
    id: '1',
    name: 'Disruptive Behavior',
    defaultBanDuration: 3,
    severity: 'low',
  },
  {
    id: '2',
    name: 'Bullying',
    defaultBanDuration: 7,
    severity: 'high',
  },
  {
    id: '3',
    name: 'Property Damage',
    defaultBanDuration: 5,
    severity: 'medium',
  },
] as const;

export function Infractions() {
  const { students, addInfraction, addBan } = useStudentStore();
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedInfractionType, setSelectedInfractionType] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const infractionType = INFRACTION_TYPES.find(
      (type) => type.id === selectedInfractionType
    );
    
    if (!infractionType) return;

    const infraction = {
      type: infractionType,
      description,
      date: new Date(),
      severity: infractionType.severity,
    };

    addInfraction(selectedStudent, infraction);

    const ban = {
      studentId: selectedStudent,
      startDate: new Date(),
      endDate: addDays(new Date(), infractionType.defaultBanDuration),
      reason: description,
      infractionId: crypto.randomUUID(),
    };

    addBan(ban);

    setSelectedStudent('');
    setSelectedInfractionType('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Record Infraction</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Student
            </label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select a student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} - {student.class}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Infraction Type
            </label>
            <select
              value={selectedInfractionType}
              onChange={(e) => setSelectedInfractionType(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select an infraction type</option>
              {INFRACTION_TYPES.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name} ({type.defaultBanDuration} days ban)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Record Infraction
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Infractions
        </h2>
        <div className="space-y-4">
          {students.map((student) =>
            student.infractions.map((infraction) => (
              <div
                key={infraction.id}
                className={`border-l-4 ${
                  infraction.severity === 'high'
                    ? 'border-red-500 bg-red-50'
                    : infraction.severity === 'medium'
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-blue-500 bg-blue-50'
                } p-4 rounded-r-lg`}
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium">
                      {student.name} - {student.class}
                    </h3>
                    <p className="mt-1 text-sm">
                      {infraction.type.name}: {infraction.description}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {format(new Date(infraction.date), 'MMM dd, yyyy')}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}