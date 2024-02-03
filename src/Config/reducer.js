import {ADD_PRODUCT,UPDATE_PRODUCT,DELETE_PRODUCT,FILTER_PRODUCT,CLEAR_FILTER_PRODUCT,} from './actionType';

const initialState = {
    categories: [
      { id: 1, nom: "Women" },
      { id: 2, nom: "Men" },
      { id: 3, nom: "Kids" },
      { id: 4, nom: "Accessories" },
    ],
    products: [
      { id: 1, name: "Dress", information: "Size: XL", category: 1, image: "dress.png" },
      { id: 2, name: "Shirt", information: "Size: L", category: 2, image: "shirt.png" },
      { id: 3, name: "Toy", information: "Age: 3+", category: 3, image: "toy.png" },
      { id: 4, name: "Hat", information: "Color: Blue", category: 4, image: "hat.png" },
    ],
  };
  

  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_PRODUCT:
        return { ...state, products: [...state.products, action.payload] };
      case UPDATE_PRODUCT:
        const product = state.products.find((p) => p.id === parseInt(action.payload.id));
        if (product) {
          product.name = action.payload.name;
          product.information = action.payload.information;
          product.image = action.payload.image;
          product.category = parseInt(action.payload.category);
        }
        return state;
      case DELETE_PRODUCT :
        return {
          ...state,
          products: [...state.products.filter((p) => p.id !== parseInt(action.payload))],
        };
      case FILTER_PRODUCT:
        console.log(state);
        console.log({
          ...state,
          productsFilter: [
            ...state.products.filter((p) => p.category === parseInt(action.payload)),
          ],
        });
        return {
          ...state,
          productsFilter: [
            ...state.products.filter((p) => p.category === parseInt(action.payload)),
          ],
        };
      case CLEAR_FILTER_PRODUCT:
        return { ...state, productsFilter: null };
      default:
        return state;
    }
  };
  
  export default reducer;
  