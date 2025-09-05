import { AnimatePresence, motion } from "framer-motion";
import { SvgIcon } from "@/components/ui";
import { cn } from "@/lib";
import { appConfig } from "@/lib/settings/app";
import { useAppSettings, useThemeSettings } from "@/store";

type LogoProps = {
  collapsed?: boolean;
  className?: string;
};

export const Logo = ({ collapsed, className }: LogoProps) => {
  const { darkNav } = useThemeSettings();
  const { navMode } = useAppSettings();

  return (
    <div
      className={cn(
        "flex h-16 items-center justify-center overflow-hidden whitespace-nowrap",
        darkNav && navMode !== "horizontal"
          ? "text-background/80 dark:text-foreground"
          : "text-foreground",
        className
      )}
    >
      <motion.div
        initial={{ marginRight: 8 }}
        animate={{
          marginRight: collapsed ? 0 : 8,
        }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <SvgIcon localIcon="logo" className="inline h-8 w-auto" />
      </motion.div>

      <AnimatePresence mode="wait">
        {!collapsed && (
          <motion.h2
            initial={{
              width: 0,
              opacity: 0,
              x: -10,
            }}
            animate={{
              width: "auto",
              opacity: 1,
              x: 0,
            }}
            exit={{
              width: 0,
              opacity: 0,
              x: -10,
            }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
              opacity: { duration: 0.3 },
              x: { duration: 0.3 },
            }}
            className="font-poppins m-0 inline text-xl whitespace-nowrap"
          >
            {appConfig.title}
          </motion.h2>
        )}
      </AnimatePresence>
    </div>
  );
};
