var connection=require("../Connection")

var inventory={
transaction:function(user){
    this.user=user
    this.update=function(product_id,amount,stock){
        connection.query("Update products SET ? WHERE ?",[
        {
             quantity:stock+amount,
                   
        },
        {
            id:product_id
        }  
    
    ],function(err,res){})
    }
    this.add_transaction=function(){
        var event="add_inventory"
        if(this.user="customer"){
            auth="sale"
        }
        connection.query(`INSERT `)
    }
    this.validity=function(id,callback){
        console.log(id)
        var valid=false
        connection.query(`SELECT * FROM products WHERE id=${id}`,function(err,response){
            console.log(err)
            console.log(response.length)
            if(response.length>0){
             valid=true
            }
            callback(valid)
        })    
     
}
    this.instock=function(id,amount,callback){
        var availble=false
        connection.query(`SELECT quantity FROM products WHERE id=${id}`,function(err,response){
            if(response[0].quantity>=amount){
                availble=true
            }
            callback(availble,response[0].quantity)
        })   
    }
}
}

module.exports=inventory