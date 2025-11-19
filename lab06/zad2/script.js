const plus1 = document.querySelector('#point1');
const plus2 = document.querySelector('#point2');
const plus5 = document.querySelector('#point3');
const counter = document.querySelector('#counter');
const logList = document.querySelector('#logs');
const clearLog = document.querySelector('#clear-log');
const resetButton = document.querySelector('#reset');

// Flagi blokujące propagacje
let stopPropagation = false;

const stopPropagationButton = document.querySelector('#stop-propagation');

let score = 0;
counter.textContent = "Score: " + score;

function updateCounter(clickedElement) {
    counter.textContent = "Score: " + score;
    checkSum();
	updateLog(clickedElement);
}

function checkSum() {
    if (score >= 20) {
        plus5.removeEventListener('click', handlePlus5);
        plus5.style.display = 'none';
        plus3Locked = true;
    }
    if (score >= 30) {
        plus2.removeEventListener('click', handlePlus2);
        plus2.style.display = 'none';
        plus2Locked = true;
    }
    if(score >= 50){
        plus1.removeEventListener('click', handlePlus1);
        plus1.style.display = 'none';
        plus1Locked = true;
    }
}

function updateLog(clickedElement) {
    let color, value;

    if (clickedElement === plus1) {
        color = "niebieski";
        value = 1;
    } else if (clickedElement === plus2) {
        color = "czerwony";
        value = 2;
    } else if (clickedElement === plus5) {
        color = "żółty";
        value = 5;
    } else {
        logList.innerHTML += "<br>Nieznany element kliknięty<br>";
        return;
    }

    logList.innerHTML += `<br>Naciśnięto ${color} o wartości ${value}<br>`;
}


function handlePlus1(e) {
    score += 1;
    updateCounter(plus1);
}

function handlePlus2(e) {
    if (stopPropagation) e.stopPropagation();
    score += 2;
    updateCounter(plus2);
}

function handlePlus5(e) {
    if (stopPropagation) e.stopPropagation();
    score += 5;
    updateCounter(plus5);
}

plus1.addEventListener('click', handlePlus1);
plus2.addEventListener('click', handlePlus2);
plus5.addEventListener('click', handlePlus5);
clearLog.addEventListener('click', function() {
    logList.innerHTML = "";
});
resetButton.addEventListener('click', function() {
    score = 0;
    counter.textContent = "Score: " + score;
    plus2.addEventListener('click', handlePlus2);
    plus5.addEventListener('click', handlePlus5);
    plus2.style.display = 'block';
    plus5.style.display = 'block';
    plus1.style.display = 'block';
});
stopPropagationButton.addEventListener('click', function() {
    stopPropagation = !stopPropagation;
    stopPropagationButton.textContent = stopPropagation ? "Start Propagation" : "Stop Propagation";
});