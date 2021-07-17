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