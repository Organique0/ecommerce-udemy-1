import { screen, fireEvent } from "@testing-library/react";
import { renderWithProvider } from "../../../utils/test/test.utils.js";
import ProductCard from "../product-card.component.tsx";

describe("Product card tests", () => {
  test("it should add product item when Product Card button is clicked", async () => {
    const mockProduct = {
      id: 1,
      imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
      name: "test",
      price: 10,
    };
    const { store } = renderWithProvider(
      <ProductCard product={mockProduct} />,
      {
        preloadedState: {
          cart: {
            cartItems: [],
          },
        },
      }
    );

    const addToCartButtonElement = screen.getByText(/add to cart/i);
    await fireEvent.click(addToCartButtonElement);

    expect(store.getState().cart.cartItems.length).toBe(1);
  });
});
