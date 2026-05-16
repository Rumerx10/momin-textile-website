// components/profile/ChangePassword.jsx
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MdOutlineKeyboardArrowRight, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useAddData } from "@/hooks/useApi";
import toast from "react-hot-toast";

const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

const ChangePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate: changePassword, isPending } = useAddData(
    ["auth"],
    "/auth/change-password"
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ChangePasswordFormData) => {
    const payload = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    changePassword(payload, {
      onSuccess: (response) => {
        toast.success(response?.message || "Password changed successfully!");
        reset();
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Failed to change password");
      },
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h6 className="font-bold text-pBlue text-xl mb-6">Change Password</h6>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Current Password */}
        <div>
          <label className="block font-bold text-pBlue mb-2">
            Current Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showOldPassword ? "text" : "password"}
              {...register("oldPassword")}
              placeholder="Enter current password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-pBlue transition-colors pr-10 ${
                errors.oldPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-pGray hover:text-pBlue"
            >
              {showOldPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
            </button>
          </div>
          {errors.oldPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.oldPassword.message}</p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="block font-bold text-pBlue mb-2">
            New Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              {...register("newPassword")}
              placeholder="Enter new password (min 6 characters)"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-pBlue transition-colors pr-10 ${
                errors.newPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-pGray hover:text-pBlue"
            >
              {showNewPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block font-bold text-pBlue mb-2">
            Confirm New Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              placeholder="Confirm new password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-pBlue transition-colors pr-10 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-pGray hover:text-pBlue"
            >
              {showConfirmPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting || isPending}
            className="px-6 py-2 bg-pBlue text-white rounded-lg hover:bg-pBlue/90 transition-colors flex items-center gap-2"
          >
            {isSubmitting || isPending ? "Updating..." : "Update Password"}
            <MdOutlineKeyboardArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;