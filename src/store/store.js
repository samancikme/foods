export const initialState = {
  foodData: [],
  loading: false,
  foodErr: null,
  favFood: JSON.parse(localStorage.getItem("favourite")),
  basketFood: JSON.parse(localStorage.getItem("basket")),
  modalAlert: false,
  mode: localStorage.getItem("theme") ? false : true, // !false === dark  ;;; true === light
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
    default:
      return state;
  }
};
