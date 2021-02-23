/*

**************** Promesses *******************

new Promise(function(resolve) {
    setTimeout(function() {
        resolve("HOP")
    }, 1000)
})

.then(function(data) {
    console.log(data)
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(42)
        },1000)
    })
})

.then(function(data) {
    console.log(data)
})
*/



/*

*************** Bouton *************

let a = false;
let b = false;
let c = false;

document.addEventListener("DOMContentLoaded", () => {
    
    let boutonA = document.querySelector("#ba")
    let boutonB = document.querySelector("#bb")
    let boutonC = document.querySelector("#bc")
    
    boutonA.addEventListener("click", () => {
        a = true;
        btnClick();
    })
    
    boutonB.addEventListener("click", () => {
        b = true;
        btnClick();
    })
    boutonC.addEventListener("click", () => {
        c = true;
        btnClick();
    })

})

function btnClick() {
    if ( a == true && b == true && c == true) {
        console.log("hop")
    }
}

**********************************************************************************

let waitForButtonA = new Promise(function(resolve) {
    document.querySelector("#ba").addEventListener("click", function(event) {
        console.log("A")
        resolve(event.target)
    })
})

let waitForButtonB = new Promise(function(resolve) {
    document.querySelector("#bb").addEventListener("click", function(event) {
        console.log("B")
        resolve(event.target)
    })
})

let waitForButtonC = new Promise(function(resolve) {
    document.querySelector("#bc").addEventListener("click", function(event) {
        console.log("C")
        resolve(event.target)
    })
})

Promise.all([waitForButtonA, waitForButtonB, waitForButtonC]).then(function(data) {

    console.log("HOP")
    console.log(data)
})

***********************************************************************************


*/

async function f() {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(42)
        }, 1000)
    })
}

async function g() {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(73)
        }, 1000)
    })
}

async function h() {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve("HOP")
        }, 1000)
    })
}

async function main() {
    let rf = await f()
    console.log(rf)
    let rg = await g()
    console.log(rg)
    let rh = await h()
    console.log(rh)
}

main()

