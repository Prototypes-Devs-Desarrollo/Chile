import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const initial = {
   name: '',
   fecha_RDM: '',
   fecha_EDC: '',
   productos: [],
   responsables: [],
   importType: '',
   packageType: '',
   destino: {
      bodega: '',
      cliente: '',
      otro: {},
   },
   package: {
      container: '',
      otro: {},
   },
};

export const useImportForm = () => {
   const dispatch = useDispatch();
   const [input, setInput] = useState(initial);

   function handleChange(e) {
      setInput({
         ...input,
         [e.target.name]: e.target.value,
      });
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(createImport(input)); //guarda con el nombre de esta action!!
      setInput({
         name: '',
         fecha_RDM: '',
         fecha_EDC: '',
         productos: [],
         responsables: [],
         importType: '',
         packageType: '',
         destino: {
            bodega: '',
            cliente: '',
            otro: {},
         },
         package: {
            container: '',
            otro: {},
         },
      });
   };

   const setName = (name) => setInput({ ...input, name });
   const setFechaRDM = (fecha_RDM) => setInput({ ...input, fecha_RDM });
   const setFechaEDC = (fecha_EDC) => setInput({ ...input, fecha_EDC });
   const addProducto = (p) => setInput({ ...input, productos: [...input.productos, p] });
   const delProducto = (idPro) => setInput({ ...input, productos: input.productos.filter((x) => x.id !== idPro) });
   const addResponable = (r) => setInput({ ...input, responsables: [...input.responsables, r] });
   const delResponsable = (idRes) => setInput({ ...input, responsables: input.responsables.filter((x) => x.id !== idRes) });
   const setImportType = (importType) => setInput({ ...input, importType });
   const setPackageType = (packageType) => setInput({ ...input, packageType });
   const setDestinoBodega = (bodega) => setInput({ ...input, destino: { ...input.destino, bodega } });
   const setDestinoCliente = (cliente) => setInput({ ...input, destino: { ...input.destino, cliente } });
   //  const setDestinoOtro = (name) => setInput({ ...input, name })
   const setPackageContainer = (container) => setInput({ ...input, package: { ...input.package, container } });
   // const setPackageOtro = (name) => setInput({ ...input, name })

   return {
      handleSubmit,
      handleChange,
      input,
      dispatch,
      setName,
      setFechaRDM,
      setFechaEDC,
      addProducto,
      delProducto,
      addResponable,
      delResponsable,
      setImportType,
      setPackageType,
      setDestinoBodega,
      setDestinoCliente,
      setPackageContainer,
   };
};

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
