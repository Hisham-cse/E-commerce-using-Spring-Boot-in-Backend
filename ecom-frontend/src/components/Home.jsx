import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";

const Home = ({ selectedCategory }) => {
  const { data, isError, addToCart, refreshData } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    if (!isDataFetched) {
      refreshData();
      setIsDataFetched(true);
    }
  }, [refreshData, isDataFetched]);

  useEffect(() => {
    if (data && data.length > 0) {
      const fetchImagesAndUpdateProducts = async () => {
        const updatedProducts = await Promise.all(
          data.map(async (product) => {
            try {
              const response = await axios.get(
                `http://localhost:8080/api/product/${product.id}/image`,
                { responseType: "blob" }
              );
              const imageUrl = URL.createObjectURL(response.data);
              return { ...product, imageUrl };
            } catch (error) {
              console.error(
                "Error fetching image for product ID:",
                product.id,
                error
              );
              return { ...product, imageUrl: "placeholder-image-url" };
            }
          })
        );
        setProducts(updatedProducts);
      };

      fetchImagesAndUpdateProducts();
    }
  }, [data]);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  if (isError) {
    return (
      <div className="error-container">
        <div className="alert alert-danger text-center" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Something went wrong... Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="featured-banner">
        <div className="banner-content">
          <h1>Welcome to Hisham E-commerce</h1>
          <p>Discover amazing products at unbeatable prices</p>
          <button className="btn btn-light ">Shop Now</button>
        </div>
      </div>
      
      {selectedCategory && (
        <div className="category-header">
          <h2>{selectedCategory} Products</h2>
          <div className="category-divider"></div>
        </div>
      )}
      
      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <i className="bi bi-search fs-1"></i>
          <h3>No Products Available</h3>
          <p>We couldn't find any products in this category.</p>
          <Link to="/" className="btn btn-primary">
            Browse All Products
          </Link>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => {
            const { id, brand, name, price, productAvailable, imageUrl, description } = product;
            const isHovered = hoveredProduct === id;
            
            return (
              <div
                className={`product-card ${!productAvailable ? 'out-of-stock' : ''}`}
                key={id}
                onMouseEnter={() => setHoveredProduct(id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <Link
                  to={`/product/${id}`}
                  className="product-link"
                >
                  <div className="product-image-container">
                    <img
                      src={imageUrl}
                      alt={name}
                      className="product-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                      }}
                    />
                    {!productAvailable && (
                      <div className="out-of-stock-overlay">
                        <span>Out of Stock</span>
                      </div>
                    )}
                    {isHovered && productAvailable && (
                      <div className="quick-actions">
                        <button 
                          className="quick-view-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/product/${id}`;
                          }}
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                        <button 
                          className="quick-add-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                          }}
                        >
                          <i className="bi bi-cart-plus"></i>
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="product-badge">
                    {product.stockQuantity < 5 && product.stockQuantity > 0 ? (
                      <span className="badge bg-warning">Low Stock</span>
                    ) : product.stockQuantity === 0 ? (
                      <span className="badge bg-danger">Sold Out</span>
                    ) : (
                      <span className="badge bg-success">In Stock</span>
                    )}
                  </div>
                  
                  <div className="product-info">
                    <div className="product-brand">{brand || "No Brand"}</div>
                    <h3 className="product-name">{name || "Unnamed Product"}</h3>
                    <div className="product-description-preview">
                      {description && description.length > 60 
                        ? `${description.substring(0, 60)}...` 
                        : description || "No description available"}
                    </div>
                    <div className="product-price-container">
                      <span className="product-price">₹{price || "0.00"}</span>
                      <button
                        className="add-to-cart-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                        disabled={!productAvailable}
                      >
                        <i className="bi bi-cart-plus"></i>
                        {productAvailable ? "Add to Cart" : "Out of Stock"}
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
