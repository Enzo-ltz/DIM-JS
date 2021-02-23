
document.addEventListener("DOMContentLoaded", () => {

	const ul = document.querySelector("ul")
	const form = document.querySelector("#addform")

	fetch("/list")
		.then((res) => res.json() )
		.then((list) => {
			for(let stuff of list)
				display(stuff)
		})



	form.querySelector("button").addEventListener("click", () => {
		let name = form.querySelector("input[name=name]").value
		let quantity = form.querySelector("input[name=quantity]").value

		let data = {
			name: name,
			quantity: quantity
		}

		fetch("/add", {
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify(data)
		})
		.then((response) => response.json())
		.then((stuff) => {
			display(stuff)
			console.log(stuff)
		})

		// fetch("/add?name="+name+"&quantity="+quantity)
		// 	.then((response) => response.json() )
		// 	.then((stuff) => {
		// 		display(stuff)
		// 		console.log(stuff)
		// 	})
	})


	// fetch("/blabla")
	// 	.then((res) => res.text() )
	// 	.then((bla) => {
	// 		document.querySelector("body").innerHTML += bla
	// 	})

	let s = _("script", document.querySelector("body"))
	s.src = "/js/test.js"


	function display(stuff) {
		_("li", ul, stuff.name + 
	        " (" + stuff.quantity + ")")
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
