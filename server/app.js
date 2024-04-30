const express =require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const mongourl="mongodb+srv://saba:saba007@cluster0.fhzzycb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const JWT_SECRET="hbflkjhhbvpartiuupo4875p94u5j4pj409ikvmm983575-5"

mongoose
    .connect(mongourl)
    .then(()=>{
         console.log("connected to mongoDB")
 
    })
    .catch((e)=>{
         console.log(e);
    });
    require('./UserDeatails')
    

    const User=mongoose.model("UserInfo")
    const Busloc=mongoose.model("BusLocation")
app.get("/",(req,res)=>{
    res.send({status:"stated"})

})

app.post('/register', async(req, res)=>{
    const {name,usertype,busno,number,password}= req.body;
    const OldUser= await User.findOne({number:number})

    if(OldUser){
        return res.send({data:"User Already exists"})
    }
    const encryptedPassword = await bcrypt.hash(password,10);

    try{
        await User.create({
            name:name,
            usertype:usertype,
            busno:busno,
            number:number,
            password:encryptedPassword
        })
        res.send({status:"OK",data:"user Created Sucessfully"})
    }catch(err){
        console.log(err)
    }
})



app.post("/login-user", async(req,res)=>{
    const{number,password}=req.body;
    const oldUser = await User.findOne({number:number});

    if(!oldUser){
        return res.send({data:"User Doesn't Exists"})
    }
    if(await bcrypt.compare(password,oldUser.password)){
        const token=jwt.sign({number:oldUser.number},JWT_SECRET);
        if(res.status(201)){
            console.log("User Verified")
            return res.send({status:"OK",data: token});

        }else{
            return res.send({eror:"Check Credentials"})
        }
    
    }
    else{
        return res.send({data:"Password is wrong"})
    }
});



app.post("/userdata",async(req,res)=>{
    const{token}=req.body;
    try{
        const user =jwt.verify(token,JWT_SECRET);
        const usernumber = user.number;


        User.findOne({number:usernumber}).then((data)=>{
           return res.send({status:"OK",data:data});
        })
    }catch(error){
        return res.send({error:error})

    }
});

app.post("/locdata",async(req,res)=>{
    const {name,number,busno,latlng}=req.body;
    
    const flag= await Busloc.findOne({busno:busno})
    if(flag){
        await Busloc.updateOne({busno:busno},{$set:{location:latlng}})
        return res.send({status:"OK",data:"Updated"})
        
            /*bus.forEach(a=>a.location=latlng)*/
        }
        else{
            await Busloc.create({name:name,number:number,busno:busno,location:latlng})            
            return res.send({status:"OK",data:"Created"})
        }
    }
)
app.get("/getlocdata",(req,res)=>{
  

   try{
        Busloc.find()   
        .then(data=>{res.send({status:"OK",data:data})
})

    }

    catch{
    (err)=>console.log("error",err)
    }
})
    





app.listen(3001,()=>{
    console.log('server is running on port 3001');
})

