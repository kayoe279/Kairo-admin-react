export default function Forbidden() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-300">403</h1>
        <h2 className="mt-4 text-2xl font-bold text-gray-800">用户无权限</h2>
        <p className="mt-2 text-gray-600">抱歉，您没有权限访问该页面。</p>
        <a
          href="/dashboard/workplace"
          className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          返回首页
        </a>
      </div>
    </div>
  );
}
