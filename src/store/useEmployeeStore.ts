// store/useEmployeeStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Employee {
  fullName: string;
  email: string;
  phoneNumber: string;
  department: string;
  role: string;
  dateOfJoining: Date;
  employeeId: string;
  password: string;
}

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