import { render } from "@testing-library/react";
import { OrderDetailProvider } from "../contexts/OrderDetails";

const renderWithContext = (ui, options) => {
  render(ui, { wrapper: OrderDetailProvider, ...options });
};

export * from "@testing-library/react";

//override render method

export { renderWithContext as render };
