DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT(10) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  price DECIMAL(5,2),
  stock_quantity INT(10),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
	("Hatchet", "Books", 5.99, 15),
    ("1984", "Books", 7.95, 10),
    ("Dark Matter", "Books", 6.50, 20),
    ("Milk", "Food", 2.50, 50),
    ("Chex Mix", "Food", 4.50, 20),
    ("Frozen Lego Set", "Toys", 30.00, 5),
    ("Wrench", "Tools", 10.25, 10),
    ("Hammer", "Tools", 7.95, 10),
    ("Toaster Oven", "Kitchen", 25.00, 5),
    ("Microwave", "Kitchen", "35.50", 10)
    ;

SELECT * FROM products;