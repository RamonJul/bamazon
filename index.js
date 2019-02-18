var inquire=require("inquirer")
var customer=require("./customer.js")
var manager=require("./manager")
console.log(customer)
inquire.prompt([
    {
        type:"list",
        message:"authoritization level",
        choices:["customer","manager","supervisior"],
        name:"level"
    }
]).then(function(response){
    var task=response.level

})

function options(){
    switch (task){

        case "customer":
        customer.shopping()
        break;

        case "manager":
        inquire.prompt([{
            type:"list",
            message:"What would you like to do",
            choices:["shop","manager_duties"],
            name:"task"
        }
        ]).then(function(response){
            if(response.task==="manager"){
                manager.managers()
            }
            else{
                customer.shopping()
            }

        })
    }
    
}