const testButton = document.querySelector("#myButton");
const addButton = document.querySelector('#myButton1');
const deleteButton = document.querySelector('#myButton2');
const par = document.querySelector('p');
const checkbox = document.querySelector('#myCheckbox');

let counter = 0;

function increment(){
	counter += 1;
	par.innerText = "Counter: " + counter;
}

function greet(){
	alert("Powitanie z drugiej funkcji!");
}

par.innerText = 'Counter: ' + counter;

addButton.addEventListener('click', ()=>{
	testButton.addEventListener('click', increment);
})

deleteButton.addEventListener('click', ()=>{
	testButton.removeEventListener('click', increment);
	counter = 0;
	par.innerText = 'Counter: ' + counter;
})

checkbox.addEventListener('change', ()=>{
	if(checkbox.checked){
		addButton.addEventListener('click', greet);
	} else {
		addButton.removeEventListener('click', greet);
	}
})