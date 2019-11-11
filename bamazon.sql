DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT(10) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  price DECIMAL(5,2),
  product_sales DECIMAL(10,2) DEFAULT (0.00),
  stock_quantity INT(10),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
	("Hatchet", "Books", 5.99, 15),
    ("1984", "Books", 7.95, 15),
    ("Dark Matter", "Books", 6.50, 20),
    ("Milk", "Food", 2.50, 50),
    ("Chex Mix", "Food", 4.50, 20),
    ("Frozen Lego Set", "Toys", 30.00, 10),
    ("Wrench", "Tools", 10.25, 10),
    ("Hammer", "Tools", 7.95, 10),
    ("Toaster Oven", "Kitchen", 25.00, 10),
    ("Microwave", "Kitchen", "35.50", 10)
    ;

CREATE TABLE departments (
	department_id INT(10) NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100),
    product_sales DECIMAL(10,2),
    overhead_costs DECIMAL(10,2),
    PRIMARY KEY(department_id)
);

INSERT INTO departments (department_name, overhead_costs)
VALUES
	("Books", 1000),
    ("Food", 10000),
    ("Toys", 5000),
    ("Tools", 500),
    ("Kitchen", 3000)
	;


SELECT departments.department_id, departments.department_name, SUM(products.product_sales) AS product_sales, departments.overhead_costs,
SUM(products.product_sales) - departments.overhead_costs AS total_profit
FROM products INNER JOIN departments on products.department_name = departments.department_name 
GROUP BY departments.department_id, departments.department_name, departments.overhead_costs