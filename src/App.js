import axios from 'axios';
import {useState,useEffect} from 'react'
import './App.css';

function App() {
  const [products,setProducts]=useState([])
  const [newProduct, setNewProduct]=useState({
    productName:"",
    productPrice:"",
    productDescription:"",
    productImage:""
  })
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_URL}/retrieve`)
    .then(res=>setProducts(res.data))
  })
  function handleChange(e){
    setNewProduct({
    ...newProduct,[e.target.name]:e.target.value
    })
  }
  function handleSubmit(){
    axios.post(`${process.env.REACT_APP_URL}/create`,newProduct)
    .then(res=>console.log(res.data))
  }
  return (
    <div className="App">
      <h1>Products are</h1>
      {
        products.map((product)=>(
          <div key={product._id}>
            <p>Name:{product.productName}</p>
            <p>Price:{product.productPrice}</p>
            <p>Description:{product.productDescription}</p>
            <img src={product.productImage} alt={product.productName} width="20%"/>
          </div>
        ))
      }
      <form onSubmit={handleSubmit}>
        <input 
          placeholder='Enter product name' 
          onChange={handleChange}
          name="productName"
          value={newProduct.productName}/>
        <input 
          placeholder='Enter product Price' 
          onChange={handleChange}
          name="productPrice"
          value={newProduct.productPrice}/>
        <input 
          placeholder='Enter product Description' 
          onChange={handleChange}
          name="productDescription"
          value={newProduct.productDescription}/>
        <input 
          placeholder='Enter product Image' 
          onChange={handleChange}
          name="productImage"
          value={newProduct.productImage}/>
          <button>Submit</button>
      </form>
     
    </div>
  );
}

export default App;
