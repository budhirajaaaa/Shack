import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import CreatePost from "./Pages/CreatePost"
import ProtectedRoutes from "./components/ProtectedRoutes.js";
import Home from "./Pages/Home.js";
import Layout from "./components/Layout.js";
import { ToastContainer, toast } from "react-toastify";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <Layout />
          </ProtectedRoutes>
        }
      >
        <Route path="home" element={<Home />} />
        <Route path="create" element={<CreatePost />} />}
      </Route>
    </Routes>
  );
}

export default App;
