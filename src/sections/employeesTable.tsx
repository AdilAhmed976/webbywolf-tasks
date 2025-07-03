"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEmployeeStore } from "@/store/useEmployeeStore";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EditPasswordDialog } from "@/components/edit-password-dialog";
import { Edit } from "lucide-react";
import { Employee } from "@/types/employees";
import EditEmployeesSidebar from "@/components/editEmployeesSidebar";

const EmployeesTable = () => {
  const { employees } = useEmployeeStore();
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [editPasswordOpen, setEditPasswordOpen] = useState<boolean>(false);
  const [currentEmployee, setEmployee] = useState<Employee | null>(null);

  return (
    <div className="">
      {employees.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <Card className="max-w-md w-full">
            <CardContent className="text-center py-6">
              <h1 className="text-2xl font-semibold mb-2">No Users Added</h1>
              <p className="text-muted-foreground">
                Start adding users by submitting the form.
              </p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="w-full p-10">
          <div className="border rounded-lg shadow-lg">
            <Table>
              <TableCaption className="mb-4">
                List of added employees
              </TableCaption>
              <TableHeader className="sticky top-0 bg-white z-10">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joining Date</TableHead>
                  <TableHead>Employee ID</TableHead>
                  <TableHead className="w-[200px]">
                    Encrypted Password
                  </TableHead>
                  <TableHead className="sticky right-0 z-10 shadow-[inset_-2px_0_0_0_rgba(255,255,255,0.8)] dark:shadow-[inset_-2px_0_0_0_rgba(108,117,125,0.5)]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee: Employee, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>

                      {employee.fullName}
                    </TableCell>
                    <TableCell className="underline">
                      {employee.email}
                    </TableCell>
                    <TableCell>{employee.phoneNumber}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>
                      <Badge>{employee.role}</Badge>
                    </TableCell>
                    <TableCell>
                      {employee.dateOfJoining
                        ? format(new Date(employee.dateOfJoining), "PPP")
                        : "N/A"}
                    </TableCell>
                    <TableCell>{employee.employeeId}</TableCell>
                    <TableCell>{employee.password}</TableCell>
                    <TableCell className="sticky flex items-center gap-2 bg-white right-0 z-2 shadow-[inset_-2px_0_0_0_rgba(255,255,255,0.8)] dark:shadow-[inset_-2px_0_0_0_rgba(108,117,125,0.5)]">
                      <Button
                        // variant={"outline"}
                        onClick={() => {
                          setEmployee(employee);
                          setEditOpen((prev: boolean) => !prev);
                        }}
                      >
                        <Edit className="text-white" />
                      </Button>
                      {/* <Button
                        variant={"outline"}
                        onClick={() => {
                          setEmployee(employee);
                          setEditPasswordOpen((prev: boolean) => !prev);
                        }}
                      >
                        Edit Password <Edit />
                      </Button> */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {editPasswordOpen && (
            <EditPasswordDialog
              open={editPasswordOpen && currentEmployee ? true : false}
              setOpen={setEditPasswordOpen}
              employeeId={currentEmployee?.employeeId || ""}
              employeeName={currentEmployee?.fullName || ""}
            />
          )}
          {editOpen && (
            <EditEmployeesSidebar
              open={editOpen && currentEmployee ? true : false}
              setOpen={setEditOpen}
              employee={currentEmployee}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeesTable;
