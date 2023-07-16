import { useAuth } from '@/customHooks/useAuth';
import React from 'react';
import style from '../styles/login_styles.module.css';

const Login = () => {
   const { handleSubmit, email, setEmail, password, setPassword } = useAuth();
   return (
      <div className={style.container}>
         <div className={style.form_container}>
            <div className={style.title}>Bienvenido</div>
            <div className={style.subtitle}>Ingrese!</div>
            <form onSubmit={handleSubmit} className={style.form_style}>
               <div className={style.input_cont01}>
                  <label className={style.labeltxt}>Email</label>
                  <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className={style.input} />
               </div>
               <div className={style.input_cont02}>
                  <label className={style.labeltxt}>Contraseña</label>
                  <input type='password' placeholder='Contraseña' value={password} onChange={(e) => setPassword(e.target.value)} className={style.input} />
               </div>
               <button className={style.button_login} type='submit'>
                  Login
               </button>
            </form>
            <hr className={style.hr} />
         </div>
      </div>
   );
};

export default Login;
