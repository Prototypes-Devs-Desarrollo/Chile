import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registrarUsuario } from '../../../lib/metodosFirebase';
import { authSetLoading, authSetError, authSetUser } from '@/redux/actionsreducers/authActionReducer.slice';
import { Card, CardHeader, CardBody, Input, Button, Typography } from '@material-tailwind/react';

import { useRouter } from 'next/router';
import { ValidoRegistro } from '../../../lib/validaciones';


export default function Signup() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { errorAuth, authenticatedAuth } = useSelector((state) => state.authReducer);

  const [registro, setRegistro] = useState({
   correo: '',
   clave: '',
   rclave: '',
   name: '',
 });
  const [errValidaciones, setErrValidaciones] = useState({});

  useEffect(() => {
    return () => {
      if (errorAuth) {
        dispatch(authSetError(''));
      }
    };
  }, [errorAuth, dispatch]);

  const onChangeSignup = (e) => {
    setRegistro({
      ...registro,
      [e.target.name]: e.target.value,
    });
    onClickValida(e);
  };

  const onClickValida = (e) => {
    setErrValidaciones(
      ValidoRegistro({
        ...registro,
        [e.target.name]: e.target.value,
      })
    );
  };

  const submitSignup = (e) => {

    e.preventDefault();
    if (errorAuth) {
      dispatch(authSetError(''));
    }

    if (errValidaciones.valido) {
      let email = registro.correo
      let password = registro.clave
     let  firstName= registro.name
      registrarUsuario(
       email,
       password,
       firstName,
        (u) => {
          dispatch(authSetUser(u));
          router.push('/dashboard');
        },
        (v) => dispatch(authSetLoading(v)),
        (msg) => dispatch(authSetError(msg))
      );
    }
  };

  if (authenticatedAuth) {
    router.push('/dashboard');
  }

  return (
    <section className="py-36 lg:py-28 bg-black overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading mb-4 text-6xl text-white tracking-tighter">Create a free account</h2>
          <p className="mb-16 text-xl text-white tracking-tight">
            Use and re-use tons of responsive sections too a main create the perfect layout. Sections are ready.
          </p>
          <form className="flex flex-wrap -m-3" onSubmit={submitSignup}>
            <div className="w-full md:w-1/2 p-3">
              <label className="block">
                <input
                  className="p-4 w-full text-gray-700 tracking-tight bg-white placeholder-gray-700 outline-none border border-gray-600 rounded-lg focus:border-indigo-500 transition duration-200"
                  id="signUpInput1-1"
                  type="text"
                  placeholder="First Name"
                  name="name"
                  value={registro.name}
                  onChange={(e) => onChangeSignup(e)}
                />
              </label>
            </div>
            <div className="w-full md:w-1/2 p-3">
              <label className="block">
                <input
                  className="p-4 w-full text-gray-700 tracking-tight bg-white placeholder-gray-700 outline-none border border-gray-600 rounded-lg focus:border-indigo-500 transition duration-200"
                  id="signUpInput1-2"
                  type="email"
                  placeholder="Email Address"
                  name="correo"
                  value={registro.correo}
                  onChange={(e) => onChangeSignup(e)}
                />
              </label>
            </div>
            <div className="w-full md:w-1/2 p-3">
              <label className="block">
                <input
                  className="p-4 w-full text-gray-700 tracking-tight bg-white placeholder-gray-700 outline-none border border-gray-600 rounded-lg focus:border-indigo-500 transition duration-200"
                  id="signUpInput1-3"
                  type="password"
                  placeholder="Password"
                  name="clave"
                  value={registro.clave}
                  onChange={(e) => onChangeSignup(e)}
                />
              </label>
            </div>
            <div className="w-full md:w-1/2 p-3">
              <label className="block">
                <input
                  className="p-4 w-full text-gray-700 tracking-tight bg-white placeholder-gray-700 outline-none border border-gray-600 rounded-lg focus:border-indigo-500 transition duration-200"
                  id="signUpInput1-4"
                  type="password"
                  placeholder="Confirm Password"
                  name="rclave"
                  value={registro.rclave}
                  onChange={(e) => onChangeSignup(e)}
                />
              </label>
            </div>
            <div className="w-full p-3">
              <div className="relative flex p-px bg-transparent overflow-hidden rounded-lg">
                <div className="inline-block">
                  <input
                    className="form-input opacity-0 absolute top-px z-10 h-5 w-5"
                    id="signUpCheckbox1-1"
                    type="checkbox"
                    name="confirm"
                    value="yes"
                  />
                  <div className="mr-2.5 text-transparent border border-gray-500 w-5 h-5 relative top-px flex justify-center items-center rounded">
                    <svg
                      className="w-2.5 h-2.5"
                      width="9"
                      height="7"
                      viewBox="0 0 9 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.604248 3.77081L2.68758 5.85415L7.89591 0.645813"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                </div>
                <label className="select-none text-gray-400 tracking-tight" htmlFor="signUpCheckbox1-1">
                  <span>I agree to the</span>
                  <a className="text-white hover:text-gray-200" href="#">
                    Terms &amp; Conditions &amp; Privacy Policy
                  </a>
                </label>
              </div>
            </div>
            <div className="w-full p-3">
              <Button
                type="submit"
                size="md"
                className="inline-block mb-7 px-5 py-4 w-full text-white text-center font-semibold tracking-tight bg-indigo-500 hover:bg-indigo-600 rounded-lg focus:ring-4 focus:ring-indigo-300 transition duration-200"
              >
                Create Free Account
              </Button>
              <span className="font-medium text-white tracking-tight">
                <span>Already have an account?</span>
                <a className="text-red-500 hover:text-red-700 transition duration-200" href="/login">
                  Sign In
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}