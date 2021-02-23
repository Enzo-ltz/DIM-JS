const express = require("express")
const app = express()

let groceryList = [
    { name: "Bière", quantity: 42},
    { name: "PQ", quantity: 120},
    { name: "Pâtes", quantity: 73},
]

app.use("/css", express.static(__dirname +'/css'))
app.use("/js", express.static(__dirname +'/js'))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/html/index.html")
})

app.get("/list", (req, res) => {
    res.json(groceryList)
})

app.get("/add", (req, res) => {
    groceryList.push(req.query)
    res.json({ok:true})
})


app.listen(1337)