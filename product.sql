CREATE DATABASE bamazon_db;



CREATE TABLE products(

    id INTEGER(255) AUTO_INCREMENT,
    product_name VARCHAR(100)  NOT NULL,
    department VARCHAR(100) NOT NULL,
    price INTEGER(255) NOT NULL,
    quantity INTEGER(255) NOT NULL,
    cost INTEGER(255) NOT NULL ,
    PRIMARY KEY(id)
);

USE bamazon_db;

INSERT INTO products(product_name,department,price,quantity)
VALUE ("phone","electronics",500,900);



SELECT*FROM products WHERE =1;


ALTER TABLE products Drop COLUMN cost;
USE bamazon_db;
Update products SET quantity=quantity-2
 WHERE id=2