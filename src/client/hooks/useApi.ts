import { useMutation } from "@tanstack/react-query";

import { apiClient } from "@/client/helpers/network";
import { useWs } from "@/client/hooks/useWs";
import type { Schema } from "@/shared/schema";
import type { TOnSuccess } from "@/shared/types";

export const useApi = () => api;

const api = {
  useGetHello: ({
    message,
    onSuccess,
  }: {
    message?: string;
    onSuccess: TOnSuccess<(typeof Schema.hello.get.response)[200]>;
  }) => {
    return useMutation({
      mutationFn: () => apiClient.http.hello.get({ query: { message } }),
      onSuccess: ({ data }) => data && onSuccess(data),
    });
  },
  usePostHello: ({
    message,
    onSuccess,
  }: {
    message: string;
    onSuccess: TOnSuccess<(typeof Schema.hello.post.response)[200]>;
  }) => {
    return useMutation({
      mutationFn: () => apiClient.http.hello.post({ message }),
      onSuccess: ({ data }) => data && onSuccess(data),
    });
  },
  useWsHello: ({ onSuccess }: { onSuccess: TOnSuccess<typeof Schema.hello.ws.response> }) => {
    return useWs({
      handler: apiClient.ws.hello,
      onSuccess: ({ data }) => data && onSuccess(data),
    });
  },
};
