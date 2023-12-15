import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("initial condition", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  const confirmButton = screen.getByRole("button", {
    name: /confirm order/i,
  });

  // 체크박스가 default로 체크가 되어있지 않은 상태인지 확인
  expect(checkbox).not.toBeChecked();
  // 체크박스가 체크되어있지 않았을 때, 버튼이 비활성화 상태인지 확인
  expect(confirmButton).toBeDisabled();
});

test("체크박스의 체크여부에 따라 버튼 활성화 여부 확인 테스트", async () => {
  // user Event를 사용하기 위해서 user 인스턴스 설정하기
  const user = userEvent.setup();

  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  const confirmButton = screen.getByRole("button", {
    name: /Confirm order/i,
  });

  // 체크박스를 체크하면 버튼 활성화 여부 확인
  // userEvent는 프로미스로 반환하기 때문에 await가 항상 필요함
  await user.click(checkbox);

  expect(checkbox).toBeChecked();
  expect(confirmButton).toBeEnabled();
});

test("popover response to hover", async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);

  // 팦오버가 숨겨져 있을 때 (보이지 않음) : queryBy
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );

  expect(nullPopover).not.toBeInTheDocument();

  // 마우스를 체크박스 위에 호버했을 때 팝오버가 나와야 함

  const termsAndConditions = screen.getByText(/terms and conditions/i);

  await user.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);

  expect(popover).toBeInTheDocument();

  // 마우스가 체크박스에서 없어졌을 때 팝오버가 사라져야 함
  await user.unhover(termsAndConditions);
  expect(nullPopover).not.toBeInTheDocument();
});
