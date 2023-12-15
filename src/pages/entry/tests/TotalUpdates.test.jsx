import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  //시작: $0.00(text로 정의)
  const scoopsSubTotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubTotal).toHaveTextContent("0.00");
  // 바닐라 스쿱을 1개 업데이트 했을 때 소계가 달라지는 지,(비동기적인 요소가 있었음)
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubTotal).toHaveTextContent("2.00");

  // 업데이트 초콜릿 스쿱 2개
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: /chocolate/i,
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2"); // type은 문자열 요구

  expect(scoopsSubTotal).toHaveTextContent("6.00");
});

test("토핑의 소계를 업데이트하는 테스트", () => {
  // 기본 토핑 소계 단언(0)
  // 한가지 옵션에 체크를 해 본 뒤 소계 업데이트
  // 체크박스 2개를 동시에 처리했을 때, 소계 업데이트
  // 그 중 하나를 다시 체크 해제하고 소계에서 빠지는 지 확인
});
