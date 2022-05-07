let from = localStorage.getItem('from');
let to = localStorage.getItem('to');
document.getElementsByTagName("h1")[0]
	.innerHTML = "Литература за период с " + from + " по " + to;

initAll(from + ' ' + to, "from=" + from + "&to=" + to);
