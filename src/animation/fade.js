import { keyframes } from "styled-components";

export const pageFadeIn = keyframes`
  0% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
`

export const fadeOut = keyframes`
  0% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`