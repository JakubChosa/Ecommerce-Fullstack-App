import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserContext();
  if (!user) {
    return <Navigate to="/register" />;
  }
  return children;
};
export default ProtectedRoute;
