import { Typography } from '@material-tailwind/react';
import React from 'react';

const empleados = () => {
   return (
      <div className="w-[calc(100%-256px)] h-screen overflow-y-auto">
         <Typography variant="h1">Empleados</Typography>
         <p>en Construccion</p>
      </div>
   );
};

export default empleados;
