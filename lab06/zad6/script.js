const input = document.querySelector("input")
const checks = document.querySelectorAll(".check")
const visibilityButton = document.querySelector('.image')

input.addEventListener("input", handleInput)

let conditionsMet = [0,0,0,0,0,0]
let sum = 0

function handleInput(event){
    const value = event.target.value

    // warunki
    if(value.length >= 8){
        checks[0].style.backgroundImage = "url('ok.png')"
		conditionsMet[0] = 1
    }else{
        checks[0].style.backgroundImage = "url('wrong.png')"
		conditionsMet[0] = 0
    }

    if(value.match(/[0-9]/)){
        checks[1].style.backgroundImage = "url('ok.png')"
		conditionsMet[1] = 1
    }else{
        checks[1].style.backgroundImage = "url('wrong.png')"
		conditionsMet[1] = 0
    }

    if(value.match(/[A-Z]/)){
        checks[2].style.backgroundImage = "url('ok.png')"
		conditionsMet[2] = 1
    }else{
        checks[2].style.backgroundImage = "url('wrong.png')"
		conditionsMet[2] = 0
    }

    if(value.match(/[^\w\s]/)){
        checks[3].style.backgroundImage = "url('ok.png')"
		conditionsMet[3] = 1
    }else{
        checks[3].style.backgroundImage = "url('wrong.png')"
		conditionsMet[3] = 0
    }

    if(!value.match(/(.)\1{2}/)){
        checks[4].style.backgroundImage = "url('ok.png')"
		conditionsMet[4] = 1
    }else{
        checks[4].style.backgroundImage = "url('wrong.png')"
		conditionsMet[4] = 0
    }

    if(!hasConsecutiveChars(value)){  
        checks[5].style.backgroundImage = "url('ok.png')"
		conditionsMet[5] = 1
    }else{
        checks[5].style.backgroundImage = "url('wrong.png')"
		conditionsMet[5] = 0
    }

	sum = 0;
	conditionsMet.forEach(cond => sum += cond);
	console.log(sum);

	document.documentElement.style.setProperty('--blur', `blur(${12 - sum*2}px)`);
}


visibilityButton.addEventListener('click', () => {
	if(input.type === "password"){
		input.type = "text"
		visibilityButton.style.backgroundImage = "url('eye_open.png')"
	}else{
		input.type = "password"
		visibilityButton.style.backgroundImage = "url('eye_closed.png')"
	}
})

function hasConsecutiveChars(str){
    for (let i = 0; i < str.length - 1; i++) {
        const char1 = str[i].toLowerCase();
        const char2 = str[i+1].toLowerCase();
        if (char1.match(/[a-z]/) && char2.match(/[a-z]/)) {
            if (char1.charCodeAt(0) + 1 === char2.charCodeAt(0)) {
                return true;  // Znaleziono dwie kolejne litery
            }
        }
    }
    return false;  
}