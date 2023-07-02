import { Routes, Route, Navigate } from "react-router-dom";
import { ChatPage } from "../views";
import AuthRouter from "./AuthRouter";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth/AuthContext";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Loader from "../components/Loader";

const AppRouter = () => {
  const { auth, verifyToken } = useContext(AuthContext);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  if (auth.checking) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route element={<PublicRoute isAuthenticated={auth.logged} />}>
        <Route path="/auth/*" element={<AuthRouter />} />
      </Route>

      <Route element={<PrivateRoute isAuthenticated={auth.logged} />}>
      <Route path="/" element={<ChatPage />} />
      <Route path="/saludo" element={ <h1>Hola mundo</h1> } />
      </Route>

      {/* ! encaso de no caer en ninguna más */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
