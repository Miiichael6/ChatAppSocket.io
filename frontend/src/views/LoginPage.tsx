import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import Swal from "sweetalert2";

export const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
    remenberme: false,
  });

  const todoOk = () => {
    return form.email.trim().length > 0 && form.password.trim().length > 0
      ? true
      : false;
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const toggleCheck = () => {
    setForm({
      ...form,
      remenberme: !form.remenberme,
    });
  };

  const handlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.remenberme
      ? localStorage.setItem("email", form.email)
      : localStorage.removeItem("email");

    // todo email
    const { email, password } = form;
    const authentication = await login(email, password);

    if (!authentication) {
      Swal.fire("Error", "Verifique el user y contraseña", "error");
    }
  };

  useEffect(() => {
    const remenberEmail = localStorage.getItem("email") || "";
    setForm({
      ...form,
      email: remenberEmail,
      remenberme: remenberEmail ? true : false,
    });
  }, []);

  return (
    <form
      onSubmit={(e) => handlerSubmit(e)}
      className="login100-form validate-form flex-sb flex-w"
    >
      <span className="login100-form-title mb-3">Chat - Login</span>

      <div className="wrap-input100 validate-input mb-3">
        <input
          value={form.email}
          className="input100"
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => handleOnChange(e)}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => handleOnChange(e)}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="row mb-3">
        <div onClick={() => toggleCheck()} className="col">
          <input
            className="input-checkbox100"
            id="ckb1"
            type="checkbox"
            name="rememberme"
            checked={form.remenberme}
            readOnly
          />
          <label className="label-checkbox100">Recordarme</label>
        </div>

        <div className="col text-right">
          <Link to="/auth/register" className="txt1">
            Nueva cuenta?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button className="login100-form-btn" disabled={!todoOk()}>Ingresar</button>
      </div>
    </form>
  );
};
