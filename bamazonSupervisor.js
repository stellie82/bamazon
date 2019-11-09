// Create another Node app called bamazonSupervisor.js. Running this application will list a set of menu options:

// View Product Sales by Department
// Create New Department

// When a supervisor selects View Product Sales by Department, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.

// department_id
// department_name
// over_head_costs
// product_sales
// total_profit

// The total_profit column should be calculated on the fly using the difference between over_head_costs and product_sales. total_profit should not be stored in any database. You should use a custom alias.
// If you can't get the table to display properly after a few hours, then feel free to go back and just add total_profit to the departments table.

// Hint: You may need to look into aliases in MySQL.
// Hint: You may need to look into GROUP BYs.
// Hint: You may need to look into JOINS.
// HINT: There may be an NPM package that can log the table to the console. What's is it? Good question :)

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
    console.log("connection works");
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
                    "View Product Sales by Department",
                    "Create New Department",
                    "Exit"
                ],
            },
        ]).then(function (answer) {
            switch (answer.menu) {
                case "View Product Sales by Department":
                    viewSalesDept();
                    break;
                case "Create New Department":
                    createDept();
                    break;
                case "Exit":
                    connection.end();
                    break;
            }
        });
}