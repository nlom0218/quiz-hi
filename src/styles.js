import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset};
  body {
    font-family: 'Nanum Myeongjo', serif;
  }
  * {
    box-sizing: border-box;
  }
  #root {
    min-width: 1200px;
    height: 1000vh;
  }
  a {
    text-decoration: none;
    color: black;
  }
`