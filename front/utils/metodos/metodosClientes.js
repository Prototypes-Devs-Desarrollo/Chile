import axios from "axios";

export const ClientMetodos = async ({ loading, error, success }) => {
    loading(true);
   await axios.get('product/getAll')
   .then((response) => success(response.data.payload))
   .catch(( err ) => error(err.message))
   .finally(()=>loading(false))
 
 };