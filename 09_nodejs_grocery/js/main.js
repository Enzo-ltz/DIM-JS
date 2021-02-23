document.addEventListener("DOMContentLoaded", () => {

    const ul = document.querySelector("ul")
    const form = document.querySelector("#addForm")

    fetch("/list")
        .then((res) => res.json())
        .then((list) => {
            for  (let stuff of list) {
               display(stuff)
            }
        })

    form.querySelector("button").addEventListener("click", () => {
        let name = form.querySelector("input[name=name]").value
        let quantity = form.querySelector("input[name=quantity]").value
        fetch("/add?name="+name+"&quantity="+quantity)
            .then((res) => res.json())
            .then(() => {
                display({ name: name, quantity: quantity})
                console.log("aded")
            })
    })

    function display(stuff) {
        _("li", ul, stuff.name + '( ' + stuff.quantity + ' )')
    }
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