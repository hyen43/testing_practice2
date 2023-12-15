import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";

test("display image for each scoop option from server", async () => {
  // wrapper에 컴포넌트를 감싸는 무언가를 넣으면 됌
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });

  // image의 길이가 2이다.
  expect(scoopImages).toHaveLength(2);

  //image의 alt도 단언해보기
  const altText = scoopImages.map((el) => el.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]); // 객체나 배열에는 toEqual써야함
});

test("토팅 옵션을 서버로부터 받아와서 이미지 뿌리기", async () => {
  //컴포넌트 랜더링
  render(<Options optionType="toppings" />);

  // 이미지 찾기 (topping으로 이름이 끝나는 이미지들을 찾기)
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });

  //image의 길이가 3이다.
  expect(toppingImages).toHaveLength(3);

  const altText = toppingImages.map((el) => el.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
