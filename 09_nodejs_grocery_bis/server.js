
const express = require("express")
const app = express()

const bodyParser = require("body-parser")
app.use(bodyParser.json())

//-----------------------------------------CONNEXION BD
let MongoClient = require("mongodb").MongoClient;
const client = new MongoClient("mongodb://localhost:27017", 
    { useNewUrlParser: true, useUnifiedTopology: true });

let db = null;
client.connect(err => {
    db = client.db("grocery")
})



app.use("/css", express.static(__dirname + "/css"))
app.use("/js", express.static(__dirname + "/js"))


app.get("/", (req, res) => {
	res.sendFile(__dirname + "/html/index.html")
})





app.get("/list", (req, res) => {
	db.collection("stufftobuy").find({}).toArray((error, docs) => {
		console.log(docs)
		res.json(docs)
	})
})

app.post("/add", (req, res) => {
	let stuff = req.body
	stuff.id = Date.now()+""+Math.floor(Math.random()*100000)
	db.collection("stufftobuy").insertOne(stuff, (err, docs) => {
		res.json(stuff)
	})
})

app.get("/quantity/:min/:max", (req, res) => {

	let min = parseInt(req.params.min)
	let max = parseInt(req.params.max)
	db.collection("stufftobuy").find({
		quantity : {$gt: min, $lt:max}
	}).toArray((err, docs)=> {
		res.json(docs)
	})
	

})

app.get("/info/:name", (req, res) => {
	db.collection("stufftobuy").find({name: req.params.name}).toArray((err, docs) => {
		res.json(docs)
	})
})



app.get("/blabla", (req, res) => {
	res.end("<p>Le <b>gras</b> c'est la vie !<script>alert('gras')</script></p>")
})

app.listen(1337)
