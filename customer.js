var inquire=require("inquirer")
var view=require("./sql functions/view")
var inventory=require("./transaction")
var prompt=require("./prompts")
var task="view"
shopping()
function shopping(){
switch(task){

    case"view":
    //present the data
    view.generic_view("user", function(){ 
    inquire.prompt(prompt.customer.greeting).then(function(response){
        if(response.buying){
            task="shop"
        }

        shopping();
    })  })
    break;
    case"shop":
      //ask for the id
    inventory.product("customer",function(input){
        task=input
        shopping()
    })
    break;
    case"complete":
    inquire.prompt(prompt.customer.end).then(function(response){
        if(response.continue){
            view.generic_view("user",function(){
                task="shop"
                shopping()
            })
     
        }
        else{
            break;
        }
    
    })
    break;
}
}