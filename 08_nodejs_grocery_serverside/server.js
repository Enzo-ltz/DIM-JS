
const express = require("express")
const app = express()
const bodyParser = require("body-parser")

let groceryList = [
    { name: "Bière", quantity: 42},
    { name: "PQ", quantity: 120},
    { name: "Pâtes", quantity: 73},
] 

// ROUTE STATIC 

app.set("view engine", "ejs")
app.use("/css",express.static(__dirname + "/css"))
app.use(bodyParser.urlencoded({extended:false}))

//REQ => Request = ce qui est demandé
//RES => Response = ce qu'on envoi au client
app.get("/", (req, res) => {
    res.render("index", { list : groceryList})
})

app.get("/list", (req, res) => {
    res.json(groceryList)
})

app.post("/add", (req, res) => {
    groceryList.push(req.body)
    res.redirect("/")
})

app.listen(1337)
