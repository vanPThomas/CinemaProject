import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./navigation/RootLayout.jsx";
import MovieInfo from "./pages/MovieInfo.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import TicketPage from "./pages/TicketPage.jsx";
import AuthContextProvider from "./context/AuthContext";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthContextProvider>
        <RootLayout>
          <App />
        </RootLayout>
      </AuthContextProvider>
    ),
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/movies/:title",
        element: <MovieInfo />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/ticketPage",
        element: <TicketPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={browserRouter} />
  </React.StrictMode>
);
