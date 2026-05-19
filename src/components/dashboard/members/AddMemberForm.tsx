// app/dashboard/members/AddMemberForm.jsx
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
import { useAddData, usePatchData } from "@/hooks/useApi";

// Zod Schema
const memberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  designation: z.string().min(1, "Designation is required"),
  description: z.string().min(1, "Description is required"),
  image: z.array(z.any()).max(1, "Only one image allowed").optional(),
});

type MemberFormData = z.infer<typeof memberSchema>;

const AddMemberForm = ({
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

  const methods = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: editData?.name || "",
      designation: editData?.designation || "",
      description: editData?.description || "",
      image: [],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = methods;

  const { mutate: addMember, isPending: isAdding } = useAddData(
    ["members"],
    "/members",
  );
  const { mutate: updateMember, isPending: isUpdating } = usePatchData(
    ["members"],
    "/members",
  );

  const isPending = isSubmitting || isAdding || isUpdating;

  const getExistingImage = () => {
    if (!isEditMode) return [];
    if (editData?.image) return [editData.image];
    return [];
  };

  useEffect(() => {
    setTitle(isEditMode ? "Edit Member" : "Add New Member");
  }, [setTitle, isEditMode]);

  const onSubmit = (data: MemberFormData) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("designation", data.designation);
    formData.append("description", data.description);

    if (data.image && data.image.length > 0) {
      const imageFile = data.image[0];
      if (imageFile instanceof File) {
        formData.append("image", imageFile);
      }
    }

    const mutation = isEditMode ? updateMember : addMember;
    const payload = isEditMode
      ? { id: editData.id, payload: formData }
      : formData;

    mutation(payload as any, {
      onSuccess: (response) => {
        toast.success(
          response?.message ||
            `Member ${isEditMode ? "updated" : "added"} successfully!`,
        );
        reset();
        onSuccess();
      },
      onError: (error: any) => {
        console.error("Submission error:", error);
        toast.error(
          error?.response?.data?.message ||
            `Failed to ${isEditMode ? "update" : "add"} member`,
        );
      },
    });
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <div className="bg-white rounded-md p-6">
      {/* Top Cancel Button */}
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-2xl font-semibold text-pBlue">
          {isEditMode ? "Edit Member" : "Add New Member"}
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
          {/* Member Image */}
          <ImageInputField
            name="image"
            required={false}
            label="Member Image"
            subLabel="Upload image (PNG, JPG, JPEG, up to 10MB)"
            maxFiles={1}
            existingImages={getExistingImage()}
          />

          {/* Name */}
          <Input
            label="Name"
            name="name"
            placeholder="Enter member name"
            required={true}
          />

          {/* Designation */}
          <Input
            label="Designation"
            name="designation"
            placeholder="Enter designation (e.g., Managing Director)"
            required={true}
          />

          {/* Description */}
          <Input
            label="Description"
            name="description"
            placeholder="Enter designation (e.g., Managing Director)"
            required={true}
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
                  : "Add Member"}
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

export default AddMemberForm;
