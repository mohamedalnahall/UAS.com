let sliders = document.querySelectorAll("slider");

for (let slider of sliders) {
	let n = +slider.getAttribute("n");
	slider.querySelector("slider > div:nth-child(4)").style.width =
		n * 0.75 + n - 1 + "rem";
	let curr = +slider.getAttribute("curr");
	let content = slider.querySelector("slider > div:first-child");
	content.style.width = n * 100 + "%";
	content.style.right = curr * -100 + "%";
	let rightArrow = slider.querySelector("slider > div:nth-child(2)");
	let leftArrow = slider.querySelector("slider > div:nth-child(3)");
	let dots = slider.querySelectorAll("slider > div:nth-child(4) > div");
	let currDot = slider.querySelector(
		"slider > div:nth-child(4) > div:last-child"
	);

	function updateContent() {
		content.style.right = curr * -100 + "%";
		let exCurr = parseFloat(currDot.style.right) / 1.75;
		if (curr > exCurr) {
			currDot.style.width = 0.75 + (curr - exCurr) * 1.75 + "rem";
			setTimeout(() => {
				currDot.style.right = curr * 1.75 + "rem";
				currDot.style.width = 0.75 + "rem";
			}, 200);
		} else {
			currDot.style.right = curr * 1.75 + "rem";
			currDot.style.width = 0.75 + (exCurr - curr) * 1.75 + "rem";
			setTimeout(() => {
				currDot.style.width = 0.75 + "rem";
			}, 200);
		}
		slider.setAttribute("curr", curr);
	}

	function forward() {
		if (curr < n - 1) curr += 1;
		else curr = 0;
		updateContent();
	}

	function backward() {
		if (curr > 0) curr -= 1;
		else curr = n - 1;
		updateContent();
	}

	let pause = false;
	let pauseFreed;
	setInterval(function () {
		if (!pause) {
			forward();
		}
	}, 3000);

	leftArrow.onclick = function (e) {
		e.preventDefault();
		pause = true;
		clearTimeout(pauseFreed);
		pauseFreed = setTimeout(() => {
			pause = false;
		}, 3000);
		forward();
	};

	rightArrow.onclick = function (e) {
		e.preventDefault();
		pause = true;
		clearTimeout(pauseFreed);
		pauseFreed = setTimeout(() => {
			pause = false;
		}, 3000);
		backward();
	};

	for (let i = 0; i < dots.length - 1; i++) {
		dots[i].onclick = function (e) {
			e.preventDefault();
			pause = true;
			clearTimeout(pauseFreed);
			pauseFreed = setTimeout(() => {
				pause = false;
			}, 3000);
			curr = i;
			updateContent();
		};
	}

	content.ontouchstart = function (e) {
		pause = true;
		clearTimeout(pauseFreed);
		let prevX = e.touches[0].clientX;
		let prevRight = parseFloat(content.style.right);
		content.style.transition = "none";
		slider.ontouchmove = function (e) {
			let newRight =
				prevRight + ((prevX - e.touches[0].clientX) * 100) / getWidth();
			if (newRight < 0 && newRight > (n - 1) * -100) {
				content.style.right = newRight + "%";
			}
		};
		document.ontouchend = function (e) {
			content.style.removeProperty("transition");
			let right = parseFloat(content.style.right) / 100;
			if (right < -curr) {
				if (right % 1 < -0.2) right = Math.floor(right);
				else right = Math.ceil(right);
			} else {
				if (right % 1 > -0.8) right = Math.ceil(right);
				else right = Math.floor(right);
			}
			curr = -right;
			content.style.right = right * 100 + "%";
			clearTimeout(pauseFreed);
			pauseFreed = setTimeout(() => {
				pause = false;
			}, 3000);
			slider.ontouchmove = null;
			document.ontouchend = null;
			updateContent();
		};
	};

	function keyMover(e) {
		e.preventDefault();
		pause = true;
		clearTimeout(pauseFreed);
		pauseFreed = setTimeout(() => {
			pause = false;
		}, 3000);
		if (e.keyCode === 37) forward();
		else if (e.keyCode === 39) backward();
	}

	document.addEventListener("keyup", keyMover);

	document.addEventListener("scroll", (e) => {
		e.preventDefault();
		if (document.documentElement.scrollTop > slider.clientHeight / 2) {
			document.removeEventListener("keyup", keyMover);
			clearTimeout(pauseFreed);
			pause = true;
		} else {
			document.addEventListener("keyup", keyMover);
			pause = false;
		}
	});
}

function getWidth() {
	return Math.max(
		document.body.scrollWidth,
		document.documentElement.scrollWidth,
		document.body.offsetWidth,
		document.documentElement.offsetWidth,
		document.documentElement.clientWidth
	);
}
