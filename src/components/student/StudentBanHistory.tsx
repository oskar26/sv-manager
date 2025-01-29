import React from 'react';
import { format } from 'date-fns';
import { Ban } from '../../types';
import { Badge } from '../ui/Badge';
import { AlertTriangle } from 'lucide-react';

interface StudentBanHistoryProps {
  ban: Ban;
}

export function StudentBanHistory({ ban }: StudentBanHistoryProps) {
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