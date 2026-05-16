"use client";
import { useState, useEffect } from "react";
import DashboardBodyContent from "@/components/DashboardBodyContent";
import { useFetchData, usePatchData3 } from "@/hooks/useApi";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import HomeEditModal from "./HomeEditModal";
import HomeViewModal from "./HomeViewModal";

// Zod Schema
const homeSchema = z.object({
  heading: z.string().min(1, "Heading text is required"),
  subheading: z.string().optional(),
  button1Name: z.string().optional(),
  button1Url: z.string().optional(),
  button2Name: z.string().optional(),
  button2Url: z.string().optional(),
  images: z.array(z.any()).optional(),
});

type HomeFormData = z.infer<typeof homeSchema>;

// Helper function to extract filename from URL
const extractFilenameFromUrl = (url: string) => {
  return url.split("/").pop() || "";
};

const Home = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Fetch home data
  const {
    data: apiData,
    isLoading,
    refetch,
  } = useFetchData(["home"], "/home", { enabled: true, refetchOnMount: true });

  // Update home data without ID parameter
  const { mutate: updateHome, isPending: isUpdating } = usePatchData3(
    ["home"],
    "/home",
  );

  const methods = useForm<HomeFormData>({
    resolver: zodResolver(homeSchema),
    defaultValues: {
      heading: "",
      subheading: "",
      button1Name: "",
      button1Url: "",
      button2Name: "",
      button2Url: "",
      images: [],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const formData = apiData?.data || {};

  // Use useEffect to set form values when data loads (prevents infinite loop)
  useEffect(() => {
    if (formData && !isDataLoaded && !isLoading) {
      reset({
        heading: formData.heading || "",
        subheading: formData.subheading || "",
        button1Name: formData.button1Name || "",
        button1Url: formData.button1Url || "",
        button2Name: formData.button2Name || "",
        button2Url: formData.button2Url || "",
        images: [],
      });
      setExistingImageUrls(formData.images || []);
      setIsDataLoaded(true);
    }
  }, [formData, isLoading, isDataLoaded, reset]);

  const handleImageRemove = (imageUrl: string) => {
    setRemovedImages((prev) => [...prev, imageUrl]);
    setExistingImageUrls((prev) => prev.filter((url) => url !== imageUrl));
  };

  const onSubmit = (data: HomeFormData) => {
    const formDataToSend = new FormData();

    formDataToSend.append("heading", data.heading);
    if (data.subheading) formDataToSend.append("subheading", data.subheading);
    if (data.button1Name)
      formDataToSend.append("button1Name", data.button1Name);
    if (data.button1Url) formDataToSend.append("button1Url", data.button1Url);
    if (data.button2Name)
      formDataToSend.append("button2Name", data.button2Name);
    if (data.button2Url) formDataToSend.append("button2Url", data.button2Url);

    if (data.images && data.images.length > 0) {
      data.images.forEach((image) => {
        if (image instanceof File) {
          formDataToSend.append("images", image);
        }
      });
    }

    if (removedImages.length > 0) {
      const filenamesToDelete = removedImages
        .map(extractFilenameFromUrl)
        .join(",");
      formDataToSend.append("delImg", filenamesToDelete);
    }

    updateHome(formDataToSend as any, {
      onSuccess: (response) => {
        toast.success(response?.message || "Home page updated successfully!");
        setIsEditMode(false);
        setRemovedImages([]);
        setIsDataLoaded(false);
        refetch();
        reset();
      },
      onError: (error: any) => {
        console.error("Update error:", error);
        toast.error(
          error?.response?.data?.message || "Failed to update home page",
        );
      },
    });
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setRemovedImages([]);
    if (formData) {
      reset({
        heading: formData.heading || "",
        subheading: formData.subheading || "",
        button1Name: formData.button1Name || "",
        button1Url: formData.button1Url || "",
        button2Name: formData.button2Name || "",
        button2Url: formData.button2Url || "",
        images: [],
      });
      setExistingImageUrls(formData.images || []);
    }
  };

  if (isLoading) {
    return (
      <DashboardBodyContent
        title="Home Page"
        addBtnText=""
        openAddModal={false}
        setOpenAddModal={() => {}}
      >
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pBlue"></div>
        </div>
      </DashboardBodyContent>
    );
  }

  const currentExistingImages = existingImageUrls.filter(
    (img) => !removedImages.includes(img),
  );

  return (
    <DashboardBodyContent
      title="Home Page"
      addBtnText=""
      openAddModal={false}
      setOpenAddModal={() => {}}
      addBtn={false}
    >
      <div className="bg-white rounded-lg p-6">
        {!isEditMode && (
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setIsEditMode(true)}
              className="px-6 py-2 bg-pBlue text-white rounded-lg hover:bg-pBlue/90 transition-colors"
            >
              Edit Page
            </button>
          </div>
        )}

        {isEditMode ? (
          <HomeEditModal
            methods={methods}
            onSubmit={onSubmit}
            onCancel={handleCancel}
            handleImageRemove={handleImageRemove}
            currentExistingImages={currentExistingImages}
            isSubmitting={isSubmitting}
            isUpdating={isUpdating}
            handleSubmit={handleSubmit}
          />
        ) : (
          <HomeViewModal
            existingImageUrls={existingImageUrls}
            formData={formData}
          />
        )}
      </div>
    </DashboardBodyContent>
  );
};

export default Home;
