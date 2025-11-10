const button = document.querySelector('#button');
const photo = document.querySelector('.image1');
const images = ['1.jpg', '2.jpg', '3.jpg'];

let currIndex = 0;

button.addEventListener('click', () => {
	currIndex = (currIndex +1) % 3;
	photo.src = images[currIndex];
});