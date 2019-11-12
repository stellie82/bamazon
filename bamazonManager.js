// Required node modules and files
var inquirer = require("inquirer");
var mysql = require("mysql");

// Create connection information for the MySQL database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

// Connect to the MySQL server and database
connection.connect(function (err) {
    if (err) throw err;
    menuOptions();
});

// Create a function to prompt a list of menu options
function menuOptions() {
    inquirer
        .prompt([
            {
                name: "menu",
                type: "list",
                message: "What would you like to do today?",
                choices: [
                    "View Products for Sale",
                    "View Low Inventory",
                    "Add to Inventory",
                    "Add New Product",
                    "Exit"
                ],
            },
        ]).then(function (answer) {
            switch (answer.menu) {
                case "View Products for Sale":
                    viewProducts();
                    break;
                case "View Low Inventory":
                    viewInventory();
                    break;
                case "Add to Inventory":
                    addInventory();
                    break;
                case "Add New Product":
                    addProduct();
                    break;
                case "Exit":
                    connection.end();
                    break;
            }
        });
}

// Create a function to display all items in the database
function viewProducts() {
    connection.query("SELECT * FROM products;", function (error, response) {
        if (error) throw error;
        // console.log(response);
        console.log("\nProducts for Sale");
        for (i = 0; i < response.length; i++) {
            console.log(
                "ID: " + response[i].item_id + " | " +
                "Item: " + response[i].product_name + " | " +
                "Department: " + response[i].department_name + " | " +
                "Price: $" + response[i].price.toFixed(2) + " | " +
                "Product Sales: $" + parseFloat(response[i].product_sales).toFixed(2) + " | " +
                "Stock quantity: " + response[i].stock_quantity + "\n"
            );
        }
        menuOptions();
    });
}





// Create a function to display all items in the database with an inventory count of less than 5
function viewInventory() {
    var query = "SELECT * FROM products GROUP BY item_id HAVING stock_quantity < 5";
    connection.query(query, function (error, response) {
        if (error) throw error;
        console.log("\nItems with an inventory count of less than 5:");
        for (i = 0; i < response.length; i++) {
            console.log(
                "ID: " + response[i].item_id + " | " +
                "Item: " + response[i].product_name + " | " +
                "Department: " + response[i].department_name + " | " +
                "Price: $" + response[i].price + " | " +
                "Stock quantity: " + response[i].stock_quantity + "\n"
            );
        }
        menuOptions();
    });
}

// Create a function to add inventory for a specific item in the database
function addInventory() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "What is the ID of the product you would like to add inventory for?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "How many units of item would you like to add?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function (answer) {
            connection.query("SELECT * FROM products WHERE ?", { item_id: answer.id }, function (error, response) {
                if (error) throw error;
                var new_quantity = response[0].stock_quantity + parseInt(answer.quantity);
                connection.query("UPDATE products SET ? WHERE ?",
                    [
                        { stock_quantity: new_quantity },
                        { item_id: answer.id }
                    ],
                    function (error) {
                        if (error) throw error;
                        console.log("\nYour " + parseInt(answer.quantity) + " item(s) of " + response[0].product_name + " have been added to the inventory successfully.\n");
                        connection.end();
                    })
            })
        })
}

// Create a function to be able to add a new product to the database
function addProduct() {
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "What is the name of the item you would like to add?"
            },
            {
                name: "department",
                type: "list",
                message: "What department would you like to put this item under?",
                choices: ["Books", "Food", "Toys", "Tools", "Kitchen"]
            },
            {
                name: "price",
                type: "input",
                message: "What is the price of your item?"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many units of the item would you like to add?"
            }
        ]).then(function (answer) {
            connection.query("INSERT INTO products SET ?",
                {
                    product_name: answer.item,
                    department_name: answer.department,
                    price: answer.price,
                    stock_quantity: answer.quantity
                }, function (error) {
                    if (error) throw error;
                    console.log("\nYour new item: " + answer.item + ", has been added to the inventory successfully.\n");
                    connection.end();
                })
        })
}