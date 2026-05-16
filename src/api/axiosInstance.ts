import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  isTokenExpired,
  setTokens,
} from "./tokenManager";

export const baseURL: string = "http://192.168.100.241:8001/api/v1"; // Local IP
// export const baseURL: string = "http://103.219.160.253:8087"; //Live IP

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// Queue to hold failed requests while refreshing token
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (config: InternalAxiosRequestConfig) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown | null, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token as any);
    }
  });
  failedQueue = [];
};

// Request Interceptor
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const token = getAccessToken();
    const url = config.url || "";

    console.log("Request URL:", url);
    console.log("Request Method:", config.method?.toUpperCase());

    // Define public routes that don't need authentication
    const publicUrls = [
      "/auth/login",
      "/auth/register",
      "/auth/refresh-token",
      "/auth/forgot-password",
      "/auth/reset-password",
    ];

    // Check if this is a protected route
    const isPublicRoute = publicUrls.some(publicUrl => url.includes(publicUrl));
    
    // Only check authentication for non-public routes
    if (url.startsWith("/dashboard") && !isPublicRoute) {
      // For all protected routes, require token
      if (!token) {
        console.log("❌ No token found for protected route");
        window.location.href = "/dashboard/login";
        throw new axios.Cancel("Authentication required");
      }

      // Check if token is expired
      if (isTokenExpired(token)) {
        console.log("🔄 Token expired, attempting refresh...");
        
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          console.log("❌ No refresh token available");
          clearTokens();
          window.location.href = "/dashboard/login";
          throw new axios.Cancel("No refresh token available");
        }

        // Wait for token refresh to complete
        if (isRefreshing) {
          // Queue this request
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: (newToken: any) => {
                config.headers.Authorization = `Bearer ${newToken}`;
                resolve(config);
              },
              reject: (err) => reject(err),
            });
          });
        }

        isRefreshing = true;

        try {
          // Call refresh token endpoint
          const response = await axios.post(
            `${baseURL}/auth/refresh-token`,
            { refreshToken },
            { headers: { Authorization: undefined } }
          );

          // Validate response structure
          const newAccessToken = response.data?.data?.accessToken || response.data?.accessToken;
          
          if (!newAccessToken) {
            throw new Error("No access token in refresh response");
          }

          console.log("✅ Token refreshed successfully");
          
          // Update tokens
          setTokens(newAccessToken, refreshToken);
          
          // Update authorization header
          config.headers.Authorization = `Bearer ${newAccessToken}`;
          
          // Process queued requests
          processQueue(null, newAccessToken);
          
          return config;
        } catch (refreshError) {
          console.error("❌ Token refresh failed:", refreshError);
          processQueue(refreshError, null);
          clearTokens();
          window.location.href = "/dashboard/login";
          throw refreshError;
        } finally {
          isRefreshing = false;
        }
      } else {
        // Token is valid, attach it
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error: AxiosError): Promise<any> => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    // Handle 401 Unauthorized
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh-token") &&
      !originalRequest.url?.includes("/auth/login")
    ) {
      originalRequest._retry = true;
      
      const refreshToken = getRefreshToken();
      
      if (!refreshToken) {
        console.log("❌ No refresh token for 401 response");
        clearTokens();
        window.location.href = "/dashboard/login";
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // Queue the request
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (newToken: any) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
              }
              resolve(axiosInstance(originalRequest));
            },
            reject: (err) => reject(err),
          });
        });
      }

      isRefreshing = true;

      try {
        console.log("🔄 Attempting token refresh due to 401");
        
        const response = await axios.post(
          `${baseURL}/auth/refresh-token`,
          { refreshToken },
          { headers: { Authorization: undefined } }
        );

        const newAccessToken = response.data?.data?.accessToken || response.data?.accessToken;
        
        if (!newAccessToken) {
          throw new Error("No access token in refresh response");
        }

        console.log("✅ Token refreshed successfully after 401");
        
        setTokens(newAccessToken, refreshToken);
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        
        processQueue(null, newAccessToken);
        
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("❌ Token refresh failed:", refreshError);
        processQueue(refreshError, null);
        clearTokens();
        window.location.href = "/dashboard/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;