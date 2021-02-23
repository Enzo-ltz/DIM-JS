document.addEventListener("DOMContentLoaded", () => {

    const socket = io()
    socket.on("message", (data) => {
        console.log(data)
    })

    let pseudoInput = document.querySelector("#pseudo")
    let connectedDiv = document.querySelector("#allConnected")

    setInterval(() => {
        if (pseudoInput.value != "")
            socket.emit("alive", { pseudo: pseudoInput.value})
    }, 1000)

    socket.on("connectedPeople", (peopleList) => {
        for(let connected of connectedDiv.querySelectorAll(".connected"))
            connected.remove()
        for (let pseudo in peopleList)
            _("div", connectedDiv, pseudo, null, "connected")
    })

    let messageInput = document.querySelector("#message")
    let messagesDiv = document.querySelector("#messages")
    let destinataireInput = document.querySelector("#destinataire")
    let sendButton = document.querySelector("#send")

    sendButton.addEventListener("click", () => {
        socket.emit("chat", {
            origine: pseudoInput.value,
            destinataire: destinataireInput.value,
            message: messageInput.value
        })
    })

    socket.on("chat", (data) => {
        messagesDiv.innerHTML = "<p>"+data.origine+" :"+data.message+"</p>"
    })

})

function _(tag, parent, text, id=null, classs=null) {

    let element = document.createElement(tag)
    if(text)
        element.appendChild(document.createTextNode(text))
    parent.appendChild(element)
    if(id)
        element.id = id
    if(classs)
        element.classList.add(classs)
    return element
}

