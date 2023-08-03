import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddOrdenMethod } from '../../../utils/metodos/metodosOrdenes';
import { useRouter } from 'next/router';
import { setProducts } from '@/redux/reducer/reducerProduc';
import axios from 'axios';
import { clieSetCliente } from '@/redux/reducer/reducerClient';
import CircularJSON from 'circular-json';
import { cloneDeep } from 'lodash';

export const AddOrden = () => {
  const productosFromRedux = useSelector((state) => state.reducerProduc.productos);
  const clients = useSelector((state) => state.reducerClient.clienteClie); // Renamed clientes to clients

  const [orden, setOrden] = useState({
    cliente: {
      nombreEmpresa: '',
      rut: '',
      giro: '',
      direccion: '',
      email: '',
      telefono: '',
    },
    proveedor: {
      nombreEmpresa: '',
      rut: '',
      direccion: '',
      comuna: '',
      giro: '',
      ciudad: '',
      contacto: '',
    },
    ordenCompra: {
      numero: '',
      fechaEmision: '',
      formaPago: '',
      fechaEntrega: '',
      moneda: '',
      solicitante: '',
    },
    productoSeleccionado: null,
    productos: [],
    subTotal: '',
    descuentoGlobal: '',
    montoNeto: '',
    montoExento: '',
    iva: '',
    total: '',
    observacionesGenerales: '',
    observacionesPago: '',
  });
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsClients, setSearchResultsClients] = useState([]);
  const [searchValueClient, setSearchValueClient] = useState('');

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleClienteSearchChange = (e) => {
    const value = e.target.value;
    setSearchValueClient(value);
    setSearchResultsClients([]);

    if (value.length >= 3) {
      // Perform client search in the 'clients' array from Redux state
      const clientesEncontrados = buscarCliente(value);
      setSearchResultsClients(clientesEncontrados);
    } else {
        setSearchResultsClients([]);
    }

    // Reset the selected client when the search value changes
    setOrden((prevOrden) => ({
      ...prevOrden,
      cliente: {
        nombreEmpresa: '',
        rut: '',
        giro: '',
        direccion: '',
        email: '',
        telefono: '',
      },
    }));
  };

  // Function to perform client search based on the searchValue
  const buscarCliente = (searchValueClient) => {
    if (!clients || clients.length === 0) {
      return [];
    }
    return clients.filter((cliente) => {
      return (
        cliente.nombreEmpresa.toLowerCase().includes(searchValueClient.toLowerCase()) ||
        cliente.rut.toLowerCase().includes(searchValueClient.toLowerCase())
      );
    });
  };
