import { render, screen } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import UserArea from "./UserArea"
import { Provider } from "react-redux"
import { store } from "../../redux/store"
import { MemoryRouter } from "react-router-dom"


describe("UserArea component", () => {
    const handlers = [
        http.get("https://api.github.com/users", () => {
            return HttpResponse.json([
                {
                    login: "daniel",
                    avatar_url: "",
                }
            ])
        })
    ]
    const server = setupServer(...handlers)
    beforeAll(() => {
        server.listen()
    })

    it("mostre os usuarios na tela", async () => {
        render(
        <Provider store={store}>
            <MemoryRouter>
                <UserArea />
            </MemoryRouter>
        </Provider>
        )

        await screen.findByText("daniel")
    })
})