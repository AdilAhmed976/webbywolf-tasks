// src/app/page.tsx  <-- make sure it's `.tsx`

"use client";

import { EditPasswordDialog } from "@/components/edit-password-dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [editOpen, setEditOpen] = useState<boolean>(false);

  return (
    <div>
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
  );
}
