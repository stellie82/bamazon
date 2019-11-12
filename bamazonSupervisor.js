// Required node modules and files
var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require('cli-table');

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

function viewSalesDept() {
    var query = "SELECT departments.department_id, departments.department_name, SUM(products.product_sales) AS product_sales, departments.overhead_costs, SUM(products.product_sales) - departments.overhead_costs AS total_profit FROM departments LEFT JOIN products on departments.department_name = products.department_name  GROUP BY departments.department_id, departments.department_name, departments.overhead_costs ORDER BY departments.department_id ASC;";
    connection.query(query, function (error, response) {
        if (error) throw error;
        console.log("\nProduct Sales by Department");
        var table = new Table({ head: ["Department ID", "Department Name", "Product Sales", "Overhead Costs", "Total Profit"] });
        for (i = 0; i < response.length; i++) {
            if (!response[i].product_sales && !response[i].total_profit) {
                response[i].product_sales = 0;
                response[i].total_profit = response[i].product_sales - response[i].overhead_costs;
            }
            table.push(
                [response[i].department_id, response[i].department_name, response[i].product_sales.toFixed(2), response[i].overhead_costs.toFixed(2), response[i].total_profit.toFixed(2)]);
        }
        console.log(table.toString());
        connection.end();
    })
}

function createDept() {
    inquirer
        .prompt([
            {
                name: "department",
                type: "input",
                message: "What is the name of the new department you would like to add?"
            },
            {
                name: "overhead",
                type: "input",
                message: "What are the overhead costs for the department"
            }
        ]).then(function (answer) {
            connection.query("INSERT INTO departments SET ?",
                {
                    department_name: answer.department,
                    overhead_costs: answer.overhead
                }, function (error) {
                    if (error) throw error;
                    console.log("\nYour new department: " + answer.department + ", has been added successfully.\n");
                    connection.end();
                })
        })
}


