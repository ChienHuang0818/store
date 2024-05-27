// src/services/apiServices.js

const API_BASE_URL = "https://fakestoreapi.com";


// Fetch Products By Category
export const fetchProductsByCategory = async (category) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch products by category:", error);
        throw error;
    }
};



// Fetch product by ID
export const fetchProductById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch product:", error);
        throw error;  // Re-throw the error to be handled where the function is called
    }
};


async function fetchCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/products/categories`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      return data.map(category => ({ id: category, title: category }));
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

export { fetchCategories };