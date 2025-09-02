export default function DashboardConsole() {
  return (
    <div className="rounded-lg p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">主控台</h1>
      <div className="text-gray-600">
        <p>这是主控台页面的占位内容。</p>
        <p>将来这里会展示：</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>系统监控面板</li>
          <li>服务器状态</li>
          <li>性能指标</li>
          <li>操作日志</li>
        </ul>
      </div>
    </div>
  );
}
