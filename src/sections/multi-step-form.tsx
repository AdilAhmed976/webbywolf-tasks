"use client";
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
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { defineStepper } from "@/components/stepper";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarIcon, CloudUpload, X } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";
import { format } from "date-fns";
import { toast } from "sonner";

const shippingSchema = z.object({
  "email-input-0": z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  "password-input-0": z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  "textarea-0": z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters"),
  "number-input-0": z.coerce
    .number()
    .min(1, "Number must be at least 1")
    .max(100, "Number cannot exceed 100"),
  "password-input-1": z
    .string()
    .min(8, "Password must be at least 8 characters"),
  "file-input-0": z
    .any()
    .refine((files) => files?.length > 0, "File is required")
    .refine(
      (files) => files?.[0]?.size <= 5_000_000,
      "File size must be less than 5MB"
    )
    .refine(
      (files) =>
        ["image/jpeg", "image/png", "application/pdf"].includes(
          files?.[0]?.type
        ),
      "Only .jpg, .png, and .pdf files are accepted"
    ),
  "tel-input-0": z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9]+$/, "Phone number can only contain numbers"),
  "url-input-0": z
    .string()
    .url("Please enter a valid URL")
    .min(1, "URL is required"),
  "select-0": z.string().min(1, "Please select an option"),
  "checkbox-0": z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  "radio-0": z.string().min(1, "Please select an option"),
  "switch-0": z.boolean().refine((val) => val === true, {
    message: "You must enable this setting",
  }),
  "date-0": z
    .date()
    .min(new Date("1900-01-01"), "Date cannot be before 1900")
    .max(new Date(), "Date cannot be in the future"),
});

const paymentSchema = z.object({
  cardNumber: z.string().min(16, "Card number is required"),
  expirationDate: z.string().min(5, "Expiration date is required"),
  cvv: z.string().min(3, "CVV is required"),
});

const completeSchema = z.object({});
type ShippingFormValues = z.infer<typeof shippingSchema>;
type PaymentFormValues = z.infer<typeof paymentSchema>;
type completeFormValues = z.infer<typeof completeSchema>;
type FormValues = ShippingFormValues | PaymentFormValues | completeFormValues;

