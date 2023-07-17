import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import "tw-elements/dist/css/tw-elements.min.css";

export const SelectClient = ({ input, setInput }) => {
   const clientes = useSelector((state) => state.clientes);
   const [searchValue, setSearchValue] = useState('');
   const [filteredClients, setFilteredClients] = useState([]);
   const [noExiste, setNoExiste] = useState(false);
   const [clienteSelect, setClienteSelect] = useState('');

   useEffect(() => {
      if (searchValue) {
         const filtered = clientes.filter((cliente) => cliente.name.toLowerCase().includes(searchValue.toLowerCase()));
         setFilteredClients(filtered);
         setNoExiste(filtered.length === 0);
      } else {
         setFilteredClients([]);
         setNoExiste(false);
      }
   }, [searchValue, clientes]);

   const handleSelectClient = (cliente) => {
      setInput({ ...input, cliente: cliente });
   };

   const handleAddClient = () => {
      // Lógica para agregar un nuevo cliente
   };

   return (
      <>
         <div className='mb-3'>
            <input
               type='search'
               onChange={(e) => setSearchValue(e.target.value)}
               className='relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary'
               id='exampleSearch'
               placeholder='Type query'
            />
         </div>
         {filteredClients.map((cliente) => (
            <div key={cliente.id} onClick={() => handleSelectClient(cliente)}>
               {cliente.name}
            </div>
         ))}
         {noExiste && <button onClick={handleAddClient}>Agregar cliente</button>}
      </>
   );
};
