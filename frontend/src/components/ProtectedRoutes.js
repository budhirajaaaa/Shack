import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.js";
export default function ProtectedRoutes({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}
