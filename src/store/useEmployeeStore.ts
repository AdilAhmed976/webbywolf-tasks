
// src/store/useEmployeeStore.ts
import { create } from 'zustand'

type Employee = {
  fullName: string
  email: string
  phoneNumber: string
  department: string
  role: string
  dateOfJoining: Date
  employeeId: string
  password: string // hashed
}

interface EmployeeState {
  employees: Employee[]
  addEmployee: (employee: Employee) => void
}

export const useEmployeeStore = create<EmployeeState>(set => ({
  employees: JSON.parse(localStorage.getItem('employees') || '[]'),
  addEmployee: employee => {
    set(state => {
      const updated = [...state.employees, employee]
      localStorage.setItem('employees', JSON.stringify(updated))
      return { employees: updated }
    })
  },
}))
