import { screen, waitFor } from "@testing-library/react";
import { renderWithProvider } from "../../../utils/test/test.utils";
import CartIconComponent from "../cart-icon.component.tsx";

describe("cart icon tests", () => {
  test("uses proloaded state to render", () => {
    const initialCartItems = [
      { id: 1, imageUrl: "test", name: "item", price: 10, quantity: 1 },
    ];

    renderWithProvider(<CartIconComponent />, {
      preloadedState: {
        cart: {
          cartItems: initialCartItems,
        },
      },
    });

    waitFor(() => {
      const cartIconElement = screen.getByTestId("cart-icon");
      expect(cartIconElement).toBeInTheDocument();
    });
  });
});
