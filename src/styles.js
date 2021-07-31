import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const color = {
  black: "#3f3f3f",
  white: "#f4f4f4"
}

export const lightTheme = {
  fontColor: color.black,
  bgColor: color.white,
  blurColor: "rgb(255, 255, 255, 0.6)",
  blurBgColor: "rgb(244, 244, 244, 0.9)",
  grayColor: "#EBEBEB"
}
export const darkTheme = {
  fontColor: color.white,
  bgColor: color.black,
  blurColor: "rgb(0, 0, 0, 0.6)",
  blurBgColor: "rgb(63, 63, 63, 0.8)",
  grayColor: "#5A5A5A"
}

export const GlobalStyle = createGlobalStyle`
  ${reset};
  html {
    overflow: auto;
  }
  body {
    min-width: 1200px;
    font-size: 16px;
    color: ${props => props.theme.fontColor};
    background-color: ${props => props.theme.bgColor};
    transition: color 1s ease, background-color 1s ease;
    font-family: 'Nanum Myeongjo', serif;
  }
  * {
    box-sizing: border-box;
    user-select: none;
    letter-spacing: 2px;
    font-family: 'Nanum Myeongjo', serif;
  }
  #root {
  }
  a {
    text-decoration: none;
    color: ${props => props.theme.fontColor};
    transition: all 1s ease;
  }
  input {
    all: unset;
  }
  button {
    border: none;
    font-family: 'Nanum Myeongjo', serif;
    font-size: 16px;
  }
`