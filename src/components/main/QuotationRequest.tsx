"use client";

import { useForm } from "react-hook-form";

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  designation: string;
  message: string;
  file: FileList;
};

const QuotationRequest = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const formattedData = {
      ...data,
      file: data.file?.[0]?.name || "No file",
    };

    alert(JSON.stringify(formattedData, null, 2));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Title */}
      <h1 className="text-2xl font-bold text-center">Quotation Request</h1>
      <p className="text-center text-gray-500 mt-2 mb-6 text-sm">
        At Momin Textile Mills Ltd, we make it simple for you to receive
        accurate pricing and production details tailored to your specific fabric
        requirements.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>First Name *</label>
            <input
              {...register("firstName", { required: true })}
              placeholder="Enter Your First Name"
              className="input"
            />
          </div>

          <div>
            <label>Last Name</label>
            <input
              {...register("lastName")}
              placeholder="Enter Your Last Name"
              className="input"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Phone Number *</label>
            <input
              {...register("phone", { required: true })}
              placeholder="Enter Your Phone Number"
              className="input"
            />
          </div>

          <div>
            <label>Email</label>
            <input
              {...register("email")}
              placeholder="Enter Your Email"
              className="input"
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Company Name *</label>
            <input
              {...register("company", { required: true })}
              placeholder="Enter Company Name"
              className="input"
            />
          </div>

          <div>
            <label>Designation *</label>
            <input
              {...register("designation", { required: true })}
              placeholder="Enter Your Designation"
              className="input"
            />
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="block mb-2">
            Upload Documents <span className="text-red-500">*</span>
          </label>

          <div className="border-2 border-dashed rounded-md p-10 text-center">
            <input
              type="file"
              {...register("file", { required: true })}
              className="hidden"
              id="fileUpload"
            />

            <label htmlFor="fileUpload" className="cursor-pointer">
              <p className="text-gray-500">Upload a file or drag and drop</p>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG, GIF up to 20MB
              </p>
            </label>
          </div>
        </div>

        {/* Message */}
        <div>
          <label>Write Your Message</label>
          <textarea {...register("message")} rows={6} className="input" />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            className="px-6 py-2 border rounded-md text-gray-600"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-900 text-white rounded-md"
          >
            Submit →
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuotationRequest;
