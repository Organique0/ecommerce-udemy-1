import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";
import { rootReducer } from "../../redux-saga-store/root-reducer";

export function renderWithProvider(
  ui,
  {
    preloadedState = {},
    store = legacy_createStore(rootReducer, preloadedState),
    ...renderOptions
  } = {}
) {
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return { store, ...render(ui, { ...renderOptions, wrapper: Wrapper }) };
}
