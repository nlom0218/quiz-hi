export const onClickQuizBasketBtn = (title, id) => {
  const quizBasket = JSON.parse(localStorage.getItem("quizBasket"))
  if (quizBasket === null) {
    localStorage.setItem("quizBasket", JSON.stringify([{ title, id }]))
    return
  }
  const exist = quizBasket.some(item => item.id === id)
  let newQuizBasket = []
  if (exist) {
    newQuizBasket = quizBasket.filter((item) => item.id !== id)
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
  const exist = questionBasket.some(item => item.id === id)
  let newQuestionBasket = []
  if (exist) {
    newQuestionBasket = questionBasket.filter((item) => item.id !== id)
  } else {
    newQuestionBasket = [...questionBasket, { question, id }]
  }
  localStorage.setItem("questionBasket", JSON.stringify(newQuestionBasket))
}

export const checkQuizBasket = (id) => {
  const quizBasket = JSON.parse(localStorage.getItem("quizBasket"))
  if (quizBasket === null) {
    return false
  }
  const exist = quizBasket.some(item => item.id === id)
  if (exist) {
    return true
  } else {
    return false
  }
}

export const checkQuestionBasket = (id) => {
  const questionBasket = JSON.parse(localStorage.getItem("questionBasket"))
  if (questionBasket === null) {
    return false
  }
  const exist = questionBasket.some(item => item.id === id)
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

export const removeBasketItem = (type, id) => {
  if (type === "quiz") {
    const quizBasket = JSON.parse(localStorage.getItem("quizBasket"))
    const newQuizBasket = quizBasket.filter((item) => item.id !== id)
    localStorage.setItem("quizBasket", JSON.stringify(newQuizBasket))
  } else if (type === "question") {
    if (type === "quiz") {
      const questionBasket = JSON.parse(localStorage.getItem("questionBasket"))
      const newQuestionBasket = questionBasket.filter((item) => item.id !== id)
      localStorage.setItem("questionBasket", JSON.stringify(newQuestionBasket))
    }
  }
}