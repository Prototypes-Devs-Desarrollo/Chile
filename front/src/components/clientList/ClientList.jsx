import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import { clieSetCliente } from "@/redux/reducer/reducerClient";

export const ClientList = () => {
  const [clientList, setClientList] = useState([]); // Renamed productList to clientList
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.reducerClient.clienteClie); // Renamed clientes to clients
  const clientsPerPage = 30; // Set the number of clients per page

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await axios.get("client/getAll");
        setLoading(false);
        dispatch(clieSetCliente(response.data.payload));
        setTotalPages(Math.ceil(response.data.payload.length / clientsPerPage));
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };
    fetchClients();
  }, []);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleSelectPage = (event) => {
    const selectedPage = parseInt(event.target.value);
    setCurrentPage(selectedPage);
  };

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = clients?.slice(indexOfFirstClient, indexOfLastClient);
  const filteredClients = currentClients?.filter((client) =>
    client.nombreEmpresa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      {/* ... Rest of the code ... */}
      <div className="block w-full overflow-x-auto">
        <div className="m-4">
          <input
            type="text"
            className="border p-2"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <table className="items-center bg-transparent w-full border-collapse">
          <thead>
            <tr>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Nombre Empresa
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                RUT
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Dirección
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-700">
                  Loading...
                </td>
              </tr>
            ) : (
              filteredClients?.map((client) => (
                <tr key={client.id}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-700">
                    {client.nombreEmpresa}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-700">
                    {client.rut}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-700">
                    {client.direccion}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-l"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Atras
        </button>
        <select
          className="border mx-2 px-2 py-1 rounded"
          value={currentPage}
          onChange={handleSelectPage}
        >
          {Array.from({ length: totalPages }).map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};