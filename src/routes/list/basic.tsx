export default function ListBasic() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">基础列表</h1>
      <div className="text-gray-600">
        <p>这是基础列表页面的占位内容。</p>
        <p>将来这里会展示：</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>数据表格</li>
          <li>搜索筛选功能</li>
          <li>分页组件</li>
          <li>操作按钮</li>
        </ul>
      </div>
    </div>
  );
}
