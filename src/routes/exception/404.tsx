export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-300">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mt-4">页面未找到</h2>
        <p className="text-gray-600 mt-2">抱歉，您访问的页面不存在。</p>
        <a 
          href="/dashboard/workplace" 
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          返回首页
        </a>
      </div>
    </div>
  );
}
