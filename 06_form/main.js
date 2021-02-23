document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form")

    for(let div of form.querySelectorAll("div")) {

        //------------- RADIOS ---------------- \\

        let radios = div.querySelectorAll("input[type=radio]")

        if(radios.length == 2) {
            
            let labels = div.querySelectorAll("label")
            let values = { }

            for(let i in radios) {
                if(radios[i].classList){
                    radios[i].classList.add("hide")
                    labels[i].classList.add("hide")
                    values[radios[i].value] = labels[i].innerText
                }
            }

            _("span", div, labels[0].innerText, null, "souitchLabel")
            const souitch = _("span", div, null, null, "souitch")
            const ball = _("span", souitch, null, null, "ball")
            _("span", div, labels[1].innerText, null, "souitchLabel")
            souitch.addEventListener("click", () => {
                ball.classList.toggle("clicked")

                if(ball.classList.contains("clicked")) {
                    radios[1].checked = true
                    radios[0].checked = false
                } else {
                    radios[1].checked = false
                    radios[0].checked = true
                }
            })
        }

        //------------- LIST -------------- \\
        let select = div.querySelector("select")

        if (select) {
            let values = Array.from(select.querySelectorAll("option")).map(option => option.value)
            select.classList.add("hide")
            const label = div.querySelector("label")

            let selectAccess = _("span", label, null, null, "selectAccess")

            for(let value of values) {
                let valueElement = _("span", selectAccess, value, null, "valueElement")
            }
        }

    }

})



//------------------------------------------------------

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