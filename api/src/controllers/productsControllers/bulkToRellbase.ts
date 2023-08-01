import { Schema } from 'mongoose';
import { imports, products } from '../../database';
import { response } from '../../utils';
import { ClientError } from '../../utils/errors';
import { Request, Response } from 'express';
import { IProducto } from '../../utils/interfaces/IProductos';
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

export default async (req: Request, res: Response) => {
  try {
    // Eliminar todos los clientes existentes antes de comenzar
    await products.deleteMany();

    let currentPage: number = 1;
    let totalPages: number = 1;

    // Realizar las peticiones en lotes mientras haya más páginas para consultar
    while (currentPage <= totalPages) {
      const response = await apiLimited.get(`productos?page=${currentPage}`);
      const customers = response.data.data.products;

      // Crear un array de promesas para guardar los clientes en la base de datos
      const savePromises = customers.map(async (ele: any) => {
        const inventario = {
          bodega1: ele.inventories.length >= 1 ? ele.inventories[0].stock : "0",
          bodega2: ele.inventories.length >= 2 ? ele.inventories[1].stock : "0",
          bodega3: ele.inventories.length >= 3 ? ele.inventories[2].stock : "0",
        };

        const Productsall = new products({
          id: ele.id,
          codigo: ele.code,
          descripcionProducto: ele.description,
          name: ele.name,
          price: ele.price,
          image: ele.url_image,
          inventario, // Assign the inventario object to the inventario field
          hs_price_lists: ele.hs_price_lists[0]
        });

        return await Productsall.save();
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