import type { AuthError, Session, User } from "@supabase/supabase-js";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  UpdateUserData
} from "@/service/types";
import { supabase } from "../client";

/**
 * Supabase 用户认证 API 类
 */
export class SupabaseAuthAPI {
  /**
   * 用户注册
   * @param credentials 注册凭证
   */
  async signUp(credentials: RegisterCredentials): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: credentials.options
    });

    return {
      user: data.user,
      session: data.session,
      error
    };
  }

  /**
   * 用户登录
   * @param credentials 登录凭证
   */
  async signIn(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password
    });

    return {
      user: data.user,
      session: data.session,
      error
    };
  }

  /**
   * 第三方登录 (Google)
   */
  async signInWithGoogle(): Promise<{ error: AuthError | null }> {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin
      }
    });

    return { error };
  }

  /**
   * 第三方登录 (GitHub)
   */
  async signInWithGitHub(): Promise<{ error: AuthError | null }> {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: window.location.origin
      }
    });

    return { error };
  }

  /**
   * 用户登出
   */
  async signOut(): Promise<{ error: AuthError | null }> {
    const { error } = await supabase.auth.signOut();
    return { error };
  }

  /**
   * 获取当前用户
   */
  async getCurrentUser(): Promise<User | null> {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    return user;
  }

  /**
   * 获取当前会话
   */
  async getCurrentSession(): Promise<Session | null> {
    const {
      data: { session }
    } = await supabase.auth.getSession();
    return session;
  }

  /**
   * 更新用户信息
   * @param updates 更新数据
   */
  async updateUser(updates: UpdateUserData): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.updateUser(updates);

    return {
      user: data.user,
      session: null,
      error
    };
  }

  /**
   * 重置密码 - 发送重置邮件
   * @param email 用户邮箱
   */
  async resetPassword(email: string): Promise<{ error: AuthError | null }> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });

    return { error };
  }

  /**
   * 更新密码
   * @param newPassword 新密码
   */
  async updatePassword(newPassword: string): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });

    return {
      user: data.user,
      session: null,
      error
    };
  }

  /**
   * 监听认证状态变化
   * @param callback 状态变化回调函数
   */
  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }

  /**
   * 刷新会话
   */
  async refreshSession(): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.refreshSession();

    return {
      user: data.user,
      session: data.session,
      error
    };
  }

  /**
   * 验证用户邮箱
   * @param email 用户邮箱
   * @param token 验证令牌
   * @param type 验证类型
   */
  async verifyOtp({
    email,
    token,
    type = "signup"
  }: {
    email: string;
    token: string;
    type: "signup" | "email_change";
  }): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type
    });

    return {
      user: data.user,
      session: data.session,
      error
    };
  }

  /**
   * 重新发送确认邮件
   * @param email 用户邮箱
   * @param type 邮件类型
   */
  async resendConfirmation({
    email,
    type = "signup"
  }: {
    email: string;
    type: "signup" | "email_change";
  }): Promise<{ error: AuthError | null }> {
    const { error } = await supabase.auth.resend({
      type,
      email
    });

    return { error };
  }
}

// TODO: 获取用户路由
export const getUserRoutes = async (_params: { id: string }) => {
  return { data: [] };
};
