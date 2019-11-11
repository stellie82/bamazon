# Bamazon

Bamazon is an Amazon-like storefront where customers will be able to view items for sale, request orders, update stock from the inventory, add new products as well as add new departments.  Customers will also be able to view total profit for each of the product departments.

This application is divided into three parts.

## Customer View
![customer-view](https://)

The Customer View runs from `node bamazonCustomer.js` where it pulls data from the `products` table in the MySQL database.  Here a customer is able to view:
* item_id (unique id for each product)
* product_name (name of product)
* department_name
* price (cost to customer)
* stock_quantity (how much of the product is available in store)

The customer will be prompted one of two things: the ID of the product and how many units of the product they would like to purchase.  The application will then check to see if the store has enough inventory to meet the customer's request.  The customer will either be able to see the total cost of their purchase, or a notification that there is not enough of the product in store.

## Manager View
![manager-view](https://)

The Manager View runs from `node bamazonManager.js`.  This application will allow the manager to choose from a list of menu options:
* View Products for Sale
  * This is where a manager will be able to view all items available including the items' IDs, names, department names, prices, product sales and inventory.
* View Low Inventory
  * Here a manager will be able to view all items that have an inventory count of 5 or lower.
* Add to Inventory
  * If a manager decides to add to an item's inventory, they will be prompted which item and how many of the item they would like to add to the store inventory.
* Add New Product
  * Lastly, a manager will have the ability to add a _new_ product to the store by inputting its name, department name, price and quantity to the database.

## Supervisor View
![supervisor-view](https://)

The Supervisor View runs from `node bamazonSupervisor.js`.  In this part of the application a supervisor will have the option to View Product Sales by Department from the `departments` table in the MySQL database:
* department_id
* department_name
* product_sales
* over_head_costs
* total_profit

Product sales are based on the sale (price and quantity) of individual items.  Total profit is then calculated through product sales by department less the overhead costs and is not stored in the database.

Supervisors also have an option to create a new department by adding its name and any overhead costs they would like to add.

## Required Files

Bamazon requires installation of a few Node modules, including:
* inquirer: `npm install inquirer`
* mysql: `npm install mysql`
* cli table: `npm install cli-table`
* package.json file: `npm init -y`

## Technologies Used
* Javascript
* MySQL Workbench
* Node
  * inquirer
  * MySQL
  * cli table
 
[Bamazon](https://github.com/stellie82/bamazon.git)
