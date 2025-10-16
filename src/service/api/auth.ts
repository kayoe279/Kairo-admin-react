import { useMutation } from "@tanstack/react-query";
import { SupabaseAuthAPI } from "@/service";

export const useSignIn = () => {
  return useMutation({
    mutationFn: SupabaseAuthAPI.signIn
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: SupabaseAuthAPI.signUp
  });
};

export const useSignOut = () => {
  return useMutation({
    mutationFn: SupabaseAuthAPI.signOut
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: SupabaseAuthAPI.verifyOtp
  });
};

export const useResendConfirmation = () => {
  return useMutation({
    mutationFn: SupabaseAuthAPI.resendConfirmation
  });
};

export const useSignInWithGitHub = () => {
  return useMutation({
    mutationFn: SupabaseAuthAPI.signInWithGitHub
  });
};

export const useSignInWithGoogle = () => {
  return useMutation({
    mutationFn: SupabaseAuthAPI.signInWithGoogle
  });
};
