document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.querySelector("canvas")
    const c = canvas.getContext("2d")
    let w, h

    window.addEventListener("resize", resize)
    function resize() {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        w = canvas.width
        h = canvas.height
    }
    resize()

    // ---------------------------- GENERATE WORLD

    let points = []
    let nbPoints = 4+Math.floor(Math.random()*2)
    for (let i=0; i<nbPoints+1; i++) {
        points.push({
            x:  i*w/nbPoints,
            y:  0.4*h + Math.random()*(h*0.3)
        })

    }
    //---------------------- GLOBAL VAR FOR ANIMATIONS
    let worldDrawed = false
    let tank = { x: 0.25*w, y:0, w: 40, h: 20 }
    let cannonBall = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        ax: 0,
        ay: 0,
        r: 5
    }
    let d

    let holes = []
    // ----------------------------- MOUSE CAPTURE
    const m = { x: 0, y:0 }
    canvas.addEventListener("mousemove", (e) => {
        m.x = e.pageX
        m.y = e.pageY
    })
    let fire = false
    canvas.addEventListener("click", () => {
        if (!fire){
            fire = true
            cannonBall.x = tank.x+30*(m.x-tank.x)/d
            cannonBall.y = tank.y-tank.h+30*(m.y-tank.y+tank.h)/d
            cannonBall.vx = 0
            cannonBall.vy = 0
            cannonBall.ax = 0.01 * (m.x - tank.x)  
            cannonBall.ay = 0.01 * (m.y - tank.y)  
        }
    })

    // ----------------------- KEY CAPTURE
    document.querySelector("body").addEventListener("keydown", (e) => {
        if(e.key == "ArrowLeft" && tank.x > 50)
            tank.x -= 2
        if(e.key == "ArrowRight" && tank.x < w-50)
            tank.x += 2 
    })


    function game(timestamp) {
        c.clearRect(0,0,w,h)

        // -------------------------- DRAW WORLD
        c.beginPath();
        points.forEach((p, i) => {
            if (i==0)
                c.moveTo(p.x, p.y)
            else   
                c.bezierCurveTo(
                    pp.x+100, pp.y, 
                    p.x-100, p.y, 
                    p.x, p.y)
                pp = p
        })
    
        c.lineTo(w+20, h+20)
        c.lineTo(0-20, h+20)
        c.fillStyle = "#824D00"
        c.strokeStyle = "#00AA00"
        c.lineWidth = 10
        c.fill()
        c.stroke()
        
        // if (!worldDrawed) {

        //------------------------ GENERATE TANK
            
            let y = 0
            while (y<h && !c.isPointInPath(tank.x, y))
                y++
            tank.y = y-5

        // }
        //----------------------- CANNON BALL COLLISION
        if(fire){
            fire = 
                !c.isPointInPath(cannonBall.x, cannonBall.y) &&
                cannonBall.x < w &&
                cannonBall.x > 0

            if(c.isPointInPath(cannonBall.x, cannonBall.y))
                holes.push({ 
                    x: cannonBall.x,
                    y: cannonBall.y,
                    r: 10* Math.sqrt(Math.pow(cannonBall.vx, 2)+ Math.pow(cannonBall.vy, 2))
                })
        }

        //----------------------- DRAW HOLES
        for(let hole of holes) {
            c.clearRect(
                hole.x-hole.r/2,
                hole.y-hole.r/2,
                hole.r, hole.r
                )
        }
        //----------------------- DRAW TANK
        c.beginPath() //BODY
        c.rect(tank.x-tank.w/2, tank.y-tank.h, tank.w, tank.h)
        c.fillStyle = "black"
        c.fill()
        c.beginPath() //CANON
        c.strokeStyle = "black"
        c.lineWidth = 5
        c.moveTo(tank.x, tank.y-tank.h)
        d = Math.sqrt(
            Math.pow(tank.x-m.x, 2) +
            Math.pow(tank.y-m.y-tank.h, 2))
        c.lineTo(
            tank.x+30*(m.x-tank.x)/d,
            tank.y-tank.h+30*(m.y-tank.y+tank.h)/d)
        c.stroke()

        //---------------------- DRAW CANNON BALL
        if (fire) {
            c.beginPath()
            c.fillStyle = "black"
            c.arc(cannonBall.x, cannonBall.y, cannonBall.r, 0, Math.PI*2)
            c.fill()

            cannonBall.vx += cannonBall.ax
            cannonBall.vy += cannonBall.ay + 0.05

            cannonBall.ax *= 0.1
            cannonBall.ay *= 0.1

            cannonBall.x += cannonBall.vx
            cannonBall.y += cannonBall.vy
        }

        //----------------------- DRAW MOUSE
        c.beginPath()
        c.strokeStyle = "red"
        c.lineWidth = 3
        c.moveTo(m.x-30, m.y)
        c.lineTo(m.x+30, m.y)
        c.stroke()

        c.beginPath()
        c.moveTo(m.x, m.y+30)
        c.lineTo(m.x, m.y-30)
        c.stroke()

        c.beginPath()
        c.arc(m.x, m.y, 25, 0, Math.PI*2)
        c.stroke()
        
        worldDrawed = true
        window.requestAnimationFrame(game)
    }
    window.requestAnimationFrame(game)

})