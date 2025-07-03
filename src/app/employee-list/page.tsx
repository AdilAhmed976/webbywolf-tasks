"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import EmployeesTable from "@/sections/employeesTable";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const EmployeeListPage = () => {
  return (
    <div>
      <div className="p-2">
        <Link href="/">
          <Button>
            <ArrowLeft /> Back
          </Button>
        </Link>
      </div>
      <div className="w-full flex items-center justify-center">
        <Card className="max-w-full xl:max-w-7xl">
          <CardContent>
            <div className="p-2">
              <h1 className="pb-4 text-xl md:text-3xl font-bold">
                Employees Lists
              </h1>

              <Card className="py-0">
                <CardContent className="py-0 px-2">
                  <EmployeesTable />
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeListPage;
