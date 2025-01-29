import React from 'react';
import { format } from 'date-fns';
import { Student, Ban } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { BanHistoryPDF } from './BanHistoryPDF';
import { FileDown, AlertTriangle } from 'lucide-react';

interface StudentDetailsProps {
  student: Student;
}

export function StudentDetails({ student }: StudentDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-primary">{student.name}</h1>
          <p className="text-primary/60">
            Class: {student.class} | Teacher: {student.classTeacher}
          </p>
        </div>
        {student.currentBan && (
          <Badge variant="danger" className="text-sm">
            Currently Banned
          </Badge>
        )}
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-primary">Ban History</h2>
          <BanHistoryPDF student={student} />
        </div>

        <div className="space-y-4">
          {student.banHistory.map((ban) => (
            <BanHistoryItem key={ban.id} ban={ban} />
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-primary mb-4">Notes</h2>
        <textarea
          className="glass-input min-h-[100px]"
          placeholder="Add notes about the student..."
          value={student.notes}
          onChange={(e) => {
            // Handle notes update through store
          }}
        />
      </Card>
    </div>
  );
}

function BanHistoryItem({ ban }: { ban: Ban }) {
  return (
    <div className="glass-card p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium text-primary">{ban.reason}</h3>
          <p className="text-sm text-primary/60">
            {format(ban.startDate, 'MMM dd, yyyy')} -{' '}
            {format(ban.endDate, 'MMM dd, yyyy')}
          </p>
        </div>
        {ban.violations.length > 0 && (
          <Badge variant="warning" className="text-xs">
            {ban.violations.length} Violation{ban.violations.length !== 1 && 's'}
          </Badge>
        )}
      </div>

      {ban.violations.length > 0 && (
        <div className="mt-3 space-y-2">
          <p className="text-sm font-medium text-primary/70">Violations:</p>
          {ban.violations.map((violation) => (
            <div
              key={violation.id}
              className="text-sm bg-primary/5 rounded-lg p-2"
            >
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                <div>
                  <p className="text-primary/80">{violation.description}</p>
                  <p className="text-primary/60 text-xs mt-1">
                    {format(violation.date, 'MMM dd, yyyy')} at {violation.location}
                    {' | '}
                    Extended by {violation.extensionDays} days
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}