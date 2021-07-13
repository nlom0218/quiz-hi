import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset};
  body {
  }
  * {
    box-sizing: border-box;
  }
  #root {
    min-width: 1200px;
    height: 1000vh;
  }
`