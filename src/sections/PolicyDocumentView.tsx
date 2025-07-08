import React, { useRef } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ChannelPartnerDetails {
  company_name: string;
  logo: string;
}

interface SubscriptionDetails {
  subscription_id: string;
  plan_name: string;
  subscription_issue_date: string;
  plan_start_date: string;
  plan_end_date: string;
}

interface VehicleDetails {
  vehicle_registration_number: string;
  manufacturer: string;
  model: string;
  engine_number: string;
  chassis_number: string;
}

interface PersonalDetails {
  first_name: string;
  middle_name: string;
  last_name: string;
  mobile_no: string;
  email_id: string;
  address: string;
  city: string;
  district: string;
  state: string;
  pin_code: string;
}

interface PaymentDetails {
  base_plan_amount: string;
  cgst_amount: string;
  sgst_amount: string;
  igst_amount: string;
  gst_number: string;
  total_plan_amount: string;
  amount_in_words: string;
}

interface InvoiceData {
  channel_partner_details: ChannelPartnerDetails;
  subscription_details: SubscriptionDetails;
  vehicle_details: VehicleDetails;
  personal_details: PersonalDetails;
  payment_details: PaymentDetails;
}

const services = [
  {
    title: "Toll-Free",
    description:
      "Services must be requested only via the official SDA helpline. Requests through other channels won't be accepted.",
    icon: "📞", // You can replace with actual image
  },
  {
    title: "Coverage Radius",
    description: "Service is valid across India.",
    icon: "🗺️",
  },
  {
    title: "Towing Assistance",
    description: "Free service coverage up to 100 km.",
    icon: "🚗", // You can replace with actual image
  },
  {
    title: "Vehicle custody During Towing Delays",
    description:
      "If towing is delayed, SDA will take custody of the vehicle from the breakdown location. Otherwise, the customer must ensure a smooth handover.",
    icon: "🛑",
  },
  {
    title: "Discount on Labour (Service Bill)",
    description:
      "10% discount on labour charges at SDA-authorised service centers.",
    icon: "💵",
  },
  {
    title: "Tree Fuel Delivery",
    description:
      "SURE SHIELD CORE: Free delivery of up to 1L fuel and assistance thereafter. SURE SHIELD MAX: Free delivery of up to 4L fuel and assistance thereafter. Not applicable at the customer's residence.",
    icon: "⛽",
  },
  {
    title: "Discount on Labour (Spare Parts)",
    description:
      "10% off on labour charges at SDA-authorised service centres. Free vehicle washing included.",
    icon: "🔧",
  },
  {
    title: "Taxi Assistance",
    description: "Free taxi service up to 50 km from the breakdown location.",
    icon: "🚖",
  },
  {
    title: "Flat Tyre Assistance",
    description:
      "Free puncture repair. Tyre or tube replacement will be chargeable at actual cost.",
    icon: "🛞",
  },
  {
    title: "On-site Minor repairs",
    description:
      "Labour/service is covered. Parts and consumables are chargeable as per availability.",
    icon: "🔨",
  },
  {
    title: "Battery Jump Start",
    description:
      "Jump start is provided. Battery or parts will be chargeable at actuals.",
    icon: "🔋",
  },
  {
    title: "Locked/Lost Key",
    description:
      "Spare key pickup can be arranged up to 50 km from the breakdown location.",
    icon: "🔑",
  },

  {
    title: "Natural Disaster or Act of GOD",
    description:
      "Support during natural disasters will be provided on a best-effort basis.",
    icon: "🌪️",
  },
  {
    title: "Emergency Medical Assistance",
    description: "Medical support will be coordinated on a best-effort basis.",
    icon: "🚑",
  },

  {
    title: "Emergency Doctor Assistance",
    description: "Doctor consultation will be provided in case of emergencies.",
    icon: "🏥",
  },

  {
    title: "Legal Assistance",
    description:
      "Up to 20 minutes of legal consultation for accident-related matters.",
    icon: "⚖️",
  },
  {
    title: "Water & Refreshments",
    description: "Service is provided free of charge.",
    icon: "🥤",
  },
  {
    title: "Mobile Charging",
    description: "Free charging provided using standard cables.",
    icon: "🔌",
  },

  {
    title: "Onward / Forward Journey",
    description: "Free assistance provided for flight bookings.",
    icon: "✈️",
  },

  {
    title: "Arrangement of Rental Vehicle",
    description: "Free assistance provided for arranging rental vehicles.",
    icon: "🚘",
  },
  {
    title: "Hotel Accommodation",
    description:
      "SDA will provide Hotel accommodation service to our customers who are 200km away from their place of residence, Usage - One time only for a single day/night.",
    icon: "🏨",
  },

  {
    title: "Relay or Urgent Messages",
    description:
      "In case of emergency, SDA will help deliver urgent messages to the customer's family or friends.",
    icon: "📢",
  },
  {
    title: "1 + 1 Year Service",
    description:
      "If unused in the year, full plan benefits carry forward to the 2nd year. Can be availed only once.",
    icon: "📅",
  },

  {
    title: "Vehicles Eligibility – Age Limit",
    description:
      "Valid for vehicles up to 7 years old. Misrepresentation may result in service cancellation.",
    icon: "🚫",
  },
  {
    title: "Unlocated or Unattended Vehicle",
    description:
      "Inaccurate location details or customer unavailability may lead to case closure.",
    icon: "🕵",
  },
  {
    title: "Off-Road Recovery",
    description:
      "Recovery service is chargeable. SDA is not liable for any damage during off-road recovery. Service is provided on a best-effort basis.",
    icon: "🏞️",
  },
  {
    title: "Additional Cases",
    description:
      "Towing or vehicle custody will be provided only after FIR clearance.",
    icon: "☝",
  },
  {
    title: "Excessive Usage & Misuse",
    description:
      "SDA may suspend services in case of abuse or misuse. Paid assistance may be offered as an alternative.",
    icon: "👩🏻‍💻",
  },

  {
    title: "Response Time & External Conditions",
    description:
      "SDA is not liable for delays caused by external factors beyond its control.",
    icon: "⏱️",
  },
  {
    title: "Inter-State Movement",
    description:
      "Customer is responsible for carrying valid documents, paying tolls, and bearing any legal risks.",
    icon: "〰",
  },

  {
    title: "Adverse Weather Conditions",
    description:
      "Service will be provided on a best-effort basis and may be deferred in unsafe conditions.",
    icon: "🌦️",
  },
  {
    title: "Special Exclusions",
    description:
      "Service will not be provided in cases of racing, vandalism, natural calamities, or similar events.",
    icon: "™",
  },
  {
    title: "Program Activation Date",
    description:
      "No wait time for new vehicles. For others, benefits begin 48 hours after plan purchase (cooling period).",
    icon: "🚌",
  },
  {
    title: "Program Validity & End Date",
    description:
      "Valid for 12 months; expires at 11:59:59 PM on the last day. Renewal must be done before expiry.",
    icon: "⏳",
  },
];

