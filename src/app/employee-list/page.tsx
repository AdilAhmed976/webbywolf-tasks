"use client";
import { Button } from "@/components/ui/button";
import EmployeesTable from "@/sections/employeesTable";
import Link from "next/link";
import React from "react";

const EmployeeListPage = () => {
  return (
    <div>
      <Link href="/">
        <Button>Back</Button>
      </Link>
      <EmployeesTable />
    </div>
  );
};

export default EmployeeListPage;
