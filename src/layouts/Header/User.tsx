import { App, Avatar, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { SvgIcon } from "@/components/ui";
import { appConfig } from "@/lib/settings/app";
import { useUserActions, useUserInfo } from "@/store/user";

export const User = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = useUserInfo();
  const { logout } = useUserActions();
  const { message, modal } = App.useApp();

  // 用户下拉菜单选项
  const userMenuItems: MenuProps["items"] = [
    {
      key: "setting-account",
      label: t("auth.userSetting"),
      icon: <SvgIcon icon="solar:settings-outline" className="text-base" />,
    },
    {
      key: "logout",
      label: t("auth.logout"),
      icon: <SvgIcon icon="solar:logout-2-broken" className="text-base" />,
    },
  ];

  // 处理菜单点击事件
  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "setting-account":
        navigate("/setting/account");
        break;
      case "logout":
        handleLogout();
        break;
    }
  };

  // 处理退出登录
  const handleLogout = () => {
    modal.confirm({
      title: t("common.tip"),
      content: t("auth.logoutConfirm.content"),
      okText: t("common.ok"),
      cancelText: t("common.cancel"),
      centered: true,
      onOk: async () => {
        await logout(navigate, location.pathname);
        message.success(t("auth.logoutConfirm.successMessage"));
      },
    });
  };

  return (
    <div className="flex items-center justify-center">
      <Dropdown
        menu={{ items: userMenuItems, onClick: handleMenuClick }}
        trigger={["hover"]}
        placement="bottomRight"
      >
        <div className="flex cursor-pointer items-center justify-center gap-x-2 rounded-md px-2 py-1 text-sm transition-colors">
          <Avatar
            src={userInfo?.avatar || appConfig.avatar}
            size="default"
            className="shadow-lg ring-2 ring-blue-100"
          />
          {userInfo?.nickname && <span>{userInfo.nickname}</span>}
        </div>
      </Dropdown>
    </div>
  );
};
