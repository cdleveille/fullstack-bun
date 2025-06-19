import { useMutation } from "@tanstack/react-query";

import { apiClient } from "@/client/helpers/network";
import { useWs } from "@/client/hooks/useWs";
import type { TOnSuccess } from "@/shared/types";

export const useApi = () => {
  const useGetHello = ({
    name,
    onSuccess,
  }: {
    name?: string;
    onSuccess: TOnSuccess<{ message: string }>;
  }) =>
    useMutation({
      mutationFn: () => apiClient.http.hello.get({ query: { name } }),
      onSuccess: ({ data }) => data && onSuccess(data),
    });

  const usePostHello = ({
    name,
    onSuccess,
  }: {
    name: string;
    onSuccess: TOnSuccess<{ message: string }>;
  }) =>
    useMutation({
      mutationFn: () => apiClient.http.hello.post({ name }),
      onSuccess: ({ data }) => data && onSuccess(data),
    });

  const useWsHello = ({ onSuccess }: { onSuccess: TOnSuccess<{ message: string }> }) =>
    useWs({
      handler: apiClient.ws.hello,
      onSuccess: ({ data }) => data && onSuccess(data),
    });

  return { useGetHello, usePostHello, useWsHello };
};
