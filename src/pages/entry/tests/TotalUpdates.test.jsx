import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  //시작: $0.00(text로 정의)
  const scoopsSubTotal = screen.getByRole("heading", {
    name: /scoops total: \$/,
  });
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
  const toppingsTotal = screen.getByRole("heading", {
    name: /toppings total: \$/,
  });
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
  test("총합은 0 부터 시작한다.", () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent("0.00");
  });
  test("맛이 추가되면 총합이 변한다.", async () => {
    const user = userEvent.setup();

    // Test that the total starts out at $0.00
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent("0.00");

    // update vanilla scoops to 2 and check grand total
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    // add cherries and check grand total
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("5.50");
  });
  test("아이템이 삭제되면 총합은 변한다.", async () => {
    render(<OrderEntry />);

    // add cherries
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    // grand total $1.50

    // update vanilla scoops to 2; grand total should be $5.50
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");

    // remove 1 scoop of vanilla and check grand total
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    // check grand total
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent("3.50");

    // remove cherries and check grand total
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
