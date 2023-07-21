import { clients } from '../../database';
import { response } from '../../utils';
import { ClientError } from '../../utils/errors';
import axios from 'axios';
import RateLimit from 'axios-rate-limit';

const api = axios.create({
  baseURL: 'https://api.relbase.cl/api/v1/',
  headers: {
    'Authorization': 'Cdhmq8tLQSG2KZiRyoofppXL',
    'Content-Type': 'application/json',
    "company": "BaxMZkD5n13cNpKAjyqKAeE4"
  }
});

const apiLimited = RateLimit(api, { maxRequests: 7, perMilliseconds: 1000 });

export default async (req, res) => {
  try {
    // Eliminar todos los clientes existentes antes de comenzar
    await clients.deleteMany();

    let currentPage = 1;
    let totalPages = 1;

    // Realizar las peticiones en lotes mientras haya más páginas para consultar
    while (currentPage <= totalPages) {
      const response = await apiLimited.get(`clientes?page=${currentPage}`);
      const customers = response.data.data.customers;

      // Crear un array de promesas para guardar los clientes en la base de datos
      const savePromises = customers.map(async (ele) => {
        const newClient = new clients({
          nombreEmpresa: ele.name_fantasy,
          direccion: ele.address,
          id: ele.id,
          rut: ele.rut,
        });
        return await newClient.save();
      });

      // Esperar a que todas las operaciones de guardado se completen antes de continuar con la siguiente página
      await Promise.all(savePromises);

      // Actualizar el contador de páginas y continuar al siguiente lote
      currentPage++;
      totalPages = response.data.meta.total_pages;
    }

    res.status(200).json("Genial");
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};