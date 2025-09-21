import { useSelector } from "react-redux";
import "./Line.css"
import type { RootReducer } from "../../redux/rootReducer";

function Line() {
    const {theme} = useSelector((rootReducer:RootReducer) => rootReducer.themeReducer)
    return <div style={{backgroundColor: theme === "light" ? "black" : "white"}}></div>
}

export default Line;