// Services data
const servicesData = [
  { id: 1, name: "1-1 Year Offer", value: "Service Camp Forward" },
  { id: 2, name: "Coverage Radius", value: "Across India" },
  { id: 3, name: "Towing Assistance", value: "Unlimited KM" },
  { id: 4, name: "Free Fuel Delivery", value: "after" },
  { id: 5, name: "Washing / Dry Cleaning", value: "Yes" },
  { id: 6, name: "Discount on Labour (Service Bill)", value: "Yes" },
  { id: 7, name: "Discount on Labour (Spare Parts)", value: "Yes" },
  { id: 8, name: "Hotel Accommodation", value: "Yes" },
  { id: 9, name: "Taxi Assistance", value: "Yes" },
  { id: 10, name: "Labour & Service Charges", value: "Yes" },
  { id: 11, name: "Flat Type Assistance", value: "Yes" },
  { id: 12, name: "On-Site Minor Repairs", value: "Yes" },
  { id: 13, name: "Battery Jump Start", value: "Yes" },
  { id: 14, name: "Locked/Lost Key", value: "Yes" },
  { id: 15, name: "Natural Disasters or Act of GOD", value: "Yes" },
  { id: 16, name: "Emergency Medical Assistance", value: "Yes" },
  { id: 17, name: "Emergency Doctor Assistance", value: "Yes" },
  { id: 18, name: "Legal Assistance", value: "Yes" },
  { id: 19, name: "Water & Refreshments", value: "Yes" },
  { id: 20, name: "Mobile Charging", value: "Yes" },
  { id: 21, name: "Relay or Urgent Messages", value: "Yes" },
  { id: 22, name: "Onward/ Forward Journey", value: "Assistance" },
  { id: 23, name: "Arrangement of Rental Vehicle", value: "Assistance" },
];

