
import {ADD_PRODUCT,UPDATE_PRODUCT,DELETE_PRODUCT,FILTER_PRODUCT,CLEAR_FILTER_PRODUCT,} from './actionType';
  
  export const addProductAction = (product) => {
    return { type: ADD_PRODUCT, payload: product };
  };
  
  export const updateProductAction = (product) => {
    return { type: UPDATE_PRODUCT, payload: product };
  };
  
  export const deleteProductAction = (id) => {
    return { type: DELETE_PRODUCT, payload: id };
  };
  
  export const filterProductAction = (idCategory) => {
    return { type: FILTER_PRODUCT, payload: idCategory };
  };
  
  export const clearFilterProductAction = () => {
    return { type: CLEAR_FILTER_PRODUCT };
  };
  