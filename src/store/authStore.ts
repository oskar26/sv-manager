import { create } from 'zustand';
import { storage } from '../utils/storage';

const ADMIN_PASSWORD = 'admin123'; // In a real app, use a hashed password

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: storage.getIsAuthenticated(),
  loading: false,
  error: null,
  login: (password: string) => {
    if (password === ADMIN_PASSWORD) {
      storage.setIsAuthenticated(true);
      set({ isAuthenticated: true, error: null });
      return true;
    }
    set({ error: 'Invalid password' });
    return false;
  },
  logout: () => {
    storage.setIsAuthenticated(false);
    set({ isAuthenticated: false, error: null });
  },
}));