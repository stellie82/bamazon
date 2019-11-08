var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    displayItems();
});

function displayItems() {
    connection.query("SELECT *FROM products;", function (err, res) {
        if (err) throw err;
        console.log(res);
        for (i = 0; i < res.length; i++) {
            console.log(
                "ID: " + res[i].item_id + " | " +
                "Item: " + res[i].product_name + " | " +
                "Department: " + res[i].department_name + " | " +
                "Price: $" + res[i].price.toFixed(2) + " | " +
                "Stock quantity: " + res[i].stock_quantity
            );
        }
        userPrompt();
    });

}

function userPrompt() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "What is the ID of the product you would like to purchase?"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many units would you like to purchase?"
            }
        ]).then(function (response) {
            console.log(response.id);
            console.log(response.quantity);

            connection.query("SELECT * FROM products WHERE ?", { item_id: response.id }, function (err, res) {
                if (err) throw err;
                if (res[0].stock_quantity > response.quantity) {
                    console.log("We have enough!");
                } else {
                    console.log("Insufficient quantity!");
                }
                connection.end();
            });
        })
}

// Then create a Node application called bamazonCustomer.js.Running this application will first display all of the items available for sale.Include the ids, names, and prices of products for sale.
// The app should then prompt users with two messages.

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.

// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

// If not, the app should log a phrase like Insufficient quantity! , and then prevent the order from going through.

//     However, if your store does have enough of the product, you should fulfill the customer's order.

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.