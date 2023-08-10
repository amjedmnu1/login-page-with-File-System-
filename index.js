const express = require("express")
const app = express()
const db = require("./tools/DB")
const session = require("express-session")

const PORT  = process.env.PORT || 3000;
let c=0
app.use((req,res,next)=>{

    c++
    console.log(c);
    next()
})
app.listen(PORT)
app.use(session({
    secret:"#session",
    resave:true,
    saveUninitialized: true,
  cookie: {
    maxAge: 120000
  }
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.set("view engine" ,"hbs")


app.get("/",(req,res)=>{

    if (req.session.user) {
        res.redirect("/home") 
     }else{
 
         res.render("login")
     }

})
app.post("/login",(req,res)=>{

    if (req.session.user) {

        res.redirect("/home")

    } else{

        db.select(req.body).then(data=>{
            req.session.user = data
            res.redirect("/home")
    
                
        }).catch(data=>{
            let errData={}
            if (data.code === 1) {
                errData.pass ="passwerd not match"  
                data.pass = null
            }else{
                errData.email = "Enter valid Email"
            }
    
            res.render("login",{v:errData,old:data})
        })
    }
    
})

app.get("/signup",(req,res)=>{

    if (req.session.user) {
        
        res.redirect("/home")
    }else{

        res.render("signup")
    }

    
})
app.post("/signup",(req,res)=>{
    db.insert(req.body).then((value)=>{
        req.session.user = value
        res.redirect("/home")
    }).catch(err=>{
        res.render("signup",{data:err})
    })
})

app.get("/home",((req,res)=>{
    console.log(req.session.user);
    if (req.session.user) {
        let data =req.session.user
        res.render("home",{value:data})
    }else{
        res.redirect("/")
    }

}))


    




app.get("/session-clear",((req,res)=>{
    

    req.session.destroy(err=>{

        if (err) {

            res.render("index")
            
        }else{
            res.redirect("/")
        }
    })

}))
app.all("*",((req,res)=>{

     res.render("404")
}))





