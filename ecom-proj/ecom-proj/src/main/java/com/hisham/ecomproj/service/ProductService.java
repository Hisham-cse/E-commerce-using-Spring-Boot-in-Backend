package com.hisham.ecomproj.service;

import com.hisham.ecomproj.model.Product;
import com.hisham.ecomproj.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository repository;
    
    public List<Product> getAllProducts() {
        try {
            return repository.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error fetching products: " + e.getMessage());
        }
    }

    public Product getProduct(int id) {
        return repository.findById(id).orElse(null);
    }

    public Product addProduct(Product product, MultipartFile imageFile) throws IOException {
        if (imageFile != null && !imageFile.isEmpty()) {
            product.setImageName(imageFile.getOriginalFilename());
            product.setImageType(imageFile.getContentType());
            product.setImageData(imageFile.getBytes());
        }
        return repository.save(product);
    }
    // ... rest of the service methods
} 