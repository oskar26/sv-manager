import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs 
} from 'firebase/firestore';
import { db } from './firebase';
import { BanType } from '../types';

const BAN_TYPES_COLLECTION = 'banTypes';

export const banTypeService = {
  async getAllBanTypes(): Promise<BanType[]> {
    const querySnapshot = await getDocs(collection(db, BAN_TYPES_COLLECTION));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as BanType));
  },

  async addBanType(banType: Omit<BanType, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, BAN_TYPES_COLLECTION), banType);
    return docRef.id;
  },

  async updateBanType(id: string, banType: Partial<BanType>): Promise<void> {
    await updateDoc(doc(db, BAN_TYPES_COLLECTION, id), banType);
  },

  async deleteBanType(id: string): Promise<void> {
    await deleteDoc(doc(db, BAN_TYPES_COLLECTION, id));
  }
};