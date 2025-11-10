const button = document.querySelector('button');
const nameSpan = document.querySelector('.name');

function askName() {
	const name = prompt("Jak masz na imię?");

	if (name) {
		nameSpan.textContent = "Witaj " + name;
	} else {
		nameSpan.textContent = "Witaj " + "Nieznajomy";
	}
}

button.addEventListener('click', askName);