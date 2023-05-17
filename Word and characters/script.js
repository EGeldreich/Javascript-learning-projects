const statWordsEl = document.querySelector('.stat__number--words');
const statCharactersEl = document.querySelector('.stat__number--characters');
const statTwitterEl = document.querySelector('.stat__number--twitter');
const statFacebookEl = document.querySelector('.stat__number--facebook');
const textareaEl = document.querySelector('.textarea');

function inputHandler () {
    if (textareaEl.value.includes('<script>')){
        alert('You can\'t use <script> in your text ;)');
       textareaEl.value = textareaEl.value.replace('<script>','');
    }
    const numberOfCharacters = textareaEl.value.length;
    let numberOfWords = textareaEl.value.split("\n").length+textareaEl.value.split(" ").length-1;
    // ^ it's ugly but it works and I can't find the "space OR newline" on the .split
    // Tried " |\n" 
    if(textareaEl.value.length === 0){
        numberOfWords = 0;
    }
    if (numberOfCharacters>280) {
        statTwitterEl.classList.add('stat__number--limit');
    } else {
        statTwitterEl.classList.remove('stat__number--limit');
    }

    if (numberOfCharacters>2200) {
        statFacebookEl.classList.add('stat__number--limit');
    } else {
        statFacebookEl.classList.remove('stat__number--limit');
    }
    statWordsEl.textContent = numberOfWords;
    statCharactersEl.textContent = numberOfCharacters;
    statTwitterEl.textContent = 280 - numberOfCharacters;
    statFacebookEl.textContent = 2200 - numberOfCharacters;
}

textareaEl.addEventListener('input', inputHandler);



