import ImageInputField from "@/components/ImageInputField";
import Input from "@/components/Input";
import { FormProvider } from "react-hook-form";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

interface HomeEditModalProps {
  methods: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  handleImageRemove: (imageUrl: string) => void;
  currentExistingImages: string[];
  isSubmitting: boolean;
  isUpdating: boolean;
  handleSubmit: any;
}

const HomeEditModal = ({
  methods,
  onSubmit,
  onCancel,
  handleImageRemove,
  currentExistingImages,
  isSubmitting,
  isUpdating,
  handleSubmit,
}: HomeEditModalProps) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <ImageInputField
          name="images"
          required={false}
          label="Carousel Images"
          subLabel="Upload Image or drag and drop PNG, JPG, GIF, up to 20MB"
          maxFiles={5}
          existingImages={currentExistingImages}
          onImageRemove={handleImageRemove}
        />

        <Input
          label="Heading Text"
          name="heading"
          placeholder="Enter Heading Text"
          required={true}
        />

        <div className="flex flex-col gap-2">
          <label className="font-bold text-pBlue">Subheading Text</label>
          <textarea
            {...methods.register("subheading")}
            placeholder="Enter Paragraph Text"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pBlue transition-colors resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Input
              label="CTA-01 Name"
              name="button1Name"
              placeholder="Enter CTA-01 Name"
            />
            <Input
              label="URL 01"
              name="button1Url"
              placeholder="Enter URL 01"
            />
          </div>

          <div className="space-y-3">
            <Input
              label="CTA-02 Name"
              name="button2Name"
              placeholder="Enter CTA-02 Name"
            />
            <Input
              label="URL 02"
              name="button2Url"
              placeholder="Enter URL 02"
            />
          </div>
        </div>

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
};
export default HomeEditModal;
