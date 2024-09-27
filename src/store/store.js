export const initialState = {
  foodData: [],
  loading: false,
  foodErr: null,
  favFood: JSON.parse(localStorage.getItem("favourite")),
  basketFood: JSON.parse(localStorage.getItem("basket")),
  modalAlert: false,
  mode: localStorage.getItem("theme") ? false : true, // !false === dark  :::::::: true === light
  amount: 0,
}
export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_FOOD_START":
      return {
        ...state,
        loading: true,
      }
    case "FETCH_FOOD_SUCCESS":
      return {
        ...state,
        foodData: action.payload,
        loading: false,
      }
    case "TOGGLE_MODE":
      return {
        ...state,
        mode: !state.mode,
      }
    case "TOGGLE_MODAL_ALERT":
      return {
        ...state,
        modalAlert: !state.modalAlert,
      }
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favFood: JSON.parse(localStorage.getItem("favourite")),
      }
    case "REMOVE_BASKET":
      return {
        ...state,
        basketFood: JSON.parse(localStorage.getItem("basket")),
      }
    case "SET_AMOUNT":
      const totalAmount = state.basketFood?.length
        ? state.basketFood.reduce(
            (acc, item) => acc + (item.price * item.quantity || 0),
            0
          )
        : 0
      localStorage.setItem("amount", JSON.stringify(totalAmount))
      return {
        ...state,
        amount: action.payload,
      }

    default:
      return state
  }
}
