import {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  apiPatch,
  apiPatch2,
} from "@/api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Fetch Hook
// export const useFetchData = (key: string[], endPoint: string, options?:{
//   enabled?: boolean;
// }) => {
//   const {enabled=true} = options || {}
//   return useQuery({
//     queryKey: key,
//     queryFn: () => apiGet(endPoint),
//     enabled,
//   });
// };

// Fetch Hook
export const useFetchData = (
  key: string[],
  endPoint: string,
  options?: {
    enabled?: boolean;
    refetchOnMount?: boolean | "always";
    staleTime?: number;
  },
) => {
  const {
    enabled = true,
    refetchOnMount = "always",
    staleTime = 0,
  } = options || {};

  return useQuery({
    queryKey: key,
    queryFn: () => apiGet(endPoint),
    enabled,
    refetchOnMount,
    staleTime,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

// Add Hook
export const useAddData = (key: string[], endPoint: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: object) => apiPost(endPoint, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
      // toast.success("Added");
    },
  });
};

// Update Hook
export const useUpdateData = (key: string[], endPoint: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string | number; payload: object }) =>
      apiPut(`${endPoint}/${id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
      // toast.success("Updated")
    },
    onError: (error) => {
      toast.error(`Failed to update! ${error}`);
    },
  });
};
export const usePatchData3 = (key: string[], endPoint: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: object) => apiPatch(endPoint, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
  });
};


export const usePatchData = (key: string[], endPoint: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string | number;
      payload: object | FormData;
    }) => apiPatch(`${endPoint}/${id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
      // toast.success("Updated successfully");
    },
    onError: (error: any) => {
      console.error("Update error:", error);
      toast.error(error?.response?.data?.message || "Failed to update");
    },
  });
};

export const usePatchData2 = (key: string[], endPoint: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
      params,
    }: {
      id?: string | number;
      payload?: object | FormData;
      params?: Record<string, string | number>;
    }) => apiPatch2(endPoint, id, payload, params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
      // toast.success("Updated")
    },
  });
};

// Delete Hook
export const useDeleteData = (key: string[], endPoint: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiDelete(`${endPoint}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
      // toast.success("Deleted");
    },
  });
};
