var inquire = require("inquirer")
var prompt = require("./../prompts")
var product_list = require("./product_list")

var inventory = {
user: "",
product_id: 0,
quantity: 0,
new_product:function(id,quantity){
    product_list.new_product(id,quantity)
},
product: function (input, callback) {
    this.user = input
    inquire.prompt(prompt.inventory_management.product_id).then(function (response) {
        //check for valid id
        inventory.product_id = parseInt(response.id)
        if (product_list.id_check( parseInt(response.id))) {
            inventory.amount(function (input) {
                product_list.logging(inventory.user)
                product_list.update()
                callback(input)
            })
        } else {
            console.log("Please enter a valid product id")
        }
    })
},
amount: function (callback) {

    inquire.prompt(prompt.inventory_management.amount).then(function (response) {
            //check if they have the amount 
            inventory.quantity = parseInt(response.amount)
            if (inventory.user === "manager") {
                product_list.restock(parseInt(response.amount) )
                callback("")
            } 
            else if( product_list.in_stock(parseInt(response.amount))){
                callback("complete")
            }
            else{
                console.log("We do not have enough of that product")
                console.log("Please enter another amount")
                inventory.amount(function (input) {
                callback(input)
            })
            return;
        }
        }
    )
}
}



module.exports = inventory