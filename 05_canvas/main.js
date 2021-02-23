document.addEventListener("DOMContentLoaded", () => {
    const canvas=document.querySelector("canvas")
    canvas.width = window.innerWidth
    const c = canvas.getContext("2d")

    const w = canvas.width
    const h = canvas.height

    let angle=0
    let angleSpeed = 0
    let angleDelta=0.0001
    let maxAngle= 0.005

    let last = null
    let delay = 0.1

    let image = document.createElement("img")
    image.src = "https://t1.ldh.be/MCjDymaV1yklQXrHmvKn6yJ8HYM=/0x25:1000x525/940x470/5f71e57e7b50a677fbe3c673.png"

    let mouse = { x: 0, y: 0}
    canvas.addEventListener("mousemove", (event) => {
        mouse.x = event.pageX
        mouse.y = event.pageY
    })
    
    function animate(timestamp) {

        if(!last)
            last=timestamp
        
        if(timestamp - last > delay) {
            last = timestamp

            c.clearRect(0,0, w, h)
    
            c.save()
            c.translate(w/2, h/2)
            c.rotate(angle)
            c.beginPath()

            c.arc(-w/2+mouse.x, -h/2+mouse.y, 100, 0, Math.PI*2)
            c.arc(-w/2+mouse.x+100, -h/2+mouse.y, 100, 0, Math.PI*2)
            c.arc(-w/2+mouse.x-100, -h/2+mouse.y, 100, 0, Math.PI*2)

            c.clip()

            c.drawImage(image, 0, 0, image.width, image.height,
                        -w, -2*h, 2*w, 2*w*image.height/image.width) 
            // c.fillStyle = "orange"
            // c.rect(-100,-100,200,200)
            // c.fill()
            c.restore()
    
            c.beginPath()
            c.font = '48px sans-serif'
            c.fillStyle = 'black'
            c.fillText("HOP", 120,120)
    
            angle+=angleSpeed
            angleSpeed+=angleDelta
            if (Math.abs(angleSpeed)> maxAngle)
                angleDelta = -angleDelta

        }

        window.requestAnimationFrame(animate)
        
    }
    window.requestAnimationFrame(animate)
})