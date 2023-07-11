import axios from "axios";

export const GET_USER = "GET_USER";
export const EDIT_USER = "EDIT_USER";
export const LOGIN_USER = "LOGIN_USER";
export const REGISTER_USER = "REGISTER_USER";
export const RECOVER_USER = "RECOVER_USER";
export const BYEMAIL_USER = "BYEMAIL_USER";

export const getUser = () => {
  return async function (dispatch) {
    const adminRes = await axios.get("user/data");
    dispatch({ type: GET_ADMIN, payload: adminRes.data[0] });
  };
};