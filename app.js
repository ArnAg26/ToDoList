const express=require("express");
const bp=require("body-parser");
const app=express();
const mongoose=require("mongoose");
const _=require("lodash");
const date=require(__dirname+"/date.js"); 
app.use(bp.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');
mongoose.connect('mongodb+srv://ArnavAgarwal:test1234@cluster0.ihvmn3k.mongodb.net/todolistDB');

const ItemSchema=new mongoose.Schema({
    name:String
})

const Item=mongoose.model("Item",ItemSchema);

const item1=new Item({
    name:"Welcome to your to do list"
})


const item2=new Item({
    name:"Eat Sleep Reapeat"
})

const ListSchema=mongoose.Schema({
    name:String,
    items:[ItemSchema]
})

const List=mongoose.model("Lists",ListSchema);



app.get("/",function(req,res){
    //res.sendFile(__dirname+"/index.html");
    var items=[]
    let day=date.getDate();
    Item.find({},function(err,items){
        if(items.length==0){
            Item.insertMany([item1,item2],function(err){
                if(err){
                    console.log("There was error.XD");
                }
                else{
                    console.log("No errors you are getting there buddy");
                }
            })
            res.redirect("/");
        }
        else{
            res.render('list',{Foo:day,newlistitem:items});

        }
        
    })
    
    
    
    
    
})



app.post("/",function(req,res){
    const day=date.getDate();
    const pizza=req.body.submit;
    if(req.body.submit===day){
        const item=new Item({
            name:req.body.new_item
        });
        item.save();
        //items.push(req.body.new_item);
        res.redirect("/");
        
    }
    else{
        List.findOne({name:pizza},function(err,bt){
            if(err){
                console.log(err);
            }
            else{
                const bb=bt.items;
                const item=new Item({
                    name:req.body.new_item
                })
                bb.push(item);
                List.updateOne({name:pizza},{items:bb},function(err){});
            }
        })
        res.redirect("/"+pizza);

        
    }
    
})

app.get("/:topic",function(req,res){
    let day=date.getDate();
    const listname=_.capitalize(req.params.topic);
    List.findOne({name:listname},function(err,bt){
        if(err){
            console.log(err);
        }
        else{
            if(bt){
                res.render("list",{Foo:listname,newlistitem:bt.items})
            }
            else{
                const list=new List({
                    name:listname,
                    items:[item1,item2]
                })
                list.save()
                res.redirect("/"+listname);
            }
        }
    })
    
    //res.render('list',{Foo:day,newlistitem:items});
})

app.post("/delete",function(req,res){
    day=date.getDate();
    const Id=req.body.check;
    const ln=req.body.listName;
    if(ln==day){
        Item.deleteOne({_id:Id},function(err){
            if(err){
                console.log(err);
            }
        });
        res.redirect("/");

    }else{
        console.log(ln);
        List.findOneAndUpdate({name:ln},{$pull:{items:{_id:Id}}},function(err,foundList){
            if(err){
                console.log(err);
            }

        })
        res.redirect("/"+ln);
    }

})

app.listen(3000,function(req,res){
    console.log("Server on port 3000 is running");
})