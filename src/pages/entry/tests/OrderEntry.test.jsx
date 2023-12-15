import { render, screen } from "@testing-library/react";
import OrderEntry from "../OrderEntry";
import { http, HttpResponse } from "msw";
import { server } from "../../../mocks/server";

test("handler error for sccops and toppings routes", async () => {
  //mocks/handlers.js를 override 하기
  server.resetHandlers();
  http.get("http://localhost:3030/scoops", () => {
    return new HttpResponse(null, { status: 500 });
  });
  http.get("http://localhost:3030/toppings", () => {
    return new HttpResponse(null, { status: 500 });
  });

  render(<OrderEntry />);

  // 경고가 비동기라고 예상해서 find사용(error는 2개)
  const alerts = await screen.findAllByRole("alert", {
    name: /예상하지 못한 문제가 발생했습니다. 나중에 다시 해주세요./i,
  });

  expect(alerts).toHaveLength(2);
});
