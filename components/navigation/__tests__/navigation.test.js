"use client";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithProvider } from "../../../utils/test/test.utils";
import NavBar from "../NavBar";
import { useDispatch } from "react-redux";
import { signOutStart } from "../../../redux-saga-store/user/user.action";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("navigation tests", () => {
  test("it should render a sign in link if there is no current user", () => {
    renderWithProvider(<NavBar />, {
      preloadedState: {
        user: {
          currentUser: null,
        },
      },
    });

    const signInLinkElement = screen.getByText(/sign in/i);
    expect(signInLinkElement).toBeInTheDocument();

    const signOutLinkElement = screen.queryByText(/sign out/i);
    expect(signOutLinkElement).toBeNull();
  });

  test("it should render Sign out if there is current user", () => {
    renderWithProvider(<NavBar />, {
      preloadedState: {
        user: {
          currentUser: {},
        },
      },
    });

    const signOutLinkElement = screen.getByText(/sign out/i);
    expect(signOutLinkElement).toBeInTheDocument();

    const signInLinkElement = screen.queryByText(/sign in/i);
    expect(signInLinkElement).toBeNull();
  });

  test("it should not render a cart dropdown it isCartOpen is false", () => {
    renderWithProvider(<NavBar />, {
      preloadedState: {
        cart: {
          cartOpen: false,
          cartItems: [],
        },
      },
    });
    const cartDropdownText = screen.queryByText(/your cart is empty/i);
    expect(cartDropdownText).toBeNull();
  });

  test("it should render a cart dropdown if isCartOpen is true", () => {
    renderWithProvider(<NavBar />, {
      preloadedState: {
        cart: {
          cartOpen: true,
          cartItems: [],
        },
      },
    });
    const dropdownTextElement = screen.getByText(/your cart is empty/i);
    expect(dropdownTextElement).toBeInTheDocument();
  });

  test("it should dispatch signOutStart action when clicking on the Sign Out link", async () => {
    const mockDispatch = jest.fn();
    //jest.spyOn(reactRedux, "useDispatch").mockReturnValue(mockDispatch);
    useDispatch.mockReturnValue(mockDispatch);
    renderWithProvider(<NavBar />, {
      preloadedState: {
        user: {
          currentUser: {},
        },
      },
    });
    expect(screen.getByText("SIGN OUT")).toBeInTheDocument();

    await fireEvent.click(screen.getByText("SIGN OUT"));

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(signOutStart());

    mockDispatch.mockClear();
  });
});
