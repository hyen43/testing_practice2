import axios from "axios";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import ScoopOptions from "./ScoopOptions";
import ToppingOptions from "./ToppingOptions";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { formatCurrency } from "../../utilities/indes";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();

  //optionType is 'scoops' or 'toppings'
  useEffect(() => {
    // 프로세스를 처리할 수 있는 javascript의 객체( 테스트를 위해 네트워크요청에 넣기)
    // const controller = new AbortController();
    // controller의 신호를 감지하고 있고, 신호가 중단되면 get도 중단된다.
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        // TODO: handle error response
        setError(true);
      });

    //clean up function(컴포넌트 Unmount시, axios call 중단)
    // return () => {
    //   controller.abort();
    // };
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }
  // console.log("type, total", optionType, totals);

  //TODO: 나중에 null 부분을 toping option 컴포넌트로 대체
  const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingOptions;
  // console.log("optionType", optionType[0]);
  // const title =
  //   optionType[0]?.toUppercase() + optionType?.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return (
    <>
      <h2>{optionType}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <h3>
        {optionType} total: {formatCurrency(totals[optionType])}
      </h3>
      <Row>{optionItems}</Row>
    </>
  );
}
