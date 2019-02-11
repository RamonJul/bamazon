var fs=require("fs")
var prompts={
    customer:{
        greeting:[
            {
                type:"confirm",
                message:"Would you like to buy something",
                name:"buying"
            }
        ],
        end:[
            {
                type:"confirm",
                message:"Is there something else you would like to buy",
                name:"continue"
            }
        ]
    },
    manager:{
        tasks:[
            {
                type:"list",
                message:"what woud you like to do",
                choices:["view","low inventory","restock","add product","shop"],
                name:"task"
            }
        ],
        upper_limit:[
            {
                type:"input",
                message:"Upper limit",
                name:"filter"
            }
        ],
        new_product:[
            {
                type:"input",
                message:"Product name",
                name:"product_name"
                
            },
            {
                type:"list",
                maessage:"Product department.",
                name:"department",
                choices:[]
            },

            {
                type:"input",
                message:"Sale price",
                name:"price"
            },
            {
                type:"input",
                message:"Product cost",
                name:"cost"
            },
            {
                type:"input",
                message:"Quantity on hand",
                name:"quantity"
            }

        ]

    },
    super:{
        task:[
            {
                type:"list",
                message:"what woud you like to do",
                choices:["view_sales","add a department"],
                name:"task"
            }
        ],
        add_department:[{
            type:"input",
            message:"Name of the department",
            name:"department"
        },
        {
            type:"confirm",
            message:" Is this the correct department name",
            name:"sure"
        }
        ]
    },
    inventory_management:{
        product_id:[{
            type: "input",
            message: "Please enter the product id",
            name: "id"
        }],
        amount:[{
            type: "input",
            message: "How many",
            name: "amount"
        }]
    }


}

fs.readFile("departments.txt","utf8",function(err,data){
    if(err){
        console.log(err)
    }
    prompts.manager.new_product[1].choices=data.split(",")

})

module.exports=prompts
