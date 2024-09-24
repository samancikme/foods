import { createContext } from "react";
import { initialState } from "./store";

export const MainContext = createContext(initialState)