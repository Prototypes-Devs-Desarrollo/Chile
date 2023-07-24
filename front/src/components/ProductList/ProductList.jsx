import React, { useEffect, useState } from "react";
import axios from "axios";

export const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
const [loading, setLoading] = useState(false)
  const productsPerPage = 20;
  const [totalPages, setTotalPages] = useState()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `https://api.relbase.cl/api/v1/productos?page=${currentPage}`,
          {
            headers: {
              Authorization: "Cdhmq8tLQSG2KZiRyoofppXL",
              "Content-Type": "application/json",
              company: "BaxMZkD5n13cNpKAjyqKAeE4",
            },
          }
        );
        setLoading(false)
        setProductList(response.data.data.products);
        setTotalPages(response.data.meta.total_pages)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = productList?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handlePreviousPage = async () => {
    setCurrentPage(currentPage - 1);
    const response = await axios.get(
      `https://api.relbase.cl/api/v1/productos?page=${currentPage + 1}`,
      {
        headers: {
          Authorization: "Cdhmq8tLQSG2KZiRyoofppXL",
          "Content-Type": "application/json",
          company: "BaxMZkD5n13cNpKAjyqKAeE4",
        },
      }
    );
    setProductList(response.data.data.products);  };

  const handleNextPage = async () => {
    setCurrentPage(currentPage + 1);
    const response = await axios.get(
      `https://api.relbase.cl/api/v1/productos?page=${currentPage + 1}`,
      {
        headers: {
          Authorization: "Cdhmq8tLQSG2KZiRyoofppXL",
          "Content-Type": "application/json",
          company: "BaxMZkD5n13cNpKAjyqKAeE4",
        },
      }
    );
    setProductList(response.data.data.products);

}

  const handleSelectPage = async(event) => {
    const selectedPage = parseInt(event.target.value);
    const response = await axios.get(
      `https://api.relbase.cl/api/v1/productos?page=${selectedPage}`,
      {
        headers: {
          Authorization: "Cdhmq8tLQSG2KZiRyoofppXL",
          "Content-Type": "application/json",
          company: "BaxMZkD5n13cNpKAjyqKAeE4",
        },
      }
    );
    setProductList(response.data.data.products);
  };

  return (
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">Product List</h3>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Name
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Description
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>

                {loading ? <p>cargando</p> : productList.map((product) => (
                  <tr key={product.id}>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-700">
                      {product?.name}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-700">
                      {product?.description}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-700">
                      ${product?.price}
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
  );
};