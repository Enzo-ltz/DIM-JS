const express = require("express")
const socketio = require("socket.io")
const http = require("http")

const app = express()
const server = http.Server(app)
const io = socketio(server)







app.use("/css", express.static(__dirname + "/css"))
app.use("/js", express.static(__dirname + "/js"))

app.get("/", (req, res)=> {
    res.sendFile(__dirname + "/index.html")
})



let connectedPeople = { }
let sockets = { }

// Communication avec 1 client

io.on("connect", (socket) => {

    console.log("Connecté ! IP : " + socket.handshake.address)
    
    socket.emit("message", "Salut ma couille !")
    //Une personne est en ligne
    socket.on("alive", (data) => {
        console.log(data.pseudo + " is alive")
        connectedPeople[data.pseudo] = true

        sockets[data.pseudo] = socket

    })

    //Une personne envoi un message
    socket.on("chat", (data) => {
        let socketDest = sockets[data.destinataire]
        socketDest.emit("chat", data)

    })

})

// Communication avec tous les clients

setInterval(() => {

    io.emit("connectedPeople", connectedPeople)
    connectedPeople = { }
}, 1000)




server.listen(8080)