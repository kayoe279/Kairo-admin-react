export default function About() {
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold text-gray-800">关于项目</h1>
      <div className="text-gray-600">
        <p>这是关于项目页面的占位内容。</p>
        <p>Kairo Admin - React 版本</p>
        <p>将来这里会展示：</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>项目介绍</li>
          <li>版本信息</li>
          <li>技术栈</li>
          <li>更新日志</li>
        </ul>
      </div>
    </>
  );
}
