// types/employee.ts or at top of your store file
export interface Employee {
  fullName: string;
  email: string;
  phoneNumber: string;
  department: string;
  role: string;
  dateOfJoining: Date | string;
  employeeId: string;
  password: string;
  confirmPassword: string;
}
