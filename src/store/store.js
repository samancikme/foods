export const initialState = {
  foodData: [],
  loading: false,
  foodErr: null,
  favFood: JSON.parse(localStorage.getItem("favourite")) || [],
  basketFood: JSON.parse(localStorage.getItem("basket")) || [],
  modalAlert: false,
  mode: JSON.parse(localStorage.getItem("theme")) ?? true, 
  amount: JSON.parse(localStorage.getItem("amount")) ?? 0,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_FOOD_START":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_FOOD_SUCCESS":
      return {
        ...state,
        foodData: action.payload,
        loading: false,
      };
    case "TOGGLE_MODE":
      localStorage.setItem("theme", JSON.stringify(!state.mode));
      return {
        ...state,
        mode: !state.mode,
      };
    case "TOGGLE_MODAL_ALERT":
      return {
        ...state,
        modalAlert: !state.modalAlert,
      };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favFood: JSON.parse(localStorage.getItem("favourite")),
      };
    case "REMOVE_BASKET":
      return {
        ...state,
        basketFood: JSON.parse(localStorage.getItem("basket")),
      };
      case "SET_AMOUNT":
        const totalAmount = action.payload; // dispatch orqali yuborilgan payload'dan foydalanamiz
        localStorage.setItem("amount", JSON.stringify(totalAmount));
        return {
          ...state,
          amount: totalAmount,
        };
    default:
      return state;
  }
};
