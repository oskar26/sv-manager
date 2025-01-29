import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  query,
  where,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Student, Ban, Infraction } from '../types';
import { handleFirebaseError } from '../utils/errorHandling';

const STUDENTS_COLLECTION = 'students';
const BANS_COLLECTION = 'bans';
const INFRACTIONS_COLLECTION = 'infractions';

export const studentService = {
  async getAllStudents(): Promise<Student[]> {
    try {
      const querySnapshot = await getDocs(collection(db, STUDENTS_COLLECTION));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        infractions: [],
        currentBan: null
      } as Student));
    } catch (error) {
      console.error('Error fetching students:', error);
      throw new Error(handleFirebaseError(error));
    }
  },

  async addStudent(student: Omit<Student, 'id'>): Promise<string> {
    try {
      const studentData = {
        name: student.name,
        class: student.class,
        classTeacher: student.classTeacher,
        infractions: [],
        currentBan: null,
        createdAt: Timestamp.now()
      };
      
      const docRef = await addDoc(collection(db, STUDENTS_COLLECTION), studentData);
      return docRef.id;
    } catch (error) {
      throw new Error(handleFirebaseError(error));
    }
  },

  async addBan(ban: Omit<Ban, 'id'>): Promise<string> {
    try {
      const banData = {
        ...ban,
        startDate: Timestamp.fromDate(new Date(ban.startDate)),
        endDate: Timestamp.fromDate(new Date(ban.endDate)),
        createdAt: Timestamp.now()
      };
      
      const docRef = await addDoc(collection(db, BANS_COLLECTION), banData);
      return docRef.id;
    } catch (error) {
      throw new Error(handleFirebaseError(error));
    }
  },

  async addInfraction(infraction: Omit<Infraction, 'id'>): Promise<string> {
    try {
      const infractionData = {
        ...infraction,
        date: Timestamp.fromDate(new Date(infraction.date)),
        createdAt: Timestamp.now()
      };
      
      const docRef = await addDoc(collection(db, INFRACTIONS_COLLECTION), infractionData);
      return docRef.id;
    } catch (error) {
      throw new Error(handleFirebaseError(error));
    }
  },

  async getCurrentBans(): Promise<Ban[]> {
    try {
      const now = Timestamp.now();
      const q = query(
        collection(db, BANS_COLLECTION),
        where('endDate', '>', now)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        startDate: doc.data().startDate.toDate(),
        endDate: doc.data().endDate.toDate()
      } as Ban));
    } catch (error) {
      throw new Error(handleFirebaseError(error));
    }
  }
};