import { http, HttpResponse } from "msw"

export const handlers = [
        http.get(`https://api.github.com/users/:name/repos`, () => {
            return HttpResponse.json([{
                name: "test",
                description: "test repos"
            }])
        })
    ]