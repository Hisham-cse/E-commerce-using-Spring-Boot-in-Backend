# E-Commerce Project

## Overview
This is a simple e-commerce application built using Spring Boot for the backend and Vite with React for the frontend. The application allows users to view products, add them to a cart, and proceed to checkout. It also includes features for product management, such as adding, updating, and deleting products.

## Features
- **Product Management**: Admins can add, update, and delete products.
- **User Cart**: Users can add products to their cart and view the total price.
- **Checkout Process**: Users can confirm their purchases through a checkout modal.
- **Responsive Design**: The application is designed to be responsive and user-friendly.

## Tech Stack
- **Backend**: Spring Boot, Spring Data JPA, H2 Database
- **Frontend**: Vite, React, Axios, React Bootstrap
- **Styling**: CSS

## Getting Started

### Prerequisites
- Java 17 or higher
- Node.js and npm
- Maven

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Hisham-cse/E-commerce-using-Spring-Boot-in-Backend.git
   cd ecom-proj/ecom-proj
   ```

2. Navigate to the backend directory and run the following command to build the project:
   ```bash
   ./mvnw clean install
   ```

3. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```

4. The backend will be running on `http://localhost:8080`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ecom-frontend
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. The frontend will be running on `http://localhost:5173`.

## API Endpoints
- `GET /api/products`: Retrieve all products.
- `GET /api/product/{id}`: Retrieve a specific product by ID.
- `POST /api/product`: Add a new product (requires image upload).
- `GET /api/product/{productId}/image`: Retrieve the image of a specific product.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- [Spring Boot](https://spring.io/projects/spring-boot)
- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Axios](https://axios-http.com/)
- [Bootstrap](https://getbootstrap.com/)