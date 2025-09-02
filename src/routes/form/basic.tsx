export default function FormBasic() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">基础表单</h1>
      <div className="text-gray-600">
        <p>这是基础表单页面的占位内容。</p>
        <p>将来这里会展示：</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>各种表单控件</li>
          <li>表单验证</li>
          <li>提交处理</li>
          <li>错误提示</li>
        </ul>
      </div>
    </div>
  );
}
