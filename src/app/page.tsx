// src/app/page.tsx  <-- make sure it's `.tsx`

"use client";

import { EditPasswordDialog } from "@/components/edit-password-dialog";
import { Button } from "@/components/ui/button";
import CreateUserMultiStepForm from "@/sections/createUserMultiStepForm";
import MultiStepForm from "@/sections/multi-step-form";
import { Edit } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [editOpen, setEditOpen] = useState<boolean>(false);

  return (
    <div>
      <CreateUserMultiStepForm />

      <div className="flex items-center justify-center p-10 bg-gray-200">
        <Link href="/employee-list">
          <Button>Employees List</Button>
        </Link>
      </div>

      <MultiStepForm />
      <div className="flex items-center justify-center p-10 bg-gray-200">
        <Button
          onClick={() => {
            setEditOpen((prev) => !prev);
          }}
        >
          Edit Password <Edit />
        </Button>
        {editOpen && (
          <EditPasswordDialog
            open={editOpen}
            setOpen={setEditOpen}
            employeeId="employeeId"
            employeeName="employeeName"
          />
        )}
      </div>
    </div>
  );
}
