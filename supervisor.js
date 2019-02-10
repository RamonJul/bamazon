var inquire=require("inquirer")
var view=require("./sql functions/view")
var inventory=require("./sql functions/transaction")
var table=require("./sql functions/table_manipulaton")
console.log(table)
var task=""
supper()

function supper(){

    switch(task){

        case"view_sales":
            task=""
            view.sale(function(){supper()})
            break;
  
        case"add a department":
            task=""
            view.generic_view(function(){manager()})
            break;


        default:
            inquire.prompt([
                {
                    type:"list",
                    message:"what woud you like to do",
                    choices:["view_sales","add a department"],
                    name:"task"
                }
            ]).then(response=>{
        
                    task=response.task
                    supper()
            })
            break;
    }
        
}