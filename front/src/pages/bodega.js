import { Typography } from '@material-tailwind/react';
import React from 'react';

const bodega = () => {
   return (
      <div className="w-[calc(100%-256px)] h-screen overflow-y-auto">
         <Typography variant="h1">Bodega</Typography>
         <p>en Construccion</p>
      </div>
   );
};

export default bodega;