const MultiStepForm = () => {
  const { useStepper, steps, utils } = defineStepper(
    { id: "shipping", label: "Shipping", schema: shippingSchema },
    { id: "payment", label: "Payment", schema: paymentSchema },
    { id: "complete", label: "Complete", schema: completeSchema }
  );

  const stepper = useStepper();
  const form = useForm({
    mode: "onTouched",
    resolver: zodResolver(stepper.current.schema),
    // defaultValues: {
    //   "email-input-0": "adilahmedah976@gmail.com",
    //   "password-input-0": "Adil@123",
    //   "textarea-0": "jksch diduc hdic icc jias",
    //   "number-input-0": 3,
    //   "password-input-1": "cakjcsnjsnsc",
    //   "file-input-0": undefined,
    //   "tel-input-0": "1234567890",
    //   "url-input-0": "https://localhost:3000",
    //   "select-0": "option1",
    //   "checkbox-0": true,
    //   "radio-0": "option1",
    //   "switch-0": true,
    //   "date-0": undefined,
    //   cardNumber: "216666565959595959595959",
    //   expirationDate: "5555555555",
    //   cvv: "5555",
    // },
  });
  console.log("🚀 ~ MultiStepForm ~ form:", form);

  const onSubmit = (values: FormValues) => {
    console.log(`Form values for step ${stepper.current.id}:`, values , "HAHAHAHA" , form?.getValues());
    if (stepper.isLast) {
      toast.success("1jcnv" + JSON.stringify(form?.getValues()));
      stepper.reset();
      // form.reset();
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
              <h2 className="text-lg font-medium">Checkout</h2>
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
                shipping: () => <ShippingComponent />,
                payment: () => <PaymentComponent />,
                complete: () => <CompleteComponent />,
              })}
              {!stepper.isLast ? (
                <div className="flex justify-end gap-4">
                  <Button
                    variant="secondary"
                    onClick={stepper.prev}
                    disabled={stepper.isFirst}
                  >
                    Back
                  </Button>
                  <Button type="submit">
                    {stepper.isLast ? "Complete" : "Next"}
                  </Button>
                </div>
              ) : (
                <Button type="submit">Reset</Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

function ShippingComponent() {
  const { control, setError } = useFormContext<ShippingFormValues>();

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Email */}
      <FormField
        control={control}
        name="email-input-0"
        render={({ field }) => (
          <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
            <FormLabel className="flex shrink-0">Email</FormLabel>
            <div className="w-full">
              <FormControl>
                <div className="relative w-full">
                  <Input
                    placeholder=""
                    type="email"
                    id="email-input-0"
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
        name="password-input-0"
        render={({ field }) => (
          <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
            <FormLabel className="flex shrink-0">Password</FormLabel>
            <div className="w-full">
              <FormControl>
                <div className="relative w-full">
                  <PasswordInput
                    placeholder="Password"
                    id="password-input-0"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      {/* Textarea */}
      <FormField
        control={control}
        name="textarea-0"
        render={({ field }) => (
          <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
            <FormLabel className="flex shrink-0">Text Area</FormLabel>
            <div className="w-full">
              <FormControl>
                <Textarea id="textarea-0" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      {/* Number */}
      <FormField
        control={control}
        name="number-input-0"
        render={({ field }) => (
          <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
            <FormLabel className="flex shrink-0">Number</FormLabel>
            <div className="w-full">
              <FormControl>
                <div className="relative w-full">
                  <Input
                    placeholder=""
                    type="number"
                    id="number-input-0"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      {/* Password (Confirm) */}
      <FormField
        control={control}
        name="password-input-1"
        render={({ field }) => (
          <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
            <FormLabel className="flex shrink-0">Password</FormLabel>
            <div className="w-full">
              <FormControl>
                <div className="relative w-full">
                  <Input
                    placeholder=""
                    type="password"
                    id="password-input-1"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      {/* File Upload */}
      <FormField
        control={control}
        name="file-input-0"
        render={({ field }) => (
          <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
            <FormLabel className="flex shrink-0">File upload</FormLabel>
            <div className="w-full">
              <FormControl>
                <div className="relative w-full">
                  <FileUpload
                    value={field.value}
                    onValueChange={field.onChange}
                    accept="image/*"
                    maxFiles={2}
                    maxSize={5 * 1024 * 1024}
                    onFileReject={(_, message) => {
                      setError("file-input-0", {
                        message,
                      });
                    }}
                    multiple
                  >
                    <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center">
                      <CloudUpload className="size-4" />
                      Drag and drop or
                      <FileUploadTrigger asChild>
                        <Button variant="link" size="sm" className="p-0">
                          choose files
                        </Button>
                      </FileUploadTrigger>
                      to upload
                    </FileUploadDropzone>
                    <FileUploadList>
                      {(field.value as File[] | undefined)?.map(
                        (file, index) => (
                          <FileUploadItem key={index} value={file}>
                            <FileUploadItemPreview />
                            <FileUploadItemMetadata />
                            <FileUploadItemDelete asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-7"
                              >
                                <X />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </FileUploadItemDelete>
                          </FileUploadItem>
                        )
                      )}
                    </FileUploadList>
                  </FileUpload>
                </div>
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      {/* Telephone */}
      <FormField
        control={control}
        name="tel-input-0"
        render={({ field }) => (
          <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
            <FormLabel className="flex shrink-0">Telephone</FormLabel>
            <div className="w-full">
              <FormControl>
                <div className="relative w-full">
                  <Input
                    placeholder=""
                    type="tel"
                    id="tel-input-0"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      {/* URL */}
      <FormField
        control={control}
        name="url-input-0"
        render={({ field }) => (
          <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
            <FormLabel className="flex shrink-0">URL</FormLabel>
            <div className="w-full">
              <FormControl>
                <div className="relative w-full">
                  <Input
                    placeholder=""
                    type="url"
                    id="url-input-0"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      {/* Select */}
      <FormField
        control={control}
        name="select-0"
        render={({ field }) => (
          <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
            <FormLabel className="flex shrink-0">Select</FormLabel>
            <div className="w-full">
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      {/* Checkbox */}
      <FormField
        control={control}
        name="checkbox-0"
        render={({ field }) => (
          <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
            <div className="w-full">
              <FormControl>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="checkbox-0"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <FormLabel htmlFor="checkbox-0">Checkbox</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Checkbox Description
                    </p>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      {/* Radio Group */}
      <FormField
        control={control}
        name="radio-0"
        render={({ field }) => (
          <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
            <FormLabel className="flex shrink-0">Radio Group</FormLabel>
            <div className="w-full">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option1" id="radio-0-option1" />
                    <FormLabel
                      htmlFor="radio-0-option1"
                      className="font-medium"
                    >
                      Option 1
                    </FormLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option2" id="radio-0-option2" />
                    <FormLabel
                      htmlFor="radio-0-option2"
                      className="font-medium"
                    >
                      Option 2
                    </FormLabel>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      {/* Switch */}
      <FormField
        control={control}
        name="switch-0"
        render={({ field }) => (
          <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
            <div className="w-full">
              <FormControl>
                <div className="flex items-center justify-between">
                  <div className="grid gap-1.5">
                    <FormLabel>Switch</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Switch Description
                    </p>
                  </div>
                  <Switch
                    id="switch-0"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      {/* Date Picker */}
      <FormField
        control={control}
        name="date-0"
        render={({ field }) => (
          <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
            <FormLabel className="flex shrink-0">Date Picker</FormLabel>
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

function PaymentComponent() {
  const {
    register,
    formState: { errors },
  } = useFormContext<PaymentFormValues>();

  return (
    <div className="space-y-4 text-start">
      <div className="space-y-2">
        <label
          htmlFor="cardNumber"
          className="block text-sm font-medium text-primary"
        >
          Card Number
        </label>
        <Input
          id="cardNumber"
          {...register("cardNumber")}
          className="block w-full p-2 border rounded-md"
        />
        {errors.cardNumber && (
          <span className="text-sm text-destructive">
            {errors.cardNumber.message}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <label
          htmlFor="expirationDate"
          className="block text-sm font-medium text-primary"
        >
          Expiration Date
        </label>
        <Input
          id="expirationDate"
          {...register("expirationDate")}
          className="block w-full p-2 border rounded-md"
        />
        {errors.expirationDate && (
          <span className="text-sm text-destructive">
            {errors.expirationDate.message}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="cvv" className="block text-sm font-medium text-primary">
          CVV
        </label>
        <Input
          id="cvv"
          {...register("cvv")}
          className="block w-full p-2 border rounded-md"
        />
        {errors.cvv && (
          <span className="text-sm text-destructive">{errors.cvv.message}</span>
        )}
      </div>
    </div>
  );
}

function CompleteComponent() {
  return <div className="text-center">Thank you! Your order is complete.</div>;
}

export default MultiStepForm;
