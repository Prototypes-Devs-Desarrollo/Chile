import { Cotizaciones } from '@/components/cotizaciones/Cotizaciones';
import { Typography } from '@material-tailwind/react';
import React from 'react';

const cotizaciones = () => {
   return (
      <div className="w-[calc(100%-256px)] h-screen overflow-y-auto">
         <Typography variant="h1">cotizaciones</Typography>
         <Cotizaciones/>
      </div>
   );
};

export default cotizaciones;
