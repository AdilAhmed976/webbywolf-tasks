// store/useEmployeeStore.ts
import { Employee } from '@/types/employees';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';


interface EmployeeStore {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
}

export const useEmployeeStore = create<EmployeeStore>()(
  persist(
    (set) => ({
      employees: [],
      addEmployee: (employee) => 
        set((state) => ({ 
          employees: [...state.employees, employee] 
        })),
    }),
    {
      name: 'employee-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);