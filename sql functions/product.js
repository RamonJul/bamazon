var connection=require("../Connection")

var product=function(input) {
this.id=parseInt(input.id)
this.product_name=input.product_name
this.department=input.department
this.price=input.price
this.cost=input.cost
this.quantity=parseInt(input.quantity)
this.enter=function(callback){
    connection.query("INSERT INTO products SET?",{
        product_name:this.product_name,
        department:this.department,
        price:this.price,
        quantity:this.quantity,
        cost:this.cost
    },function(err,res){
        connection.query("SELECT COUNT(*) FROM products ",function(err,res){

            callback(res)
            
        })
    }
    )
}
}

module.exports=product