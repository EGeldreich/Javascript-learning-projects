// -- SELECTORS -- //
const MAX_CHARS = 150;
const BASE_API_URL = 'https://bytegrad.com/course-assets/js/1/api';

const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.form');
const feedbackListEl = document.querySelector('.feedbacks');
const submitBtnEl = document.querySelector('.submit-btn');
const spinnerEl = document.querySelector('.spinner');
const hashtagsListEl = document.querySelector('.hashtags');

// -- GLOBAL -- //

const renderFeedbackItem = feedbackItem => {
    const feedbackItemHTML = `
         <li class="feedback">
            <button class="upvote">
                <i class="fa-solid fa-caret-up upvote__icon"></i>
                <span class="upvote__count">${feedbackItem.upvoteCount}</span>
            </button>
            <section class="feedback__badge">
                <p class="feedback__letter">${feedbackItem.badgeLetter}</p>
            </section>
            <div class="feedback__content">
                <p class="feedback__company">${feedbackItem.company}</p>
                <p class="feedback__text">${feedbackItem.text}</p>
            </div>
            <p class="feedback__date">${feedbackItem.daysAgo === 0 ? 'NEW' : `${feedbackItem.daysAgo}d`}</p>
        </li>
    `;
    feedbackListEl.insertAdjacentHTML('beforeend',feedbackItemHTML);
};

// -- COUNTER COMPONENT-- //

const inputHandler = () => {
    const numberOfCharacters = textareaEl.value.length;
    counterEl.textContent = MAX_CHARS-numberOfCharacters;
};
textareaEl.addEventListener('input', inputHandler);

// -- FORM COMPONENT -- //

const formVisualIndicator = className => {
    formEl.classList.add(className);
        setTimeout(() => {
            formEl.classList.remove(className);
        }, 1000);
};

const submitHandler = event => {
    event.preventDefault(); // prevent default browser action
    const text = textareaEl.value

    if (text.includes(' #') && text.length > 14) {
        formVisualIndicator('form--valid');
    } else {
        formVisualIndicator('form--invalid');
        textareaEl.focus();
        return;
    }
    const hashtag = text.split(' ').find(word => word.includes('#'));
    const company = hashtag.substring(1);
    // const company = hashtag.replace('#', ''); solution perso moins optimale
    const badgeLetter = company.substring(0, 1).toUpperCase();
    const upvoteCount = 0;
    const daysAgo = 0;
    const feedbackItem = {
        hashtag,
        company,
        badgeLetter,
        upvoteCount,
        daysAgo,
        text
    };
    renderFeedbackItem(feedbackItem);

    // POST request
    fetch(`${BASE_API_URL}/feedbacks`, {
        method : 'POST',
        body: JSON.stringify(feedbackItem),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (!response.ok) {
            console.log('Something went wrong!');
            return;
        }
        console.log('Successfully submitted!');
    }).catch(error => console.log('error'));

    // CLEANING UP
    textareaEl.value = '';
    submitBtnEl.blur();
    counterEl.textContent= MAX_CHARS;

};

formEl.addEventListener('submit', submitHandler);

// -- FEEDBACK LIST COMPONENT -- //

const clickHandler = event => {
    const clickedEl = event.target;
    const upvoteIntention = clickedEl.className.includes('upvote');
    
    if (upvoteIntention) {
        const upvoteBtnEl = clickedEl.closest('.upvote');
        upvoteBtnEl.disabled = true;

        const upvoteCountEl = upvoteBtnEl.querySelector('.upvote__count');
        let upvoteCount = +upvoteCountEl.textContent;
        
        upvoteCountEl.textContent = ++upvoteCount;
    } else {
        clickedEl.closest('.feedback').classList.toggle('feedback--expand');
    }
    
};

feedbackListEl.addEventListener('click', clickHandler);

// GET request

fetch(`${BASE_API_URL}/feedbacks`)
    .then(response => response.json()) // transforme le json en JS      
    .then(data => {
        spinnerEl.remove();
        data.feedbacks.forEach(feedbackItem => renderFeedbackItem(feedbackItem))
    })
    .catch(error => {
        feedbackListEl.textContent = `Failed to fetch feedback items. Error message: ${error.message}`;
    });


// -- HASHTAGS COMPONENT -- //

const clickHandler2 = event => {
    const clickedEl = event.target;
    if (clickedEl.className === 'hashtags') return;
    const brandFilter = clickedEl.textContent.substring(1).toLowerCase().trim();
    feedbackListEl.childNodes.forEach(childNode => {
        if (childNode.nodeType === 3) return;
        const feedbackItemCompanyName = childNode.querySelector('.feedback__company').textContent.toLowerCase().trim();
        if (feedbackItemCompanyName !== brandFilter) {
            childNode.remove();
            // Essayé de les faire revenir avec .hidden = true / false plutôt que .remove mais les élements
            // restent, même avec hidden ..?
        }
    });
};
hashtagsListEl.addEventListener('click', clickHandler2 );
