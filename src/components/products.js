import React from 'react'

const url = "http://localhost:8080/api/products/"
const Products = ({products}) => {
  return (
    <div>
      <center><h1>Product List</h1></center>
      {products.map((product) => (
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Name: {product.name}</h5>
            <a href={url  +  product.id } key={product.id}>
                <div>
                    Product ID: {product.id}
                </div>
            </a>
            <h6 class="card-subtitle mb-2 text-muted">Product Desc: {product.description}</h6>
            <p class="card-text">Product Category: {product.categoryId}</p>
          </div>
        </div>
      ))}
    </div>
  )
};

export default Products