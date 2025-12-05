import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  primaryRoleId: number;
  roleName: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loadStoredAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (username: string, password: string) => {
    try {
      // TODO: Replace with actual API call
      const mockUser: User = {
        id: 1,
        username,
        email: `${username}@tagore.edu.in`,
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '+919876543210',
        primaryRoleId: username.includes('teacher') ? 4 : username.includes('student') ? 5 : 6,
        roleName: username.includes('teacher') ? 'Teacher' : username.includes('student') ? 'Student' : 'Parent',
      };
      const mockToken = 'mock-jwt-token';

      await AsyncStorage.setItem('token', mockToken);
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));

      set({
        user: mockUser,
        token: mockToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');

      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },

  loadStoredAuth: async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userStr = await AsyncStorage.getItem('user');

      if (token && userStr) {
        const user = JSON.parse(userStr);
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Load stored auth failed:', error);
      set({ isLoading: false });
    }
  },
}));
