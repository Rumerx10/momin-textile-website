"use client";
import { useContext, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HeroContext } from "@/context/HeroContext";
import toast from "react-hot-toast";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Input from "@/components/Input";
import BodyContent from "@/components/BodyContent";
import TipTapInputField from "@/components/TipTapInputField";
import ImageInputField from "@/components/ImageInputField";
import { useAddData } from "@/hooks/useApi";

const quotationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address").optional(),
  companyName: z.string().min(1, "Company name is required"),
  designation: z.string().min(1, "Designation is required"),
  message: z.string().optional(),
  files: z
    .array(z.instanceof(File))
    .max(5, "Maximum 5 files allowed")
    .optional(),
});

type QuotationFormData = z.infer<typeof quotationSchema>;

const QuotationRequest = () => {
  const { setTitle } = useContext(HeroContext);

  const methods = useForm<QuotationFormData>({
    resolver: zodResolver(quotationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      companyName: "",
      designation: "",
      message: "",
      files: [],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  // POST API hook
  const { mutate: submitQuotation, isPending: isSubmittingApi } = useAddData(
    ["quotations"],
    "/quotations",
  );

  useEffect(() => {
    setTitle("Quotation Request");
  }, [setTitle]);

  const onSubmit = (data: QuotationFormData) => {
    // Create FormData for multipart/form-data
    const formData = new FormData();

    // Add all text fields (matching API schema)
    formData.append("firstName", data.firstName);
    if (data.lastName) formData.append("lastName", data.lastName);
    formData.append("phone", data.phoneNumber); // API expects 'phone'
    if (data.email) formData.append("email", data.email);
    formData.append("companyName", data.companyName);
    formData.append("designation", data.designation);
    if (data.message) formData.append("message", data.message);

    // Add files (documents)
    if (data.files && data.files.length > 0) {
      data.files.forEach((file) => {
        formData.append("documents", file);
      });
    }

    submitQuotation(formData, {
      onSuccess: (response) => {
        console.log("API Response:", response);
        toast.success(response?.message || "Quotation submitted successfully!");
        reset(); // Reset form fields
      },
      onError: (error: any) => {
        console.error("Submission error:", error);
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to submit quotation. Please try again.";
        toast.error(errorMessage);
      },
    });
  };

  const handleCancel = () => {
    reset();
  };

  const isPending = isSubmitting || isSubmittingApi;

  return (
    <BodyContent
      title="Quotation Request"
      subTitle="At Momin Textile Mills Ltd, we make it simple for you to receive accurate pricing and production details tailored to your specific fabric requirements."
    >
      <div className="max-w-5xl w-full mx-auto">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 md:space-y-8"
          >
            {/* Row 1: First Name & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="First Name"
                name="firstName"
                placeholder="Enter Your First Name"
                required={true}
              />
              <Input
                label="Last Name"
                name="lastName"
                placeholder="Enter Your Last Name"
              />
            </div>

            {/* Row 2: Phone Number & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Phone Number"
                name="phoneNumber"
                placeholder="Enter Your Phone Number"
                required={true}
              />
              <Input
                label="Email"
                name="email"
                placeholder="Enter Your Email"
              />
            </div>

            {/* Row 3: Company Name & Designation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Company Name"
                name="companyName"
                placeholder="Enter Your Company Name"
                required={true}
              />
              <Input
                label="Designation"
                name="designation"
                placeholder="Enter Your Designation"
                required={true}
              />
            </div>

            {/* Upload Documents */}
            <ImageInputField
              name="files"
              required={false}
              label="Upload Documents"
              subLabel="Tax, TIN, Trade license (PDF or Images, max 10MB per file, max 5 files)"
              maxFiles={5}
            />

            {/* Divider */}
            <div className="border-t border-gray-200 my-6"></div>

            {/* Write Your Message */}
            <TipTapInputField
              label="Write Your Message"
              name="message"
              placeholder="Write your message here..."
            />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-8 py-3 border border-gray-300 rounded-lg text-pGray hover:border-pBlue hover:text-pBlue transition-colors duration-300 font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="px-8 py-3 bg-pBlue text-white rounded-lg hover:bg-pBlue/90 transition-colors duration-300 font-medium flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Submitting..." : "Submit"}
                <MdOutlineKeyboardArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </BodyContent>
  );
};

export default QuotationRequest;
