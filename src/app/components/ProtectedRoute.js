import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children }) => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};