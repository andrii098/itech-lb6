let authors = localStorage.getItem('author');
document.getElementsByTagName("h1")[0]
	.innerHTML = "Литература автора/авторов " + authors;

initAll(authors, 'authors=' + authors);
