import axios from "axios";

export const ClientMetodos = async ({ loading, error, success }) => {
    loading(true);
   await axios.get('product/getAll').then((succes) => success(succes.data.payload)).catch(( err ) => error(err.message), loading(false))
    success(response.data.payload);
    loading(false)
 };