import { loginUser } from "@/redux/actions/actions";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export const useAuth = () =>{
const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();



    const handleSubmit = async (e) => {
      e.preventDefault();
     dispatch(loginUser({ email, password,     
      loading: (v) => console.error("Cargando"),
      error: (msg) => console.log(msg),
    success: async (res) => router.push("/dashboard/dashboard") 
    }))

    }
    return{
        handleSubmit,  email, setEmail, password, setPassword
    }
}