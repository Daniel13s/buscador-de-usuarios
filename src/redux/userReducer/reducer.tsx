import axios from "axios";
import type { AppDispatch } from "../store";
import { data } from "react-router-dom";

// Tipo do usuário
export type User = {
  id: number;
  login: string;
  avatar_url: string;
  type: string;
  html_url: string;
};

export type Repos = {
  id: number;
  name: string;
  avatar_url: string;
  html_url: string
  owner: User;
};

// Tipo do estado
export type UserState = {
  data: User[];
  repos: Repos[],
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  data: [],
  repos: [],
  loading: false,
  error: null,
};

// Action types
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";
const SEARCH_USERS = "SEARCH_USERS"
const FETCH_REPOS_REQUEST = "FETCH_REPOS_REQUEST";
const FETCH_REPOS_SUCCESS = "FETCH_REPOS_SUCCESS";
const FETCH_REPOS_FAILURE = "FETCH_REPOS_FAILURE";


// Reducer
export function userReducer(state = initialState, action: any): UserState {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SEARCH_USERS:
      const search: string = action.payload
      const searchUser: User[] = state.data.filter((user: User) => user.login.toLowerCase().includes(search.toLowerCase()));
      return { ...state, loading: false, error: null, data: searchUser };
    case FETCH_REPOS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_REPOS_SUCCESS:
      console.log(action.payload)
      return { ...state, loading: false, repos: action.payload };
    case FETCH_REPOS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

// Thunk action para buscar usuários
export const fetchUsers = () => async (dispatch: AppDispatch) => {
  dispatch({ type: FETCH_USERS_REQUEST });
  try {
    const response = await axios.get<User[]>("https://api.github.com/users");
    dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
  } catch (error: any) {
    dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
  }
};

export const fetchRepos = (name:string) => async(dispatch: AppDispatch) => {
  dispatch({type: FETCH_REPOS_REQUEST})
  try {
    const response = await axios.get(`https://api.github.com/users/${name}/repos`)
    console.log("dispatching FETCH_REPOS_SUCCESS", FETCH_REPOS_SUCCESS);
    dispatch({
      type: FETCH_REPOS_SUCCESS,
      payload: response.data
    })
  } catch(error:any) {
      dispatch({
        type: FETCH_REPOS_FAILURE,
        payload: error.message
      })
  }
}

