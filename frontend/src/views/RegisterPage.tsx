import { useState, FormEvent, ChangeEvent, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import Swal from "sweetalert2";

export const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const todoOk = () => {
    return ( form.email.trim().length > 0 && form.password.trim().length > 0 )
      ? true
      : false;
  };


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, name } = form;
    const { ok, msg } = await register(name, email, password);

    if(!ok){
      Swal.fire("Error", msg, "error");
      return;
    }
  };

  return (
    <form
      className="login100-form validate-form flex-sb flex-w"
      onSubmit={(e) => handleSubmit(e)}
    >
      <span className="login100-form-title mb-3">Chat - Registro</span>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="row mb-3">
        <div className="col text-right">
          <Link to="/auth/login" className="txt1">
            Ya tienes cuenta?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button className="login100-form-btn" disabled={!todoOk()}>Crear cuenta</button>
      </div>
    </form>
  );
};
