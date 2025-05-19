// src/hooks/use-toast.ts
import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast";
import {
  useToast as useToastOriginal,
  type ToastActionProps
} from "../components/ui/use-toast";

// Re-export the original hook with any customizations you want
export const useToast = () => {
  const originalHook = useToastOriginal();
  
  // You can add custom functionality here
  
  return originalHook;
};

// Re-export types
export type { Toast, ToastActionElement, ToastProps, ToastActionProps };