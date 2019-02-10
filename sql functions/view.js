var connection=require("../Connection")
var table=require("easy-table")

var view={
    generic_view:function(callback){
    var t= new table
    connection.query("SELECT * FROM products",function(err,res){
        res.forEach(element => {
            t.cell(`Product ID`,element.id)
            t.cell(`Product Name`,element.product_name)
            t.cell(`Department`,element.department)
            t.cell(`Price($)`,element.price)
            t.cell(`Quantity`,element.quantity)
            t.newRow()
        });
        console.log(t.toString())
        callback()
    })
},

    low_inventory:function(value,callback){
        var t= new table
    connection.query(`SELECT * FROM products WHERE quantity<${value}`,function(err,res){
        res.forEach(element => {
            t.cell(`Product ID`,element.id)
            t.cell(`Product Name`,element.product_name)
            t.cell(`Department`,element.department)
            t.cell(`Price($)`,element.price)
            t.cell(`Quantity`,element.quantity)
            t.cell(`Cost($)`,element.cost)
            t.newRow()
        });
        console.log(t.toString())
        callback()
    })

    }
}
module.exports=view