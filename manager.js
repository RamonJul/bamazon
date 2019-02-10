var inquire=require("inquirer")
var view=require("./sql functions/view")
var inventory=require("./sql functions/transaction")
var table=require("./sql functions/table_manipulaton")
console.log(table)
var task=""
manager()

function manager(){

    switch(task){

        case"view":
            task=""
            view.generic_view(function(){manager()})
            break;
        case"low inventory":
            inquire.prompt([
                {
                    type:"input",
                    message:"Upper limit",
                    name:"filter"
                }
            ]).then(response=>{
                task=""
                view.low_inventory(response.filter,function(){manager()})
            })
        break;

        case"restock":
        inventory.product("manager",function(input){
            task=input
            manager()
        })
        break;
      
        case"add product":
        task=""
            inquire.prompt([
                {
                    type:"input",
                    message:"Product name",
                    name:"name"
                    
                },
                {
                    type:"list",
                    maessage:"Product department.",
                    name:"department",
                    choices:["1","funiture"]
                },

                {
                    type:"input",
                    message:"Sale price",
                    name:"price"
                },
                {
                    type:"input",
                    message:"Product cost",
                    name:"cost"
                },
                {
                    type:"input",
                    message:"Quantity on hand",
                    name:"quantity"
                }

            ]).then(response=>{

               var product= new table(response)
               product.enter(function(input){

                inventory.new_product(input,product.quantity)
                manager()

               })
            })
        break;
            default:
            inquire.prompt([
                {
                    type:"list",
                    message:"what woud you like to do",
                    choices:["view","low inventory","restock","add product","shop"],
                    name:"task"
                }
            ]).then(response=>{
        
                    task=response.task
                    manager()
            })
            break;
    }
        
}