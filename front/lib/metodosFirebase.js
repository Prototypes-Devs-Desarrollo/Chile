import axios from 'axios';

export const registrarUsuario = async (email, password, name, setUser, loading, error) => {

   let user = {
      email: email,
      password: password,
      firstName: name
   }
   console.log(user)
   try {
      const response = await axios.post(`${process.env.BACK_URL}/api/user/register`, user);
      localStorage.setItem('accessToken', response.data.payload.token);
      setUser(response.data.payload.user);
   } catch (err) {
      console.error(err);
      error(err.message);
      loading(false);
   }
};


export const LoginUsuario = async (email, password, setUser, loading, error) => {
   loading(true);
   try {
      const response = await axios.post(`${process.env.BACK_URL}/api/user/login`, { email, password });
      localStorage.setItem('accessToken', response.data.payload.token);
      setUser(response.data.payload.user);
   } catch (err) {
      console.error(err);
      error(err.message);
      loading(false);
      throw new Error (err.message)
   }
};

export const GetUserLogeado = async (setUser, loading, error) => {
   loading(true);
   try {
      const t = localStorage.getItem('accessToken');
      const result = await fetch(`${process.env.BACK_URL}/user/user`, {
         headers: { 'Content-Type': 'application/json', Authorization: t },
         method: 'GET',
      }).then((res) => res.json());
      if (result.error) {
         throw new Error(result.error);
      }
      setUser(result.user);
      loading(false);
   } catch (err) {
      console.error(err);
      error(err.message);
      loading(false);
   }
};

export const uploadPdf = async (archivo, loading, error) => {
   loading(true);
   try {
      const formData = new FormData();
      formData.append('pdf', archivo);
      const response = await axios.post('/api/upload', formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      });
      console.error('PDF uploaded successfully!', response.data);
      loading(false);
   } catch (err) {
      console.error(err);
      error(err.message);
      loading(false);
   }
};


export const logoutMetod = (token) => {
 axios.post(`${process.env.BACK_URL}/api/user/logout`, null, {
   headers: {
     Authorization: `Bearer ${token}`
   }
 })
   .then(response => {
     console.log(response.data);
     // Realizar acciones adicionales después de un logout exitoso
   })
   .catch(error => {
   });
}