import { useEffect, useState } from "react";
import logodark from "./assets/github-mark.svg";
import logowhite from "./assets/github-mark-white.svg";
import "./App.css";
import Line from "./components/Line/Line";
import UserArea from "./components/UserArea/UserArea";
import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootReducer } from "./redux/rootReducer";
import { fetchUsers } from "./redux/userReducer/reducer";
import type { AppDispatch } from "./redux/store";

function App() {
  const [search, setSearch] = useState<string>("");

  const { theme } = useSelector(
    (rootReducer: RootReducer) => rootReducer.themeReducer
  );

  const dispatch = useDispatch<AppDispatch>();


 useEffect(() => {
    if(search.trim().length === 0) {
      dispatch(fetchUsers())
    } else {
      dispatch({
      type: "SEARCH_USERS",
      payload: search
    })
    }
 }, [dispatch, search])

  function toggleTheme() {
    dispatch({
      type: "toggleTheme",
    });
  }

  return (
    <>
      <div
        id="screen"
        style={{ backgroundColor: theme === "light" ? "white" : "black" }}
      >
        <nav>
          <button
            onClick={toggleTheme}
            id="theme"
            className={theme === "light" ? "light" : "dark"}
          >
            {theme === "light" ? <Sun /> : <Moon />}
          </button>
        </nav>
        <section>
          <img
            src={theme === "light" ? logodark : logowhite}
            alt="Git-hub Icon"
          />
          <h1 style={{ color: theme === "light" ? "black" : "white" }}>
            Buscador de usuários
          </h1>
          <article>
            <input
              className={theme === "light" ? "light" : "dark"}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Digite o nome de usuário"
              aria-label="user-name"
            />
          </article>
          <Line />
          <UserArea />
        </section>
      </div>
    </>
  );
}

export default App;
