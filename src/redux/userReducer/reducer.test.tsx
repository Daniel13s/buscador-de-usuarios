// reposActions.test.ts
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { fetchRepos } from "./reducer";
import { userReducer } from "./reducer";
import { setupServer } from "msw/node";
import { handlers } from "../../handlers";

const server = setupServer(...handlers)

beforeAll(() => {
    server.listen()
})

test("fetchRepos pega o name vindo do MSW", async () => {
  const store = createStore(userReducer, applyMiddleware(thunk));

  await store.dispatch<any>(fetchRepos("qualquerUser"));

  const state = store.getState();

  expect(state.repos[0].name).toBe("test");
  expect(state.repos[0].description).toBe("test repos")
});
