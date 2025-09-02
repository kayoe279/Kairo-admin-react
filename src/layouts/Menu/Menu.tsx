import { useState } from "react";
import { Link, useLocation } from "react-router";

interface MenuItem {
  title: string;
  path: string;
  icon?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: "工作台",
    path: "/dashboard",
    icon: "🏠",
    children: [
      { title: "首页", path: "/dashboard/workplace" },
      { title: "主控台", path: "/dashboard/console" },
    ],
  },
  {
    title: "列表页面",
    path: "/list",
    icon: "📋",
    children: [
      { title: "基础列表", path: "/list/basic" },
      { title: "基础详情", path: "/list/info/1" },
    ],
  },
  {
    title: "表单页面",
    path: "/form",
    icon: "📝",
    children: [
      { title: "基础表单", path: "/form/basic" },
      { title: "分步表单", path: "/form/step" },
      { title: "表单详情", path: "/form/detail" },
    ],
  },
  {
    title: "组件示例",
    path: "/comp",
    icon: "🧩",
    children: [
      { title: "基础表格", path: "/comp/table/basic" },
      { title: "单元格编辑", path: "/comp/table/edit-cell" },
      { title: "整行编辑", path: "/comp/table/edit-row" },
      { title: "基础表单", path: "/comp/form/basic" },
      { title: "useForm", path: "/comp/form/use-form" },
      { title: "上传图片", path: "/comp/upload" },
      { title: "弹窗扩展", path: "/comp/modal" },
      { title: "富文本", path: "/comp/richtext" },
      { title: "拖拽", path: "/comp/drag" },
    ],
  },
  {
    title: "权限",
    path: "/permissions",
    icon: "🛡️",
    children: [
      { title: "权限展示", path: "/permissions/example" },
      { title: "超级管理员", path: "/permissions/super" },
    ],
  },
  {
    title: "设置页面",
    path: "/setting",
    icon: "⚙️",
    children: [
      { title: "个人设置", path: "/setting/account" },
      { title: "系统设置", path: "/setting/system" },
    ],
  },
  {
    title: "关于项目",
    path: "/about",
    icon: "ℹ️",
  },
];

function MenuItem({ item, level = 0 }: { item: MenuItem; level?: number }) {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const isActive = location.pathname === item.path;
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="menu-item">
      <div
        className={`flex cursor-pointer items-center px-4 py-2 text-sm`}
        style={{ paddingLeft: `${(level + 1) * 16}px` }}
        onClick={() => (hasChildren ? setExpanded(!expanded) : null)}
      >
        {item.icon && <span className="mr-2">{item.icon}</span>}
        {hasChildren ? (
          <div className="flex w-full items-center justify-between">
            <span>{item.title}</span>
            <span className={`transform transition-transform ${expanded ? "rotate-90" : ""}`}>
              ▶
            </span>
          </div>
        ) : (
          <Link to={item.path} className="flex-1">
            {item.title}
          </Link>
        )}
      </div>
      {hasChildren && expanded && (
        <div>
          {item.children!.map((child) => (
            <MenuItem key={child.path} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export const Menu = () => {
  return (
    <div className="w-64 shadow-xs">
      <div className="p-4">
        <h1 className="text-xl font-bold">Kairo Admin</h1>
      </div>
      <nav className="mt-4 overflow-y-auto">
        {menuItems.map((item) => (
          <MenuItem key={item.path} item={item} />
        ))}
      </nav>
    </div>
  );
};
