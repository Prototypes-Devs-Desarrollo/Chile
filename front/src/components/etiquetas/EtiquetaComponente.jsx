import { Typography } from '@material-tailwind/react';
import React, { useState } from 'react';

const EtiquetaComponente = ({ AddEtiqueta }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const etiquetas = [
    { label: 'Pendiente', value: 'pendiente' },
    { label: 'En Camino', value: 'en camino' },
    { label: 'Completado', value: 'completado' },
  ];

  const onClickOpenEti = () => setOpenEti(!openEti);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    AddEtiqueta(option);
    setOpenEti(false);
  };

  return (
    <div className='relative bg-gray-400 h-[60px] w-full min-w-[130px] max-w-[250px]'>
      <Typography className='p-2 h-full text-center' onClick={onClickOpenEti}>
        {selectedOption ? selectedOption.label : 'Selec'}
      </Typography>
      {openEti && (
        <ul className='absolute bg-blue-gray-300 top-[60px] -z-10 w-full h-fit'>
          {etiquetas.map((etiqueta) => (
            <li
              key={etiqueta.value}
              className='w-full h-[60px] cursor-pointer'
              onClick={() => handleSelectOption(etiqueta)}
            >
              <Typography className='p-2 h-full text-center'>{etiqueta.label}</Typography>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EtiquetaComponente;