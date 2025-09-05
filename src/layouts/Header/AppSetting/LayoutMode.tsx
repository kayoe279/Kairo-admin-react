import { Button, Tooltip } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useAppActions, useAppSettings } from "@/store";

export const LayoutMode = () => {
  const { t } = useTranslation();
  const { navMode } = useAppSettings();
  const { setNavMode } = useAppActions();

  return (
    <div className="grid grid-cols-3 gap-x-5 py-3">
      {/* 垂直布局 */}
      <div className="h-16 w-full">
        <Tooltip content={t("app.layout.vertical")} placement="bottom">
          <Button
            className={cn(
              "hover:border-primary flex h-full w-full gap-x-1.5 rounded-lg border-2 p-1.5 shadow transition-colors",
              navMode === "vertical" ? "border-primary" : "border-transparent"
            )}
            variant="light"
            onPress={() => setNavMode("vertical")}
          >
            <div className="bg-primary/70 h-full w-4.5 rounded-sm" />
            <div className="flex h-full min-w-0 flex-1 flex-col gap-y-1.5">
              <div className="bg-primary h-4 w-full rounded-sm" />
              <div className="bg-primary/50 min-h-0 w-full flex-1 rounded-sm" />
            </div>
          </Button>
        </Tooltip>
      </div>

      {/* 水平布局 */}
      <div className="h-16 w-full">
        <Tooltip content={t("app.layout.horizontal")} placement="bottom">
          <Button
            className={cn(
              "hover:border-primary flex h-full w-full gap-x-1.5 rounded-lg border-2 p-1.5 shadow transition-colors",
              navMode === "horizontal" ? "border-primary" : "border-transparent"
            )}
            variant="light"
            onPress={() => setNavMode("horizontal")}
          >
            <div className="flex h-full min-w-0 flex-1 flex-col gap-y-1.5">
              <div className="bg-primary h-4 w-full rounded-sm" />
              <div className="bg-primary/50 min-h-0 w-full flex-1 rounded-sm" />
            </div>
          </Button>
        </Tooltip>
      </div>

      {/* 混合布局 */}
      <div className="h-16 w-full">
        <Tooltip content={t("app.layout.horizontalMix")} placement="bottom">
          <Button
            className={cn(
              "hover:border-primary flex h-full w-full flex-col gap-y-1.5 rounded-lg border-2 p-1.5 shadow transition-colors",
              navMode === "horizontal-mix" ? "border-primary" : "border-transparent"
            )}
            variant="light"
            onPress={() => setNavMode("horizontal-mix")}
          >
            <div className="bg-primary h-4 w-full rounded-sm" />
            <div className="flex min-h-0 w-full flex-1 gap-x-1.5">
              <div className="bg-primary/70 h-full w-4.5 rounded-sm" />
              <div className="bg-primary/50 min-h-0 w-full flex-1 rounded-sm" />
            </div>
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};
