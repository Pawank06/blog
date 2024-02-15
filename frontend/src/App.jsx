import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";
import Dashboard from "./pages/users/Dashboard";
import HomePage from "./pages/posts/Home";
import CreatePage from "./pages/posts/Create";
import UpdatePage from "./pages/posts/Update";
import AuthRoutes from "./routes/AuthRoutes";
import GuestRoutes from "./routes/GuestRoutes";
import SinglePost from "./pages/posts/SinglePost";

const App = () => {
  return (
    <div className="px-6 w-full relative max-w-3xl mx-auto">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path= "/api/posts/post/:id" element={<SinglePost />} />

            <Route element={<AuthRoutes />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="create" element={<CreatePage />} />
              <Route path="update" element={<UpdatePage />} />
            </Route>

            <Route element={<GuestRoutes />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
