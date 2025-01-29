import React from 'react';
import { useStudentStore } from '../store/studentStore';
import { format } from 'date-fns';
import { AlertTriangle } from 'lucide-react';
import { BanReport } from '../components/BanReport';
import { BanTypeManager } from '../components/BanTypeManager';

export function Dashboard() {
  const bannedStudents = useStudentStore((state) => state.getCurrentlyBannedStudents());

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Currently Banned Students
          </h2>
          <BanReport />
        </div>
        
        {bannedStudents.length === 0 ? (
          <p className="text-gray-500">No students are currently banned.</p>
        ) : (
          <div className="space-y-4">
            {bannedStudents.map((student) => (
              <div
                key={student.id}
                className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg"
              >
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-red-800">
                      {student.name} - {student.class}
                    </h3>
                    <p className="mt-1 text-sm text-red-700">
                      Banned until:{' '}
                      {format(
                        new Date(student.currentBan!.endDate),
                        'MMMM dd, yyyy'
                      )}
                    </p>
                    <p className="mt-1 text-sm text-red-700">
                      Reason: {student.currentBan!.reason}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BanTypeManager />
    </div>
  );
}