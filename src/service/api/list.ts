import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryKey,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import {
  SupabaseListAPI,
  type ListQueryParams,
  type ListResponse,
  type MutationResponse,
  type NavListInsert,
} from "@/service";
import { queryKeysFactory } from "@/service/queryKey";

const listKey = queryKeysFactory("list");

export const useTableList = (
  params?: ListQueryParams,
  options?: Partial<UseQueryOptions<ListResponse, Error, ListResponse, QueryKey>>
) => {
  const { data, ...rest } = useQuery({
    queryKey: listKey.list({ ...params }),
    queryFn: () => SupabaseListAPI.getList(params),
    ...options,
  });

  return {
    ...data,
    ...rest,
  };
};

export const useTableCreate = (
  options?: Partial<UseMutationOptions<MutationResponse, Error, NavListInsert, QueryKey>>
) => {
  const queryClient = useQueryClient();

  const { data, ...rest } = useMutation({
    mutationFn: SupabaseListAPI.create,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: listKey.lists() });
      options?.onSuccess?.(...args);
    },
    ...options,
  });

  return {
    ...data,
    ...rest,
  };
};
