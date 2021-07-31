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

export const processNextLevelScore = (level, score) => {
  if (level === 1) {
    return 20 - score
  } else if (level === 2) {
    return 60 - score
  } else if (level === 3) {
    return 140 - score
  } else if (level === 4) {
    return 300 - score
  } else if (level === 5) {
    return 620 - score
  } else if (level === 6) {
    return 1240 - score
  } else if (level === 7) {
    return 2520 - score
  } else if (level === 8) {
    return 5080 - score
  } else if (level === 9) {
    return 10200 - score
  }
}

export const getCreatedDay = (createdAt) => {
  const createDay = new Date(parseInt(createdAt))
  var year = createDay.getFullYear();
  var month = ('0' + (createDay.getMonth() + 1)).slice(-2);
  var day = ('0' + createDay.getDate()).slice(-2);
  return year + '-' + month + '-' + day;
}

export const onClickQuizBasketBtn = (title, id) => {
  const quizBasket = JSON.parse(localStorage.getItem("quizBasket"))
  if (quizBasket === null) {
    localStorage.setItem("quizBasket", JSON.stringify([{ title, id }]))
    return
  }
  const exist = quizBasket.some(item => item.title === title)
  let newQuizBasket = []
  if (exist) {
    newQuizBasket = quizBasket.filter((item) => item.title !== title)
  } else {
    newQuizBasket = [...quizBasket, { title, id }]
  }
  localStorage.setItem("quizBasket", JSON.stringify(newQuizBasket))
}

export const checkQuizBasket = (title, id) => {
  const quizBasket = JSON.parse(localStorage.getItem("quizBasket"))
  if (quizBasket === null) {
    return false
  }
  const exist = quizBasket.some(item => item.title === title)
  if (exist) {
    return true
  } else {
    return false
  }
}

export const onClickResetBasket = (type) => {
  if (type === "quiz") {
    localStorage.removeItem("quizBasket")
  } else if (type === "question") {
    localStorage.removeItem("questionBasket")
  }
}

export const removeBasketItem = (type, title) => {
  if (type === "quiz") {
    const quizBasket = JSON.parse(localStorage.getItem("quizBasket"))
    const newQuizBasket = quizBasket.filter((item) => item.title !== title)
    localStorage.setItem("quizBasket", JSON.stringify(newQuizBasket))
  }
}