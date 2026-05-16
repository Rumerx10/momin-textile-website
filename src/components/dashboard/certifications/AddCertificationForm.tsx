// app/dashboard/certifications/AddCertificationForm.jsx
"use client";
import { useContext, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HeroContext } from "@/context/HeroContext";
import toast from "react-hot-toast";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Input from "@/components/Input";
import ImageInputField from "@/components/ImageInputField";
import TipTapInputField from "@/components/TipTapInputField";
import { useAddData, usePatchData } from "@/hooks/useApi";

// Zod Schema
const certificationSchema = z.object({
  heading: z.string().min(1, "Heading is required"),
  subheading: z.string().min(1, "Subheading is required"),
  description: z.string().min(1, "Description is required"),
  logo: z.array(z.any()).max(1, "Only one logo allowed").optional(),
});

type CertificationFormData = z.infer<typeof certificationSchema>;

const AddCertificationForm = ({
  editData,
  onSuccess,
  onCancel,
}: {
  editData?: any;
  onSuccess: () => void;
  onCancel: () => void;
}) => {
  const { setTitle } = useContext(HeroContext);
  const isEditMode = !!editData;
  const [removedLogo, setRemovedLogo] = useState<string[]>([]);

  const methods = useForm<CertificationFormData>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      heading: editData?.heading || "",
      subheading: editData?.subheading || "",
      description: editData?.description || "",
      logo: [],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = methods;

  const { mutate: addCertification, isPending: isAdding } = useAddData(["certifications"], "/certifications");
  const { mutate: updateCertification, isPending: isUpdating } = usePatchData(["certifications"], "/certifications");

  const isPending = isSubmitting || isAdding || isUpdating;

  const getExistingLogo = () => {
    if (!isEditMode) return [];
    if (editData?.logo) return [editData.logo];
    return [];
  };

  const handleLogoRemove = (logoUrl: string) => {
    setRemovedLogo((prev) => [...prev, logoUrl]);
  };

  const extractFilenames = (urls: string[]) => {
    return urls.map(url => url.split("/").pop() || "").join(",");
  };

  useEffect(() => {
    setTitle(isEditMode ? "Edit Certification" : "Add New Certification");
  }, [setTitle, isEditMode]);

  const onSubmit = (data: CertificationFormData) => {
    const formData = new FormData();

    formData.append("heading", data.heading);
    formData.append("subheading", data.subheading);
    formData.append("description", data.description);

    if (data.logo && data.logo.length > 0) {
      const logoFile = data.logo[0];
      if (logoFile instanceof File) {
        formData.append("logo", logoFile);
      }
    }

    if (isEditMode && removedLogo.length > 0) {
      const filenamesToDelete = extractFilenames(removedLogo);
      formData.append("delImg", filenamesToDelete);
    }

    const mutation = isEditMode ? updateCertification : addCertification;
    const payload = isEditMode ? { id: editData.id, payload: formData } : formData;

    mutation(payload as any, {
      onSuccess: (response) => {
        toast.success(response?.message || `Certification ${isEditMode ? "updated" : "added"} successfully!`);
        reset();
        onSuccess();
      },
      onError: (error: any) => {
        console.error("Submission error:", error);
        toast.error(error?.response?.data?.message || `Failed to ${isEditMode ? "update" : "add"} certification`);
      },
    });
  };

  const handleCancel = () => {
    reset();
    setRemovedLogo([]);
    onCancel();
  };

  return (
    <div className="bg-white rounded-md p-6">
      {/* Top Cancel Button */}
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-2xl font-semibold text-pBlue">
          Add New Certification
        </h4>
        <button
          type="button"
          onClick={handleCancel}
          className="px-8 py-3 bg-yellow-400 border border-gray-300 rounded-lg text-pBlue hover:text-white transition-colors duration-300 font-medium cursor-pointer"
        >
          Cancel
        </button>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Upload Certificate Logo */}
          <ImageInputField
            name="logo"
            required={false}
            label="Upload Logo"
            subLabel="Here will be logo name after uploading Logo"
            maxFiles={1}
            existingImages={getExistingLogo()}
            onImageRemove={handleLogoRemove}
          />

          {/* Card Heading Text */}
          <Input
            label="Card Heading Text"
            name="heading"
            placeholder="Enter Heading Text"
            required={true}
          />

          {/* Sub Heading Text */}
          <Input
            label="Sub Heading Text"
            name="subheading"
            placeholder="Enter Sub Heading Text"
            required={true}
          />

          {/* Details Description - TipTapInputField */}
          <TipTapInputField
            label="Details Description"
            name="description"
            placeholder="Enter detailed description here..."
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-8 py-3 bg-yellow-400 border border-gray-300 rounded-lg text-pBlue hover:text-white transition-colors duration-300 font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-8 py-3 bg-pBlue text-white rounded-lg hover:bg-pBlue/90 transition-colors duration-300 font-medium flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (isEditMode ? "Updating..." : "Adding...") : (isEditMode ? "Save Changes" : "Add New Certification")}
              <MdOutlineKeyboardArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddCertificationForm;