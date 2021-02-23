let s = "Bière"


var req = 
        "select distinct * where {     \
            ?s rdfs:label '"+s+"'@fr.  \
            ?s dbo:abstract ?w.        \
            ?s dbo:thumbnail ?t.       \
            FILTER (lang(?w) = 'fr').  \
            } limit 100";
req = encodeURI(req);


$.get("http://dbpedia.org/sparql" + "?type=json" + "&query=" + req, 
        { },
        (data) => {
            let img = (data.results.bindings[0].t.value)
            let abstract = (data.results.bindings[0].w.value)

            document.querySelector("#abstract").innerHTML = abstract
            document.querySelector("#illus").src = img
        },
        "JSON")