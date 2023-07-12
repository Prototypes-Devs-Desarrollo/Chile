import {
    GET_USER,
    EDIT_USER,
    LOGIN_USER,
    REGISTER_USER,
    RECOVER_USER,
    BYEMAIL_USER,
    GET_PRODUCT,
    GET_FILTRED_PRODUCTS,
    CREATE_PRODUCT
} from '../actions/actions'

export const initialState = {
    user: [],
    filtredUser: [],
    product: [],
    filtredProducts: [],
    allProducts: []
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

      case GET_PRODUCT:
          return {
            ...state,
            product: action.payload
          }

      case GET_FILTRED_PRODUCTS:
          return {
            ...state,
            filtredProducts: action.payload
          }

      case CREATE_PRODUCT: 
          return {
            ...state,
            allProducts: [...state.allProducts, action.payload]
          }

      default:
        return {
          ...state,
        };
    }
  }
  