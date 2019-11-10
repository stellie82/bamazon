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
    updateProductSales();
});

function updateProductSales() {
    connection.query("SELECT * FROM products;", function (error, response) {
        if (error) throw error;
        // console.log(response);
        for (i = 0; i < response.length; i++) {
            // console.log(response[i]);
            connection.query("UPDATE products SET ? WHERE ?",
                [
                    { product_sales: response[i].price * response[i].stock_quantity },
                    { item_id: i + 1 }
                ],
                function (error, res) {
                    if (error) throw error;
                })
        }
    })
    displayItems();
}

// Create a function to display all items in the database
function displayItems() {
    connection.query("SELECT * FROM products;", function (error, response) {
        if (error) throw error;
        // console.log(response);
        for (i = 0; i < response.length; i++) {
            console.log(
                "\nID: " + response[i].item_id + " | " +
                "Item: " + response[i].product_name + " | " +
                "Department: " + response[i].department_name + " | " +
                "Price: $" + response[i].price.toFixed(2) + " | " +
                "Product Sales: $" + parseFloat(response[i].product_sales).toFixed(2) + " | " +
                "Stock quantity: " + response[i].stock_quantity
            );
        }
        userPrompt();
    });

}

// Create a function to prompt the user on what they would like to purchase and how many
function userPrompt() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "What is the ID of the product you would like to purchase?",
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
                message: "How many units would you like to purchase?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function (answer) {
            // Once an item is chosen, update the quantity after the user's purchase in the db
            connection.query("SELECT * FROM products WHERE ?", { item_id: answer.id }, function (error, response) {
                if (error) throw error;
                if (response[0].stock_quantity > answer.quantity) {
                    var new_quantity = response[0].stock_quantity - parseInt(answer.quantity);
                    connection.query("UPDATE products SET ? WHERE ?",
                        [
                            { stock_quantity: new_quantity },
                            { item_id: answer.id }
                        ],
                        function (error) {
                            if (error) throw error;
                            console.log("Your item has been purchased successfully.");
                            console.log("The total cost of your purchase today is: $" + (parseInt(answer.quantity) * response[0].price).toFixed(2));
                        }
                    )
                } else {
                    console.log("Sorry, there are not enough of those items in stock.");
                };

                connection.end();
            });

        });
}

// Make sure your app still updates the inventory listed in the products column.