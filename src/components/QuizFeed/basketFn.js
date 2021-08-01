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

export const onClickQuestionBasketBtn = (question, id) => {
  const questionBasket = JSON.parse(localStorage.getItem("questionBasket"))
  if (questionBasket === null) {
    localStorage.setItem("questionBasket", JSON.stringify([{ question, id }]))
    return
  }
  const exist = questionBasket.some(item => item.question === question)
  let newQuestionBasket = []
  if (exist) {
    newQuestionBasket = questionBasket.filter((item) => item.question !== question)
  } else {
    newQuestionBasket = [...questionBasket, { question, id }]
  }
  localStorage.setItem("questionBasket", JSON.stringify(newQuestionBasket))
}

export const checkQuizBasket = (title) => {
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

export const checkQuestionBasket = (question) => {
  const questionBasket = JSON.parse(localStorage.getItem("questionBasket"))
  if (questionBasket === null) {
    return false
  }
  const exist = questionBasket.some(item => item.question === question)
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
  } else if (type === "question") {
    if (type === "quiz") {
      const questionBasket = JSON.parse(localStorage.getItem("questionBasket"))
      const newQuestionBasket = questionBasket.filter((item) => item.question !== title)
      localStorage.setItem("questionBasket", JSON.stringify(newQuestionBasket))
    }
  }
}