interface anyAction {
    type: string
}
const themeValue = localStorage.getItem("theme")
const initialState ={ 
    theme: themeValue ? JSON.parse(themeValue) : ""
}

function themeReducer(state=initialState, action:anyAction) {
    switch(action.type) {
        case "toggleTheme":
            const themeVerify: string = state.theme === "light" ? "dark" : "light"
            localStorage.setItem("theme", JSON.stringify(themeVerify))
            const themeValueUp: string | null = localStorage.getItem("theme")
            const themeUp: string = themeValueUp ? JSON.parse(themeValueUp) : "";
            return {...state, theme: themeUp}
        default:
            return state
    }
}

export default themeReducer