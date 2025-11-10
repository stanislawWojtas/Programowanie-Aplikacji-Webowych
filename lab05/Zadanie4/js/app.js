const list = document.querySelector('ul');
const form = document.querySelector('form');
const deleteButton = document.querySelector('.delete');

deleteButton.addEventListener('click', ()=> {
	if(list.firstElementChild){
		list.removeChild(list.firstElementChild);
	}else{
		alert("Brak elementów do usunięcia");
	}
})

form.addEventListener('submit', (e)=> {
	const li = document.createElement('li');
	li.textContent = `Imię: ${form.name.value}, Wiek: ${form.age.value}`;
	list.appendChild(li);
	e.preventDefault();
});