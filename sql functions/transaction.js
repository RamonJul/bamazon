var connection = require("../Connection")
var inquire = require("inquirer")
var availability = require("./availability")
var inventory = {
    user: "",
    product_id: 0,
    quantity: 0,
    stock: 0,
    update: function () {
        this.logging()
        if (this.user === "customer") {
            console.log(`Thank you for buying ${this.quantity} of product ${this.product_id}`)
            this.quantity = -1 * (this.quantity)
        }
        console.log(this.quantity)
        connection.query("Update products SET ? WHERE ?", [{
                quantity: this.stock + this.quantity,
            },
            {
                id: this.product_id
            }
        ], function (err, res) {})
    },
    new_product:function(id,quantity){
        this.product_id=id
        this.quantity=quantity 
        this.user="manager"   
        this.logging()
    },
    logging: function () {
        var table = "restock"
        if (this.user === "customer") {
            table = "sales"
        }
        console.log(table)
        connection.query(`INSERT INTO ${table} SET?`, {
                product_id: this.product_id,
                quantity: this.quantity
            },
            function (err, res) {console.log(res.affectedRows + " product inserted!\n");})

    },
    product: function (input, callback) {
        this.user = input
        inquire.prompt([{
            type: "input",
            message: "Please enter the product id",
            name: "id"
        }]).then(function (response) {
            //check for valid id
            inventory.product_id = response.id
            availability.validity(inventory.product_id, function (input) {
                if (input) {
                    inventory.amount(function (input) {
                        callback(input)
                    })

                } else {
                    console.log("Please enter a valid product id")
                    callback("shop")
                }
            })

        })
    },
    amount: function (callback) {

        inquire.prompt([{
            type: "input",
            message: "How many",
            name: "amount"
        }]).then(function (response) {
            //check if they have the amount 
            inventory.quantity = parseInt(response.amount)
            if (inventory.user === "manager") {
                callback("complete")
            } else {
                availability.instock(inventory.product_id, inventory.quantity, function (input, instock) {
                    if (input) {
                        inventory.stock = instock
                        inventory.update()
                        callback("complete")

                    } else {
                        console.log("We do not have enough of that product")
                        console.log("Please enter another amount")
                        inventory.amount(function (input) {
                            callback(input)
                        })
                    }
                })
            }



        })


    }
}


module.exports = inventory