var product_obj = require("./product")
var connection = require("../Connection")
var product_list = {
    products: [],
    stock: 0,
    id: 0,
    reset: function () {
        this.products = []
    },
    create_list: function (element) {
        var product = new product_obj(element)
        this.products.push(product)
    },
    id_check: function (id) {
        var valid = false
        this.products.forEach(function (element) {
            if (element.id === id) {
                product_list.id = id
                product_list.stock = element.quantity
                valid = true
            }
        })
        return valid
    },
    in_stock: function (amount) {
        var availble = false
        if (this.stock >= amount) {
            this.stock -= amount
            availble = true
        }
        return availble;
    },
    restock: function (amount) {
        console.log("amount")
        this.stock += amount
    },
    update: function () {
        console.log("update")
        console.log(this.stock)

        console.log(this.id)
        connection.query("Update products SET ? WHERE ?", [{
                quantity: this.stock,
            },
            {
                id: this.id
            }
        ], function (err, res) {})
    },
    new_product: function (id, quantity) {
        this.id = id
        this.quantity = quantity
        this.logging("manager")
    },
    logging: function (user) {
        var table = "restock"
        if (user === "customer") {
            table = "sales"
        }
        connection.query(`INSERT INTO ${table} SET?`, {
                product_id: this.id,
                quantity: this.quantity
            },
            function (err, res) {})
    }
}
module.exports = product_list;