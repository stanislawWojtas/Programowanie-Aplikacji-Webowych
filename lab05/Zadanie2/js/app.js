// write code to show or hide ( depends on current state) context message block when you click button

const button = document.querySelector('#button');;
const messageBlock = document.querySelector('.hide');

button.addEventListener("click", () => {
	messageBlock.classList.toggle('hide');
})