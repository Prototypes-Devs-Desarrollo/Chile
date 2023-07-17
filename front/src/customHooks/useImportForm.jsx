import React, { useState } from "react";
import { useDispatch } from "react-redux";

const initial = {
  name: "",
  fecha_RDM: "",
  fecha_EDC: "",
  productos: [],
  responsables: [],
  importType: "",
  packageType: "",
  destino: {
    bodega: "",
    cliente: "",
    otro: {}
  },
  package: {
    container: "",
    otro: {}
  }
}

export const useImportForm = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState({
      name: "",
      fecha_RDM: "",
      fecha_EDC: "",
      productos: [],
      responsables: [],
      importType: "",
      packageType: "",
      destino: {
        bodega: "",
        cliente: "",
        otro: {}
      },
      package: {
        container: "",
        otro: {}
      }
    });
  
    function handleChange(e) {
      setInput({
        ...input,
        [e.target.name]: e.target.value
      });
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(createImport(input));  //guarda con el nombre de esta action!!
      setInput({
        name: "",
        fecha_RDM: "",
        fecha_EDC: "",
        productos: [],
        responsables: [],
        importType: "",
        packageType: "",
        destino: {
          bodega: "",
          cliente: "",
          otro: {}
        },
        package: {
          container: "",
          otro: {}
        }
      });
    };

    return {
        handleSubmit, handleChange, input, setInput, dispatch
    }
}

// const mongoose = require('mongoose');

// const importationSchema = mongoose.Schema(
//   {
//     importDate: {
//       type: Date,
//       required: true,
//     },
//     products: [
//       {
//         name: {
//           type: String,
//           required: true,
//         },
//         price: {
//           type: Number,
//           required: true,
//         },
//         quantity: {
//           type: Number,
//           required: true,
//         },
//         customFields: {
//           type: Map, // Utilizamos el tipo Map para los campos personalizados
//           of: String, // Los valores de los campos personalizados son de tipo String
//         },
//       },
//     ],
//     // Otros campos de la importación
//     supplier: {
//       type: String,
//       required: true,
//     },
//     // ... otros campos relacionados con la importación
//   },
//   {
//     timestamps: true,
//   }
// );

// const Importation = mongoose.model('Importation', importationSchema);

// module.exports = Importation;