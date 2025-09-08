import { useParams } from "react-router";

export default function ListInfo() {
  const { id } = useParams();

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">基础详情</h1>
      <div className="text-gray-600">
        <p>这是基础详情页面的占位内容。</p>
        <p>当前ID: {id}</p>
        <p>将来这里会展示：</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>详细信息展示</li>
          <li>相关数据</li>
          <li>操作历史</li>
          <li>编辑功能</li>
        </ul>
      </div>
    </div>
  );
}
