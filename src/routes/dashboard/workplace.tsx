import { AppExample } from "@/store/usage-example";

export default function DashboardWorkplace() {
  return (
    <div className="rounded-lg p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">首页</h1>
      <AppExample />
      <div className="text-gray-600">
        <p>这是工作台首页的占位内容。</p>
        <p>将来这里会展示：</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>数据概览卡片</li>
          <li>快速操作入口</li>
          <li>最近活动</li>
          <li>统计图表</li>
        </ul>
      </div>
    </div>
  );
}
