import { rest } from "msw";

export const handlers = [
  rest.get("/todos", (_, res, ctx) => {
    return res(ctx.json(["起床", "吃饭", "坐地铁"]));
  }),
];
