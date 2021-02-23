document.addEventListener("DOMContentLoaded", () => {
    const numbers = document.querySelector("#numbers")

    for(let i=0; i<5; i++) {
        _("div",numbers,Math.floor(Math.random(1,49) * Math.floor(49)),null,"number")
    }
    _("div",numbers,Math.floor(Math.random(1,5) * Math.floor(5)),null,"number")
    
    
})

function _(tag, parent, text=null,  id=null, classs=null) {

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