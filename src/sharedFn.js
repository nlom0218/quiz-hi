import { disableDarkMode, enableDarkMode } from "./apollo"

export const MoveTopScreen = () => {
  return window.scrollTo(0, 0)
}

export const onCLickDarkMode = (darkMode) => {
  if (darkMode === true) {
    disableDarkMode()
  } else if (darkMode === false) {
    enableDarkMode()
  }
}

export const processUserLevel = (score) => {
  if (score < 20) {
    return 1
  } else if (score < 60) {
    return 2
  } else if (score < 140) {
    return 3
  } else if (score < 300) {
    return 4
  } else if (score < 620) {
    return 5
  } else if (score < 1240) {
    return 6
  } else if (score < 2520) {
    return 7
  } else if (score < 5080) {
    return 8
  } else if (score < 10200) {
    return 9
  } else {
    return 10
  }
}