const PolicyDocumentView = () => {
  const invoiceData: InvoiceData = {
    channel_partner_details: {
      company_name: "Hero",
      logo: "/images/hero.png",
    },
    subscription_details: {
      subscription_id: "DLHON00000831",
      plan_name: "SURE SHIELD MAX",
      subscription_issue_date: "02-05-2025 12:13:45",
      plan_start_date: "02-05-2025 12:13:45",
      plan_end_date: "01-05-2025 23:59:58",
    },
    vehicle_details: {
      vehicle_registration_number: "DLB05851661",
      manufacturer: "HONDA",
      model: "HORNET 2.0",
      engine_number: "AN1CJ88008521",
      chassis_number: "MDB358M11AR1D08522",
    },
    personal_details: {
      first_name: "NAVEEN",
      middle_name: "",
      last_name: "JANGRA",
      mobile_no: "*****0997",
      email_id: "nav*******@gmail.com",
      address: "H. NO 88, ISSA PUR H. NO 88, ISSA PUR H. NO 88,",
      city: "NEW DELHI",
      district: "",
      state: "DELHI",
      pin_code: "110073",
    },
    payment_details: {
      base_plan_amount: "839.83",
      cgst_amount: "75.85",
      sgst_amount: "75.85",
      igst_amount: "-",
      gst_number: "If applicable",
      total_plan_amount: "991.00",
      amount_in_words: "Rupees Nine Hundred Ninety One Only",
    },
  };
  const isMobile = useIsMobile();
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle:
      "rsa_subscription_print_policy_for_customer_" +
      invoiceData?.channel_partner_details?.company_name,
  });

