document.addEventListener("DOMContentLoaded", () => {

// ========================================================================== VARS
    const body = document.querySelector("body")

// ========================================================================== FCTS
    function displayBeer (beer,i) {
        
        let article = _("article", section)
        _("h2", article, beer.name)
        _("h2", article, "Couleur :"+beer.color)
        
        let delButton = _("button", article, "X", null, "delButton")
        delButton.addEventListener("click", () => {
            fetch("services.php?action=delete&id="+beer.id).then((response) => {
                return response.json()
            }).then((data) => {
                if (data.success)
                    article.remove()
            })
            article.remove()
        })
        }

    function ajax(url,params) {
        let parametrizedUrl = url+"?"
       
        for ( const [k,v] of Object.entries(params)) { 
            parametrizedUrl += k+"="+v+"&"
        }
        return fetch(parametrizedUrl).then((response) => {
            return response.json()
        })
    }

// ========================================================================== ACTIONS

    let header = _("header", body)
    _("h1", header, "Les bières du lundi matin")
    let section = _("section",body)

    
    // fetch("services.php?action=list").then((response) => {
    //     return response.json()
    // }).then((beers) => {
    //     beers.forEach(displayBeer)
    // })

    ajax("services.php", {action :"list" }).then((beers) => {
        beers.forEach(displayBeer)
    }) 


    let formDiv = _("div", body, null, "formDiv")

    let p = _("p", formDiv)
    _("span", p, "Nom")
    let nameInput = _("input", p)

    p = _("p", formDiv)
    _("span", p, "Couleur")
    let colorInput = _("input", p)

    p = _("p", formDiv)
    let addButton = _("button", p, "Ajouter")
    addButton.addEventListener("click", () => {
        // fetch("services.php?action=add&name="+nameInput.value+"&color="+colorInput.value)
        // .then((response) => {
        //     return response.json()
        // }).then((data) => {
        //     displayBeer(data.object)
        // })
        ajax("services.php", {action:"add", name:nameInput.value, color: colorInput.value })
        .then ((data) => {
            displayBeer(data.object)
        })
    })

})

// Fonction de factorisatoin de la création d'éléments DOM

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

