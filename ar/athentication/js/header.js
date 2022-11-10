let container = document.querySelector(".container");

// header_1.js
let themeChangers = document.querySelectorAll("theme_changer");
let logo = document.getElementById("logo").firstElementChild;

for (let themeChanger of themeChangers) {
	themeChanger.onclick = function (e) {
		e.preventDefault();
		if (document.body.getAttribute("data-theme") === "light") {
			document.body.setAttribute("data-theme", "dark");
		} else {
			document.body.setAttribute("data-theme", "light");
		}

		if (logo.getAttribute("src") === "imgs/logo2.png") {
			logo.setAttribute("src", "imgs/logo2-dark.png");
		} else if (logo.getAttribute("src") === "imgs/logo2-dark.png") {
			logo.setAttribute("src", "imgs/logo2.png");
		}
	};
}

let menu_bar = document.getElementById("menu_bar");
let menu = document.getElementById("menu");
let menuNavs = menu.querySelectorAll("#menu > nav > div");
let out_menu = document.getElementById("out_menu");
let exit_menu = document.getElementById("exit_menu");

menu_bar.onclick = function (e) {
	e.preventDefault();
	menu.style.left = "0";
	let spans = menu_bar.querySelectorAll("span");
	for (let span of spans) {
		span.style.marginRight = "0";
	}
	out_menu.style.display = "block";
};

let exitMenuActions = function () {
	menu.style.left = "-20rem";
	out_menu.style.display = "none";
	menu_bar.removeAttribute("style");
	let spans = menu_bar.querySelectorAll("span");
	for (let span of spans) {
		span.removeAttribute("style");
	}
};

out_menu.onclick = function (e) {
	e.preventDefault();
	exitMenuActions();
};

exit_menu.onclick = function (e) {
	e.preventDefault();
	exitMenuActions();
};

//header_2.js
let topTask = document.querySelector("topTask");
let extendables = topTask.querySelectorAll(".extendable");

let exTimeout, exID;

let slist = {};

function addList(i) {
	extendables[i].style.boxShadow = "0 0 0.5rem 0.1rem var(--light-shadow)";
	extendables[i].style.borderBottomLeftRadius = "0.625rem";
	extendables[i].style.borderBottomRightRadius = "0.625rem";
	slist[i].style.display = "block";
	slist[i].style.opacity = "1";
}

function removeList(i) {
	extendables[i].removeAttribute("style");
	slist[i].style.opacity = "0";
	slist[i].style.display = "none";
}

for (let i = 0; i < extendables.length; i++) {
	slist[i] = extendables[i].querySelector(".slist");

	extendables[i].onmouseenter = function () {
		addList(i);
	};

	extendables[i].onmousedown = function () {
		addList(i);
	};

	extendables[i].onmouseleave = function () {
		removeList(i);
	};
}

window.addEventListener("resize", (e) => {
	e.preventDefault();
	topTask.style.top =
		(PxToRem(-topTask.clientHeight) + 0.5).toString() + "rem";
	topTask.querySelector("theme_changer").style.height =
		(PxToRem(+topTask.clientHeight) - 0.6).toString() + "rem";
});

let header = document.querySelector("header");

document.addEventListener("scroll", (e) => {
	e.preventDefault();
	if (document.documentElement.scrollTop > 54) {
		header.style.boxShadow = "0 0 0.5rem 0.25rem var(--shadow)";
		topTask.querySelector(
			"topTask > .container > div:last-child"
		).style.top = "0";
	} else {
		header.style.boxShadow = "0 0 0.5rem 0.1rem var(--light-shadow)";
		topTask
			.querySelector("topTask > .container > div:last-child")
			.removeAttribute("style");
	}
});

topTask.onmouseenter = function (e) {
	e.preventDefault();
	header.style.top = PxToRem(+topTask.clientHeight - 1).toString() + "rem";
	topTask.style.top = "0";
	topTask.querySelector("theme_changer").style.height =
		(PxToRem(+topTask.clientHeight) + 0.1).toString() + "rem";
};

topTask.onmouseleave = function (e) {
	e.preventDefault();
	header.style.top = "0.5rem";
	topTask.style.top =
		(PxToRem(-topTask.clientHeight) + 0.5).toString() + "rem";
	topTask.querySelector("theme_changer").style.height =
		(PxToRem(+topTask.clientHeight) - 0.6).toString() + "rem";
};