const [clintSelect, setClientSelect] = useState()
  // Function to handle selecting a client from search results
  const handleSeleccionarCliente = (cliente) => {
    setOrden((prevOrden) => ({
      ...prevOrden,
      cliente: {
        nombreEmpresa: cliente.nombreEmpresa,
        rut: cliente.rut,
        giro: cliente.giro,
        direccion: cliente.direccion,
        email: cliente.email,
        telefono: cliente.telefono,
      },
    }));
  };
  console.log(orden)
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    // Reset the selected product when the search value changes
    setOrden((prevOrden) => ({
      ...prevOrden,
      productoSeleccionado: null,
    }));
  };

  useEffect(() => {
    if (searchValue.length >= 3) {
      const delayedSearch = debounce(() => {
        const productosEncontrados = buscarProducto(searchValue);
        setSearchResults(productosEncontrados);
      }, 300);
      delayedSearch();
    } else {
    //   setSearchResults([]);
    }
  }, [searchValue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrden((prevOrden) => ({
      ...prevOrden,
      [name]: value,
    }));
  };
  const handleKgChange = (e, product) => {
    const kg = e.target.value;
    const updatedProduct = cloneDeep(product); // Clonar el objeto productoSeleccionado
    updatedProduct.kg = kg; // Actualizar el kg en el objeto clonado
  
    const updatedProducts = selectedProducts.map((item) =>
      item.product.codigo === product.codigo ? { ...item, product: updatedProduct } : item
    );
    setSelectedProducts(updatedProducts);
  };
  
  const handleVolumenChange = (e, product) => {
    const volumen = e.target.value;
    const updatedProduct = cloneDeep(product); // Clonar el objeto productoSeleccionado
    updatedProduct.volumen = volumen; // Actualizar el volumen en el objeto clonado
  
    const updatedProducts = selectedProducts.map((item) =>
      item.product.codigo === product.codigo ? { ...item, product: updatedProduct } : item
    );
    setSelectedProducts(updatedProducts);
  };
  const handleSeleccionarProducto = (producto) => {
    setSelectedProducts((prevProducts) => [
      ...prevProducts,
      { product: producto, quantity: 1, kg: 0, volumen: 0 }, // Add KG and Volumen with initial values
    ]);
    setOrden((prevOrden) => ({
      ...prevOrden,
      productos: [...prevOrden.productos, producto],
      productoSeleccionado: producto,
    }));
    setSearchResults([]); // Clear the search results after selecting a product
  };
  const buscarProducto = (searchValue) => {
    if (!productosFromRedux || productosFromRedux.length === 0) {
      return [];
    }
    return productosFromRedux.filter((producto) => {
      const found =
        producto.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        producto.codigo.toLowerCase().includes(searchValue.toLowerCase());
  
      if (found) {
        return {
          ...producto,
          kg: 0, // Add KG with initial value
          volumen: 0, // Add Volumen with initial value
        };
      }
  
      return null;
    });
  };

  const handleBuscarProducto = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    // Clear the selected products when the search value changes
    setSelectedProducts([]);
  };

  const addOrUpdateProduct = (product, quantity) => {
    const existingProduct = selectedProducts.find((item) => item.product.codigo === product.codigo);
    if (existingProduct) {
      setSelectedProducts((prevProducts) =>
        prevProducts.map((item) =>
          item.product.codigo === product.codigo ? { product, quantity } : item
        )
      );
    } else {
      setSelectedProducts((prevProducts) => [...prevProducts, { product, quantity }]);
    }
  };

  const handleQuantityChange = (e, product) => {
    const quantity = e.target.value;
    addOrUpdateProduct(product, quantity);
  };

  const router = useRouter();

  const handleSubmit = async () => {
    const token = localStorage.getItem('Token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const clonedOrd = CircularJSON.stringify(orden); // Use stringify method for serialization
    try {
      const response = await axios.post('orden/create', clonedOrd, config);
      console.log(response);
      // Do something with the response if needed.
    } catch (error) {
      console.log(error);
    }
  };;

  const dispatch = useDispatch()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`product/getAll`);
        dispatch(setProducts(response.data.payload));
        const response2 = await axios.get("client/getAll");
        dispatch(clieSetCliente(response2.data.payload));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const opcionesObservacionesGenerales = ['Aérea', 'Marítima', 'Terrestre'];
 
  const setProveedorNombreEmpresa = (nombreEmpresa) => {
    setOrden({ ...orden, proveedor: { ...orden.proveedor, nombreEmpresa } });
  };
  
  const setProveedorRut = (rut) => {
    setOrden({ ...orden, proveedor: { ...orden.proveedor, rut } });
  };
  
  const setProveedorDireccion = (direccion) => {
    setOrden({ ...orden, proveedor: { ...orden.proveedor, direccion } });
  };
  
  const setOrdenCompraNumero = (numero) => {
    setOrden({ ...orden, ordenCompra: { ...orden.ordenCompra, numero } });
  };
  
  const setOrdenCompraFechaEmision = (fechaEmision) => {
    setOrden({ ...orden, ordenCompra: { ...orden.ordenCompra, fechaEmision } });
  };
  
  const setOrdenCompraFormaPago = (formaPago) => {
    setOrden({ ...orden, ordenCompra: { ...orden.ordenCompra, formaPago } });
  };
  
  const setOrdenCompraFechaEntrega = (fechaEntrega) => {
    setOrden({ ...orden, ordenCompra: { ...orden.ordenCompra, fechaEntrega } });
  };
  
  const setOrdenCompraMoneda = (moneda) => {
    setOrden({ ...orden, ordenCompra: { ...orden.ordenCompra, moneda } });
  };
  
  const setOrdenCompraSolicitante = (solicitante) => {
    setOrden({ ...orden, ordenCompra: { ...orden.ordenCompra, solicitante } });
  };
  
  const setSubTotal = (subTotal) => {
    setOrden({ ...orden, subTotal });
  };
  
  const setDescuentoGlobal = (descuentoGlobal) => {
    setOrden({ ...orden, descuentoGlobal });
  };
  
  const setMontoNeto = (montoNeto) => {
    setOrden({ ...orden, montoNeto });
  };
  
  const setMontoExento = (montoExento) => {
    setOrden({ ...orden, montoExento });
  };
  
  const setIva = (iva) => {
    setOrden({ ...orden, iva });
  };
  
  const setTotal = (total) => {
    setOrden({ ...orden, total });
  };
  
  const setObservacionesGenerales = (observacionesGenerales) => {
    setOrden({ ...orden, observacionesGenerales });
  };
  return (
        <div className="container mx-auto">
          <h2 className="text-xl font-bold mb-4">Agregar Orden</h2>
              {/* Sección Orden de Compra */}
        <h3 className="text-lg font-bold mb-2">Orden de Compra</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="ordenCompra.numero"
            onChange={(e) => setOrdenCompraNumero(e.target.value)}
            placeholder="Número de orden de compra"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {/* Agrega los demás campos de la orden de compra */}
          <input
            type="text"
            name="ordenCompra.fechaEmision"
            onChange={(e ) =>setOrdenCompraFechaEmision(e.target.value)}
            placeholder="Fecha de emisión"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="ordenCompra.formaPago"
            onChange={(e) => setOrdenCompraFormaPago(e.target.value)}
            placeholder="Forma de pago"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            onChange={(e) => setOrdenCompraFechaEntrega(e.target.value)}
            placeholder="Fecha de entrega"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="ordenCompra.moneda"
            onChange={(e )=> setOrdenCompraMoneda(e.target.value)}
            placeholder="Moneda"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="ordenCompra.solicitante"
            onChange={(e )=>setOrdenCompraSolicitante(e.target.value)}
            placeholder="Solicitante"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
            {/* Sección Cliente */}
            <h3 className="text-lg font-bold mb-2">Cliente</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="clienteSearch"
                value={searchValueClient}
                placeholder="Buscar cliente por nombre o rut"
                onChange={handleClienteSearchChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {searchResultsClients.length > 0 && (
                <div className="col-span-2 border border-gray-300 rounded p-4 mt-4">
                  <h4 className="text-lg font-bold mb-2">Resultados de la búsqueda</h4>
                  <ul>
                    {orden.cliente.direccion ? null : searchResultsClients.map((cliente) => (
                      <li
                        key={cliente.rut}
                        className="cursor-pointer p-2 hover:bg-blue-200"
                        onClick={() => handleSeleccionarCliente(cliente)}
                      >
                        {cliente.rut} - {cliente.nombreEmpresa}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Render the selected client details */}
              <input
                type="text"
                name="cliente.nombreEmpresa"
                value={orden.cliente.nombreEmpresa}
                onChange={handleChange}
                placeholder="Nombre de la empresa"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="cliente.direccion"
                value={orden.cliente.direccion}
                onChange={handleChange}
                placeholder="Direccion de la empresa"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="cliente.rut"
                value={orden.cliente.rut}
                onChange={handleChange}
                placeholder="Rut de la empresa"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="cliente.giro"
                value={orden.cliente.giro}
                onChange={handleChange}
                placeholder="Forma de pago"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
        {/* Sección Proveedor */}
        <h3 className="text-lg font-bold mb-2">Proveedor</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="proveedor.nombreEmpresa"
            onChange={(e) =>setProveedorNombreEmpresa(e.target.value)}
            placeholder="Nombre de la empresa"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="proveedor.direccion"
            onChange={() =>setProveedorDireccion(e.target.value)}
            placeholder="Direccion del proveedor"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="proveedor.rut"
            onChange={(e )=>setProveedorRut(e.target.value)}
            placeholder="Rut o identificador fiscal"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {/* Agrega los demás campos del proveedor */}
          {/* <input ... /> */}
        </div>

    

             {/* Sección Productos */}
             <h3 className="text-lg font-bold mb-2">Productos</h3>
        <input
          type="text"
          name="productoSearch"
          value={searchValue}
          placeholder="Buscar producto por nombre o código"
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        {searchResults.length > 0 && (
          <div className="border border-gray-300 rounded p-4 mt-4">
            <h4 className="text-lg font-bold mb-2">Resultados de la búsqueda</h4>
            <ul>
              {searchResults.map((producto) => (
                <li
                  key={producto.codigo}
                  className="cursor-pointer p-2 hover:bg-blue-200"
                  onClick={() => handleSeleccionarProducto(producto)}
                >
                  {producto.codigo} - {producto.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        <table className="w-full table-auto text-left">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Código</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Nombre</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Precio</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Cantidad</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">KG</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Volumen</th>

            </tr>
          </thead>
          <tbody>
  {selectedProducts.map((item, index) => (
    <tr
      key={index}
      className={index % 2 === 0 ? 'bg-blue-gray-50 cursor-pointer' : 'cursor-pointer'}
    >
      <td className="p-4">{item.product.codigo}</td>
      <td className="p-4">{item.product.name}</td>
      <td className="p-4">{item.product.price}</td>
      <td className="p-4">
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(e, item.product)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </td>
      <td className="p-4">
        <input
          type="number"
          value={item.kg}
          onChange={(e) => handleKgChange(e, item.product)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </td>
      <td className="p-4">
        <input
          type="number"
          value={item.volumen}
          onChange={(e) => handleVolumenChange(e, item.product)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </td>
    </tr>
  ))}
</tbody>
        </table>
        {/* Sección Otros */}
        <h3 className="text-lg font-bold mb-2">Otros</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="subTotal"
            onChange={(e ) =>setSubTotal(e.target.value)}
            placeholder="Subtotal"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="descuentoGlobal"
            onChange={(e ) => setDescuentoGlobal(e.target.value)}
            placeholder="Descuento Global"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="montoNeto"
            onChange={(e ) => setMontoNeto(e.target.value)}
            placeholder="Monto Neto"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="montoExento"
            onChange={(e) => setMontoExento(e.target.value)}
            placeholder="Monto Exento"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="iva"
            onChange={(e) =>setIva(e.target.value)}
            placeholder="IVA"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="total"
            onChange={(e)=> setTotal(e.target.value)}
            placeholder="Total"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Observaciones Generales */}
        <h3 className="text-lg font-bold mb-2">Observaciones Generales</h3>
        <select
          name="observacionesGenerales"
          onChange={(e ) => setObservacionesGenerales(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="">Seleccionar</option>
          {opcionesObservacionesGenerales.map((opcion) => (
            <option key={opcion} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>

        {/* Observaciones de Pago */}
        <h3 className="text-lg font-bold mb-2">Observaciones de Pago</h3>
        <textarea
          name="observacionesPago"
          onChange={handleChange}
          placeholder="Escribe las observaciones de pago..."
          className="w-full p-2 border border-gray-300 rounded mb-4"
        ></textarea>

        {/* Botón para enviar el formulario */}
        <button onClick={handleSubmit} className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded">
          Guardar Orden
        </button>
    </div>
  );
};