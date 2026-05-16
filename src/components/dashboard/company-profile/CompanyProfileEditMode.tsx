// components/company-profile/CompanyProfileEditMode.jsx
"use client";
import { FormProvider } from "react-hook-form";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Input from "@/components/Input";
import ImageInputField from "@/components/ImageInputField";
import TipTapInputField from "@/components/TipTapInputField";

interface CompanyProfileEditModeProps {
  methods: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  handlePdfRemove: (pdfUrl: string) => void;
  existingPdf: string;
  isSubmitting: boolean;
  isUpdating: boolean;
  handleSubmit: any;
}

function CompanyProfileEditMode({
  methods,
  onSubmit,
  onCancel,
  handlePdfRemove,
  existingPdf,
  isSubmitting,
  isUpdating,
  handleSubmit,
}: CompanyProfileEditModeProps) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Top Cancel Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-yellow-400 border border-gray-300 rounded-lg text-pBlue hover:text-white transition-colors duration-300 font-medium"
          >
            Cancel
          </button>
        </div>

        {/* PDF Upload */}
        <ImageInputField
          name="pdf"
          required={false}
          label="Company Brochure"
          subLabel="Upload PDF (max 10MB)"
          maxFiles={1}
          existingImages={existingPdf ? [existingPdf] : []}
          onImageRemove={handlePdfRemove}
        />

        {/* Heading */}
        <Input
          label="Heading"
          name="heading"
          placeholder="Enter heading"
          required={true}
        />

        {/* Caption */}
        <Input
          label="Caption"
          name="caption"
          placeholder="Enter caption"
          required={false}
        />

        {/* Description (Rich Text) */}
        <TipTapInputField
          label="Description"
          name="description"
          placeholder="Enter company description..."
        />

        {/* Bottom Action Buttons */}
        <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border bg-yellow-400 rounded-lg text-pBlue hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isUpdating}
            className="px-6 py-2 bg-pBlue text-white rounded-lg hover:bg-pBlue/90 transition-colors flex items-center gap-2"
          >
            {isSubmitting || isUpdating ? "Saving..." : "Save Changes"}
            <MdOutlineKeyboardArrowRight size={18} />
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

export default CompanyProfileEditMode;