document.addEventListener("DOMContentLoaded", () => {

    const adminLink = document.querySelector("#admin")

    adminLink.addEventListener("click", (event) => {
        event.preventDefault()

        document.querySelector("#bg").classList.remove("hidden")

        const canvas = document.querySelector("#auth canvas")
        const c = canvas.getContext("2d")
        let ox, oy, x, y

        const circles = document.querySelectorAll(".circle")
        const auth = document.querySelector("#auth")
        let code =""
        
        circles.forEach((circle,i) => {
            circle.addEventListener("mouseenter", () => {
                if (code.indexOf(i) == -1)
                    code += i
                circle.classList.add("selected")

                let rect = circle.getBoundingClientRect()

                if(code.length == 1) {
                    c.beginPath()
                    c.moveTo(circle.offsetLeft+rect.width/2, 
                             circle.offsetTop+rect.height/2)
                }
                else {
                    c.lineTo(circle.offsetLeft+rect.width/2, 
                             circle.offsetTop+rect.height/2)
                    c.strokeStyle = "orange"
                    c.lineWidth = 3
                    c.stroke()
                }
               
                

            })
        })

        auth.addEventListener("mouseleave", () => {
           
            fetch("auth.php?code="+code)
                .then((response) => {
                    return response.json()
                })
                .then ((data) => {

                    document.querySelectorAll(".selected").forEach((selectedCircle, j) => {
                    selectedCircle.classList.add(data.ok?"ok":"fail")
                    })

                    code =""
                    setTimeout(() => {
                        document.querySelectorAll(".selected").forEach((selectedCircle, j) => {
                            selectedCircle.classList.remove("selected")
                            selectedCircle.classList.remove("ok")
                            selectedCircle.classList.remove("fail")
                        })
                        c.clearRect(0, 0, canvas.width, canvas.height)
                        if (data.ok)
                            window.location = "admin"
                    }, 1000)
                    
                })


            
        })
    })
} )