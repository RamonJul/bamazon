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

INSERT INTO products(product_name,department,price,quantity,cost)
VALUE ("tablet","electronics",800,1000,500);



SELECT*FROM products WHERE =1;


ALTER TABLE products Drop COLUMN cost;

Update products SET quantity=quantity-2
 WHERE id=2

USE bamazon_db;
INSERT INTO restock(product_id,quantity)
VALUE (1,40);


INSERT INTO restock(product_id,quantity)
VALUE (2,100);
USE bamazon_db;
INSERT INTO restock(product_id,quantity)
VALUE (1,10);



CREATE TABLE sales(

    id INTEGER(255) AUTO_INCREMENT,
    product_id INTEGER(255) NOT NULL,
    quantity INTEGER(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE restock(

    id INTEGER(255) AUTO_INCREMENT,
    product_id INTEGER(255) NOT NULL,
    quantity INTEGER(255) NOT NULL,
    PRIMARY KEY(id)
);

USE bamazon_db;
SELECT products.id,products.department,products.price,SUM(sales.quantity),SUM(restock.quantity)
FROM products
  INNER JOIN sales on sales.product_id=products.id
  INNER JOIN restock on restock.product_id=sales.product_id
  
GROUP BY  products.id

USE bamazon_db;
SELECT products.id,products.department,products.price,SUM(sales.quantity)AS sales,(products.price*SUM(sales.quantity))AS revenue,products.cost
FROM products
   left JOIN sales on sales.product_id=products.id
GROUP BY  products.id


USE bamazon_db;
SELECT sales.product_id,sales.quantity,restock.quantity
FROM sales
  INNER JOIN restock on restock.product_id=sales.product_id
GROUP by  sales.product_id

USE bamazon_db;
ALTER  TABLE products
    ADD cost INTEGER(255) NOT NULL ;

-- how to comibine sales restock and inventory

USE bamazon_db;
SELECT sale.id,sale.department,sale.revenue,(sale.cost*SUM(restock.quantity)) AS expense,(sale.revenue - (sale.cost*SUM(restock.quantity)))AS Total_Return
FROM (
        SELECT products.id,products.department,products.price,SUM(sales.quantity)AS sales,(products.price*SUM(sales.quantity))AS revenue,products.cost
        FROM products
        left JOIN sales on sales.product_id=products.id
        GROUP BY  products.id)AS sale

  left JOIN restock on restock.product_id=sale.id
GROUP by  sale.id



-- how to comibine sales restock and inventory
USE bamazon_db;
select sale.department,SUM(sale.revenue)AS Total_Revenue,SUM(sale.expense) As Total_Expense,SUM(sale.Total_Return) As Total_Return
FROM(SELECT sale.id,sale.department,sale.revenue,(sale.cost*SUM(restock.quantity)) AS expense,(sale.revenue - (sale.cost*SUM(restock.quantity)))AS Total_Return
      FROM (
        SELECT products.id,products.department,products.price,SUM(sales.quantity)AS sales,(products.price*SUM(sales.quantity))AS revenue,products.cost
        FROM products
        left JOIN sales on sales.product_id=products.id
        GROUP BY  products.id)AS sale

  left JOIN restock on restock.product_id=sale.id
GROUP by  sale.id) AS sale

GROUP BY sale.department


-- ------------------------------------------------

USE bamazon_db;
SELECT sales.product_id,SUM(sales.quantity)
FROM sales
GROUP by  sales.product_id
