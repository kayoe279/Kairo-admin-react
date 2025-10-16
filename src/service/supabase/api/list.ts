import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/lib";
import type {
  DetailResponse,
  ListQueryParams,
  ListResponse,
  MutationResponse,
  NavListInsert,
  NavListUpdate
} from "@/service/types";
import { supabase } from "../client";

/**
 * 获取列表数据（支持分页、搜索、排序、筛选）
 * @param params 查询参数
 */
export const getList = async (params: ListQueryParams = {}): Promise<ListResponse> => {
  const { keyword, sortBy = "created_at", sortOrder = "descend", disabled } = params;

  const page = Number(params.page) || DEFAULT_PAGE;
  const pageSize = Number(params.pageSize) || DEFAULT_PAGE_SIZE;

  try {
    let query = supabase.from("navList").select("*", { count: "exact" });

    // 应用筛选条件
    if (disabled) {
      query = query.eq("disabled", disabled === "true");
    }

    // 应用搜索条件
    if (keyword) {
      query = query.or(
        `name.ilike.%${keyword}%,link.ilike.%${keyword}%,repository.ilike.%${keyword}%`
      );
    }

    // 应用排序
    query = query.order(sortBy, { ascending: sortOrder === "ascend" });

    // 应用分页
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, error, count, ...rest } = await query;

    if (error) {
      console.error("获取列表失败:", error);
      throw error;
    }

    return {
      list: data || [],
      total: count || 0,
      page,
      pageSize,
      ...rest
    };
  } catch {
    return {
      list: [],
      total: 0,
      page: 1,
      pageSize: 10
    };
  }
};

/**
 * 获取单个项目详情
 * @param id 项目ID
 */
export const getDetail = async (id: number): Promise<DetailResponse> => {
  try {
    const { data, error } = await supabase.from("navList").select("*").eq("id", id).single();

    return {
      data,
      error
    };
  } catch (error) {
    return {
      data: null,
      error
    };
  }
};

/**
 * 创建新项目
 * @param item 要创建的项目数据
 */
export const create = async (item: NavListInsert): Promise<MutationResponse> => {
  try {
    const { data, error } = await supabase.from("navList").insert(item).select().single();

    return {
      data,
      error
    };
  } catch (error) {
    return {
      data: null,
      error
    };
  }
};

/**
 * 更新项目
 * @param id 项目ID
 * @param updates 要更新的数据
 */
export const update = async (id: number, updates: NavListUpdate): Promise<MutationResponse> => {
  try {
    const { data, error } = await supabase
      .from("navList")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    return {
      data,
      error
    };
  } catch (error) {
    return {
      data: null,
      error
    };
  }
};

/**
 * 删除项目
 * @param id 项目ID
 */
export const deleteItem = async (id: number): Promise<{ error: any }> => {
  try {
    const { error } = await supabase.from("navList").delete().eq("id", id);

    return { error };
  } catch (error) {
    return { error };
  }
};

/**
 * 批量删除项目
 * @param ids 项目ID数组
 */
export const batchDelete = async (ids: number[]): Promise<{ error: any }> => {
  try {
    const { error } = await supabase.from("navList").delete().in("id", ids);

    return { error };
  } catch (error) {
    return { error };
  }
};

/**
 * 切换项目启用/禁用状态
 * @param id 项目ID
 * @param disabled 是否禁用
 */
export const toggleStatus = async (id: number, disabled: boolean): Promise<MutationResponse> => {
  try {
    const { data, error } = await supabase
      .from("navList")
      .update({ disabled })
      .eq("id", id)
      .select()
      .single();

    return {
      data,
      error
    };
  } catch (error) {
    return {
      data: null,
      error
    };
  }
};

/**
 * 获取统计信息
 */
export const getStats = async (): Promise<{
  total: number;
  enabled: number;
  disabled: number;
  error: any;
}> => {
  try {
    const [totalResult, enabledResult, disabledResult] = await Promise.all([
      supabase.from("navList").select("*", { count: "exact", head: true }),
      supabase.from("navList").select("*", { count: "exact", head: true }).eq("disabled", false),
      supabase.from("navList").select("*", { count: "exact", head: true }).eq("disabled", true)
    ]);

    return {
      total: totalResult.count || 0,
      enabled: enabledResult.count || 0,
      disabled: disabledResult.count || 0,
      error: totalResult.error || enabledResult.error || disabledResult.error
    };
  } catch (error) {
    return {
      total: 0,
      enabled: 0,
      disabled: 0,
      error
    };
  }
};
