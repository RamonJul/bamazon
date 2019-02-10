var connection=require("../Connection")

var new_product=function(input) {
this.product_name=input.name
this.department=input.department
this.price=input.price
this.cost=input.cost
this.quantity=input.quantity
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

module.exports=new_product