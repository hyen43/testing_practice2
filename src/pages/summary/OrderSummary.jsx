import React from "react";
import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities/indes";

export default function OrderSummary() {
  const { totals, optionCounts } = useOrderDetails();

  // 스쿱 정보가 포함된 객체를 배열로 변경
  const scoopArray = Object.entries(optionCounts.scoops); // [["chocolate", 2], ["vanilla", 1]]
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const toppingKeyArray = Object.keys(optionCounts.toppings); // ["M&Ms", "Gummi Bears"]
  const toppingKeyList = toppingKeyArray.map((key) => <li key={key}>{key}</li>);

  return (
    <div>
      <h1>OrderSummary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
      <ul>{toppingKeyList}</ul>
      <SummaryForm />
    </div>
  );
}
