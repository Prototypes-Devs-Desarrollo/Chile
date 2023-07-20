import axios from 'axios';

export const AddOrdenMethod = async ({ ord, loading, error, success }) => {
   try {
      loading(true);
      const token = localStorage.getItem('Token');
      const config = {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      };
      const response = await axios.post('orden/create', ord, config);
      success(response.data);
      loading(false);
   } catch (err) {
      console.log('AddOrdenMethod', err);
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

export const ListOrdenesMethod = async ({ loading, error, success }) => {
   try {
      loading(true);
      const token = localStorage.getItem('Token');
      const config = {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      };
      const response = await axios.get('orden/all', config);
      success(response.data);
      loading(false);
   } catch (err) {
      console.log('ListOrdenesMethod', err);
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