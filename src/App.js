import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailProvider } from "./contexts/OrderDetails";

function App() {
  return (
    <Container>
      <OrderDetailProvider>
        {/* Summary page and entry page need provider */}
        <OrderEntry />
      </OrderDetailProvider>
      {/* confirmation page does not need provider */}
    </Container>
  );
}

export default App;
