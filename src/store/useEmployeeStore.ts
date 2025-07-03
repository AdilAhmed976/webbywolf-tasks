// store/useEmployeeStore.ts
import { Employee } from "@/types/employees";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface EmployeeStore {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
}

export const useEmployeeStore = create<EmployeeStore>()(
  persist(
    (set) => ({
      employees: [],
      addEmployee: (employee) =>
        set((state) => ({
          employees: [...state.employees, employee],
        })),
      updateEmployee: (employee) => {
        set((state) => ({
          employees: state.employees?.map((emp) => {
            return emp?.email === employee?.email
              ? { ...emp, ...employee }
              : emp;
          }),
        }));
      },
    }),
    {
      name: "employee-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
