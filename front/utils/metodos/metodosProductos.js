import axios from 'axios';

export const AddProductoMethod = async ({ pro, loading, error, success }) => {
   try {
      loading(true);
      const token = localStorage.getItem('Token');
      const config = {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      };
      const response = await axios.post('product/create', pro, config);
      success(response.data);
      loading(false);
   } catch (err) {
      console.log('AddProductoMethod', err);
      if (err.response) {
         const data = err.response.data;
         if (data.error) {
            error(data.message);
         } else {
            error(data);
         }
      } else {
         error(err.message);
      }
      loading(false);
   }
};

export const ListProductosMethod = async ({ loading, error, success }) => {
   try {
      loading(true);
      const token = localStorage.getItem('Token');
      const config = {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      };
      const response = await axios.post('product/falta-la-ruta-que-los-lista', config, pro);
      success(response.data);
      loading(false);
   } catch (err) {
      console.log('ListProductosMethod', err);
      if (err.response) {
         const data = err.response.data;
         if (data.error) {
            error(data.message);
         } else {
            error(data);
         }
      } else {
         error(err.message);
      }
      loading(false);
   }
};
