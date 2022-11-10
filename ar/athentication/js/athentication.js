// athentication.js

let inputs = document.querySelectorAll(
	"form input[type=text],form input[type=password]"
);

function addError(input, lbl, text) {
	let error = document.createElement("div");
	error.className = "error";
	error.style.fontSize = "0.75rem";
	error.style.color = "red";
	error.style.marginBottom = "1rem";

	input.style.borderColor = "red";
	lbl.style.color = "red";
	error.append(text);

	let childError;
	if ((childError = input.parentElement.querySelector(".error")))
		input.parentElement.replaceChild(error, childError);
	else input.parentElement.appendChild(error);
}

function removeErrors(input, lbl) {
	input.removeAttribute("style");
	lbl.removeAttribute("style");

	if ((childError = input.parentElement.querySelector(".error")))
		input.parentElement.removeChild(childError);
}

function isTypeKey(code) {
	return !(
		(code !== 8 && code !== 13 && code < 46) ||
		code === 93 ||
		(code <= 123 && code >= 112) ||
		code === 144 ||
		code === 145
	);
}

for (let input of inputs) {
	let lbl = input.parentElement.querySelector(".lbl");

	if (input.getAttribute("type") === "text") {
		input.addEventListener("keyup", (e) => {
			if (isTypeKey(e.keyCode)) {
				if (input.value === "")
					addError(input, lbl, "رقم المستخدم مطلوب*");
				else if (input.value.length !== 9)
					addError(
						input,
						lbl,
						"رقم المستخدم يجب ان يتكون من 9 ارقام"
					);
				else removeErrors(input, lbl);
			}
		});

		input.onfocus = function () {
			lbl.className += " focused";
		};

		input.onblur = function () {
			if (input.value === "") {
				addError(input, lbl, "رقم المستخدم مطلوب*");
				lbl.className = "lbl trans-100";
			}
		};
	} else {
		caps = input.parentElement.querySelector("kbd");

		window.addEventListener("keyup", checkCapsLock);

		function checkCapsLock(event) {
			if (event.code === "CapsLock") {
				let isCapsLockOn = event.getModifierState("CapsLock");
				if (isCapsLockOn) {
					caps.style.opacity = "100%";
					input.style.paddingLeft = "4.5rem";
				} else {
					caps.style.opacity = "0%";
					input.style.paddingLeft = "1rem";
				}
			}
		}

		input.addEventListener("keyup", (e) => {
			if (isTypeKey(e.keyCode)) {
				if (input.value === "")
					addError(input, lbl, "كلمة المرور مطلوبة*");
				else removeErrors(input, lbl);
			}
		});

		input.onfocus = function () {
			lbl.className += " focused";
			caps.style.visibility = "visible";
		};

		input.onblur = function () {
			caps.style.visibility = "hidden";

			if (input.value === "") {
				lbl.className = "lbl trans-100";
				addError(input, lbl, "كلمة المرور مطلوبة*");
			}
		};
	}
}
