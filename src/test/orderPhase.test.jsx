import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("order phase for happy path", async () => {
  const user = userEvent.setup();
  //render app
  render(<App />);
  const total = screen.getByRole("heading", { name: /Grand total: \$/ });
  //add 스쿱 토핑
  const chocolateScoop = await screen.findByRole("spinbutton", {
    name: /chocolate/i,
  });
  await user.clear(chocolateScoop);
  await user.type(chocolateScoop, "1"); //1로 증가

  const cherryTopping = await screen.findByRole("checkbox", {
    name: /cherries/i,
  });
  await user.click(cherryTopping);

  expect(total).toHaveTextContent("3.50");
  //find and click order button
  const orderBtn = screen.getByRole("button", { name: "Order" });
  await user.click(orderBtn);

  // check summary infromation based on order
  const summary = screen.getByText("주문내역요약", { exact: false });
  expect(summary).toBeInTheDocument();

  // 조건을 받아들이고 주문 버튼을 클릭

  const termsCheckbox = screen.getByRole("checkbox", {name: /terms and conditions/i});
  await userEvent.click(termsCheckbox);


  const confirmBtn = screen.getByRole("button", { name: "Confirm" });
  await user.click(confirmBtn);

  // 확인 페이지에서 주문 번호를 확인
  const confirmNum = await screen.findByText("123", { exact: false });
  expect(confirmNum).toBeInTheDocument();

  // 클릭 새로운 주문 버튼
  const newOrderBtn = screen.getByRole("button", { name: /new order/i });
  await user.click(newOrderBtn);

  // 다시 첫 페이지로 왔을 때, 총합이 리셋되었는지 확인
  expect(total).toHaveTextContent("0.00");
});
