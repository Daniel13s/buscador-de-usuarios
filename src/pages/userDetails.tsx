import { useDispatch, useSelector } from "react-redux";
import Line from "../components/Line/Line";
import type { RootReducer } from "../redux/rootReducer";
import { useNavigate, useSearchParams } from "react-router-dom";
import logoWhite from "../assets/github-mark-white.svg";
import logoDark from "../assets/github-mark.svg";
import "./useDetails.css";
import { useEffect } from "react";
import { fetchRepos, type Repos } from "../redux/userReducer/reducer";
import type { AppDispatch } from "../redux/store";
import { ArrowLeft } from "lucide-react";

function UserDetails() {
  const { repos, error, loading } = useSelector(
    (rootReducer: RootReducer) => rootReducer.userReducer
  );
  const { theme } = useSelector(
    (rootReducer: RootReducer) => rootReducer.themeReducer
  );

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const name = searchParams.get("name");
  const avatarUrl = searchParams.get("user-image");

  useEffect(() => {
    dispatch(fetchRepos(name!));
  }, [dispatch, name]);
  return (
    <>
      <div
        id="screenD"
        style={{ backgroundColor: theme === "light" ? "white" : "black" }}
      >
        <nav id="navD">
          <button
            onClick={() => navigate(-1)}
            className={theme === "light" ? "light" : "dark"}
          >
            <ArrowLeft />
          </button>
        </nav>
        <img id="user-icon" src={`${avatarUrl}`} alt={`icon de ${name}`} />
        <section id="user-info">
          <h1 style={{ color: theme === "light" ? "black" : "white" }}>
            {name}
          </h1>
              <img
                id="icon-github"
                src={theme === "light" ? logoDark : logoWhite}
                alt="Logo do github"
              />
        </section>
        <h2 style={{ color: theme === "light" ? "black" : "white" }}>
          Repositorios
        </h2>
        <Line />
        <table id="tableD">
          <tr>
            <th>Nome</th>
            <th>Owner</th>
          </tr>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            repos.map((repo: Repos) => (
              <a href={repo.html_url} target="_blanck">
                <tr className={theme === "light" ? "light" : "dark"}>
                  <td>
                    <h3>{repo.name}</h3>
                  </td>
                  <td>
                    <p>{name}</p>
                  </td>
                </tr>
              </a>
            ))
          )}
        </table>
      </div>
    </>
  );
}

export default UserDetails;
