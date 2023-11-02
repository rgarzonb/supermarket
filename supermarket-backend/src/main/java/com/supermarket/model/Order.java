package com.supermarket.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="list_of_fruits") //, columnDefinition = "TEXT"
    private String listOfFruits;

    @Column(name = "total price")
    private double totalPrice;

    @Temporal(TemporalType.DATE) // Only date
    @Column(name = "createdAt")
    private LocalDate createdAt;

    @PrePersist
    protected void onCreate(){
        createdAt = LocalDate.now();
    }
}
