function initInput(key) {
	let input = document.getElementById(key);
	let savedVal = localStorage.getItem(key);
	if (savedVal) {
		input.value = savedVal;
	} else {
		localStorage.setItem(key, input.value);
	}
	input.key = key;
	input.onchange = function() {
		localStorage.setItem(this.key, this.value);
	}	
}

initInput("publisher");
initInput("from");
initInput("to");
initInput("author");