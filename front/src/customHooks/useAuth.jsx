import { getClient, loginUser } from "@/redux/actions/actions";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export const useAuth = (enviarmeial) =>{
const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();


    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        // Iniciar sesión
         dispatch(
          loginUser({
            email,
            password,
            loading: (v) => console.error("Cargando"),
            error: (msg) => console.log(msg),
            success: async (res) => {
              // Obtener datos del cliente
               dispatch(
                getClient({
                  loading: (v) => console.error("Cargando"),
                  error: (msg) => console.log(msg),
                  success: async (res) => {
                    router.push("/dashboard/dashboard");
                  },
                })
              );
            },
          })
        );
      } catch (err) {
        console.error(err);
      }
    };
    
        
    


    return{
        handleSubmit,  email, setEmail, password, setPassword
    }
}