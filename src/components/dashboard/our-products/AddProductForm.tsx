// app/dashboard/our-products/AddProductForm.jsx
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
const productSchema = z.object({
  heading: z.string().min(1, "Heading is required"),
  subheading: z.string().min(1, "Subheading is required"),
  description: z.string().min(1, "Description is required"),
  details: z.string().optional(),
  specification: z.string().optional(),
  image: z.array(z.any()).max(1, "Only one image allowed").optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

const AddProductForm = ({
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
  const [removedImages, setRemovedImages] = useState<string[]>([]);

  const methods = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      heading: editData?.heading || "",
      subheading: editData?.subheading || "",
      description: editData?.description || "",
      details: editData?.details || "",
      specification: editData?.specification || "",
      image: [],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = methods;

  const { mutate: addProduct, isPending: isAdding } = useAddData(
    ["products"],
    "/products",
  );
  const { mutate: updateProduct, isPending: isUpdating } = usePatchData(
    ["products"],
    "/products",
  );

  const isPending = isSubmitting || isAdding || isUpdating;

  const getExistingImage = () => {
    if (!isEditMode) return [];
    if (editData?.image) return [editData.image];
    return [];
  };

  const handleImageRemove = (imageUrl: string) => {
    setRemovedImages((prev) => [...prev, imageUrl]);
  };

  const extractFilenames = (urls: string[]) => {
    return urls.map((url) => url.split("/").pop() || "").join(",");
  };

  useEffect(() => {
    setTitle(isEditMode ? "Edit Product" : "Add New Product");
  }, [setTitle, isEditMode]);

  const onSubmit = (data: ProductFormData) => {
    const formData = new FormData();

    formData.append("heading", data.heading);
    formData.append("subheading", data.subheading);
    formData.append("description", data.description);
    if (data.details) formData.append("details", data.details);
    if (data.specification)
      formData.append("specification", data.specification);

    if (data.image && data.image.length > 0) {
      const imageFile = data.image[0];
      if (imageFile instanceof File) {
        formData.append("image", imageFile);
      }
    }

    if (isEditMode && removedImages.length > 0) {
      const filenamesToDelete = extractFilenames(removedImages);
      formData.append("delImg", filenamesToDelete);
    }

    const mutation = isEditMode ? updateProduct : addProduct;
    const payload = isEditMode
      ? { id: editData.id, payload: formData }
      : formData;

    mutation(payload as any, {
      onSuccess: (response) => {
        toast.success(
          response?.message ||
            `Product ${isEditMode ? "updated" : "added"} successfully!`,
        );
        reset();
        onSuccess();
      },
      onError: (error: any) => {
        console.error("Submission error:", error);
        toast.error(
          error?.response?.data?.message ||
            `Failed to ${isEditMode ? "update" : "add"} product`,
        );
      },
    });
  };

  const handleCancel = () => {
    reset();
    setRemovedImages([]);
    onCancel();
  };

  return (
    <div className="bg-white rounded-md p-6">
      {/* Top Cancel Button */}
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-2xl font-semibold text-pBlue">
          {isEditMode ? "Edit Product" : "Add New Product"}
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
          {/* Thumbnail Image */}
          <ImageInputField
            name="image"
            required={false}
            label="Thumbnail Image"
            subLabel="Upload image (PNG, JPG, JPEG, up to 10MB)"
            maxFiles={1}
            existingImages={getExistingImage()}
            onImageRemove={handleImageRemove}
          />

          {/* Heading Text */}
          <Input
            label="Heading Text"
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

          {/* Description */}
          <Input
            label="Description"
            name="description"
            placeholder="Enter Description Text"
            required={true}
          />

          {/* Details About Product - TipTapInputField */}
          <TipTapInputField
            label="Details About Product"
            name="details"
            placeholder="Enter detailed description about the product..."
          />

          {/* Specifications - TipTapInputField */}
          <TipTapInputField
            label="Specifications"
            name="specification"
            placeholder="Enter product specifications..."
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
              {isPending
                ? isEditMode
                  ? "Updating..."
                  : "Adding..."
                : isEditMode
                  ? "Save Changes"
                  : "Add Product"}
              <MdOutlineKeyboardArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddProductForm;
