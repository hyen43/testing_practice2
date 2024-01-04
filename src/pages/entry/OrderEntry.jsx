import Button from "react-bootstrap/Button";
import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities/indes";

export default function OrderEntry() {
  const { totals } = useOrderDetails();

  const orderDisabled = totals.scoops === 0;
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      <Button disabled={orderDisabled}>Order</Button>
    </div>
  );
}
