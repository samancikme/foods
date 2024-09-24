import axios from "axios";

export const getAllData = async (url, dispatch) => {
  await dispatch({ type: "FETCH_FOOD_START" });
  try {
    const res = await axios.get(url);
    await dispatch({ type: "FETCH_FOOD_SUCCESS", payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
