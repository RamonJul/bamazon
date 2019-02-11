var inquire=require("inquirer")
var view=require("./sql functions/view")
var prompt=require("./prompts")
var fs=require("fs")
var task=""
supervisor()

function supervisor(){

    switch(task){

        case"view_sales":
            task=""
            view.sale(function(){supervisor()})
            break;
  
        case"add a department":
            task=""
            inquire.prompt(prompt.super.add_department).then(response=>{
                if(response.sure){
                    fs.appendFile("departments.txt",`,${response.department}`,function(err,res){
                        console.log(err)
                    })
                    task=""
                }
                else{
                    task="add a department"
                }
                supervisor()
            })
            break;
        default:
            inquire.prompt(prompt.super.task).then(response=>{
        
                    task=response.task
                    supervisor()
            })
            break;
    }
        
}