import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/actions";
import style from './login_styles.module.css'

 //falta onClick a /register en su respectivo botón


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className={style.form_container}>
    <div className={style.title}>Bienvenido</div>
    <div className={style.subtitle}>Ingrese!</div>
    <form onSubmit={handleSubmit} className={style.form_style}>
    <div className={style.input_cont01}>
        <label className={style.labeltxt}>Email</label>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={style.input}
      />
      </div>
      <div className={style.input_cont02}>
      <label className={style.labeltxt}>Contraseña</label>
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={style.input}
      />
      </div>
      <button className={style.button_login} type="submit">Login</button>
    </form>
    <hr className={style.hr}/>
    <button className={style.register}>Regístrate</button>
    </div>
  );
};
export default Login;
