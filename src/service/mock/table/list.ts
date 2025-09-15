import { defineMock } from "@alova/mock";
import { faker } from "@faker-js/faker";
import { format } from "date-fns";
import { doCustomTimes, resultSuccess } from "../helper";

function tableList(pageSize: number) {
  const result: any[] = [];
  doCustomTimes(pageSize, () => {
    result.push({
      id: faker.string.numeric(4),
      name: faker.person.firstName(),
      sex: faker.person.sexType(),
      avatar: `https://picsum.photos/200/200?v=${faker.string.numeric(4)}`,
      email: faker.internet.email({ firstName: "admin" }),
      city: faker.location.city(),
      status: faker.helpers.arrayElement(["close", "refuse", "pass"]),
      type: faker.helpers.arrayElement(["person", "company"]),
      createDate: format(faker.date.recent(), "yyyy-MM-dd HH:mm"),
    });
  });
  return result;
}

export default defineMock({
  // 表格数据列表
  "/api/table/list": ({ query }) => {
    const { page = 1, pageSize = 20 } = query;
    const list = tableList(Number(pageSize));
    // 并非真实，只是为了模拟搜索结果
    return resultSuccess({
      page: Number(page),
      pageSize: Number(pageSize),
      total: 600,
      list,
      params: query,
    });
  },
});
