import axiosInstance from "./axiosInstance";

export const apiGet = async (endPoint: string) => {
  const { data } = await axiosInstance.get(endPoint);
  return data;
};

export const apiPost = async (endPoint: string, payLoad: object) => {
  const { data } = await axiosInstance.post(endPoint, payLoad);
  return data;
};

export const apiPut = async (endPoint: string, payLoad: object) => {
  const { data } = await axiosInstance.put(endPoint, payLoad);
  return data;
};
// api/api.js
export const apiPatch = async (
  endPoint: string,
  payLoad: object | FormData,
) => {
  const { data } = await axiosInstance.patch(endPoint, payLoad);

  return data;
};

export const apiPatch2 = async (
  endPoint: string,
  id?: string | number,
  payLoad?: object | FormData,
  params?: Record<string, string | number>,
) => {
  // Build the URL with id if provided
  const url = id ? `${endPoint}/${id}` : endPoint;

  const isFormData = payLoad instanceof FormData;

  const config = {
    ...(isFormData && {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
    ...(params && { params }),
  };

  const { data } = payLoad
    ? await axiosInstance.patch(url, payLoad, config)
    : await axiosInstance.patch(url, undefined, config);

  return data;
};

export const apiDelete = async (endPoint: string) => {
  const { data } = await axiosInstance.delete(endPoint);
  return data;
};
