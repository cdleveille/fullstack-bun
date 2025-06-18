import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { apiClient } from "@/client/helpers/network";
import { useWs } from "@/client/hooks/useWs";

export const useApi = () => {
  const useGetHello = (name?: string) =>
    useMutation({
      mutationFn: () => apiClient.http.hello.get({ query: { name } }),
      onSuccess: ({ data }) => toast.success(`get: ${data?.message}`),
    });

  const usePostHello = (name: string) =>
    useMutation({
      mutationFn: () => apiClient.http.hello.post({ name }),
      onSuccess: ({ data }) => toast.success(`post: ${data?.message}`),
    });

  const useWsHello = () =>
    useWs({
      handler: apiClient.ws.hello,
      onSuccess: ({ data }) => toast.success(`ws: ${data.message}`),
    });

  return { useGetHello, usePostHello, useWsHello };
};
