
const express = require("express")
const app = express()

let groceryList = [
	{ name: "Bière", quantity: 42 },
	{ name: "PQ", quantity: 120 },
	{ name: "Pâtes", quantity: 73 },
	{ name: "Jambon cru", quantity: 73 },
]


app.use("/css", express.static(__dirname + "/css"))
app.use("/js", express.static(__dirname + "/js"))


app.get("/", (req, res) => {
	res.sendFile(__dirname + "/html/index.html")
})





app.get("/list", (req, res) => {
	res.json(groceryList)
})

app.get("/add", (req, res) => {
	groceryList.push(req.query)
	res.json({ ok: true })
})

app.get("/quantity/:min/:max", (req, res) => {

	let list = []
	for(let stuff of groceryList)
		if (stuff.quantity > req.params.min && stuff.quantity < req.params.max)
			list.push(stuff)
	res.json(list)

})

app.get("/info/:name", (req, res) => {
	for(let stuff of groceryList)
		if (stuff.name == req.params.name)
			res.json(stuff)
	res.json({error: "not found"})

})



app.get("/blabla", (req, res) => {
	res.end("<p>Le <b>gras</b> c'est la vie !<script>alert('gras')</script></p>")
})

app.listen(1337)
