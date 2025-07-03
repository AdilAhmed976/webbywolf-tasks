import { Employee } from "@/types/employees";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "@/components/ui/password-input";
import { format } from "date-fns";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { ScrollArea } from "./ui/scroll-area";
import { useEmployeeStore } from "@/store/useEmployeeStore";
import { hashPassword } from "@/lib/passwordUtils";
import { toast } from "sonner";

const today = new Date();
today.setHours(23, 59, 59, 999); // latest time of today

const EditEmployeeFormSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z
      .string()
      .email("Please enter a valid email address")
      .min(1, "Email is required"),
    phoneNumber: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .max(10, "Phone number too long")
      .regex(/^\+?[0-9\s\-()]*$/, "Invalid phone number format"),
    department: z.string().min(1, "Department is required"),
    role: z.string().min(1, "Role is required"),
    dateOfJoining: z
      .date()
      .min(new Date("1900-01-01"), "Date cannot be before 1900")
      .max(today, "Date cannot be in the future"),
    employeeId: z.string().min(1, "Employee ID is required"),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type EditEmployeeFormValues = z.infer<typeof EditEmployeeFormSchema>;

interface EditEmployeeProps {
  employee: Employee | null;
  onSuccess?: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}
const EditEmployeesSidebar = ({
  employee,
  onSuccess,
  open,
  setOpen,
}: EditEmployeeProps) => {
  const { updateEmployee } = useEmployeeStore();
  const form = useForm<EditEmployeeFormValues>({
    mode: "onTouched",
    resolver: zodResolver(EditEmployeeFormSchema),
    defaultValues: {
      fullName: employee?.fullName,
      email: employee?.email,
      phoneNumber: employee?.phoneNumber,

      department: employee?.department,
      role: employee?.role,
      dateOfJoining: new Date(), // should be Date (not string) to match z.date()

      employeeId: employee?.employeeId,
      password: employee?.password,
      confirmPassword: employee?.password,
    },
  });

  const onSubmit = async (values: EditEmployeeFormValues) => {
    console.log("🚀 ~ onSubmit ~ values:", values);

    let employeeData = {
      ...values,
    };
    if (values.password !== employee?.password) {
      const hashedPassword = await hashPassword(values?.password);
      const hashedConfirmPassword = await hashPassword(values?.confirmPassword);
      employeeData = {
        ...values,
        password: hashedPassword,
        confirmPassword: hashedConfirmPassword,
      };
    }
    updateEmployee(employeeData);
    if (onSuccess) {
      onSuccess();
    }
    toast.success("Employee Updated Successfully!");
    form.reset({});
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="h-screen max-h-screen overflow-hidden p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Edit Details For - {employee?.email}</SheetTitle>
          <SheetDescription>This action updates the details.</SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-130px)] p-2 pt-0 overflow-y-auto ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 px-1"
            >
              <div className="grid grid-cols-12 gap-4">
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                      <FormLabel className="flex shrink-0">Full Name</FormLabel>
                      <div className="w-full">
                        <FormControl>
                          <div className="relative w-full">
                            <Input
                              placeholder="Enter Full Name"
                              type="text"
                              id="fullName"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                {/*  Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                      <FormLabel className="flex shrink-0">Email</FormLabel>
                      <div className="w-full">
                        <FormControl>
                          <div className="relative w-full">
                            <Input
                              placeholder="Enter Email"
                              type="email"
                              id="email"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                      <FormLabel className="flex shrink-0">Password</FormLabel>
                      <div className="w-full">
                        <FormControl>
                          <div className="relative w-full">
                            <Input
                              placeholder="Phone Number"
                              id="phoneNumber"
                              type="phone"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                      <FormLabel className="flex shrink-0">
                        Select Department
                      </FormLabel>
                      <div className="w-full">
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="department1">
                                Department 1
                              </SelectItem>
                              <SelectItem value="department2">
                                Department 2
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                      <FormLabel className="flex shrink-0">
                        Select Role
                      </FormLabel>
                      <div className="w-full">
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="super-admin">
                                Super Admin
                              </SelectItem>
                              <SelectItem value="user">User</SelectItem>
                              <SelectItem value="agent">Agent</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Date Picker */}
                <FormField
                  control={form.control}
                  name="dateOfJoining"
                  render={({ field }) => (
                    <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                      <FormLabel className="flex shrink-0">
                        Date Of Joining
                      </FormLabel>
                      <div className="w-full">
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className="justify-start text-left font-normal w-full h-11"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span className="text-muted-foreground">
                                    Pick a date
                                  </span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="employeeId"
                  render={({ field }) => (
                    <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                      <FormLabel className="flex shrink-0">
                        Employee Id
                      </FormLabel>
                      <div className="w-full">
                        <FormControl>
                          <div className="relative w-full">
                            <Input
                              placeholder="Empoyee Id"
                              type="text"
                              id="employeeId"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                      <FormLabel className="flex shrink-0">Password</FormLabel>
                      <div className="w-full">
                        <FormControl>
                          <div className="relative w-full">
                            <PasswordInput
                              placeholder="Password"
                              id="password"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                      <FormLabel className="flex shrink-0">
                        Confirm Password
                      </FormLabel>
                      <div className="w-full">
                        <FormControl>
                          <div className="relative w-full">
                            <PasswordInput
                              placeholder="Password"
                              id="confirmPassword"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <Button className="w-full position sticky bottom-0 shadow-lg h-11">
                Update
              </Button>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default EditEmployeesSidebar;