let navs = header.querySelectorAll(".container > nav:first-of-type > a");
let pop = header.querySelector(".pop");

let idTimeout, navID;

function showPopActions(i) {
	clearInterval(idTimeout);
	navs[i].style.color = "var(--blue)";
	header.style.height = "22.0625rem";
}

function exitPopActions(i) {
	navs[i].removeAttribute("style");
	header.style.height = "7.5625rem";
	idTimeout = setTimeout(() => {
		pop.innerHTML = "";
	}, 200);
}
for (let i = 0; i < navs.length; i++) {
	navs[i].onmouseenter = function (e) {
		e.preventDefault();
		showPopActions(i);
		pop.innerHTML = navs[i].getAttribute("inner");
	};

	navs[i].onmouseleave = function (e) {
		e.preventDefault();
		navID = i;
		exitPopActions(i);
	};
}

pop.onmouseenter = function (e) {
	e.preventDefault();
	showPopActions(navID);
};

pop.onmouseleave = function (e) {
	e.preventDefault();
	exitPopActions(navID);
};

for (let i = 0; i < menuNavs.length; i++) {
	let head = menuNavs[i].querySelector(
		"#menu > nav > div > div:first-child "
	);
	head.onclick = function (e) {
		let cont = menuNavs[i].querySelector(
			"#menu > nav > div > div:last-child"
		);
		if (cont.innerHTML === "") {
			cont.innerHTML = navs[i].getAttribute("inner");
			cont.style.height = cont.getAttribute("h");
			head.querySelector(
				"#menu > nav > div > div:first-child > div:last-child > arrow"
			).style.transform = "rotate(225deg)";
			for (let j = 0; j < menuNavs.length; j++) {
				if (j != i) {
					let temp = menuNavs[j].querySelector(
						"#menu > nav > div > div:last-child"
					);
					menuNavs[j].querySelector(
						"#menu > nav > div > div:first-child > div:last-child > arrow"
					).style.transform = "rotate(45deg)";
					temp.innerHTML = "";
					temp.style.height = "0";
				}
			}
		} else {
			head.querySelector(
				"#menu > nav > div > div:first-child > div:last-child > arrow"
			).style.transform = "rotate(45deg)";
			cont.style.height = "0";
			cont.innerHTML = "";
		}
	};
}

// search
let id;
let searchInput = document.querySelectorAll("searchField > input");

let searchHF = header.querySelector(".container > searchField");
let searchMF = document.querySelector("#menu > searchField");

searchHF.onmousedown = function (e) {
	e.preventDefault();
	searchHF.style.width = PxToRem(container.clientWidth - 218.6) + "rem";
	searchHF.querySelector("input").style.width = "100%";
	searchHF.querySelector("input").style.paddingRight = "3rem";
	setTimeout(() => {
		searchHF.querySelector("input").focus();
	}, 0);
	id = setTimeout(() => {
		header.querySelector(".container > nav:first-of-type").style.display =
			"none";
	}, 200);
};
searchMF.onmousedown = function (e) {
	e.preventDefault();
	setTimeout(() => {
		searchMF.querySelector("input").focus();
	}, 0);
};

searchHF.querySelector("searchField > div").onclick = function (e) {
	e.preventDefault();
	searchHF.querySelector("searchField > input").value = "";
};
searchMF.querySelector("searchField > div").onclick = function (e) {
	e.preventDefault();
	searchMF.querySelector("searchField > input").value = "";
};

searchHF.querySelector("searchField > input").onblur = function (e) {
	e.preventDefault();
	searchHF.querySelector("searchField > input").value = "";
	searchHF.removeAttribute("style");
	searchHF.querySelector("searchField > input").removeAttribute("style");
	setTimeout(() => {
		searchHF.querySelector("searchField > input").blur();
	}, 0);
	clearTimeout(id);
	header
		.querySelector(".container > nav:first-of-type")
		.removeAttribute("style");
};

menu.querySelector("#menu > searchField").onblur = function (e) {
	e.preventDefault();
	menu.querySelector("#menu > searchField").querySelector("input").value = "";
};

window.addEventListener("resize", (e) => {
	e.preventDefault();
	searchHF.querySelector("input").blur();
});
// search

function RemToPx(rem) {
	return (
		rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
	);
}

function PxToRem(px) {
	return px / parseFloat(getComputedStyle(document.documentElement).fontSize);
}
