import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authSetLoading,
  authSetError,
  authSetUser,
  setBets,
} from "@/redux/actionsreducers/authActionReducer.slice";
import favicon from "../img/logo.png";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { ValidoLogin } from "../../../lib/validaciones";
import Link from "next/link";
import { LoginUsuario } from "../../../lib/metodosFirebase"; // Importa la función fetchFixtures
import { fetchFixtures } from "../../lib/bestCalls";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import axios from "axios";
const initialLogin = {
  correo: "",
  clave: "",
};

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { errorAuth, authenticatedAuth, loadingAuth } = useSelector(
    (state) => state.authReducer
  );

  const [login, setLogin] = useState(initialLogin);
  const [errValidaciones, setErrValidaciones] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (authenticatedAuth) {
        redireccionar();
      }
    }
  }, [authenticatedAuth]);

  useEffect(() => {
    return () => {
      if (errorAuth) {
        dispatch(authSetError(""));
      }
    };
  }, [errorAuth, dispatch]);

  const onChangeLogin = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
    onClickValida(e);
  };

  const onClickValida = (e) => {
    setErrValidaciones(
      ValidoLogin({
        ...login,
        [e.target.name]: e.target.value,
      })
    );
  };

  const submitLogin = (e) => {
      e.preventDefault();
      if (errorAuth) {
         dispatch(authSetError(''));
      }

      if (errValidaciones.valido) {
         LoginUsuario(
            login.correo,
            login.clave,
            (u) => dispatch(authSetUser(u)),
            (v) => dispatch(authSetLoading(v)),
            (msg) => dispatch(authSetError(msg))
         )
         .then(() => {
            axios.get('http://localhost:8080/api/bets') 
            .then((response) => {

               const data = response.data;
               if(errorAuth) throw new Error (errorAuth)
               console.log(errorAuth)
               dispatch(setBets(data.payload)) //antes era data.data, pero nuestro bcak seria payload
               setCookie('accessCokie', authenticatedAuth); // Establece la cookie 'accessCokie' con el valor de authenticatedAuth
               router.push('/dashboard'); // Redirecciona al usuario a la página '/home'
            })
            .catch((error) => {
               console.error(error);
               // Maneja el error de acuerdo a tus necesidades
            });
         })
         .catch((err) => {
            console.error(err);
            // Maneja el error de acuerdo a tus necesidades
         });
      }
   };

  const redireccionar = () => {
    router.push("/dashboard");
  };

  return (
    <main className="bg-neutral-900 px-6 ">
      {loadingAuth ? (
        <div>Cargando...</div>
      ) : (
        <section className="min-h-screen flex justify-center items-center">
          <div className="w-full max-w-[500px]">
            <h2 className="font-heading text-5xl mb-4 text-white tracking-tighter">
              Login a you account
            </h2>
            <p className="mb-16 text-xl text-white tracking-tight"></p>
            <form onSubmit={submitLogin} className="grid gap-2">
              <div>
                <label>
                  <input
                    className="py-3 w-full tracking-tight bg-transparent text-white placeholder-white/90 outline-none border-b border-green-500 focus:border-green-600 transition duration-200"
                    id="signUpInput1-2"
                    type="email"
                    placeholder="Email Address"
                    name="correo"
                    value={login.correo}
                    onChange={(e) => onChangeLogin(e)}
                  />
                </label>
              </div>
              <div>
                <label>
                  <input
                    className="py-3 w-full tracking-tight bg-transparent text-white placeholder-white/90 outline-none border-b border-green-500 focus:border-green-600 transition duration-200"
                    id="signUpInput1-3"
                    type="password"
                    placeholder="Password"
                    name="clave"
                    value={login.clave}
                    onChange={(e) => onChangeLogin(e)}
                  />
                </label>
              </div>

              <div className="w-full grid justify-items-center pt-8">
                <div>
                  <Button
                    type="submit"
                    size="md"
                    className="inline-block mb-7 px-12 py-3 w-full text-white text-center font-semibold tracking-tight bg-green-500 hover:bg-green-600 rounded-[100px] focus:ring-4 focus:ring-green-300 transition duration-200"
                  >
                    Login
                  </Button>
                </div>
                <span className="text-white tracking-tight flex gap-2 lg:text-[20px]">
                  <span className="font-light">Already have an account?</span>
                  <a
                    className="text-white font-semibold transition duration-200"
                    href="/signup"
                  >
                    Create account
                  </a>
                </span>
              </div>
            </form>
          </div>
        </section>
      )}
    </main>
  );
}
