let inputs = document.querySelectorAll(
	"form input[type=text],form input[type=password]"
);

for (let input of inputs) {
	let lbl = input.parentElement.querySelector(".lbl");

	input.onfocus = function () {
		lbl.className += " focused";
	};

	if (input.getAttribute("type") === "text") {
		input.onblur = function () {
			let error = document.createElement("div");
			error.style.fontSize = "0.75rem";
			error.style.color = "red";
			error.style.marginBottom = "1rem";

			if (input.value === "") {
				lbl.className = "lbl trans-100";
				input.style.borderColor = "red";
				lbl.style.color = "red";
				error.append(document.createTextNode("User ID is required*"));
				if (input.parentElement.children.length === 3)
					input.parentElement.replaceChild(
						error,
						input.parentElement.lastChild
					);
				else input.parentElement.appendChild(error);
			} else if (input.value.length !== 9) {
				input.style.borderColor = "red";
				lbl.style.color = "red";
				error.append(
					document.createTextNode("User ID should be 9 numbers")
				);
				if (input.parentElement.children.length === 3)
					input.parentElement.replaceChild(
						error,
						input.parentElement.lastChild
					);
				else input.parentElement.appendChild(error);
			} else {
				input.removeAttribute("style");
				lbl.removeAttribute("style");
				if (input.parentElement.children.length === 3)
					input.parentElement.removeChild(
						input.parentElement.lastChild
					);
			}
		};
	} else {
		input.onblur = function () {
			let error = document.createElement("div");
			error.style.fontSize = "0.75rem";
			error.style.color = "red";
			error.style.marginBottom = "1rem";

			if (input.value === "") {
				lbl.className = "lbl trans-100";
				input.style.borderColor = "red";
				lbl.style.color = "red";
				error.append(document.createTextNode("Password is required*"));
				if (input.parentElement.children.length === 3)
					input.parentElement.replaceChild(
						error,
						input.parentElement.lastChild
					);
				else input.parentElement.appendChild(error);
			} else {
				input.removeAttribute("style");
				lbl.removeAttribute("style");
				if (input.parentElement.children.length === 3)
					input.parentElement.removeChild(
						input.parentElement.lastChild
					);
			}
		};
	}
}

let themeChagner = document.getElementById("theme_changer");
let theme = document.getElementById("theme");
let logo = document.getElementById("logo");

themeChagner.onclick = function () {
	if (theme.getAttribute("href") === "css/root.css")
		theme.setAttribute("href", "css/root-dark.css");
	else if (theme.getAttribute("href") === "css/root-dark.css")
		theme.setAttribute("href", "css/root.css");

	if (logo.getAttribute("src") === "imgs/logo.png")
		logo.setAttribute("src", "imgs/logo-dark.png");
	else if (logo.getAttribute("src") === "imgs/logo-dark.png")
		logo.setAttribute("src", "imgs/logo.png");
};
