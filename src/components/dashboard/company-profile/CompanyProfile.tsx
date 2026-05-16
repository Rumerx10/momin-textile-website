// app/dashboard/company-profile/page.jsx
"use client";
import { useState, useEffect } from "react";
import DashboardBodyContent from "@/components/DashboardBodyContent";
import { useFetchData, usePatchData3, useAddData } from "@/hooks/useApi";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CompanyProfileSkeleton from "./CompanyProfileSkeleton";
import CompanyProfileEditMode from "./CompanyProfileEditMode";
import CompanyProfileViewMode from "./CompanyProfileViewMode";
import ChangePassword from "./ChangePassword";

// Zod Schema
const profileSchema = z.object({
  heading: z.string().min(1, "Heading is required"),
  description: z.string().min(1, "Description is required"),
  caption: z.string().optional(),
  pdf: z.array(z.any()).optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const extractFilenameFromUrl = (url: string) => {
  return url.split("/").pop() || "";
};

const CompanyProfile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [removedPdf, setRemovedPdf] = useState<string[]>([]);
  const [existingPdf, setExistingPdf] = useState<string>("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const { data: apiData, isLoading, refetch } = useFetchData(
    ["company-profile"],
    "/company-profile",
    { enabled: true, refetchOnMount: true }
  );

  const { mutate: updateProfile, isPending: isUpdating } = usePatchData3(
    ["company-profile"],
    "/company-profile"
  );

  const { mutate: addProfile, isPending: isAdding } = useAddData(
    ["company-profile"],
    "/company-profile"
  );

  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      heading: "",
      description: "",
      caption: "",
      pdf: [],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const profileData = apiData?.data || {};
  const isDataAvailable = !!apiData?.data;

  useEffect(() => {
    if (profileData && !isDataLoaded && !isLoading) {
      reset({
        heading: profileData.heading || "",
        description: profileData.description || "",
        caption: profileData.caption || "",
        pdf: [],
      });
      setExistingPdf(profileData.pdf || "");
      setIsDataLoaded(true);
    }
  }, [profileData, isLoading, isDataLoaded, reset]);

  const handlePdfRemove = (pdfUrl: string) => {
    setRemovedPdf((prev) => [...prev, pdfUrl]);
    setExistingPdf("");
  };

  const onSubmit = (data: ProfileFormData) => {
    const formDataToSend = new FormData();

    formDataToSend.append("heading", data.heading);
    formDataToSend.append("description", data.description);
    if (data.caption) formDataToSend.append("caption", data.caption);

    if (data.pdf && data.pdf.length > 0) {
      const pdfFile = data.pdf[0];
      if (pdfFile instanceof File) {
        formDataToSend.append("pdf", pdfFile);
      }
    }

    if (removedPdf.length > 0) {
      const filenamesToDelete = removedPdf.map(extractFilenameFromUrl).join(",");
      formDataToSend.append("delPdf", filenamesToDelete);
    }

    const mutation = isDataAvailable ? updateProfile : addProfile;
    mutation(formDataToSend as any, {
      onSuccess: (response) => {
        toast.success(response?.message || "Company profile updated successfully!");
        setIsEditMode(false);
        setRemovedPdf([]);
        setIsDataLoaded(false);
        refetch();
        reset();
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Failed to update company profile");
      },
    });
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setRemovedPdf([]);
    if (profileData) {
      reset({
        heading: profileData.heading || "",
        description: profileData.description || "",
        caption: profileData.caption || "",
        pdf: [],
      });
      setExistingPdf(profileData.pdf || "");
    }
  };

  if (isLoading) {
    return (
      <DashboardBodyContent title="Company Profile" addBtnText="" openAddModal={false} setOpenAddModal={() => {}}>
        <CompanyProfileSkeleton />
      </DashboardBodyContent>
    );
  }

  const currentExistingPdf = removedPdf.length > 0 ? "" : existingPdf;

  return (
    <DashboardBodyContent title="Company Profile" addBtnText="" openAddModal={false} setOpenAddModal={() => {}} addBtn={false}>
      <div className="space-y-6">
        {/* Company Profile Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-end mb-6">
            {!isEditMode && (
              <button
                onClick={() => setIsEditMode(true)}
                className="px-6 py-2 bg-pBlue text-white rounded-lg hover:bg-pBlue/90 transition-colors"
              >
                {isDataAvailable ? "Edit Profile" : "Add Profile"}
              </button>
            )}
          </div>

          {isEditMode ? (
            <CompanyProfileEditMode
              methods={methods}
              onSubmit={onSubmit}
              onCancel={handleCancel}
              handlePdfRemove={handlePdfRemove}
              existingPdf={currentExistingPdf}
              isSubmitting={isSubmitting}
              isUpdating={isUpdating || isAdding}
              handleSubmit={handleSubmit}
            />
          ) : (
            <CompanyProfileViewMode profileData={profileData} />
          )}
        </div>

        {/* Change Password Section */}
        <ChangePassword />
      </div>
    </DashboardBodyContent>
  );
};

export default CompanyProfile;