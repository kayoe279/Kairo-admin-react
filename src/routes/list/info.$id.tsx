import { useParams } from "react-router";

export default function ListInfo() {
  const { id } = useParams();
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">基础详情</h1>
      <div className="text-gray-600">
        <p>这是基础详情页面的占位内容。</p>
        <p>当前ID: {id}</p>
        <p>将来这里会展示：</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>详细信息展示</li>
          <li>相关数据</li>
          <li>操作历史</li>
          <li>编辑功能</li>
        </ul>
      </div>
    </div>
  );
}
