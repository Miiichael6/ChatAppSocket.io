import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage, RegisterPage } from "../views";
import "../css/login-resgister.css";

const AuthRouter = () => {
  return (
    <>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100 p-t-50 p-b-90">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route path="*" element={<Navigate to="/auth/login" />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthRouter;
