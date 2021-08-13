const express=require("express");

const app=express();

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(express.static("css"))
app.use(express.json());
app.use(express.urlencoded({ extended: true })) // for form data



var items=[];
var startTimes=[];
var endTimes=[];
var workItems=[];
var workStartTimes=[];
var workEndTimes=[];
app.get("/",(req,res)=>{
    // var today=new Date();
    // //console.log(today);
    // var currDay=today.getDay();
    // var todayDate=today.getDate().toString();
    // var day="";
    // var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    // day=days[currDay]
    // var obj={

    //     todayDay: day,
    //     date:todayDate,
    //     user:true
    // }
    // res.render("list",obj);
    var options={
        weekday:"long",
        day:"numeric",
        month:"long"
    }
    var day=new Date().toLocaleDateString("en-IN",options);
    res.render("list",{kindOfDay:day,newListItems:items,startTime:startTimes,endTime:endTimes});
    
});

app.post("/",(req,res)=>{
    var item=req.body.newItem;
    var sTime=req.body.startTime;
    var eTime=req.body.endTime;
    var check=req.body.list;  
    if(check==="Work")  {
        workItems.push(item);
        workStartTimes.push(sTime);
        workEndTimes.push(eTime);
        res.redirect("/work")
    }
    else{
        items.push(item);
        startTimes.push(sTime);
        endTimes.push(eTime);
        res.redirect("/")
    }
        
    
   
   // console.log(item);
    //res.render("list")
   

})

app.get("/work",(req,res)=>{
    res.render("list",{kindOfDay:"Work List",newListItems:workItems,startTime:workStartTimes,endTime:workEndTimes})
});

// About Page Requests
app.get("/about",(req,res)=>{
    res.render("about");
})
app.listen(3000,()=>{
    console.log("Server is runing......")
})