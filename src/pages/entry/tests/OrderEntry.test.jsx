import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { http, HttpResponse } from "msw";
import { server } from "../../../mocks/server";

test("handler error for sccops and toppings routes", async () => {
  //mocks/handlers.js를 override 하기
  server.resetHandlers(
    http.get("http://localhost:3030/scoops", () => {
      return new HttpResponse(null, { status: 500 });
    }),
    http.get("http://localhost:3030/toppings", () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<OrderEntry />);

  // 경고가 비동기라고 예상해서 find사용(error는 2개)
  // await waitFor(async () => {
  const alerts = await screen.findAllByRole("alert");
  expect(alerts).toHaveLength(2);

  // });
});
