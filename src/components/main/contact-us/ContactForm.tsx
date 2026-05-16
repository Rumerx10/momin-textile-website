// components/forms/ContactForm.jsx
"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ContactFormFields from "./ContactFormFields";
import toast from "react-hot-toast";
import { ContactFormData, contactSchema } from "./Schema";
import { useAddData } from "@/hooks/useApi";

const ContactForm = () => {
  const methods = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const { mutate: submitContact, isPending } = useAddData(["contact-support"], "/contact-support");

  const onSubmit = async (data: ContactFormData) => {
    // Format data for API
    const apiData = {
      name: data.name,
      email: data.email,
      contactNumber: data.phone,
      message: data.message,
    };

    submitContact(apiData, {
      onSuccess: (response) => {
        toast.success(response?.message || "Message sent successfully!");
        methods.reset();
      },
      onError: (error: any) => {
        console.error("Submission error:", error);
        toast.error(error?.response?.data?.message || "Failed to send message. Please try again.");
      },
    });
  };

  return (
    <div className="flex-1">
      <h4 className="font-bold text-pBlue text-2xl md:text-3xl lg:text-4xl">
        Contact & Support
      </h4>
      <div>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="space-y-4 h-full mt-6"
          >
            <ContactFormFields />
            <button
              type="submit"
              disabled={isPending}
              className="bg-pBlue cursor-pointer w-full font-bold text-white px-4 py-2 rounded hover:bg-pBlue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Sending..." : "Submit"}
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ContactForm;