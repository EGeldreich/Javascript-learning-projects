

const increaseButtonEl= document.querySelector('.counter__button--increase');
const decreaseButtonEl= document.querySelector('.counter__button--decrease');
const counterValueEl= document.querySelector('.counter__value');
const resetButtonEl= document.querySelector('.counter__reset-button');
let currentValue = 0;


function increase(){
    currentValue++;
    counterValueEl.textContent = currentValue;
    decreaseButtonEl.classList.remove("counter__button--decrease--zero");
}
function decrease(){
    if (currentValue >=1) {
        currentValue--;
        counterValueEl.textContent = currentValue;
        decreaseButtonEl.classList.add("counter__button--decrease--zero");
    } else {
    }
}
function reset(){
    currentValue = 0;
    counterValueEl.textContent = currentValue;
    decreaseButtonEl.classList.add("counter__button--decrease--zero");
}

resetButtonEl.addEventListener('click', reset);
increaseButtonEl.addEventListener('click', increase);
decreaseButtonEl.addEventListener('click', decrease);

