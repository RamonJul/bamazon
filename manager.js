var inquire=require("inquirer")
var view=require("./sql functions/view")
var inventory=require("./transaction")
var table=require("./sql functions/table_manipulaton")
var prompt=require("./prompts")
var task="view"
manager()
function manager(){

    switch(task){

        case"view":
            task=""
            view.generic_view("manager",function(){manager()})
            break;
        case"low inventory":
            inquire.prompt(prompt.manager.upper_limit).then(response=>{
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
            inquire.prompt(prompt.manager.new_product).then(response=>{

               var product= new table(response)
               product.enter(function(input){
                manager()

               })
            })
        break;
            default:
            inquire.prompt(prompt.manager.tasks).then(response=>{
        
                    task=response.task
                    manager()
            })
            break;
    }
        
}

