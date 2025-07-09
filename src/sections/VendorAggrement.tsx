import React, { forwardRef, useImperativeHandle, useRef } from "react";
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

interface VendorData {
  channel_partner_details: ChannelPartnerDetails;
}

interface VendorAggrementProps {
  vendorData: VendorData;
}
export interface VendorAggrementHandle {
  handlePrint: () => void;
}

const VendorAggrement = forwardRef<VendorAggrementHandle, VendorAggrementProps>(
  ({ vendorData }, ref) => {
    const isMobile = useIsMobile();
    const contentRef = useRef<HTMLDivElement>(null);

    const reactToPrintFn = useReactToPrint({
      contentRef,
      documentTitle:
        "rsa_subscription_print_policy_for_customer_" +
        vendorData?.channel_partner_details?.company_name,
    });

    const handlePrint = () => {
      if (isMobile) {
        // Your existing mobile handling code
      } else {
        reactToPrintFn();
      }
    };

    useImperativeHandle(ref, () => ({
      handlePrint: () => {
        if (contentRef.current) {
          handlePrint();
        }
      },
    }));

    return (
      <div className="max-w-3xl mx-auto p-4 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-center p-3">
          <Button className="cursor-pointer" onClick={handlePrint}>
            Save As PDF
            <SaveIcon />
          </Button>
        </div>

        <Card className="bg-white shadow-lg gap-2">
          <div ref={contentRef} className="print-wrapper">
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

            h3, h2 {
            font-size:10px;
            
            }

            h4, p, text , li {
            font-size:9px
            }
        
        }
      `}
            </style>
            {/* Header */}
            <Header />
            {/* Content container with proper break control */}
            <div className="content-container">
              <CardContent>
                <div className="text-center mb-2">
                  <h1 className="text-2xl font-bold uppercase tracking-wider mb-2">
                    SERVICE PROVIDER AGREEMENT
                  </h1>
                  <p className="text-sm">
                    This Service Provider Agreement is made on the ___________
                    in Gurugram, Haryana.
                  </p>
                </div>

                {/* Between Section */}
                <div className="mb-2">
                  <h2 className="text-md font-semibold text-center mb-2">
                    BETWEEN
                  </h2>

                  {/* SDA Info */}
                  <div className="mb-4">
                    <p className="mb-1 text-sm">
                      <span className="font-semibold">
                        M/s SureDrive Assist Private Limited
                      </span>
                      , a company incorporated under the Companies Act, 2013,
                      having its registered office at Unit No.1007, 10th Floor,
                      Vipul Business Park, Sohna Road, Sector 48, Gurugram,
                      Haryana 122018, India, bearing Corporate Identification
                      Number (CIN) U45200HR2024PTC126936, and represented herein
                      by Mr/Ms. Name of Sales Head, Designation (hereinafter
                      referred to as the <span className="italic">"SDA"</span>,
                      which expression shall, unless repugnant to the context or
                      meaning thereof, be deemed to include its successor,
                      affiliates, and permitted assigns);
                    </p>
                  </div>

                  <div className="text-center font-semibold my-2 mt-0">
                    <h3>AND</h3>
                  </div>

                  {/* Vendor Info */}
                  <div>
                    <p className="mb-2 text-sm">
                      <span className="font-semibold">
                        Vendor's Full Legal Name
                      </span>
                      , a type of entity, e.g.,
                      company/LLP/individual/partnership,
                      incorporated/registered under the laws of India, having
                      its principal/registered office at Vendor's Address,
                      bearing registration number Insert Registration ID if
                      applicable, and represented herein by Name of authorized
                      signatory, Designation (hereinafter referred to as the{" "}
                      <span className="italic">"Vendor"</span>, which expression
                      shall, unless repugnant to the context or meaning thereof,
                      be deemed to include its successors, affiliates, and
                      permitted assigns)
                    </p>
                    <p className="mt-4 text-sm">
                      <span className="font-semibold">SDA</span> and{" "}
                      <span className="font-semibold">THE VENDOR</span> shall be
                      collectively referred to as the{" "}
                      <span className="font-semibold">"THE PARTIES"</span>:
                    </p>
                  </div>
                </div>

                {/* WHEREAS Section */}
                <div>
                  <h2 className="text-md font-semibold mb-4">WHEREAS</h2>

                  <div className="space-y-4 text-sm">
                    <p>
                      <span className="font-semibold">A.</span> SureDrive Assist
                      Private Limited (SDA) is a tech-enabled automotive service
                      provider operating in both B2B and B2B2C segments. While
                      Roadside Assistance (RSA) forms the backbone of our
                      offerings, we also deliver a comprehensive suite of
                      mobility support solutions including Warranty Management,
                      Electric Vehicle (EV) Support Services, Accident
                      Management and Insurance Facilitation. SDA collaborates
                      with OEMs, dealerships, workshops, fleet operators, and
                      insurance partners to offer seamless, scalable, and
                      value-driven vehicle support across the customer
                      lifecycle.
                    </p>

                    <p>
                      <span className="font-semibold">B.</span> The Vendor is a
                      service provider offering on-the-spot repair, towing/crane
                      services, Under lift vehicles custody services, and
                      possesses the necessary infrastructure, equipment, and
                      expertise to deliver such services in accordance with
                      applicable industry standards.
                    </p>

                    <p>
                      <span className="font-semibold">C.</span> The Vendor
                      agrees to render these assistance services using its own
                      resources, personnel, and equipment for the benefit of
                      SDA's clients as referred by SDA from time to time. The
                      Vendor further agrees to maintain round-the-clock (24x7)
                      availability, including on weekends and public holidays,
                      to ensure prompt and uninterrupted roadside assistance
                      support.
                    </p>
                    <p>
                      <span className="font-semibold">D.</span> The Parties have
                      agreed to formalize this working relationship under this{" "}
                      <span className="font-bold">
                        Service Provider Agreement
                      </span>
                      , whereby SDA shall engage the Vendor to perform the
                      aforementioned services for and on behalf of SDA's clients
                      as per the terms outlined herein.
                    </p>

                    <p className="mt-4">
                      <span className="font-semibold">E.</span> In consideration
                      of the services rendered, SDA agrees to pay the Vendor a{" "}
                      <span className="font-bold">
                        fixed fee and/or service-based charges
                      </span>
                      , as set out in{" "}
                      <span className="font-bold">Annexure II</span> to this
                      Agreement, subject to proper performance and timely
                      submission of documentation by the Vendor.
                    </p>

                    <p className="mt-4">
                      <span className="font-semibold">F.</span> The Parties
                      acknowledge and agree that this Agreement is{" "}
                      <span className="font-bold">complementary</span> to any
                      other{" "}
                      <span className="font-bold">
                        service-level arrangements
                      </span>{" "}
                      or communications previously entered into between the
                      Parties. Accordingly, the{" "}
                      <span className="font-bold">
                        termination of this Agreement
                      </span>{" "}
                      shall also result in the simultaneous termination of all
                      related service arrangements, including any prior or
                      parallel Service Provider Agreements, and vice versa.
                    </p>
                  </div>
                </div>

                {/* Agreement Section */}
                <div>
                  <div className="my-6">
                    <h2 className="text-md font-bold text-center uppercase mb-4">
                      NOW IT IS HEREBY AGREED BY AND BETWEEN THE PARTIES HERETO
                      AS FOLLOWS:
                    </h2>
                  </div>

                  <h3 className="text-md font-bold mb-3">
                    1.{" "}
                    <span className="underline">
                      DUTIES AND RESPONSIBILITIES OF THE VENDOR
                    </span>
                  </h3>

                  {/* Sub-clause 1.1 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      1.1{" "}
                      <span className="underline">Provision of Services:</span>
                    </p>
                    <p className="ml-4 text-sm">
                      The Vendor agrees to provide all services listed in{" "}
                      <span className="font-bold">Annexure II</span> to the
                      clients of SDA and its direct customers, ensuring the
                      services are performed diligently, professionally, and in
                      accordance with the standards expected by SDA.
                    </p>
                  </div>

                  {/* Sub-clause 1.2 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      1.2{" "}
                      <span className="underline">
                        Restriction on Subcontracting:
                      </span>
                    </p>
                    <p className="ml-4 text-sm">
                      The Vendor shall not subcontract, assign, or delegate any
                      of the obligations or services under this Agreement to any
                      third party or external entity without the prior written
                      approval of SDA. Any such unauthorized subcontracting
                      shall be treated as a material breach of this Agreement.
                    </p>
                  </div>

                  {/* Sub-clause 1.3 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      1.3{" "}
                      <span className="underline">
                        Communication of Delays:
                      </span>
                    </p>
                    <p className="ml-4 text-sm">
                      The Vendor shall promptly inform SDA of any expected or
                      actual delays in service delivery. Such communication must
                      include the specific reason for the delay and shall be
                      made in real time or at the earliest possible moment. The
                      Vendor shall take all reasonable steps to notify SDA
                      without undue delay, enabling SDA to communicate
                      appropriately with the affected customer.
                    </p>
                  </div>

                  {/* Sub-clause 1.4 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      1.4{" "}
                      <span className="underline">Job Sheet Completion:</span>
                    </p>
                    <p className="ml-4 text-sm">
                      For each service rendered, the Vendor shall accurately
                      complete a service/job sheet including all relevant
                      information such as time of arrival, nature of service,
                      customer details, distance covered, and any issues
                      encountered. The completed job sheet must be submitted
                      along with the invoice for payment processing.
                    </p>
                  </div>

                  {/* Sub-clause 1.5 */}
                  <div className="ml-4">
                    <p className="font-semibold mb-1">
                      1.5{" "}
                      <span className="underline">
                        Licensing and Regulatory Compliance:
                      </span>
                    </p>
                    <p className="ml-4 text-sm">
                      The Vendor shall obtain and maintain all required permits,
                      licenses, registrations, certifications, and statutory
                      authorizations necessary to lawfully operate and perform
                      services under this Agreement within the
                      designatedjurisdiction. The Vendor shall also ensure that
                      all employees or personnel deployed have undergone
                      necessary background checks and government verifications.
                    </p>
                  </div>

                  {/* Sub-clause 1.6 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      1.6 <span className="underline">Insurance Coverage:</span>
                    </p>
                    <p className="ml-4 text-sm">
                      The Vendor shall maintain valid and adequate trade
                      insurance and liability coverage at all times during the
                      term of this Agreement. The insurance must cover
                      third-party liabilities, damage to customer vehicles, and
                      any operational risks arising from service delivery.
                    </p>
                  </div>

                  {/* Sub-clause 1.7 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      1.7{" "}
                      <span className="underline">
                        Responsibility for Damages:
                      </span>
                    </p>
                    <p className="ml-4 text-sm">
                      The Vendor shall be fully responsible for any loss or
                      damage caused to a customer's vehicle while performing
                      repair or towing services. In cases where negligence or
                      mishandling by the Vendor or its staff is established, the
                      Vendor shall bear all liability and reimburse or
                      compensate the affected customer, including any incidental
                      losses. Additionally, the Vendor shall reimburse SDA for
                      any penalties or damages incurred by SDA as a result of
                      such incidents.
                    </p>
                  </div>

                  {/* Sub-clause 1.8 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      1.8{" "}
                      <span className="underline">
                        Prohibition on Direct Payments:
                      </span>
                    </p>
                    <p className="ml-4 text-sm">
                      The Vendor or its representatives shall not solicit or
                      accept any payment, in cash or otherwise, directly from
                      the customer under any circumstances. Any such conduct
                      shall constitute a breach of contract and may result in
                      immediate termination of the Agreement.
                    </p>
                  </div>

                  {/* Sub-clause 1.9 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      1.9{" "}
                      <span className="underline">
                        Availability and Equipment Condition:
                      </span>
                    </p>
                    <p className="ml-4 text-sm">
                      The Vendor shall ensure 24x7 availability of service. All
                      vehicles, tools, and equipment used for delivering
                      services must be in good working condition, clean, safe,
                      and compliant with applicable laws and road safety
                      regulations. The cost of maintenance and compliance shall
                      be borne solely by the Vendor.
                    </p>
                  </div>

                  {/* Sub-clause 1.10 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      1.10{" "}
                      <span className="underline">
                        Deployment of Skilled Personnel:
                      </span>
                    </p>
                    <p className="ml-4 mb-2">
                      The Vendor shall deploy qualified and trained personnel
                      for all services. This includes:
                    </p>
                    <ul className="ml-8 list-disc">
                      <li>
                        Skilled Technicians for Repair on Spot (ROS) services,
                      </li>
                      <li>
                        Drivers with valid and appropriate driving licenses for
                        towing operations, and
                      </li>
                      <li>
                        Skilled Helpers capable of operating and assisting with
                        towing vehicles.
                      </li>
                    </ul>
                  </div>

                  {/* Sub-clause 1.11 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      1.11{" "}
                      <span className="underline">
                        Priority and Timeliness:
                      </span>
                    </p>
                    <p className="ml-4 text-sm">
                      The Vendor shall provide services on a priority basis and
                      shall ensure minimum response time. All calls assigned by
                      SDA must be acknowledged promptly and acted upon within
                      the service timelines specified in Annexure II.
                    </p>
                  </div>

                  {/* Sub-clause 1.12 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      1.12{" "}
                      <span className="underline">
                        Service Level Compliance:
                      </span>
                    </p>
                    <p className="ml-4 text-sm">
                      The Vendor shall meet and maintain service performance as
                      per the standards and timelines mentioned in Annexure II.
                      Repeated failure to meet the agreed service levels may
                      result in review, penalty, or termination of the
                      Agreement.
                    </p>
                  </div>

                  {/* Sub-clause 1.13 */}
                  <div className="ml-4">
                    <p className="font-semibold mb-1">
                      1.13{" "}
                      <span className="underline">Invoicing Procedure:</span>
                    </p>
                    <p className="ml-4 text-sm">
                      The Vendor shall raise invoices for only those services
                      successfully completed and verified by SDA. The invoicing
                      shall strictly follow the format and rates specified in
                      Annexure II, along with all necessary supporting
                      documents.
                    </p>
                  </div>

                  {/* Sub-clause 1.14 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      1.14{" "}
                      <span className="underline">Substance Abuse Policy:</span>
                    </p>
                    <p className="ml-4 text-sm">
                      The Vendor shall ensure that none of its staff involved in
                      service delivery is under the influence of alcohol,
                      narcotics, drugs, or any other substance that may impair
                      their judgment, safety, or performance during service
                      delivery. Any violation shall be considered gross
                      misconduct.
                    </p>
                  </div>

                  {/* Sub-clause 1.15 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      1.15{" "}
                      <span className="underline">
                        Liability for Negligence:
                      </span>
                    </p>
                    <p className="ml-4 text-sm">
                      If any damage occurs to the customer's vehicle while being
                      towed or serviced, due to the negligence, recklessness, or
                      mishandling by the Vendor, the Vendor shall be liable for
                      all associated costs. Additionally, the Vendor shall bear
                      any consequential penalties, claims, or damages levied on
                      SDA as a direct result of such negligence.
                    </p>
                  </div>

                  {/* Clause 2 */}
                  <h3 className="text-md font-bold mb-3">
                    2.{" "}
                    <span className="underline">
                      DUTIES AND RESPONSIBILITIES OF SDA
                    </span>
                  </h3>

                  {/* Sub-clause 2.1 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      2.1 <span className="underline">Payment Obligation:</span>
                    </p>
                    <p className="ml-4 text-sm">
                      SDA shall make payments to the Vendor for services that
                      are duly completed and verified, subject to the submission
                      of a correct, complete, and signed invoice by the Vendor.
                      The payment shall be made in accordance with the rates and
                      terms specified in Annexure II of this agreement.
                    </p>
                  </div>

                  {/* Sub-clause 2.2 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      2.2{" "}
                      <span className="underline">
                        Invoice Submission by Vendor:
                      </span>
                    </p>
                    <p className="ml-4 mb-2">
                      The Vendor shall raise a monthly consolidated invoice for
                      all assistance services rendered during the preceding
                      month. Each invoice must adhere to the format prescribed
                      by SDA and shall include all necessary supporting
                      documents such as:
                    </p>
                    <ul className="ml-8 list-disc">
                      <li>Signed and completed job sheets,</li>
                      <li>Service logs or reports,</li>
                      <li>Customer and vehicle details,</li>
                      <li>Distance covered (where applicable), and</li>
                      <li>
                        Any additional documentation requested by SDA from time
                        to time.
                      </li>
                    </ul>
                  </div>

                  {/* Sub-clause 2.3 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      2.3{" "}
                      <span className="underline">
                        Invoice Submission Address:
                      </span>
                    </p>
                    <p className="ml-4 mb-2">
                      All invoices along with the required documentation must be
                      sent to the following address:
                    </p>
                    <div className="ml-8 bg-gray-50 p-3 rounded">
                      <p className="font-medium">Finance Team</p>
                      <p>SureDrive Assist Private Limited</p>
                      <p>Unit No. 1007, 10th Floor, Vipul Business Park,</p>
                      <p>
                        Sohna Road, Sector-48, Gurugram, Haryana – 122018, India
                      </p>
                      <p>GSTN : 06ABOCS8688N123</p>
                      <p>Email id: Eindos@suredriveassist.com</p>
                    </div>
                  </div>

                  {/* Sub-clause 2.4 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      2.4{" "}
                      <span className="underline">
                        Payment Timeline and Mode:
                      </span>
                    </p>
                    <p className="ml-4 text-sm">
                      Upon receipt of a complete, accurate, and verified invoice
                      package—either in physical or electronic form—SDA shall
                      process and release payment to the Vendor within thirty
                      (30) working days, provided that no discrepancies or
                      disputes are found in the documentation submitted.
                    </p>
                    <p className="ml-4 mt-2">
                      The payment shall be made via NET/RTGS/IMPS or any other
                      mutually agreed electronic mode to the bank account
                      provided by the Vendor under Annexure I of this Agreement.
                    </p>
                    <p className="ml-4 mt-2">
                      The Vendor shall ensure that the details provided in{" "}
                      <span className="font-bold">Annexure I</span> are accurate
                      and kept up to date at all times. In the event of any
                      change in the Vendor's bank or tax details, the Vendor
                      shall notify SDA in writing at least five (5) working days
                      in advance, along with supporting documentation. SDA shall
                      not be liable for any payment delay or failure due to
                      incorrect or outdated bank information provided by the
                      Vendor.
                    </p>
                  </div>

                  {/* Sub-clause 2.5 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      2.5{" "}
                      <span className="underline">
                        Restrictions on invoicing:
                      </span>
                    </p>
                    <p className="ml-6 mb-1">
                      i. The Vendor shall not raise an invoice for any service
                      for which it has received payment directly from the end
                      customer. Such cases must be excluded from the monthly
                      invoice submitted to SDA.
                    </p>
                    <p className="ml-6">
                      ii. Mileage or distance-based service billing shall be
                      calculated using commonly accepted digital mapping
                      applications (e.g., Google Maps etc.). The distance
                      calculation determined by SDA using such software shall be
                      final and binding on both Parties.
                    </p>
                  </div>

                  {/* Sub-clause 2.6 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      2.6{" "}
                      <span className="underline">
                        Dispute Resolution on Billing:
                      </span>
                    </p>
                    <p className="ml-4 text-sm">
                      In case of any billing discrepancies or queries raised by
                      SDA, the Vendor shall provide clarifications or revised
                      documentation within a reasonable timeframe. SDA reserves
                      the right to withhold disputed portions of any invoice
                      pending resolution, while processing undisputed amounts as
                      per the payment terms.
                    </p>
                  </div>

                  {/* Clause 3 */}
                  <h3 className="text-md font-bold mb-3">
                    3.{" "}
                    <span className="underline">LIMITATIONS ON LIABILITY</span>
                  </h3>

                  {/* Sub-clause 3.1 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      3.1{" "}
                      <span className="underline">
                        Exclusion of SDA's Liability:
                      </span>
                    </p>
                    <p className="ml-4 text-sm">
                      SDA shall not be liable or held responsible for any injury
                      (including personal injury), loss, damage, or harm caused
                      to any person, property, or vehicle arising out of, or in
                      connection with, the services provided by the Vendor, its
                      employees, agents, contractors, or representatives. The
                      Vendor acknowledges that all services are performed
                      independently, and at the sole risk and responsibility of
                      the Vendor.
                    </p>
                  </div>

                  {/* Sub-clause 3.2 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      3.2{" "}
                      <span className="underline">
                        Responsibility for Personnel:
                      </span>
                    </p>
                    <p className="ml-4 text-sm">
                      The Vendor shall ensure that all individuals engaged in
                      providing services under this Agreement are either its
                      direct employees or legally authorized representatives.
                      SDA shall not be responsible for, nor shall it have any
                      legal or financial liability arising from, the acts,
                      omissions, negligence, misconduct, or failure to perform
                      by the Vendor's personnel, agents, or sub-agents.
                    </p>
                  </div>

                  {/* Sub-clause 3.3 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      3.3 <span className="underline">Indemnification:</span>
                    </p>
                    <p className="ml-4 text-sm">
                      The Vendor shall fully indemnify, defend, and hold
                      harmless SDA, its directors, officers, employees, and
                      representatives from and against any and all claims,
                      liabilities, losses, damages, penalties, costs, or
                      expenses (including reasonable legal fees) arising out of:
                    </p>
                    <ul className="ml-8 list-disc mt-2">
                      <li>
                        Any breach by the Vendor of its obligations under this
                        Agreement;
                      </li>
                      <li>
                        Any negligent act, omission, misconduct, or willful
                        default by the Vendor or its personnel;
                      </li>
                      <li>
                        Any claim by third parties (including customers) arising
                        from damage to property or injury caused during service
                        execution;
                      </li>
                      <li>
                        Any non-compliance with applicable laws, regulations, or
                        contractual obligations by the Vendor.
                      </li>
                    </ul>
                  </div>

                  {/* Clause 4 */}
                  <h3 className="text-md font-bold mb-3">
                    4. <span className="underline">CONFIDENTIALITY</span>
                  </h3>

                  {/* Sub-clause 4.1 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      4.1{" "}
                      <span className="underline">
                        Confidential Nature of Information:
                      </span>
                    </p>
                    <p className="ml-4 text-sm">
                      Each Party acknowledges that, in the course of performing
                      its obligations under this Agreement, it may receive or
                      have access to certain non-public, proprietary, or
                      confidential information of the other Party. Both Parties
                      agree that the terms of this Agreement and all information
                      exchanged in connection with its performance shall be
                      treated as confidential and proprietary ("Confidential
                      Information").
                    </p>
                  </div>

                  {/* Sub-clause 4.2 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      4.2{" "}
                      <span className="underline">
                        Scope of Confidential Information:
                      </span>
                    </p>
                    <p className="ml-4 mb-2">
                      Confidential Information shall include, but is not limited
                      to:
                    </p>
                    <ul className="ml-8 list-disc">
                      <li>Customer-related data and personal information;</li>
                      <li>Vehicle information and service history;</li>
                      <li>
                        Business models, pricing structures, financial records,
                        and operational procedures;
                      </li>
                      <li>
                        Details of existing or potential commercial contracts or
                        partnerships;
                      </li>
                      <li>
                        Any other data disclosed in written, oral, visual, or
                        electronic form that is designated as confidential or
                        that should reasonably be understood as confidential
                        under the circumstances.
                      </li>
                    </ul>
                  </div>

                  {/* Sub-clause 4.3 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      4.3{" "}
                      <span className="underline">
                        Obligation to Maintain Confidentiality:
                      </span>
                    </p>
                    <p className="ml-4 text-sm">
                      Each Party shall use the Confidential Information solely
                      for the purposes of fulfilling its obligations under this
                      Agreement and shall restrict disclosure to only those
                      employees, officers, or authorized agents who have a
                      legitimate need to know such information and are bound by
                      obligations of confidentiality no less stringent than
                      those set forth herein.
                    </p>
                  </div>

                  {/* Sub-clause 4.4 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      4.4{" "}
                      <span className="underline">Remedies for Breach:</span>
                    </p>
                    <p className="ml-4 text-sm">
                      The Parties acknowledge that unauthorized use, disclosure,
                      or misappropriation of Confidential Information may cause
                      immediate and irreparable harm to the disclosing Party,
                      for which monetary damages may not be an adequate remedy.
                      In such cases, the disclosing Party shall be entitled to
                      seek injunctive relief and other equitable remedies, in
                      addition to any legal remedies available under applicable
                      law.
                    </p>
                  </div>

                  {/* Sub-clause 4.5 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      4.5{" "}
                      <span className="underline">
                        Notification and Mitigation:
                      </span>
                    </p>
                    <p className="ml-4 text-sm">
                      In the event a Party becomes aware of any unauthorized
                      access to, disclosure of, or misuse of Confidential
                      Information, such Party shall promptly notify the other in
                      writing and take all necessary steps, at its own expense,
                      to contain and mitigate the consequences of such breach.
                    </p>
                  </div>

                  {/* Sub-clause 4.6 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      4.6{" "}
                      <span className="underline">
                        Exclusions from Confidentiality Obligations:
                      </span>
                    </p>
                    <p className="ml-4 text-sm">
                      The obligations under this Clause shall not apply to
                      information that:
                    </p>
                    <ol className="ml-8 list-decimal mt-2">
                      <li>
                        Was already known to the receiving Party prior to
                        disclosure, as evidenced by written records;
                      </li>
                      <li>
                        Is or becomes publicly available through no fault or
                        breach of the receiving Party;
                      </li>
                      <li>
                        Is rightfully received from a third party without
                        restriction and without breach of any confidentiality
                        obligation; or
                      </li>
                      <li>
                        Is required to be disclosed by law, court order, or
                        governmental authority, provided that the receiving
                        Party gives prompt written notice to the disclosing
                        Party (unless prohibited by law) to allow it to seek a
                        protective order or other appropriate remedy.
                      </li>
                    </ol>
                  </div>

                  {/* Clause 5 */}
                  <h3 className="text-md font-bold mb-3">
                    5. <span className="underline">TENURE AND TERMINATION</span>
                  </h3>

                  {/* Sub-clause 5.1 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">5.1</p>
                    <p className="ml-4 text-sm">
                      This Agreement will begin on ______{" "}
                      <span className="font-bold">(Effective Date)</span> and
                      will remain in effect until either SDA or the Vendor
                      decides to end it by giving 30 days' written notice to the
                      other Party. No reason needs to be given for ending the
                      Agreement, but the notice must be clear and in writing.
                    </p>
                  </div>

                  {/* Sub-clause 5.2 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">5.2</p>
                    <p className="ml-4 text-sm">
                      This Agreement will be governed by the laws of India. Both
                      Parties agree to follow and comply with all applicable
                      laws and regulations.
                    </p>
                  </div>

                  {/* Sub-clause 5.3 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">5.3</p>
                    <p className="ml-4 text-sm">
                      If any disagreement or dispute arises between SDA and the
                      Vendor regarding the meaning, performance, or any part of
                      this Agreement, both Parties will try to resolve the issue
                      through discussion and mutual understanding.
                    </p>
                  </div>

                  {/* Sub-clause 5.4 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">5.4</p>
                    <p className="ml-4 text-sm">
                      If the matter cannot be resolved through discussion, the
                      issue will be taken to the courts located in Gurugram,
                      Haryana, and both Parties agree that only those courts
                      will have the authority to settle the matter.
                    </p>
                  </div>

                  {/* Clause 6 */}
                  <h3 className="text-md font-bold mb-3">
                    6. <span className="underline">NOTICES</span>
                  </h3>

                  {/* Sub-clause 6.1 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">6.1</p>
                    <p className="ml-4 text-sm">
                      Any notice, request, demand, or other communication
                      required or permitted under this Agreement shall be in
                      writing and shall be deemed duly given if delivered by one
                      of the following methods:
                    </p>
                    <p className="ml-6 text-sm">
                      (a) Personal Delivery – Delivered in person to the address
                      of the receiving Party as specified below;
                    </p>
                    <p className="ml-6 text-sm">
                      (b) Registered or Certified Mail – Sent via registered or
                      certified mail, return receipt requested, to the address
                      specified below;
                    </p>
                    <p className="ml-6 text-sm">
                      (c) Email – Sent to the official email address provided by
                      each Party, provided that the sender receives an
                      electronic confirmation of receipt.
                    </p>
                  </div>

                  {/* Sub-clause 6.2 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      6.2{" "}
                      <span className="underline">
                        Effective Date of Notice:
                      </span>{" "}
                      Such notices shall be effective:
                    </p>
                    <ul className="ml-8 list-disc">
                      <li className="text-sm">
                        On the date of delivery, if delivered personally;
                      </li>
                      <li className="text-sm">
                        On the date of receipt, as evidenced by postal
                        acknowledgement, if sent by registered/certified mail;
                      </li>
                      <li className="text-sm">
                        On the date of confirmed receipt if sent by email.
                      </li>
                    </ul>
                  </div>

                  {/* Sub-clause 6.3 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      6.3{" "}
                      <span className="underline">Addresses for Notice:</span>
                    </p>
                    <div className="ml-6 grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium text-sm">If to SDA</p>
                        <p className="text-sm">Finance/Legal Team</p>
                        <p className="text-sm">
                          SureDrive Assist Private Limited:
                        </p>
                        <p className="text-sm">
                          Unit No. 1007, 10th Floor, Vipul Business Park,
                        </p>
                        <p className="text-sm">
                          Sohna Road, Sector 48, Gurugram, Haryana –
                        </p>
                        <p className="text-sm">122004, India</p>
                        <p className="text-sm">
                          Email: FinOps@suredriveassist.com
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">If to the Vendor:</p>
                        <p className="text-sm">[Vendor's Full Name]</p>
                        <p className="text-sm">[Vendor's Address]</p>
                        <p className="text-sm">
                          Email: [Vendor's Email Address]
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Sub-clause 6.4 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">6.4</p>
                    <p className="ml-4 text-sm">
                      Either Party may change its address or email for notice by
                      giving the other Party written notice of the new contact
                      details in accordance with this Clause.
                    </p>
                  </div>

                  {/* Clause 7 */}
                  <h3 className="text-md font-bold mb-3">
                    7.{" "}
                    <span className="underline">
                      REGULATORY PERMITS, INSURANCE, AND STATUTORY COMPLIANCE
                    </span>
                  </h3>

                  {/* Sub-clause 7.1 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      7.1{" "}
                      <span className="underline">
                        Permits and Authorizations:
                      </span>
                    </p>
                    <p className="ml-4 text-sm">
                      The Vendor affirms that it has obtained, and shall
                      maintain at its own cost, all necessary licenses, permits,
                      approvals, and authorizations required for operating its
                      services from the appropriate Road Transport Authorities
                      (RTO) and any other applicable regulatory or statutory
                      bodies within the designated area of operation.
                    </p>
                  </div>

                  {/* Sub-clause 7.2 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      7.2{" "}
                      <span className="underline">
                        Compliance with Applicable Laws:
                      </span>
                    </p>
                    <p className="ml-4 text-sm">
                      The Vendor shall be solely responsible for ensuring full
                      compliance with all applicable central, state, and local
                      laws, rules, and regulations governing the usage,
                      operation, and maintenance of its service vehicles and
                      equipment. This includes compliance with labour laws,
                      transport regulations, motor vehicle rules, insurance
                      laws, pollution control norms, and any other relevant
                      statutory obligations.
                    </p>
                  </div>

                  {/* Sub-clause 7.3 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      7.3 <span className="underline">Insurance Coverage:</span>
                    </p>
                    <p className="ml-4 text-sm">
                      The Vendor shall ensure that all vehicles used for service
                      delivery are appropriately insured for commercial use and
                      covered under valid Third-Party Liability and
                      Comprehensive Insurance Policies, including but not
                      limited to Workmen's Compensation, Public Liability, and
                      Goods in Transit (if applicable). SDA shall not be liable
                      for any claims arising due to the Vendor's failure to
                      maintain valid insurance coverage.
                    </p>
                  </div>

                  {/* Sub-clause 7.4 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      7.4{" "}
                      <span className="underline">
                        Taxes and Government Levies:
                      </span>
                    </p>
                    <p className="ml-4 text-sm">
                      The Vendor shall bear sole responsibility for timely
                      payment of all applicable taxes, levies, fees, penalties,
                      or statutory dues in connection with its business
                      operations, including but not limited to road tax, service
                      tax, GST, permit charges, tolls, penalties, and other
                      government-imposed charges.
                    </p>
                  </div>

                  {/* Sub-clause 7.5 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      7.5{" "}
                      <span className="underline">Evidence of Compliance:</span>
                    </p>
                    <p className="ml-4 text-sm">
                      SDA reserves the right, at any time during the term of
                      this Agreement, to request documentary proof or
                      certifications from the Vendor to confirm adherence to the
                      above compliance requirements. The Vendor shall promptly
                      provide such documentation upon request, failing which SDA
                      may withhold payments or suspend the engagement until
                      compliance is confirmed.
                    </p>
                  </div>

                  {/* Sub-clause 7.6 */}
                  <div className="ml-4 mb-4">
                    <p className="font-semibold mb-1">
                      7.6{" "}
                      <span className="underline">
                        Indemnity for Non-Compliance:
                      </span>
                    </p>
                    <p className="ml-4 text-sm">
                      Any damages, penalties, losses, or liabilities incurred by
                      SDA due to the Vendor's non-compliance with any legal,
                      regulatory, or insurance-related requirement shall be
                      fully indemnified by the Vendor.
                    </p>
                  </div>

                  {/* Clause 8 */}
                  <h3 className="text-md font-bold mb-3">
                    8.{" "}
                    <span className="underline">TRANSFER AND SUB-LETTING</span>
                  </h3>

                  {/* Sub-clause 8.1 */}
                  <div className="ml-4 mb-4">
                    <p className="ml-4 text-sm">
                      <span className="font-semibold mr-1">8.1</span> The Vendor
                      shall not transfer, assign, delegate, or subcontract any
                      of its rights, obligations, or interests under this
                      Agreement, in whole or in part, to any third party without
                      the prior written consent of SDA.
                    </p>
                  </div>

                  {/* Sub-clause 8.2 */}
                  <div className="ml-4 mb-4">
                    <p className="ml-4 text-sm">
                      <span className="font-semibold mr-1">8.2</span>
                      Any attempted assignment or sub-letting without such prior
                      written consent shall be null and void and shall
                      constitute a material breach of this Agreement, entitling
                      SDA to terminate the Agreement forthwith, without
                      prejudice to any other rights or remedies available under
                      law or equity.
                    </p>
                  </div>

                  {/* Sub-clause 8.3 */}
                  <div className="ml-4 mb-4">
                    <p className="ml-4 text-sm">
                      <span className="font-semibold mr-1">8.3</span>
                      Notwithstanding any approved assignment or subcontracting,
                      the Vendor shall remain fully responsible and liable for
                      the performance of all obligations under this Agreement.
                    </p>
                  </div>

                  {/* Clause 9 */}
                  <h3 className="text-md font-bold mb-3">
                    9.{" "}
                    <span className="underline">MODIFICATION OF AGREEMENT</span>
                  </h3>

                  {/* Sub-clause 9.1 */}
                  <div className="ml-4 mb-4">
                    <p className="ml-4 text-sm">
                      <span className="font-semibold mr-1">9.1</span> No
                      amendment, modification, or supplement to this Agreement
                      shall be valid or binding unless it is made in writing and
                      signed by duly authorized representatives of both Parties.
                    </p>
                  </div>

                  {/* Sub-clause 9.2 */}
                  <div className="ml-4 mb-4">
                    <p className="ml-4 text-sm">
                      <span className="font-semibold mr-1">9.2</span> Such
                      modifications may be executed by way of an addendum,
                      letter agreement, or any other form of written
                      correspondence explicitly stating the intention to amend
                      this Agreement.
                    </p>
                  </div>

                  {/* Sub-clause 9.3 */}
                  <div className="ml-4 mb-4">
                    <p className="ml-4 text-sm">
                      <span className="font-semibold mr-1">9.3</span>Any valid
                      modification so executed shall be deemed to form an
                      integral part of this Agreement and shall have the same
                      legal effect as if originally incorporated herein.
                    </p>
                  </div>

                  {/* Clause 10 */}
                  <h3 className="text-md font-bold mb-3">
                    10.{" "}
                    <span className="underline">
                      JURISDICTION AND GOVERNING LAW
                    </span>
                  </h3>

                  {/* Sub-clause 10.1 */}
                  <div className="ml-4 mb-4">
                    <p className="ml-4 text-sm">
                      <span className="font-semibold mr-1">10.1</span> This
                      Agreement shall be governed by and construed in accordance
                      with the laws of India.
                    </p>
                  </div>

                  {/* Sub-clause 10.2 */}
                  <div className="ml-4 mb-4">
                    <p className="ml-4 text-sm">
                      <span className="font-semibold mr-1">10.2</span> Any
                      dispute, controversy, or claim arising out of or in
                      connection with this Agreement, including its
                      interpretation, performance, breach, or termination, shall
                      be subject to the exclusive jurisdiction of the competent
                      courts located in Gurugram, Haryana, India.
                    </p>
                  </div>

                  {/* Sub-clause 10.3 */}
                  <div className="ml-4 mb-4">
                    <p className="ml-4 text-sm">
                      <span className="font-semibold mr-1">10.3</span> Each
                      Party irrevocably submits to the jurisdiction of such
                      courts and waives any objection to the venue or
                      convenience of such forum.
                    </p>
                  </div>

                  {/* Clause 11 */}
                  <h3 className="text-md font-bold mb-3">
                    11. <span className="underline">FORCE MAJEURE</span>
                  </h3>

                  <div className="ml-4 mb-4">
                    <p className="text-sm">
                      Neither Party shall be liable for any delay or failure to
                      perform its obligations under this Agreement if such delay
                      or failure is caused by an event beyond its reasonable
                      control, including but not limited to acts of God, war,
                      strikes, riots, pandemics, natural disasters, or
                      governmental restrictions ("Force Majeure Event"). The
                      affected Party shall notify the other Party promptly and
                      take reasonable steps to mitigate the impact. If a Force
                      Majeure Event continues for more than 30 days, either
                      Party may terminate this Agreement without liability.
                    </p>
                  </div>

                  {/* Clause 12 */}
                  <h3 className="text-md font-bold mb-3">
                    12.{" "}
                    <span className="underline">
                      NON-SOLICITATION / NON-COMPETE
                    </span>
                  </h3>

                  <div className="ml-4 mb-4">
                    <p className="text-sm">
                      During the term of this Agreement and for a period of 12
                      months thereafter, the Vendor shall not directly or
                      indirectly solicit, engage, or provide similar services to
                      any customer introduced or referred by SDA, without SDA's
                      prior written consent.
                    </p>
                  </div>

                  {/* Clause 13 */}
                  <h3 className="text-md font-bold mb-3">
                    13. <span className="underline">ENTIRE AGREEMENT</span>
                  </h3>

                  <div className="ml-4 mb-4">
                    <p className="text-sm">
                      This Agreement, including all annexures and schedules
                      hereto, constitutes the entire agreement between the
                      Parties with respect to the subject matter hereof and
                      supersedes all prior understandings, representations, or
                      agreements, whether written or oral.
                    </p>
                  </div>

                  {/* Clause 14 */}
                  <h3 className="text-md font-bold mb-3">
                    14. <span className="underline">SEVERABILITY</span>
                  </h3>

                  <div className="ml-4 mb-4">
                    <p className="text-sm">
                      If any provision of this Agreement is held to be invalid,
                      illegal, or unenforceable by a court of competent
                      jurisdiction, the remaining provisions shall remain in
                      full force and effect.
                    </p>
                  </div>

                  {/* Clause 15 */}
                  <h3 className="text-md font-bold mb-3">
                    15. <span className="underline">WAIVER</span>
                  </h3>

                  <div className="ml-4 mb-4">
                    <p className="text-sm">
                      No failure or delay by either Party in exercising any
                      right under this Agreement shall operate as a waiver of
                      that right, nor shall any single or partial exercise of
                      any right preclude any other or further exercise of that
                      or any other right.
                    </p>
                  </div>

                  {/* Signatures */}
                  <div className="mt-12">
                    <h3 className="text-sm font-semibold mb-8">
                      <span className="font-semibold mr-1">
                        IN WITNESS WHEREOF,
                      </span>
                      THE PARTIES have signed this Agreement in acceptance of
                      all the terms and conditions stated hereinabove on the day
                      and place mentioned above.
                    </h3>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-left border flex flex-col items-start justify-between gap-2">
                        <p className="font-bold mb-1 text-sm">
                          For and on behalf of SureDrive Assist Private Limited
                        </p>
                        <div className="space-y-1">
                          <p className="text-sm">
                            Authorized Signatory Name: ________________________
                          </p>
                          <p className="text-sm">Designation: Sales Head</p>
                          <p className="text-sm">Date: ______</p>
                          <p className="text-sm">Place: ______</p>
                        </div>
                      </div>

                      <div className="text-left border flex flex-col items-start justify-between gap-2">
                        <p className="font-bold mb-1 text-sm">
                          For and on behalf of VENDOR NAME
                        </p>
                        <div className="space-y-1">
                          <p className="text-sm">
                            Authorized Signatory Name: ______
                          </p>
                          <p className="text-sm">Designation: ______</p>
                          <p className="text-sm">Date: ______</p>
                          <p className="text-sm">Place: ______</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>

            {/* Footer */}
            <Footer />
          </div>
        </Card>
      </div>
    );
  }
);

const Header = () => {
  return (
    <div className="print-header">
      <div className="flex items-center justify-between pb-4">
        <Image
          src={"/images/hero.png"}
          height={60}
          width={60}
          className="w-12 h-12 md:h-16 md:w-16"
          alt="cjkbjc"
        />
        <div className="flex items-center justify-center gap-2">
          <Image
            src={"/images/logo.svg"}
            height={200}
            width={200}
            alt="icon"
            className="w-12 h-12 md:h-46 md:w-46"
          />
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return <div className="print-footer"></div>;
};

VendorAggrement.displayName = "VendorAggrement";
export default VendorAggrement;
