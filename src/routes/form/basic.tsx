export default function FormBasic() {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">基础表单</h1>
      <div className="text-gray-600">
        <p>这是基础表单页面的占位内容。</p>
        <p>将来这里会展示：</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>各种表单控件</li>
          <li>表单验证</li>
          <li>提交处理</li>
          <li>错误提示</li>
        </ul>
      </div>
    </div>
  );
}
