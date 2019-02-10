var inquire=require("inquirer")
var view=require("./sql functions/view")
var inventory=require("./sql functions/transaction")
var task="view"
shopping()
function shopping(){
switch(task){

    case"view":
    //present the data
    view.generic_view( function(){ 
    inquire.prompt([
        {
            type:"confirm",
            message:"Would you like to buy something",
            name:"buying"
        }
        // asks if they want to buy something
    ]).then(function(response){
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
    inquire.prompt([
        //asks if the user is done
        {
            type:"confirm",
            message:"Is there something else you would like to buy",
            name:"continue"
        }
    ]).then(function(response){
        if(response.continue){
            view.generic_view(function(){
                task="shop"
                shopping()
            })
     
        }2
    
    })
    break;
}
}