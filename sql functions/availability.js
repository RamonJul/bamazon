var connection=require("../Connection")

var availability={
  validity:function(id,callback){
        var valid=false
        connection.query(`SELECT * FROM products WHERE id=${id}`,function(err,response){
            if(response.length>0){
             valid=true
            }
            callback(valid)
        })    
     
},
    instock:function(id,amount,callback){
        var availble=false
        connection.query(`SELECT quantity FROM products WHERE id=${id}`,function(err,response){
            if(response[0].quantity>=amount){
                availble=true
            }
            callback(availble,response[0].quantity)
        })   
    }
}
module.exports=availability