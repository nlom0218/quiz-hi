export const onClickLibraryQuizBasketBtn = (title, id) => {
  const libraryQuizBasket = JSON.parse(localStorage.getItem("libraryQuizBasket"))
  if (libraryQuizBasket === null) {
    localStorage.setItem("libraryQuizBasket", JSON.stringify([{ title, id }]))
    return
  }
  const exist = libraryQuizBasket.some(item => item.id === id)
  let newLibraryQuizBasket = []
  if (exist) {
    newLibraryQuizBasket = libraryQuizBasket.filter((item) => item.id !== id)
  } else {
    newLibraryQuizBasket = [...libraryQuizBasket, { title, id }]
  }
  localStorage.setItem("libraryQuizBasket", JSON.stringify(newLibraryQuizBasket))
}

export const checkLibraryQuizBasket = (id) => {
  const libraryQuizBasket = JSON.parse(localStorage.getItem("libraryQuizBasket"))
  if (libraryQuizBasket === null) {
    return false
  }
  const exist = libraryQuizBasket.some(item => item.id === id)
  if (exist) {
    return true
  } else {
    return false
  }
}

export const onClickLibraryQuestionBasketBtn = (title, id) => {
  const libraryQuestionBasket = JSON.parse(localStorage.getItem("libraryQuestionBasket"))
  if (libraryQuestionBasket === null) {
    localStorage.setItem("libraryQuestionBasket", JSON.stringify([{ title, id }]))
    return
  }
  const exist = libraryQuestionBasket.some(item => item.id === id)
  let newLibraryQuestionBaskett = []
  if (exist) {
    newLibraryQuestionBaskett = libraryQuestionBasket.filter((item) => item.id !== id)
  } else {
    newLibraryQuestionBaskett = [...libraryQuestionBasket, { title, id }]
  }
  localStorage.setItem("libraryQuestionBasket", JSON.stringify(newLibraryQuestionBaskett))
}

export const checkLibraryQuestionBasket = (id) => {
  const libraryQuestionBasket = JSON.parse(localStorage.getItem("libraryQuestionBasket"))
  if (libraryQuestionBasket === null) {
    return false
  }
  const exist = libraryQuestionBasket.some(item => item.id === id)
  if (exist) {
    return true
  } else {
    return false
  }
}