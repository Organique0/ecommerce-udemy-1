"use client";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
a {
  text-decoration: none;
  color: black;
}
* {
  box-sizing: border-box;
}

body {
  background-color: rgb(255, 255, 255);
  padding: 20px 10px;
}
`;
