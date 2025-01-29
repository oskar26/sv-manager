import { Student, BanType, Ban, Infraction } from '../types';

const STORAGE_KEYS = {
  STUDENTS: 'students',
  BAN_TYPES: 'banTypes',
  AUTH: 'auth',
} as const;

// Helper to safely parse JSON with a default value
const safeJSONParse = <T>(str: string | null, defaultValue: T): T => {
  if (!str) return defaultValue;
  try {
    return JSON.parse(str) as T;
  } catch {
    return defaultValue;
  }
};

export const storage = {
  // Auth
  getIsAuthenticated: () => 
    safeJSONParse(localStorage.getItem(STORAGE_KEYS.AUTH), false),
  
  setIsAuthenticated: (value: boolean) => 
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(value)),

  // Students
  getStudents: () => 
    safeJSONParse<Student[]>(localStorage.getItem(STORAGE_KEYS.STUDENTS), []),
  
  setStudents: (students: Student[]) => 
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students)),

  // Ban Types
  getBanTypes: () => 
    safeJSONParse<BanType[]>(localStorage.getItem(STORAGE_KEYS.BAN_TYPES), []),
  
  setBanTypes: (banTypes: BanType[]) => 
    localStorage.setItem(STORAGE_KEYS.BAN_TYPES, JSON.stringify(banTypes)),
};