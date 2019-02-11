var connection=require("./Connection")
var table=require("easy-table")
var product_list=require("./product_list")
var fs=require("fs")

var view={
    generic_view:function(callback){
    var t= new table
    product_list.reset()
    connection.query("SELECT * FROM products",function(err,res){
        res.forEach(element => {
            product_list.create_list(element)
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

    },

    sale:function(callback){
        var t= new table
        fs.readFile(`./sql functions/sales_command.txt`,`utf8`,function(err,data){
            console.log(data)
            connection.query(data,function(err,res){
                res.forEach(element => {
                    t.cell(`Department`,element.department)
                    t.cell(`Sales`,element.Total_Revenue)
                    t.cell(`Expense`,element.Total_Expense)
                    t.cell(`Return`,element.Total_Return)
                    t.newRow()
                });
                console.log(t.toString())
                callback()
            })

        })
    }
}

module.exports=view

