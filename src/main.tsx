import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import {store} from './redux/store.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserDetails from './pages/userDetails.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "user-details",
    element: <UserDetails />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
  </StrictMode>,
)
