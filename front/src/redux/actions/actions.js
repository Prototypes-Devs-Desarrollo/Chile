import axios from "axios";

export const GET_USER = "GET_USER";
export const EDIT_USER = "EDIT_USER";
export const LOGIN_USER = "LOGIN_USER";
export const REGISTER_USER = "REGISTER_USER";
export const RECOVER_USER = "RECOVER_USER";
export const BYEMAIL_USER = "BYEMAIL_USER";

export const getUser = () => {
  return async function (dispatch) {
    const userData = await axios.get("user/data");
    dispatch({ type: GET_USER, payload: userData.data[0] });
  };
};

export const editUser = ({ id }) => {
    return async function (dispatch) {
      try {
        const editUser = await axios.put("user/edit", { id });
        dispatch({ type: EDIT_USER, payload: editUser.data.password });
      } catch (error) {
        console.log(error);
      }
    };
  };

export const loginUser = ({ email, password }) => {
    return async function (dispatch) {
        try {
            const loginUser = await axios.post("user/login", { email, password });
            dispatch({ type: LOGIN_USER, payload: loginUser.data });
        } catch (error) {
            console.log(error);
        }};
};

export const registerUser = ({ email, password }) => {
    return async function (dispatch) {
        try {
            const registerUser = await axios.post("user/register", { email, password });
            dispatch({ type: REGISTER_USER, payload: registerUser.data });
        } catch (error) {
            console.log(error);
    }};
};

export const recoverUser = ({ email }) => {
    return async function (dispatch) {
        try {
            const recoverUser = await axios.post("user/recovery", { email });
            dispatch({ type: RECOVER_USER, payload: recoverUser.data });
        } catch (error) {
            console.log(error);
    }};
};

export const byEmailUser = ({ email }) => {
    return async function (dispatch) {
        try {
            const byEmailUser = await axios.get("user/byemail", { email });
            dispatch({ type: BYEMAIL_USER, payload: byEmailUser.data });
        } catch (error) {
            console.log(error);
    }};
};