import axios from 'axios';

export const GetUserLocalMethod = async ({ loading, error, success }) => {
   try {
      loading(true);
      const token = localStorage.getItem('Token');
      if (!token) {
         loading(false);
         return;
      }
      const config = {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      };
      const response = await axios.get('/user/data', config);
      success(response.data);
      loading(false);
   } catch (err) {
      console.log('GetUserLocalMethod', err);
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

export const LoginUserMethod = async ({ email, password, loading, error, success }) => {
   try {
      loading(true);
      const loginUser = await axios.post('user/login', { email, password });
      const data = loginUser.data;
      localStorage.setItem('Token', data.payload.token);
      success(data);
      loading(false);
   } catch (err) {
      console.log('LoginUserMethod', err);
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

export const LogoutUserMethod = async ({ loading, error, success }) => {
   try {
      loading(true);
      //FALTA IMPLEMENTAR LOGICA PARA EL BACK PARA BORRAR EL TOKEN EN EL
      // const token = localStorage.getItem('Token');
      // const config = {
      //    headers: {
      //       Authorization: `Bearer ${token}`,
      //    },
      // };
      // const getAllClients = await axios.get('/user/data', config);
      localStorage.removeItem('Token');
      success('getAllClients.data');
      loading(false);
   } catch (err) {
      console.log('LogoutUserMethod', err);
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
