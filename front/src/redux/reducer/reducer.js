import {
    GET_USER,
    EDIT_USER,
    LOGIN_USER,
    REGISTER_USER,
    RECOVER_USER,
    BYEMAIL_USER
} from '../actions/actions'

export const initialState = {
    user: [],
    filtredUser: []
  };

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case GET_USER:
        return{
            ...state,
            user: action.payload
        };

      case EDIT_USER:
        return {
            ...state,
            user: (state.user.password = action.payload)
          };

      case LOGIN_USER:
        return{
            ...state,
            user: action.payload
        };

      case REGISTER_USER:
        return{
            ...state,
            user: action.payload
        };

      case RECOVER_USER:
        return {
            ...state,
            user: (state.user.password = action.payload)
          };

      case BYEMAIL_USER:
        return {
            ...state,
            filtredUser: action.payload
          };

      default:
        return {
          ...state,
        };
    }
  }
  