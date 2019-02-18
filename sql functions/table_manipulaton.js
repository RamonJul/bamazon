var connection=require("./Connection")

var new_product=function(input) {
this.product_name=input.product_name
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
        connection.query("SELECT * FROM products ",function(err,res){
           var obj=(res[(res.length-1)])
            connection.query(`INSERT INTO restock SET?`, {
                product_id: obj.id,

                quantity: obj.quantity
            },
            function (err, res) {callback()})
            
        })
    }
    )
}
}

module.exports=new_product