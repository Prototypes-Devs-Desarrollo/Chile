import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import { AddOrden } from './AddOrden';


const AddOrdenModal = () => {
  const productosFromRedux = useSelector((state) => state.reducerProduc.productos);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Añadir orden manualmente
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Agregar Orden Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <button onClick={closeModal} className="absolute top-2 right-2 text-red-500 cursor-pointer">
          X
        </button>
        <AddOrden/>
      </Modal>
    </>
  );
};

export default AddOrdenModal;