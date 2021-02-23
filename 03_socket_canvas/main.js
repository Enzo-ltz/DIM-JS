document.addEventListener("DOMContentLoaded", () => {

    const socket = io("51.83.36.122:8080")
    const pseudo = document.querySelector("#pseudo")
    const text = document.querySelector("#text")
    const button = document.querySelector("#chat button")

    text.focus()
    text.addEventListener("keyup", (e) => {
        if (e.key == "Enter")
            send()
    })

    button.addEventListener("click", send)

    function send() {

        socket.emit("message", {
            pseudo: pseudo.value,
            text: text.value
        })
        text.value = ""
    }

    socket.on("message", (data) => {

        let p = _("p", messages)
        _("span", p, data.pseudo, null, "pseudo")
        _("span", p, data.text, null, "text")

        messages.scrollTop = messages.scrollHeight
    })



    const canvas = document.querySelector("canvas")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const c = canvas.getContext("2d")
    const w = canvas.width
    const h = canvas.height

    canvas.addEventListener("mousemove", (e) => {

        
        if (e.buttons != 0) {
            socket.emit("point", { 
                x : e.pageX,
                y : e.pageY, 
                color: "pink"
            })
        }

    })

    socket.on("draw", (enable) => {
        if (enable) {
            c.beginPath()
            c.rect(0, 0, w, 10)
            c.fillStyle = "orange"
            c.fill()

            for(let a=0; a<100; a++){
                socket.emit("point", {
                    x : Math.random(),
                    y : Math.random(),
                    color : "blue"
                })
            }

        } else {
            c.clearRect(0, 0, w, 10)
        }
    })

    socket.on("point", (data) => {

        c.beginPath()
        c.arc(data.x, data.y, 5, 0, Math.PI*2)
        c.fillStyle = data.color
        c.fill()

    })



    // Fonction de factorisatoin de la création d'éléments DOM

    function _(tag, parent, text, id = null, classs = null) {

        let element = document.createElement(tag)
        if (text)
            element.appendChild(document.createTextNode(text))
        parent.appendChild(element)
        if (id)
            element.id = id
        if (classs)
            element.classList.add(classs)
        return element
    }

})

