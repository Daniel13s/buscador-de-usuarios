import "./UserArea.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { useEffect } from "react";
import { fetchUsers, type User } from "../../redux/userReducer/reducer";
import type { RootReducer } from "../../redux/rootReducer";
import { useNavigate } from "react-router-dom";

function UserArea() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const { data: users, loading, error } = useSelector((state: RootReducer) => state.userReducer);
  const {theme} = useSelector((rootReducer:RootReducer) => rootReducer.themeReducer)

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <table>
      {users.map((user: User) => (
        <tr onClick={() => navigate(`/user-details?name=${user.login}&user-image=${user.avatar_url}&htmlurl=${user.html_url}`)} className={theme === "light" ? "light" : "dark"} key={user.id}>
          <img src={user.avatar_url} alt={`Icon de ${user.login}`} />
          <td>
            <p>{user.login}</p>
          </td>
          <td>
            <p>{user.type}</p>
          </td>
          </tr>
      ))}
    </table>
  );
}

export default UserArea;
