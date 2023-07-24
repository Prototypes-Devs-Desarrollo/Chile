import React, { useEffect, useState } from "react";
import axios from "axios";

export const ProviderList = () => {
  const [providerList, setProviderList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
const [loading, setLoading] = useState(false)
  const productsPerPage = 20;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `https://api.relbase.cl/api/v1/proveedores?page=${currentPage}`,
          {
            headers: {
              Authorization: "Cdhmq8tLQSG2KZiRyoofppXL",
              "Content-Type": "application/json",
              company: "BaxMZkD5n13cNpKAjyqKAeE4",
            },
          }
        );
        console.log(response.data)
        
        setProviderList(response.data.data.providers);
        setLoading(false)

      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };
    fetchProducts();
  }, [currentPage]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset page number when searching
  };

  const filteredProducts = providerList.filter((provider) =>
  provider.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = filteredProducts.slice(
    firstProductIndex,
    lastProductIndex
  );

  const totalPages = 190;

  const handlePreviousPage = () => {
    setCurrentPage( currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleSelectPage = (event) => {
    const selectedPage = parseInt(event.target.value);
    setCurrentPage(selectedPage);
  };

  return (
    <section className="py-1 bg-blueGray-50 h-full">
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">Provider List</h3>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Proveedor
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Product
                  </th>
                </tr>
              </thead>
              <tbody>

                {loading ? <p>cargando</p> : currentProducts.map((provider) => (
                  <tr key={provider.id}>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-700">
                      {provider?.name}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-700">
                      {provider?.description}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-700">
                      ${provider?.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-center">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-l"
              onClick={handlePreviousPage}
            >
              Previous
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
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};