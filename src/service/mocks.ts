// 这里按需导入 mock 文件，只有在这里导入并导出，才会执行 mock 拦截
// 跟根据实际开发情况配置
import TableMock from "./mock/table/list";

export const mocks = [TableMock];
