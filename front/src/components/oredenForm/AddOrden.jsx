import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddOrdenMethod } from '../../../utils/metodos/metodosOrdenes';
import { useRouter } from 'next/router';
import { setProducts } from '@/redux/reducer/reducerProduc';
import axios from 'axios';
import { clieSetCliente } from '@/redux/reducer/reducerClient';

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

  const handleSeleccionarProducto = (producto) => {
    setSelectedProducts((prevProducts) => [...prevProducts, { product: producto, quantity: 1 }]);
    setOrden((prevOrden) => ({
      ...prevOrden,
      productoSeleccionado: producto,
      productos: [],
    }));
    setSearchResults([]);

  };

  const buscarProducto = (searchValue) => {
    if (!productosFromRedux || productosFromRedux.length === 0) {
      return [];
    }
    return productosFromRedux.filter((producto) => {
      return (
        producto.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        producto.codigo.toLowerCase().includes(searchValue.toLowerCase())
      );
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

  const handleSubmit = (e) => {
    e.preventDefault();
    AddOrdenMethod({
      ord: orden,
      loading: (v) => console.log(v),
      error: (msg) => console.log(msg),
      success: (res) => {
        router.push("/odenesdecompras");
      },
    });
  };
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

  return (
        <div className="container mx-auto">
          <h2 className="text-xl font-bold mb-4">Agregar Orden</h2>
          <form onSubmit={handleSubmit}>
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
            value={orden.proveedor.nombreEmpresa}
            onChange={handleChange}
            placeholder="Nombre de la empresa"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="proveedor.direccion"
            value={orden.proveedor.direccion}
            onChange={handleChange}
            placeholder="Direccion del proveedor"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="proveedor.rut"
            value={orden.proveedor.rut}
            onChange={handleChange}
            placeholder="Rut o identificador fiscal"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {/* Agrega los demás campos del proveedor */}
          {/* <input ... /> */}
        </div>

        {/* Sección Orden de Compra */}
        <h3 className="text-lg font-bold mb-2">Orden de Compra</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="ordenCompra.numero"
            value={orden.ordenCompra.numero}
            onChange={handleChange}
            placeholder="Número de orden de compra"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {/* Agrega los demás campos de la orden de compra */}
          <input
            type="text"
            name="ordenCompra.fechaEmision"
            value={orden.ordenCompra.fechaEmision}
            onChange={handleChange}
            placeholder="Fecha de emisión"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="ordenCompra.formaPago"
            value={orden.ordenCompra.formaPago}
            onChange={handleChange}
            placeholder="Forma de pago"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="ordenCompra.fechaEntrega"
            value={orden.ordenCompra.fechaEntrega}
            onChange={handleChange}
            placeholder="Fecha de entrega"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="ordenCompra.moneda"
            value={orden.ordenCompra.moneda}
            onChange={handleChange}
            placeholder="Moneda"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="ordenCompra.solicitante"
            value={orden.ordenCompra.solicitante}
            onChange={handleChange}
            placeholder="Solicitante"
            className="w-full p-2 border border-gray-300 rounded"
          />
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
            value={orden.subTotal}
            onChange={handleChange}
            placeholder="Subtotal"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="descuentoGlobal"
            value={orden.descuentoGlobal}
            onChange={handleChange}
            placeholder="Descuento Global"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="montoNeto"
            value={orden.montoNeto}
            onChange={handleChange}
            placeholder="Monto Neto"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="montoExento"
            value={orden.montoExento}
            onChange={handleChange}
            placeholder="Monto Exento"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="iva"
            value={orden.iva}
            onChange={handleChange}
            placeholder="IVA"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="total"
            value={orden.total}
            onChange={handleChange}
            placeholder="Total"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Observaciones Generales */}
        <h3 className="text-lg font-bold mb-2">Observaciones Generales</h3>
        <select
          name="observacionesGenerales"
          value={orden.observacionesGenerales}
          onChange={handleChange}
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
          value={orden.observacionesPago}
          onChange={handleChange}
          placeholder="Escribe las observaciones de pago..."
          className="w-full p-2 border border-gray-300 rounded mb-4"
        ></textarea>

        {/* Botón para enviar el formulario */}
        <button type="submit" className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded">
          Guardar Orden
        </button>
      </form>
    </div>
  );
};