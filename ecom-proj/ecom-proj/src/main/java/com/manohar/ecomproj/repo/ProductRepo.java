package com.manohar.ecomproj.repo;

import com.manohar.ecomproj.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepo extends JpaRepository<Product, Integer> {
}
