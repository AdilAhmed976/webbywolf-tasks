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
import React from "react";
import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { defineStepper } from "@/components/stepper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight, CalendarIcon } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";
import { format } from "date-fns";
import { toast } from "sonner";
import { hash } from "bcryptjs";
import { useEmployeeStore } from "@/store/useEmployeeStore";

const BasicInformationSchema = z.object({
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
});

const today = new Date();
today.setHours(23, 59, 59, 999); // latest time of today

const JobDetailsSchema = z.object({
  department: z.string().min(1, "Department is required"),
  role: z.string().min(1, "Role is required"),
  dateOfJoining: z
    .date()
    .min(new Date("1900-01-01"), "Date cannot be before 1900")
    .max(today, "Date cannot be in the future"),
});
const AccountSetupSchema = z.object({
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
});
type BasicInformationFormValues = z.infer<typeof BasicInformationSchema>;
type JobDetailsFormValues = z.infer<typeof JobDetailsSchema>;
type AccountSetupFormValues = z.infer<typeof AccountSetupSchema>;

type FormValues =
  | BasicInformationFormValues
  | JobDetailsFormValues
  | AccountSetupFormValues;

const CreateUserMultiStepForm = () => {
  const { useStepper, steps, utils } = defineStepper(
    {
      id: "basic-information",
      label: "Basic Information",
      schema: BasicInformationSchema,
    },
    { id: "job-details", label: "Job Details", schema: JobDetailsSchema },
    { id: "account-setup", label: "Account Setup", schema: AccountSetupSchema }
  );

  const stepper = useStepper();
  const form = useForm({
    mode: "onTouched",
    resolver: zodResolver(stepper.current.schema as z.ZodTypeAny),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",

      department: "",
      role: "",
      dateOfJoining: new Date(), // should be Date (not string) to match z.date()

      employeeId: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { addEmployee } = useEmployeeStore();

  const onSubmit = async (values: FormValues) => {
    console.log(
      `Form values for step ${stepper.current.id}:`,
      values,
      "HAHAHAHA",
      form?.getValues()
    );
    if (stepper.isLast) {
      const allValues = form.getValues();

      const hashedPassword = await hash(allValues?.password, 10);
      const hashedConfirmPassword = await hash(allValues?.confirmPassword, 10);

      const employeeData = {
        ...allValues,
        password: hashedPassword,
        confirmPassword: hashedConfirmPassword,
      };

      addEmployee(employeeData);
      toast.success(JSON.stringify(form?.getValues()));
      stepper.reset();
      form.reset();
    } else {
      stepper.next();
    }
  };

  const currentIndex = utils.getIndex(stepper.current.id);

  return (
    <div>
      <div className="mx-auto w-full border flex items-center justify-center py-20">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 p-6 border rounded-lg w-lg"
          >
            <div className="flex justify-between">
              <h2 className="text-lg font-medium">Add New Employee</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Step {currentIndex + 1} of {steps.length}
                </span>
              </div>
            </div>
            <nav aria-label="Checkout Steps" className="group my-4">
              <ol
                className="flex items-center justify-between gap-2"
                aria-orientation="horizontal"
              >
                {stepper.all.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <li className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        type="button"
                        role="tab"
                        variant={
                          index <= currentIndex ? "default" : "secondary"
                        }
                        aria-current={
                          stepper.current.id === step.id ? "step" : undefined
                        }
                        aria-posinset={index + 1}
                        aria-setsize={steps.length}
                        aria-selected={stepper.current.id === step.id}
                        className="flex size-10 items-center justify-center rounded-full text-md"
                        onClick={async () => {
                          const valid = await form.trigger();
                          if (!valid) return;
                          if (index - currentIndex > 1) return;
                          stepper.goTo(step.id);
                        }}
                      >
                        {index + 1}
                      </Button>
                      <span className="text-[12px] font-medium">
                        {step.label}
                      </span>
                    </li>
                  </React.Fragment>
                ))}
              </ol>
            </nav>
            <div className="space-y-4">
              {stepper.switch({
                "basic-information": () => <BasicInformationFormComponent />,
                "job-details": () => <JobDetailsFormComponent />,
                "account-setup": () => <AccountSetupFormComponent />,
              })}
              {/* {!stepper.isLast ? ( */}
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={stepper.prev}
                  disabled={stepper.isFirst}
                >
                  <ArrowLeft /> Back
                </Button>

                {stepper.isLast ? (
                  <Button type="submit">Submit</Button>
                ) : (
                  <Button type="submit">
                    Next <ArrowRight />
                  </Button>
                )}
              </div>

              {/* ) : (
                <div className="flex justify-end gap-4">
                  <Button
                    variant="secondary"
                    onClick={stepper.prev}
                    // disabled={stepper.isFirst}
                  >
                    Back
                  </Button>
                  <Button type="submit">Sumbit</Button>
                </div>
              )} */}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

function BasicInformationFormComponent() {
  const { control } = useFormContext<BasicInformationFormValues>();

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Full Name */}
      <FormField
        control={control}
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
        control={control}
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
        control={control}
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
    </div>
  );
}

function JobDetailsFormComponent() {
  const { control } = useFormContext<JobDetailsFormValues>();

  return (
    <div className="space-y-4 text-start">
      <FormField
        control={control}
        name="department"
        render={({ field }) => (
          <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
            <FormLabel className="flex shrink-0">Select Department</FormLabel>
            <div className="w-full">
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="department1">Department 1</SelectItem>
                    <SelectItem value="department2">Department 2</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="role"
        render={({ field }) => (
          <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
            <FormLabel className="flex shrink-0">Select Role</FormLabel>
            <div className="w-full">
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="super-admin">Super Admin</SelectItem>
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
        control={control}
        name="dateOfJoining"
        render={({ field }) => (
          <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
            <FormLabel className="flex shrink-0">Date Of Joining</FormLabel>
            <div className="w-full">
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="justify-start text-left font-normal w-full"
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
    </div>
  );
}

function AccountSetupFormComponent() {
  const { control } = useFormContext<AccountSetupFormValues>();
  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Email */}
      <FormField
        control={control}
        name="employeeId"
        render={({ field }) => (
          <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
            <FormLabel className="flex shrink-0">Employee Id</FormLabel>
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
        control={control}
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
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
            <FormLabel className="flex shrink-0">Confirm Password</FormLabel>
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
  );
}

export default CreateUserMultiStepForm;
