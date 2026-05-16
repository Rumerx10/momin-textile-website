// app/dashboard/career-posts/AddCareerForm.jsx
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
import FormDropdown from "@/components/FormDropdown";
import { useAddData, usePatchData } from "@/hooks/useApi";

// Job Type Options
const jobTypeOptions = [
  { value: "FULL_TIME", label: "Full Time" },
  { value: "PART_TIME", label: "Part Time" },
  { value: "CONTRACTUAL", label: "Contractual" },
  { value: "FREELANCE", label: "Freelance" },
  { value: "INTERNSHIP", label: "Internship" },
];

// Job Shift Options
const jobShiftOptions = [
  { value: "DAY", label: "Day Shift" },
  { value: "NIGHT", label: "Night Shift" },
  { value: "ROTATING", label: "Rotating Shift" },
];

// Experience Options (number of years)
const experienceOptions = [
  { value: 0, label: "Fresher" },
  { value: 1, label: "Less than 1 Year" },
  { value: 2, label: "1-2 Years" },
  { value: 3, label: "2-3 Years" },
  { value: 4, label: "3-4 Years" },
  { value: 5, label: "4-5 Years" },
  { value: 6, label: "5+ Years" },
];

// Zod Schema
const careerSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  jobType: z.string().min(1, "Job type is required"),
  jobShift: z.string().min(1, "Job shift is required"),
  experience: z.number().min(0, "Experience is required"),
  deadline: z.string().min(1, "Deadline is required"),
  approximateJoining: z.string().min(1, "Approximate joining date is required"),
  pdf: z.array(z.any()).max(1, "Only one file allowed").optional(),
});

type CareerFormData = z.infer<typeof careerSchema>;

const AddCareerForm = ({
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
  const [removedPdfUrls, setRemovedPdfUrls] = useState<string[]>([]);

  const methods = useForm<CareerFormData>({
    resolver: zodResolver(careerSchema),
    defaultValues: {
      jobTitle: editData?.jobTitle || "",
      // Set default values for new form, but use editData if available for edit mode
      jobType: editData?.jobType || "FULL_TIME",
      jobShift: editData?.jobShift || "DAY",
      experience: editData?.experience ?? 0,
      deadline: editData?.deadline?.split("T")[0] || "",
      approximateJoining: editData?.approximateJoining?.split("T")[0] || "",
      pdf: [],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
  } = methods;

  const { mutate: addCareer, isPending: isAdding } = useAddData(["careers"], "/careers");
  const { mutate: updateCareer, isPending: isUpdating } = usePatchData(["careers"], "/careers");

  const isPending = isSubmitting || isAdding || isUpdating;

  // Get existing PDF from editData
  const getExistingPdf = () => {
    if (!isEditMode) return [];
    if (editData?.pdf) {
      return [editData.pdf];
    }
    return [];
  };

  const existingPdf = getExistingPdf();

  const handlePdfRemove = (pdfUrl: string) => {
    setRemovedPdfUrls((prev) => [...prev, pdfUrl]);
  };

  const extractFilenameFromUrl = (url: string) => {
    return url.split("/").pop() || "";
  };

  useEffect(() => {
    setTitle(isEditMode ? "Edit Career Post" : "Add New Career Post");
  }, [setTitle, isEditMode]);

  const onSubmit = (data: CareerFormData) => {
    const formData = new FormData();

    formData.append("jobTitle", data.jobTitle);
    formData.append("jobType", data.jobType);
    formData.append("jobShift", data.jobShift);
    formData.append("experience", String(data.experience));
    formData.append("deadline", data.deadline);
    formData.append("approximateJoining", data.approximateJoining);

    if (data.pdf && data.pdf.length > 0) {
      const pdfFile = data.pdf[0];
      if (pdfFile instanceof File) {
        formData.append("pdf", pdfFile);
      }
    }

    if (isEditMode && removedPdfUrls.length > 0) {
      const filenamesToDelete = removedPdfUrls.map(extractFilenameFromUrl).join(",");
      formData.append("delPdf", filenamesToDelete);
    }

    const mutation = isEditMode ? updateCareer : addCareer;
    const payload = isEditMode
      ? { id: editData.id, payload: formData }
      : formData;

    mutation(payload as any, {
      onSuccess: (response) => {
        toast.success(response?.message || `Career post ${isEditMode ? "updated" : "added"} successfully!`);
        reset();
        onSuccess();
      },
      onError: (error: any) => {
        console.error("Submission error:", error);
        const errorMsg = error?.response?.data?.message || `Failed to ${isEditMode ? "update" : "add"} career post`;
        toast.error(errorMsg);
      },
    });
  };

  const handleCancel = () => {
    reset();
    setRemovedPdfUrls([]);
    onCancel();
  };

  return (
    <div className="bg-white rounded-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-xl font-semibold text-pBlue">
          {isEditMode ? "Edit Career Post" : "Add New Career Post"}
        </h5>
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
          {/* Job Title */}
          <Input
            label="Job Title"
            name="jobTitle"
            placeholder="Enter Job Title"
            required={true}
          />

          {/* Row: Deadline & Approximate Joining */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Deadline"
              name="deadline"
              placeholder="YYYY-MM-DD"
              required={true}
            />
            <Input
              label="Approximate Joining"
              name="approximateJoining"
              placeholder="YYYY-MM-DD"
              required={true}
            />
          </div>

          {/* Row: Job Type, Job Shift & Experience */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormDropdown
              label="Job Type"
              value={methods.watch("jobType")}
              options={jobTypeOptions}
              placeholder="Select Job Type"
              error={errors.jobType?.message}
              required={true}
              onChange={(value) => setValue("jobType", value, { shouldValidate: true })}
            />

            <FormDropdown
              label="Job Shift"
              value={methods.watch("jobShift")}
              options={jobShiftOptions}
              placeholder="Select Job Shift"
              error={errors.jobShift?.message}
              required={true}
              onChange={(value) => setValue("jobShift", value, { shouldValidate: true })}
            />

            <FormDropdown
              label="Experience"
              value={methods.watch("experience")}
              options={experienceOptions}
              placeholder="Select Experience"
              error={errors.experience?.message}
              required={true}
              onChange={(value) => setValue("experience", value, { shouldValidate: true })}
            />
          </div>

          {/* Upload PDF - Using ImageInputField (supports both images and PDFs) */}
          <ImageInputField
            name="pdf"
            required={false}
            label="Upload Document"
            subLabel="Upload PDF or Image (max 10MB)"
            maxFiles={1}
            existingImages={existingPdf}
            onImageRemove={handlePdfRemove}
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={isPending}
              className="px-8 py-3 bg-pBlue text-white rounded-lg hover:bg-pBlue/90 transition-colors duration-300 font-medium flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (isEditMode ? "Updating..." : "Adding...") : (isEditMode ? "Save Changes" : "Submit Job Post")}
              <MdOutlineKeyboardArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddCareerForm;