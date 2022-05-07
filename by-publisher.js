let publisher = localStorage.getItem('publisher');
document.getElementsByTagName("h1")[0]
	.innerHTML = "Литература издателя " + publisher;

initAll(publisher, "publisher=" + publisher);
