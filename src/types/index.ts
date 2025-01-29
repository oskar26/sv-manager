export interface Student {
  id: string;
  name: string;
  class: string;
  classTeacher: string;
  currentBan: Ban | null;
  infractions: Infraction[];
  banHistory: Ban[];
  notes: string;
}

export interface Ban {
  id: string;
  studentId: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  banTypeId: string;
  violations: BanViolation[];
  notes: string;
  originalDuration: number; // in days
  extendedDuration: number; // in days
}

export interface BanType {
  id: string;
  name: string;
  defaultDuration: number;
  description: string;
  severity: 'low' | 'medium' | 'high';
  active: boolean;
}

export interface BanViolation {
  id: string;
  date: Date;
  description: string;
  location: string;
  extensionDays: number;
}