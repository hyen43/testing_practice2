import { render, fireEvent, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

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

test("체크박스의 체크여부에 따라 버튼 활성화 여부 확인 테스트", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  const confirmButton = screen.getByRole("button", {
    name: /Confirm order/i,
  });

  // 체크박스를 체크하면 버튼 활성화 여부 확인
  fireEvent.click(checkbox);

  expect(checkbox).toBeChecked();
  expect(confirmButton).toBeEnabled();
});
