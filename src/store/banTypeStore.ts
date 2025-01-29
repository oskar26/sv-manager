import { create } from 'zustand';
import { BanType } from '../types';
import { storage } from '../utils/storage';

interface BanTypeState {
  banTypes: BanType[];
  addBanType: (banType: Omit<BanType, 'id'>) => void;
  updateBanType: (id: string, banType: Partial<BanType>) => void;
  deleteBanType: (id: string) => void;
  toggleBanTypeStatus: (id: string) => void;
}

export const useBanTypeStore = create<BanTypeState>((set) => ({
  banTypes: storage.getBanTypes(),
  
  addBanType: (banType) => {
    set((state) => {
      const newBanTypes = [
        ...state.banTypes,
        { ...banType, id: crypto.randomUUID(), active: true }
      ];
      storage.setBanTypes(newBanTypes);
      return { banTypes: newBanTypes };
    });
  },
  
  updateBanType: (id, banType) => {
    set((state) => {
      const newBanTypes = state.banTypes.map((bt) =>
        bt.id === id ? { ...bt, ...banType } : bt
      );
      storage.setBanTypes(newBanTypes);
      return { banTypes: newBanTypes };
    });
  },
  
  deleteBanType: (id) => {
    set((state) => {
      const newBanTypes = state.banTypes.filter((bt) => bt.id !== id);
      storage.setBanTypes(newBanTypes);
      return { banTypes: newBanTypes };
    });
  },

  toggleBanTypeStatus: (id) => {
    set((state) => {
      const newBanTypes = state.banTypes.map((bt) =>
        bt.id === id ? { ...bt, active: !bt.active } : bt
      );
      storage.setBanTypes(newBanTypes);
      return { banTypes: newBanTypes };
    });
  },
}));