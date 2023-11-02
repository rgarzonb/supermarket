package com.supermarket.repository;

import com.supermarket.model.Fruit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

// Creates a data access layer (repository) for interacting with the 'Fruits' entity class
// As extends from 'JpaRepository':
// - This interface inherits methods to perform CRUD operations on the 'Fruits' entity class
// - Spring Data JPA generates the necessary SQL queries and manage DB interactions
@Repository
public interface FruitRepository extends JpaRepository<Fruit,Long> {
    // Fruits : entity type that this repository is responsible for
    // Long : type of the primary key of Fruits

    //  Annotated with @Query defines a custom SQL query that retrieves the id of a fruit by its type.
    //  The result type is Long
    @Query("SELECT f.id FROM Fruit f WHERE f.type = :type")
    Long findIdByType(@Param("type") String type);
}
