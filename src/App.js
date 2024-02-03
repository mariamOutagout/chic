import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  addProductAction,
  updateProductAction,
  deleteProductAction,
  filterProductAction,
  clearFilterProductAction,
} from './Config/actions';

import './App.css';




function App() {

  const categories = useSelector((data) => data.categories);
  const products = useSelector((data) => data.products);
  const productsFilter = useSelector((data) => data.productsFilter);
  const listProductsMap = productsFilter || products;
  const indexProduct = products.length;

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [information, setInformation] = useState('');
  const [category, setCategory] = useState(1);
  const [image, setImage] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(1);

  const dispatch = useDispatch();

  const handleEnregistrer = () => {
    dispatch(
      addProductAction({
        id: indexProduct + 1,
        name,
        information,
        image,
        category: parseInt(category),
      })
    );
    handleClear();
  };

  const handleClear = () => {
    setId('');
    setName('');
    setInformation('');
    setImage('');
    setCategory(1);
  };

  const handleRemplirForm = (productId) => {
    const product = products.find((p) => p.id === parseInt(productId));
    setId(productId);
    setName(product.name);
    setInformation(product.information);
    setImage(product.image ); 
    setCategory(parseInt(product.category));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        setImage(e.target.result);
      };
  
      reader.readAsDataURL(file);
    }
  
  };

  const handleModifier = () => {
    dispatch(
      updateProductAction({
        id,
        name,
        information,
        image,
        category: parseInt(category),
      })
    );
    handleClear();
    setId('');
  };

  const handleDelete = (productId) => {
    dispatch(deleteProductAction(productId));
  };

  const handleFilter = () => {
    dispatch(filterProductAction(categoryFilter));
  };

  const handleFilterClear = () => {
    dispatch(clearFilterProductAction(categoryFilter));
  };

  return (
    <div>
      <h1>CRUD REACT-REDUX Example 2</h1>
      <div>
        <label>Nom du Produit</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Information</label>
        <input type="text" value={information} onChange={(e) => setInformation(e.target.value)} />

        <label>Image du Produit</label>
        <input type="file" accept="image/*" onChange={(e) => handleImageChange(e)} />

        <label>Catégorie</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat, i) => (
            <option key={i} value={cat.id}>
              {cat.nom}
            </option>
          ))}
        </select>
        {id ? (
          <button onClick={() => handleModifier()}>Modifier</button>
        ) : (
          <button onClick={() => handleEnregistrer()}>Enregistrer</button>
        )}
        <button onClick={() => handleClear()}>Clear</button>
      </div>
      <div>
        <label>Filtrer par catégorie</label>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          {categories.map((cat, i) => (
            <option key={i} value={cat.id}>
              {cat.nom}
            </option>
          ))}
        </select>
        <button onClick={() => handleFilter()}>Filtrer</button>
        <button onClick={() => handleFilterClear()}>Clear</button>
      </div>
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Nom</td>
            <td>Information</td>
            <td>Image</td>
            <td>Catégorie</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {listProductsMap.map((product, index) => {
            const category = categories.find((cat) => cat.id === parseInt(product.category));
            return (
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.information}</td>
                <td>
                  {product.image && (
                    <img
                      src={product.image}
                      alt={`Product-${product.id}`}
                      style={{ maxWidth:' 200px', height: '300px' }} 
                      
                 />
                  )}
                </td>
                <td>{category.nom}</td>
                <td>
                  <button onClick={() => handleRemplirForm(product.id)}>Modifier</button>
                  <button onClick={() => handleDelete(product.id)}>Supprimer</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
