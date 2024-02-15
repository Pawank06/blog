import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/app.css";
import UserProvider from "./context/UserContext.jsx";
import PostPovider from "./context/PostContext.jsx";
import { ThemeProvider } from "@/components/theme-provider"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <PostPovider>
      <UserProvider>
        <App />
      </UserProvider>
    </PostPovider>
    </ThemeProvider>
  </React.StrictMode>
);
