import {
  type QueryKey,
  type UseMutationOptions,
  type UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";
import { queryKeysFactory } from "@/service/queryKey";
import { listApi } from "@/service/supabase/api";
import type {
  ListQueryParams,
  ListResponse,
  MutationResponse,
  NavListInsert
} from "@/service/types";

const listKey = queryKeysFactory("list");

export const useTableList = (
  params?: ListQueryParams,
  options?: Partial<UseQueryOptions<ListResponse, Error, ListResponse, QueryKey>>
) => {
  const { data, ...rest } = useQuery({
    queryKey: listKey.list({ ...params }),
    queryFn: () => listApi.getList(params),
    ...options
  });

  return {
    ...data,
    ...rest
  };
};

export const useTableCreate = (
  options?: Partial<UseMutationOptions<MutationResponse, Error, NavListInsert, QueryKey>>
) => {
  const queryClient = useQueryClient();

  const { data, ...rest } = useMutation({
    mutationFn: listApi.create,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: listKey.lists() });
      options?.onSuccess?.(...args);
    },
    ...options
  });

  return {
    ...data,
    ...rest
  };
};
