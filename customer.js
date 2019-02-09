var inquire=require("inquirer")
var view=require("./sql functions/view")
var inventory=require("./sql functions/transaction")
var transaction= new inventory.transaction()
var task="view"
var product_id
var amount
var stock
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
            task="product"
        }
        shopping();
    })  })
    break;
    case"product":
      //ask for the id
    inquire.prompt([
        {
            type:"input",
            message:"Please enter the product id",
            name:"id"
        }
    ]).then(function(response){
        //check for valid id
        product_id=response.id
        transaction.validity(product_id,function(input,){
        if(input){
          task="amount"
        
        }
        else{
         console.log("Please enter a valid product id")
        }
        shopping();
        })       
    })
    break;
    case "amount":
     // asks for the amount

    inquire.prompt([
        {
            type:"input",
            message:"How many",
            name:"amount"
        }
    ]).then(function(response){
         //check if they have the amount
         amount=parseInt(response.amount)
         transaction.instock(product_id,amount,function(input,in_stock){
        if(input){
            task="complete"
            stock=in_stock
        }
        else{
            console.log("We do not have enough of that product")
            console.log("Please enter another amount")
        }
        shopping()
    })})
    break;
    case"complete":

    transaction.update(product_id,-1*(amount),stock)
    console.log(`Thank you for buying ${amount} of product ${product_id}`)
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
                task="product"
                shopping()
            })
     
        }
        else{
              //if they are done then we end the connections
        }
    })
    break;
}
}