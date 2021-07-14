import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const color = {
  black: "#212121",
  white: "#FFFFFF"
}

export const lightTheme = {
  fontColor: color.black,
  bgColor: color.white,
}
export const darkTheme = {
  fontColor: color.white,
  bgColor: color.black,
}

export const GlobalStyle = createGlobalStyle`
  ${reset};
  body {
    font-family: 'Nanum Myeongjo', serif;
  }
  * {
    box-sizing: border-box;
    user-select: none;
  }
  #root {
    min-width: 1200px;
    height: 1000vh;
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.fontColor};
    transition: all 0.6s ease 0s;
  }
  a {
    text-decoration: none;
    color: black;
  }
`