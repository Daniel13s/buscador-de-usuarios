import { render, screen } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import UserDetails from "./userDetails"

describe("userDetails component", () => {
    const handlers = [
        http.get("https://api.github.com/users/mojombo/repos", () => {
            return HttpResponse.json([{
                name: "test",
                description: "test repos"
            }])
        })
    ]
    const server = setupServer(...handlers)

    beforeAll(() => {
        server.listen()
    })
    it("should user details", async() => {
        render(<UserDetails />)
        await screen.findByText("test")
    })
})