const handlePrint = () => {
  if (isMobile) {
    if (contentRef.current) {
      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "0";
      document.body.appendChild(iframe);

      const doc = iframe.contentWindow?.document;
      if (!doc) {
        console.error("Unable to access iframe document");
        return;
      }

      // Get styles from main document
      const styles = Array.from(document.styleSheets)
        .map((styleSheet) => {
          try {
            if (styleSheet.cssRules) {
              return Array.from(styleSheet.cssRules)
                .map((rule) => rule.cssText)
                .join("\n");
            }
          } catch (e) {
            console.warn("Access to stylesheet denied", e);
          }
          return "";
        })
        .join("\n");

      const contentToPrint = contentRef.current.cloneNode(true) as HTMLElement;

      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Print</title>
            <style>
              ${styles}
              body { margin: 0; padding: 10px; }
              @media print {
                body { -webkit-print-color-adjust: exact; }
              }
            </style>
          </head>
          <body></body>
        </html>
      `);
      doc.body.appendChild(contentToPrint);
      doc.close();

      // Give the iframe time to render before printing
      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();

        // Clean up iframe after printing
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
      }, 500);
    }
  } else {
    reactToPrintFn();
  }
};


  return (
    <div className="max-w-3xl mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-center p-3">
        <Button className="cursor-pointer" onClick={handlePrint}>
          Save As PDF
          <SaveIcon />
        </Button>
      </div>
      <Card className="bg-white shadow-lg gap-2">
        <div ref={contentRef}>
          <style>
            {`
        @media print {
            html, body {
              -webkit-print-color-adjust: exact;
            }
            @page {
              margin-top: 0.5cm;
              margin-bottom: 0.5cm;
              size: a4;
            }
            h2, h3 {
              page-break-after: avoid;
            }
            .section {
              page-break-inside: avoid;
              margin-bottom: 1rem;
            }
          
            ul {
              page-break-inside: avoid;
            }
              /* Layout Protection */
            .print-protect {
              page-break-inside: avoid;
              break-inside: avoid;
            }
            
            /* Grid Systems */
            // .grid  {
            //    break-inside: avoid;
            //   page-break-inside: avoid;
            // }
            
            .grid-item {
              break-inside: avoid;
              page-break-inside: avoid;
            }
            
            /* Tables */
            // table {
            //   width: 100%;
            //   border-collapse: collapse;
            //   break-inside: avoid;
            // }
            th, td {
              font-size:9px;
            }

            h4, p, text {
            font-size:9px
            }
        
        }
      `}
          </style>
          <CardHeader className="flex items-center justify-between pb-4">
            <Image
              src={
                invoiceData?.channel_partner_details?.logo || "/images/hero.png"
              }
              height={60}
              width={60}
              alt={invoiceData?.channel_partner_details?.company_name}
              className="w-12 h-12 md:h-16 md:w-16"
            />
            <div className="flex items-center justify-center gap-2">
              <Image
                src={"/images/icon.png"}
                height={60}
                width={60}
                alt="icon"
                className="w-12 h-12 md:h-16 md:w-16"
              />
              <div>
                <h2 className="text-md md:text-lg font-bold">
                  Sure Drive Assist
                </h2>
                <h2 className="text-red-500 font-medium text-sm">
                  Help At Every Mile
                </h2>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {/* Subscription Details */}
            <div>
              <div className="bg-[#fe0000] border border-black">
                <p className="text-center text-white font-semibold text-sm sm:text-xs">
                  SUBSCRIPTION DETAILS
                </p>
              </div>
              <Table className="border border-black ">
                <TableHeader className="bg-[#ffffff]">
                  <TableRow className="border-b border-black">
                    <TableHead className="text-sm sm:text-xs font-bold text-center border border-black py-2 sm:py-0 h-auto">
                      Subscription Id
                    </TableHead>
                    <TableHead className="text-sm sm:text-xs font-bold text-center border border-black py-2 sm:py-0 h-auto">
                      Plan Name
                    </TableHead>
                    <TableHead className="text-sm sm:text-xs font-bold text-center border border-black py-2 sm:py-0 h-auto">
                      Subscription Issue Date
                    </TableHead>
                    <TableHead className="text-sm sm:text-xs font-bold text-center border border-black py-2 sm:py-0 h-auto">
                      Plan Start Date
                    </TableHead>
                    <TableHead className="text-sm sm:text-xs font-bold text-center border border-black py-2 sm:py-0 h-auto">
                      Plan End Date
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="bg-[#ffff00] hover:bg-[#ffff00] border border-black">
                    <TableCell className="text-sm sm:text-xs font-medium text-center border border-black py-2 sm:py-0 h-auto sm:whitespace-normal sm:w-[20%]">
                      {invoiceData.subscription_details.subscription_id}
                    </TableCell>
                    <TableCell className="text-sm sm:text-xs font-medium text-center border border-black py-2 sm:py-0 h-auto sm:whitespace-normal sm:w-[20%]">
                      {invoiceData.subscription_details.plan_name}
                    </TableCell>
                    <TableCell className="text-sm sm:text-xs font-medium text-center border border-black py-2 sm:py-0 h-auto sm:whitespace-normal sm:w-[20%]">
                      {invoiceData.subscription_details.subscription_issue_date}
                    </TableCell>
                    <TableCell className="text-sm sm:text-xs font-medium text-center border border-black py-2 sm:py-0 h-auto sm:whitespace-normal sm:w-[20%]">
                      {invoiceData.subscription_details.plan_start_date}
                    </TableCell>
                    <TableCell className="text-sm sm:text-xs font-medium text-center border border-black py-2 sm:py-0 h-auto sm:whitespace-normal sm:w-[20%]">
                      {invoiceData.subscription_details.plan_end_date}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Vehicle Details */}
            <div>
              <div className="bg-[#fe0000] border border-black">
                <p className="text-center text-white font-semibold text-sm sm:text-xs">
                  VEHICLE DETAILS
                </p>
              </div>
              <Table className="border border-black">
                <TableHeader className="bg-[#ffffff]">
                  <TableRow className="border-b border-black">
                    <TableHead className="text-sm sm:text-xs font-bold text-center border border-black py-2 sm:py-0 h-auto sm:whitespace-normal sm:w-[20%]">
                      Vehicle Registration Number
                    </TableHead>
                    <TableHead className="text-sm sm:text-xs font-bold text-center border border-black py-2 sm:py-0 h-auto sm:whitespace-normal sm:w-[20%]">
                      Manufacturer
                    </TableHead>
                    <TableHead className="text-sm sm:text-xs font-bold text-center border border-black py-2 sm:py-0 h-auto sm:whitespace-normal sm:w-[20%]">
                      Model
                    </TableHead>
                    <TableHead className="text-sm sm:text-xs font-bold text-center border border-black py-2 sm:py-0 h-auto sm:whitespace-normal sm:w-[20%]">
                      Engine Number
                    </TableHead>
                    <TableHead className="text-sm sm:text-xs font-bold text-center border border-black py-2 sm:py-0 h-auto sm:whitespace-normal sm:w-[20%]">
                      Chassis Number
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="bg-[#ffff00] hover:bg-[#ffff00] border border-black">
                    <TableCell className="text-sm sm:text-xs font-medium text-center border border-black py-2 sm:py-0 h-auto sm:whitespace-normal sm:w-[20%]">
                      {invoiceData.vehicle_details.vehicle_registration_number}
                    </TableCell>
                    <TableCell className="text-sm sm:text-xs font-medium text-center border border-black py-2 sm:py-0 h-auto sm:whitespace-normal sm:w-[20%]">
                      {invoiceData.vehicle_details.manufacturer}
                    </TableCell>
                    <TableCell className="text-sm sm:text-xs font-medium text-center border border-black py-2 sm:py-0 h-auto sm:whitespace-normal sm:w-[20%]">
                      {invoiceData.vehicle_details.model}
                    </TableCell>
                    <TableCell className="text-sm sm:text-xs font-medium text-center border border-black py-2 sm:py-0 h-auto sm:whitespace-normal sm:w-[20%]">
                      {invoiceData.vehicle_details.engine_number}
                    </TableCell>
                    <TableCell className="text-sm sm:text-xs font-medium text-center border border-black py-2 sm:py-0 h-auto sm:whitespace-normal sm:w-[20%]]">
                      {invoiceData.vehicle_details.chassis_number}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Personal Details */}
            <div>
              <div className="bg-[#fe0000] border border-black">
                <p className="text-center text-white font-semibold text-sm sm:text-xs">
                  {" "}
                  PERSONAL DETAILS
                </p>
              </div>

              <Table className="border border-black">
                <TableHeader className="bg-[#ffffff]">
                  <TableRow className="border border-black">
                    <TableHead className="text-sm sm:text-xs font-bold text-center border border-black py-2 sm:py-0 h-auto sm:whitespace-normal sm:w-[20%]">
                      First Name
                    </TableHead>
                    <TableHead className="text-sm sm:text-xs font-bold text-center border border-black py-2 sm:py-0 h-auto sm:whitespace-normal sm:w-[20%]">
                      Middle Name
                    </TableHead>
                    <TableHead className="text-sm sm:text-xs font-bold text-center border border-black py-2 sm:py-0 h-auto sm:whitespace-normal sm:w-[20%]">
                      Last Name
                    </TableHead>
                    <TableHead className="text-sm sm:text-xs font-bold text-center border border-black py-2 sm:py-0 h-auto sm:whitespace-normal sm:w-[20%]">
                      Mobile No
                    </TableHead>
                    <TableHead className="text-sm sm:text-xs font-bold text-center border border-black py-2 sm:py-0 h-auto sm:whitespace-normal sm:w-[20%]">
                      Email Id
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="bg-[#ffff00] hover:bg-[#ffff00] border border-black">
                    <TableCell className="text-sm sm:text-xs font-medium text-center border border-black py-2 sm:py-0 h-auto sm:whitespace-normal sm:w-[20%]">
                      {invoiceData.personal_details.first_name}
                    </TableCell>
                    <TableCell className="text-sm sm:text-xs font-medium text-center border border-black py-2 sm:py-0 h-auto sm:whitespace-normal sm:w-[20%]">
                      {invoiceData.personal_details.middle_name}
                    </TableCell>
                    <TableCell className="text-sm sm:text-xs font-medium text-center border border-black py-2 sm:py-0 h-auto sm:whitespace-normal sm:w-[20%]">
                      {invoiceData.personal_details.last_name}
                    </TableCell>
                    <TableCell className="text-sm sm:text-xs font-medium text-center border border-black py-2 sm:py-0 h-auto sm:whitespace-normal sm:w-[20%]">
                      {invoiceData.personal_details.mobile_no}
                    </TableCell>
                    <TableCell className="text-sm sm:text-xs font-medium text-center border border-black py-2 sm:py-0 h-auto sm:whitespace-normal sm:w-[20%]">
                      {invoiceData.personal_details.email_id}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Table className="border border-black">
                <TableHeader className="bg-[#ffffff]">
                  <TableRow className="border border-black">
                    <TableHead className="text-sm sm:text-xs font-bold text-center border border-black py-2 sm:py-0 h-auto">
                      Address
                    </TableHead>
                    <TableHead className="text-sm sm:text-xs font-bold text-center border border-black py-2 sm:py-0 h-auto">
                      City
                    </TableHead>
                    <TableHead className="text-sm sm:text-xs font-bold text-center border border-black py-2 sm:py-0 h-auto">
                      District
                    </TableHead>
                    <TableHead className="text-sm sm:text-xs font-bold text-center border border-black py-2 sm:py-0 h-auto">
                      State
                    </TableHead>
                    <TableHead className="text-sm sm:text-xs font-bold text-center border border-black py-2 sm:py-0 h-auto">
                      Pin Code
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="bg-[#ffff00] hover:bg-[#ffff00]">
                    <TableCell className="text-sm sm:text-xs font-medium text-center border border-black py-2 sm:py-0 h-auto sm:whitespace-normal sm:w-[20%]">
                      {invoiceData.personal_details.address}
                    </TableCell>
                    <TableCell className="text-sm sm:text-xs font-medium text-center border border-black py-2 sm:py-0 h-auto sm:whitespace-normal sm:w-[20%]">
                      {invoiceData.personal_details.city}
                    </TableCell>
                    <TableCell className="text-sm sm:text-xs font-medium text-center border border-black py-2 sm:py-0 h-auto sm:whitespace-normal sm:w-[20%]">
                      {invoiceData.personal_details.district}
                    </TableCell>
                    <TableCell className="text-sm sm:text-xs font-medium text-center border border-black py-2 sm:py-0 h-auto sm:whitespace-normal sm:w-[20%]">
                      {invoiceData.personal_details.state}
                    </TableCell>
                    <TableCell className="text-sm sm:text-xs font-medium text-center border border-black py-2 sm:py-0 h-auto sm:whitespace-normal sm:w-[20%]">
                      {invoiceData.personal_details.pin_code}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Payment Details */}
            <div>
              <div className="bg-[#fe0000] border border-black">
                <p className="text-center text-white font-semibold text-sm sm:text-xs">
                  PAYMENT DETAILS
                </p>
              </div>

              <Table className="border border-black">
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="w-[60%] py-0 h-0 border border-black border-b-transparent"></TableHead>
                    <TableHead className="text-right py-0 h-0 border border-black border-b-transparent"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border border-black py-2 sm:py-0 h-auto">
                    <TableCell className="text-sm sm:text-xs font-medium border border-black py-2 sm:py-0 h-auto">
                      Base Plan Amount
                    </TableCell>
                    <TableCell className="text-sm sm:text-xs font-medium text-right border border-black py-2 sm:py-0 h-auto bg-[#ffff00] hover:bg-[#ffff00]">
                      {invoiceData.payment_details.base_plan_amount}
                    </TableCell>
                  </TableRow>

                  {/* <TableRow className="border border-black py-2 sm:py-0 h-auto">
                  <TableCell className="text-white py-[2px] p-0 h-auto"></TableCell>
                  <TableCell></TableCell>
                </TableRow> */}

                  <TableRow className="border border-black py-2 sm:py-0 h-auto">
                    <TableCell className="text-sm sm:text-xs font-medium border border-black py-2 sm:py-0 h-auto">
                      Amount of CGST (9%)
                    </TableCell>
                    <TableCell className="text-sm sm:text-xs font-medium text-right border border-black py-2 sm:py-0 h-auto bg-[#ffff00] hover:bg-[#ffff00]">
                      {invoiceData.payment_details.cgst_amount}
                    </TableCell>
                  </TableRow>

                  {/* <TableRow className="border border-black py-2 sm:py-0 h-auto">
                  <TableCell className="text-white py-[2px] p-0 h-auto"></TableCell>
                  <TableCell></TableCell>
                </TableRow> */}

                  <TableRow className="border border-black py-2 sm:py-0 h-auto">
                    <TableCell className="text-sm sm:text-xs font-medium border border-red-900 py-2 sm:py-0 h-auto">
                      Amount of SGST (9%)
                    </TableCell>
                    <TableCell className="text-sm sm:text-xs font-medium text-right border border-black py-2 sm:py-0 h-auto bg-[#ffff00] hover:bg-[#ffff00]">
                      {invoiceData.payment_details.sgst_amount}
                    </TableCell>
                  </TableRow>

                  {/* <TableRow className="border border-black py-2 sm:py-0 h-auto">
                  <TableCell className="text-white py-[2px] p-0 h-auto"></TableCell>
                  <TableCell></TableCell>
                </TableRow> */}

                  <TableRow className="border border-black py-2 sm:py-0 h-auto">
                    <TableCell className="text-sm sm:text-xs font-medium border border-black py-2 sm:py-0 h-auto">
                      Amount of IGST (18%) if applicable
                    </TableCell>
                    <TableCell className="text-sm sm:text-xs font-medium text-right border border-black py-2 sm:py-0 h-auto bg-[#ffff00] hover:bg-[#ffff00]">
                      {invoiceData.payment_details.igst_amount}
                    </TableCell>
                  </TableRow>

                  {/* <TableRow className="border border-black py-2 sm:py-0 h-auto">
                  <TableCell className="text-white py-[2px] p-0 h-auto"></TableCell>
                  <TableCell></TableCell>
                </TableRow> */}

                  <TableRow className="border-b border-black">
                    <TableCell className="text-sm sm:text-xs font-medium border border-black py-2 sm:py-0 h-auto">
                      GST No. of the Service Recipient
                    </TableCell>
                    <TableCell className="text-sm sm:text-xs font-medium text-right border border-black py-2 sm:py-0 h-auto bg-[#ffff00] hover:bg-[#ffff00]">
                      {invoiceData.payment_details.gst_number}
                    </TableCell>
                  </TableRow>

                  {/* <TableRow className="border border-black py-2 sm:py-0 h-auto">
                  <TableCell className="text-white py-[2px] p-0 h-auto"></TableCell>
                  <TableCell></TableCell>
                </TableRow> */}

                  <TableRow className="border-b border-black">
                    <TableCell className="text-sm sm:text-xs font-medium border border-black py-2 sm:py-0 h-auto">
                      Total Plan Amount (Including GST)
                    </TableCell>
                    <TableCell className="text-sm sm:text-xs font-medium text-right border border-black py-2 sm:py-0 h-auto bg-[#ffff00] hover:bg-[#ffff00]">
                      {invoiceData.payment_details.total_plan_amount}
                    </TableCell>
                  </TableRow>

                  {/* <TableRow className="border border-black py-2 sm:py-0 h-auto">
                  <TableCell className="text-white py-[2px] p-0 h-auto"></TableCell>
                  <TableCell></TableCell>
                </TableRow> */}

                  <TableRow className="border-b border-black">
                    <TableCell className="text-sm sm:text-xs font-medium border border-black py-2 sm:py-0 h-auto">
                      Amount In Words
                    </TableCell>
                    <TableCell className="text-sm sm:text-xs font-medium text-right border border-black py-2 sm:py-0 h-auto bg-[#ffff00] hover:bg-[#ffff00]">
                      {invoiceData.payment_details.amount_in_words}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            {/* Accident Support */}
            <div>
              <div className="bg-[#fe0000] border border-black">
                <p className="text-center text-white font-semibold text-sm sm:text-xs">
                  ACCIDENTAL SUPPORT{" "}
                </p>
              </div>

              <div className="text-sm sm:text-xs border border-black p-2 font-medium space-y-1">
                <p>
                  In the event of an accident SureDrive Assist (SDA) shall
                  provide accident support services, along with supporting
                  features such as towing assistance medical emergency services
                  (including ambulance arrangements), and doctor assistance.
                </p>
                <p>
                  In case riders are not feeling well, SDA shall arrange for a
                  doctor consultation for
                  <span className="font-bold"> medical attention as well</span>.
                  For any assistance call our toll-free number:
                  <span className="font-bold text-red-600"> 1800-203-7601</span>
                </p>
              </div>
              <div className="w-full flex justify-end p-1">
                <text className="text-sm sm:text-xs text-red-600 font-bold">
                  To Register Service Claim kindly scan the below QR code: OR
                  WHATSAPP CHAT
                </text>
              </div>
            </div>
            {/* SERVICE PROVIDER'S DETAILS Details */}
            <div>
              <div className="bg-[#fe0000] border border-black">
                <p className="text-center text-white font-semibold text-sm sm:text-xs">
                  SERVICE PROVIDER &apos;S DETAILS
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm">
                    SureDrive Assist Private Limited
                  </h4>
                  <p className="text-sm sm:text-xs font-medium">
                    1607, 10th Floor, Vipul Business Park, Central Park II,
                    Sector 48, Gurugram, Haryana 122018
                  </p>
                  <p className="text-sm sm:text-xs font-medium">
                    support@suredriveassist.com
                  </p>
                  <p className="text-sm sm:text-xs font-medium">
                    GSTNO: 06ABOCC8888A4F123 | CIN: U45209H50242PTC178595
                  </p>
                </div>
                <div className="p-2">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-14 h-14 mx-auto" />
                </div>
              </div>
            </div>

            {/* Partner Section */}
            <div className="text-center mb-2">
              <div className="bg-[#ffff00] border border-black">
                <p className="text-center text-gray-900 font-bold p-1 text-sm sm:text-xs">
                  CHARMEL PARTNER -{" "}
                  <span className="uppercase">
                    {invoiceData?.channel_partner_details?.company_name}{" "}
                  </span>
                </p>
              </div>
            </div>

            {/* Response Time */}
            <div className="text-center mb-2">
              <div className="border border-black">
                <p className="text-center text-gray-900 font-bold p-1 text-sm">
                  Guaranteed Response Time - 15 mins
                </p>
              </div>
            </div>

            {/* Services Section */}
            <div>
              <div className="bg-[#fe0000] border border-black">
                <p className="text-center text-white font-semibold text-[10px]">
                  {" "}
                  THE SERVICES PROVIDED UNDER THE ASSISTANCE ARE AS FOLLOWS:
                </p>
              </div>

              <Table>
                <TableHeader className="bg-[#ffffff]">
                  <TableRow>
                    <TableHead className="p-[1px] font-bold h-auto text-sm sm:text-xs">
                      Sr. No
                    </TableHead>
                    <TableHead className="p-[1px] font-bold h-auto text-sm sm:text-xs">
                      SERVICES
                    </TableHead>
                    <TableHead className="p-[1px] font-bold h-auto text-sm sm:text-xs">
                      SURE SHIELD MAX
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {servicesData.map((service, index) => (
                    <TableRow key={index}>
                      <TableCell className="border border-transparent text-sm sm:text-xs p-[1px] font-medium">
                        {service.id}
                      </TableCell>
                      <TableCell className="border border-transparent text-sm sm:text-xs p-[1px] font-medium">
                        {service.name}
                      </TableCell>
                      <TableCell className="border border-transparent text-sm sm:text-xs p-[1px] font-medium">
                        {service.value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {services.map((service, index) => (
                <div key={index} className="bg-white grid-item">
                  <div className="bg-[#fe0000]">
                    <p className="text-white font-medium px-1">
                      {service.title}
                    </p>
                  </div>
                  <div className="flex items-center mb-4 justify-between">
                    <div className="text-3xl mr-4">{service.icon}</div>
                    <div className="w-full">
                      <h4 className="text-sm sm:text-xs text-left font-medium text-left">
                        {service.description}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default PolicyDocumentView;
