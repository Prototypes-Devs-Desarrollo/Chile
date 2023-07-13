import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createClient } from "../../redux/actions/actions"; //no existe ruta para esto a la fecha de creacion del componente
import style from "../productForm/productForm.module.css"; //pongo los estilos del productForm en caso de querer usas Tailwind
import { useClient } from "@/customHooks/useClient";

export default function ClientForm() {

  const {
    dispatch, input, setInput, handleChange, handleSubmit
} = useClient()

  //es muy probable que falten campos, el modelo hoy sólo tiene name
  return (
    <div className={style.formCont}>
      <div className={style.clientForm}>
        <h1>Crear un nuevo cliente</h1>

        <form onSubmit={handleSubmit}>
          <div className={style.fields}>
            <label>Nombre:</label>
            <input
              value={input.name}
              name="name"
              onChange={handleChange}
              type="text"
              placeholder="Nombre"
            />
          </div>
          <br />
          <button type="submit">Agregar cliente</button>
        </form>
      </div>
    </div>
  );
}