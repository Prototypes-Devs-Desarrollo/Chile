import axios from 'axios';

export const AddProviderMethod = async ({ pro, loading, error, success }) => {
   try {
      loading(true);
      const token = localStorage.getItem('Token');
      const config = {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      };
      const response = await axios.post('provider/create', pro, config);
      success(response.data);
      loading(false);
   } catch (err) {
      console.log('AddProviderMethod', err);
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