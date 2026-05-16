"use client";
import { z } from "zod";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import AboutUsSkeleton from "./AboutUsSkeleton";
import AboutUsEditMode from "./AboutUsEditMode";
import AboutUsViewMode from "./AboutUsViewMode";
import { zodResolver } from "@hookform/resolvers/zod";
import DashboardBodyContent from "@/components/DashboardBodyContent";
import { useFetchData, usePatchData3, useAddData } from "@/hooks/useApi";

// Zod Schema
const aboutUsSchema = z.object({
  heading: z.string().min(1, "Heading is required"),
  about: z.string().min(1, "About description is required"),
  excellenceHeading: z.string().min(1, "Excellence heading is required"),
  excellenceSubheading: z.string().min(1, "Excellence subheading is required"),
  points: z
    .array(z.object({ value: z.string().min(1, "Point is required") }))
    .min(1, "At least one point is required"),
  excellenceImage1: z.array(z.any()).optional(),
  excellenceImages: z.array(z.any()).optional(),
});

type AboutUsFormData = z.infer<typeof aboutUsSchema>;

const extractFilenameFromUrl = (url: string) => {
  return url.split("/").pop() || "";
};

const AboutUs = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [removedMainImage, setRemovedMainImage] = useState<string[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [existingMainImage, setExistingMainImage] = useState<string>("");
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const {
    data: apiData,
    isLoading,
    refetch,
  } = useFetchData(["about-us"], "/about-us", {
    enabled: true,
    refetchOnMount: true,
  });

  const { mutate: updateAboutUs, isPending: isUpdating } = usePatchData3(
    ["about-us"],
    "/about-us",
  );

  const { mutate: addAboutUs, isPending: isAdding } = useAddData(
    ["about-us"],
    "/about-us",
  );

  const methods = useForm<AboutUsFormData>({
    resolver: zodResolver(aboutUsSchema),
    defaultValues: {
      heading: "",
      about: "",
      excellenceHeading: "",
      excellenceSubheading: "",
      points: [{ value: "" }],
      excellenceImage1: [],
      excellenceImages: [],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setValue,
  } = methods;

  const formData = apiData?.data || {};
  const isDataAvailable = !!apiData?.data;

  useEffect(() => {
    if (formData && !isDataLoaded && !isLoading) {
      // Format points: if they are strings, convert to objects with value property
      const pointsArray = formData.points?.map((point: string) => ({
        value: point,
      })) || [{ value: "" }];

      reset({
        heading: formData.heading || "",
        about: formData.about || "",
        excellenceHeading: formData.excellenceHeading || "",
        excellenceSubheading: formData.excellenceSubheading || "",
        points: pointsArray,
        excellenceImage1: [],
        excellenceImages: [],
      });
      setExistingMainImage(formData.excellenceImage1 || "");
      setExistingImages(formData.excellenceImages || []);
      setIsDataLoaded(true);
    }
  }, [formData, isLoading, isDataLoaded, reset]);

  const handleMainImageRemove = (imageUrl: string) => {
    setRemovedMainImage((prev) => [...prev, imageUrl]);
    setExistingMainImage("");
  };

  const handleImageRemove = (imageUrl: string) => {
    setRemovedImages((prev) => [...prev, imageUrl]);
    setExistingImages((prev) => prev.filter((url) => url !== imageUrl));
  };

  const onSubmit = (data: AboutUsFormData) => {
    const formDataToSend = new FormData();

    formDataToSend.append("heading", data.heading);
    formDataToSend.append("about", data.about);
    formDataToSend.append("excellenceHeading", data.excellenceHeading);
    formDataToSend.append("excellenceSubheading", data.excellenceSubheading);

    // Add points as JSON array of strings
    const pointsArray = data.points.map((p) => p.value).filter(Boolean);
    formDataToSend.append("points", JSON.stringify(pointsArray));

    // Add main image
    if (data.excellenceImage1 && data.excellenceImage1.length > 0) {
      const imageFile = data.excellenceImage1[0];
      if (imageFile instanceof File) {
        formDataToSend.append("excellenceImage1", imageFile);
      }
    }

    // Add multiple images
    if (data.excellenceImages && data.excellenceImages.length > 0) {
      data.excellenceImages.forEach((image) => {
        if (image instanceof File) {
          formDataToSend.append("excellenceImages", image);
        }
      });
    }

    // Send deleted images
    const allDeletedImages = [...removedMainImage, ...removedImages];
    if (allDeletedImages.length > 0) {
      const filenamesToDelete = allDeletedImages
        .map(extractFilenameFromUrl)
        .join(",");
      formDataToSend.append("delImg", filenamesToDelete);
    }

    const mutation = isDataAvailable ? updateAboutUs : addAboutUs;
    mutation(formDataToSend as any, {
      onSuccess: (response) => {
        toast.success(
          response?.message || "About Us page updated successfully!",
        );
        setIsEditMode(false);
        setRemovedMainImage([]);
        setRemovedImages([]);
        setIsDataLoaded(false);
        refetch();
        reset();
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to update About Us page",
        );
      },
    });
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setRemovedMainImage([]);
    setRemovedImages([]);
    if (formData) {
      const pointsArray = formData.points?.map((point: string) => ({
        value: point,
      })) || [{ value: "" }];
      reset({
        heading: formData.heading || "",
        about: formData.about || "",
        excellenceHeading: formData.excellenceHeading || "",
        excellenceSubheading: formData.excellenceSubheading || "",
        points: pointsArray,
        excellenceImage1: [],
        excellenceImages: [],
      });
      setExistingMainImage(formData.excellenceImage1 || "");
      setExistingImages(formData.excellenceImages || []);
    }
  };

  if (isLoading) {
    return (
      <DashboardBodyContent
        title="About Us"
        addBtnText=""
        openAddModal={false}
        setOpenAddModal={() => {}}
      >
        <AboutUsSkeleton />
      </DashboardBodyContent>
    );
  }

  const currentExistingMainImage =
    removedMainImage.length > 0 ? "" : existingMainImage;
  const currentExistingImages = existingImages.filter(
    (img) => !removedImages.includes(img),
  );

  return (
    <DashboardBodyContent
      title="About Us"
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
              {isDataAvailable ? "Edit Page" : "Add Page"}
            </button>
          </div>
        )}

        {isEditMode ? (
          <AboutUsEditMode
            methods={methods}
            onSubmit={onSubmit}
            onCancel={handleCancel}
            handleImageRemove={handleImageRemove}
            currentExistingImage1={currentExistingMainImage}
            currentExistingImages={currentExistingImages}
            isSubmitting={isSubmitting}
            isUpdating={isUpdating || isAdding}
            handleSubmit={handleSubmit}
          />
        ) : (
          <AboutUsViewMode formData={formData} />
        )}
      </div>
    </DashboardBodyContent>
  );
};

export default AboutUs;
