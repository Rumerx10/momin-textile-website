"use client";
import { useForm, FormProvider } from "react-hook-form";
import Input from "../Input";
import { useAddData } from "@/hooks/useApi";
import { useCallback } from "react";
import toast from "react-hot-toast";
import {
  getAccessToken,
  getDecodedAccessToken,
  getRefreshToken,
  setTokens,
} from "@/api/tokenManager";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();

  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    watch,
    reset,
  } = methods;
  const rememberMe = watch("rememberMe");

  const loginQuery = useAddData(["login"], "/auth/login");

  const onSubmit = useCallback(
    (data: { email: string; password: string; rememberMe: boolean }) => {
      console.log("Login attempt with:", data);
      loginQuery.mutate(
        { email: data.email, password: data.password },
        {
          onSuccess: (response) => {
            console.log("Login response:", response);
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;

            if (!accessToken || !refreshToken) {
              console.error("Missing tokens in response");
              toast.error("Invalid response from server");
              return;
            }

            console.log("Setting tokens...");
            setTokens(accessToken, refreshToken);

            // Verify tokens were set
            console.log("Token set verification:", {
              accessToken: getAccessToken(),
              refreshToken: getRefreshToken(),
            });

            toast.success("Successfully logged in");
            reset();
            console.log("Redirecting to dashboard...");
            router.push("/dashboard");
            // router.replace(ROLE_DASHBOARD_REDIRECT[decodedTData?.role]);
          },
          onError: (error: Error) => {
            console.error("Login error:", error);
            const axiosError = error as AxiosError;
            const responseData = axiosError.response?.data as {
              error: string;
              message?: string;
            };
            const message =
              responseData?.error || "Login failed. Something went wrong.";
            toast.error(message);
            console.log(error);
          },
        },
      );
    },
    [loginQuery, reset, router],
  );

  const onError = (errors: any) => {
    console.log("Validation Errors:", errors);
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen overflow-hidden flex items-center justify-center">
        <div className="backdrop-blur-sm bg-white/80 rounded-2xl w-full max-w-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h4 className="text-pBlue text-2xl lg:text-3xl font-bold mb-2">
              Welcome Back To Momin Textile
            </h4>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="space-y-6"
          >
            {/* Email Input */}
            <Input
              label="Your Email Address"
              name="email"
              placeholder="Enter your email address"
              required={true}
              requiredMessage="Email address is required"
            />

            <Input
              label="Your Password"
              name="password"
              placeholder="Enter your Password"
              required={true}
              requiredMessage="Password is required"
            />

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setValue("rememberMe", e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                w-full py-3 px-4 rounded-lg font-semibold text-white
                transition-all duration-200 transform
                ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "hover:bg-pBlue bg-hBlue hover:scale-[1.02]"
                }
              `}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default LoginForm;
