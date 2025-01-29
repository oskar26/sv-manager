import { create } from 'zustand';
import { Student, Ban, Infraction } from '../types';
import { storage } from '../utils/storage';

interface StudentState {
  students: Student[];
  loading: boolean;
  error: string | null;
  fetchStudents: () => void;
  addStudent: (student: Omit<Student, 'id' | 'infractions' | 'currentBan'>) => void;
  addInfraction: (studentId: string, infraction: Omit<Infraction, 'id'>) => void;
  addBan: (ban: Omit<Ban, 'id'>) => void;
  getStudent: (id: string) => Student | undefined;
  getCurrentlyBannedStudents: () => Student[];
}

export const useStudentStore = create<StudentState>((set, get) => ({
  students: storage.getStudents(),
  loading: false,
  error: null,

  fetchStudents: () => {
    try {
      const students = storage.getStudents();
      set({ students, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch students', loading: false });
    }
  },

  addStudent: (student) => {
    try {
      const newStudent: Student = {
        ...student,
        id: crypto.randomUUID(),
        infractions: [],
        currentBan: null,
      };
      
      const updatedStudents = [...get().students, newStudent];
      storage.setStudents(updatedStudents);
      set({ students: updatedStudents });
    } catch (error) {
      set({ error: 'Failed to add student' });
    }
  },

  addInfraction: (studentId, infraction) => {
    try {
      const newInfraction = { ...infraction, id: crypto.randomUUID() };
      const updatedStudents = get().students.map((student) =>
        student.id === studentId
          ? {
              ...student,
              infractions: [...student.infractions, newInfraction]
            }
          : student
      );
      
      storage.setStudents(updatedStudents);
      set({ students: updatedStudents });
    } catch (error) {
      set({ error: 'Failed to add infraction' });
    }
  },

  addBan: (ban) => {
    try {
      const newBan = { ...ban, id: crypto.randomUUID() };
      const updatedStudents = get().students.map((student) =>
        student.id === ban.studentId
          ? {
              ...student,
              currentBan: newBan
            }
          : student
      );
      
      storage.setStudents(updatedStudents);
      set({ students: updatedStudents });
    } catch (error) {
      set({ error: 'Failed to add ban' });
    }
  },

  getStudent: (id) => get().students.find((s) => s.id === id),
  
  getCurrentlyBannedStudents: () =>
    get().students.filter(
      (s) => s.currentBan && new Date(s.currentBan.endDate) > new Date()
    ),
}));