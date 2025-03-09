package com.hisham.ecomproj.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(length = 1000)
    private String description;
    
    private String brand;
    private BigDecimal price;
    private String category;
    
    @Temporal(TemporalType.DATE)
    private Date releaseDate;
    
    private boolean productAvailable;
    private int stockQuantity;

    private String imageName;
    private String imageType;
    
    @Lob
    private byte[] imageData;

    // Getters
    public byte[] getImageData() {
        return imageData;
    }

    public String getImageType() {
        return imageType;
    }

    public String getImageName() {
        return imageName;
    }

    // Setters
    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }
} 