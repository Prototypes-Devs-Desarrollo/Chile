import { Typography } from '@material-tailwind/react';
import React, { useEffect, useRef, useState } from 'react';

const EtiquetaComponente = () => {
   const [openEti, setOpenEti] = useState(false);

   const onClickOpenEti = () => setOpenEti(!openEti);

   return (
      <div className='relative bg-gray-400 h-[60px] w-full min-w-[130px] max-w-[250px]'>
         <Typography className='p-2 h-full text-center'  onClick={onClickOpenEti}>Selec</Typography>
         {openEti && (
            <ul className='absolute bg-blue-gray-300 top-[60px] -z-10 w-full h-fit'>
               <li className='w-full h-[60px] bg-red-500'>
                  <Typography className='p-2 h-full text-center'>Texto 1</Typography>
               </li>
               <li className='w-full h-[60px] bg-green-500'>
                  <Typography className='p-2 h-full text-center'>Texto 2</Typography>
               </li>
               <li className='w-full h-[60px] bg-blue-500'>
                  <Typography className='p-2 h-full text-center'>Texto 3</Typography>
               </li>
            </ul>
         )}
      </div>
   );
};

export default EtiquetaComponente;
