// components/about/AboutUsEditMode.jsx
"use client";
import { FormProvider, useFieldArray } from "react-hook-form";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Input from "@/components/Input";
import ImageInputField from "@/components/ImageInputField";
import TipTapInputField from "@/components/TipTapInputField";
import { Plus, X } from "lucide-react";

interface AboutUsEditModeProps {
  methods: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  handleImageRemove: (imageUrl: string) => void;
  currentExistingImage1: string;
  currentExistingImages: string[];
  isSubmitting: boolean;
  isUpdating: boolean;
  handleSubmit: any;
}

function AboutUsEditMode({
  methods,
  onSubmit,
  onCancel,
  handleImageRemove,
  currentExistingImage1,
  currentExistingImages,
  isSubmitting,
  isUpdating,
  handleSubmit,
}: AboutUsEditModeProps) {
  const { control, register, watch } = methods;
  const points = watch("points");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "points",
  });

  const canAddMore = () => fields.length < 6;
  const shouldShowAddButton = () => fields.length < 6;

  const handleAddPoint = async () => {
    if (!canAddMore()) return;
    append({ value: "" });
  };

  const getPointError = (index: number) => {
    const error = methods.formState.errors.points?.[index]?.value;
    return error?.message || null;
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Excellence Image 01 (Single) */}
        <ImageInputField
          name="excellenceImage1"
          required={false}
          label="Main Image"
          subLabel="Upload main image (PNG, JPG, JPEG, up to 10MB)"
          maxFiles={1}
          existingImages={currentExistingImage1 ? [currentExistingImage1] : []}
          onImageRemove={handleImageRemove}
        />

        {/* Excellence Images (Multiple) */}
        <ImageInputField
          name="excellenceImages"
          required={false}
          label="Excellence Images"
          subLabel="Upload multiple images (PNG, JPG, JPEG, up to 10MB each, max 5 images)"
          maxFiles={5}
          existingImages={currentExistingImages}
          onImageRemove={(url: string) => {
            // Handle removal of existing images
            handleImageRemove(url);
          }}
        />

        {/* Heading */}
        <Input
          label="Heading"
          name="heading"
          placeholder="Enter heading"
          required={true}
        />

        {/* About Description (Rich Text) */}
        <TipTapInputField
          label="About Description"
          name="about"
          placeholder="Enter about description..."
        />

        {/* Excellence Heading */}
        <Input
          label="Excellence Heading"
          name="excellenceHeading"
          placeholder="Enter excellence heading"
          required={true}
        />

        {/* Excellence Subheading */}
        <Input
          label="Excellence Subheading"
          name="excellenceSubheading"
          placeholder="Enter excellence subheading"
          required={true}
        />

        {/* Points - Dynamic Array like Foreign Branches */}
        <div className="space-y-4">
          <label className="block font-bold text-pBlue">
            Points <span className="text-red-500">*</span>
          </label>
          {fields.map((field, index) => {
            const error = getPointError(index);
            return (
              <div key={field.id} className="flex items-start gap-4">
                <div className="flex-1">
                  <input
                    {...register(`points.${index}.value`, {
                      required: "Point is required",
                    })}
                    placeholder="Enter point"
                    className={`w-full px-5 py-2 border rounded-lg focus:outline-none focus:border-pBlue transition text-pGray ${
                      error ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>
                <div className="flex gap-2">
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="px-3 py-3 border border-gray-300 rounded-lg text-red-500 hover:bg-red-50 transition"
                    >
                      <X size={20} />
                    </button>
                  )}
                  {index === fields.length - 1 && shouldShowAddButton() && (
                    <button
                      type="button"
                      onClick={handleAddPoint}
                      className="h-10.5 px-3 lg:px-5 py-2 border border-gray-300 rounded-lg text-pBlue font-semibold hover:bg-gray-50 transition flex items-center gap-2 whitespace-nowrap"
                    >
                      <Plus size={20} />
                      <span className="hidden lg:flex">Add New</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
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

export default AboutUsEditMode;