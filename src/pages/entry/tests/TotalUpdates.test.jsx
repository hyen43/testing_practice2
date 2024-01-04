import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

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

test("토핑의 소계를 업데이트하는 테스트", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);
  // 기본 토핑 소계 단언(0)
  const toppingsTotal = screen.getByText("total: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("0.00");
  // 한가지 옵션에 체크를 해 본 뒤 소계 업데이트(handler.js 파일 참고_ toppings 엔드포인트에 대한 모의 서버 응답 참고)
  const optionCherries = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(optionCherries);
  expect(toppingsTotal).toHaveTextContent("1.50");
  // 체크박스 2개를 동시에 처리했을 때, 소계 업데이트
  const optionMandMs = screen.getByRole("checkbox", { name: "M&Ms" });
  await user.click(optionMandMs);
  expect(toppingsTotal).toHaveTextContent("3.00");
  // 그 중 하나를 다시 체크 해제하고 소계에서 빠지는 지 확인
  await user.click(optionCherries);
  expect(toppingsTotal).toHaveTextContent("1.50");
});

describe("맛 + 토핑의 총합을 구하기", () => {
  const user = userEvent.setup();
  render(<OrderEntry />);
  const entryTotal = screen.getByRole("heading", { name: /Grand total: \$/ });

  // beforeEach(() => {});
  it("총합은 0 부터 시작한다.", () => {
    expect(entryTotal).toHaveTextContent("0.00");
  });
  it("맛이 추가되면 총합이 변한다.", async () => {
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: /Chocolate/i,
    });
    await user.clear(chocolateInput);
    await user.type(chocolateInput, "2");
    expect(entryTotal).toHaveTextContent("4.00");
  });
  it("옵션이 추가되면 총합이 변한다.", async () => {
    const checkboxHotFudge = await screen.findByRole("checkbox", {
      name: /hot fudge/i,
    });

    await user.click(checkboxHotFudge);
    expect(entryTotal).toHaveTextContent("5.50");
  });
  it("아이템이 삭제되면 총합은 변한다.", async () => {
    const checkboxHotFudge = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });

    await user.click(checkboxHotFudge);
    expect(entryTotal).toHaveTextContent("4.00");
  });
});
