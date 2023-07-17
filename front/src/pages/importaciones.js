import React from 'react';
import { List, ListItem, ListItemPrefix, ListItemSuffix, Chip, Card, Typography, Button } from "@material-tailwind/react";

const onClickAgregar = () => {
   console.log('AGREGAR')
}

const importaciones = () => {
   return (
      <div className='w-[calc(100%-256px)] h-screen overflow-y-auto'>
         <Typography variant='h1'>Importaciones</Typography>
         <Button onClick={onClickAgregar}>Agregar</Button>
      </div>
   );
};

export default importaciones;
