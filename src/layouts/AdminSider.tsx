import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AdminSiderProps {
  children?: React.ReactNode;
  collapsed: boolean;
  width: number;
  collapsedWidth: number;
  className?: string;
}

export const AdminSider = ({
  children,
  collapsed,
  width,
  collapsedWidth,
  className,
}: AdminSiderProps) => {
  const targetWidth = collapsed ? collapsedWidth : width;

  return (
    <motion.div
      initial={{ width: targetWidth }}
      animate={{ width: targetWidth }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.6,
      }}
      className={cn(
        "text-foreground bg-background flex shrink-0 flex-col overflow-hidden",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
