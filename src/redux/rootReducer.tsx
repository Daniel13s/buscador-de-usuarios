import { combineReducers } from "redux";
import {userReducer} from "./userReducer/reducer";
import themeReducer from "./themeReducer/themeRecuder";

const rootReducer = combineReducers({userReducer, themeReducer})

export type RootReducer = ReturnType<typeof rootReducer>

export default rootReducer