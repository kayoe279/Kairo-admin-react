export default function ListBasic() {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">基础列表</h1>
      <div className="text-gray-600">
        <p>这是基础列表页面的占位内容。</p>
        <p>将来这里会展示：</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>数据表格</li>
          <li>搜索筛选功能</li>
          <li>分页组件</li>
          <li>操作按钮</li>
        </ul>
      </div>
    </div>
  );
}
