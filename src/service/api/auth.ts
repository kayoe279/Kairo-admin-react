import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/service/supabase/api";

export const useSignIn = () => {
  return useMutation({
    mutationFn: authApi.signIn
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: authApi.signUp
  });
};

export const useSignOut = () => {
  return useMutation({
    mutationFn: authApi.signOut
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: authApi.verifyOtp
  });
};

export const useResendConfirmation = () => {
  return useMutation({
    mutationFn: authApi.resendConfirmation
  });
};

export const useSignInWithGitHub = () => {
  return useMutation({
    mutationFn: authApi.signInWithGitHub
  });
};

export const useSignInWithGoogle = () => {
  return useMutation({
    mutationFn: authApi.signInWithGoogle
  });
};
