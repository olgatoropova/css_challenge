const ulElement = document.querySelector('.wrapper ul');

const content = [
    {
        question: 'Technically, Svelte is a library and SvelteKit is a framework. What\'s the difference?',
        answer: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.</p>' +
        '<p>Voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'
    },
    {
        question: 'HOW CAN I ORDER GIFT CERTIFICATE?',
        answer: '<p>Reach out to us using Contact form or via email saltyfoxllc@gmail.com. We will reply within 24 hours, answer any questions and help to make the choice.</p>' +
        '<p>We will pack a beautiful certificate into a branded envelope and send it at our own expense to you or the receiver (by your choice).</p>'
    },
    {
        question: 'HOW CAN I BOOK 2 IN 1: CRUISE AND PHOTO SESSION',
        answer: 'Reach out to us using Contact form or via email saltyfoxllc@gmail.com or by phone ‪(206) 486-4381‬. We will reply within 24 hours, answer any questions and help to book a date and time that works for everyone.'
    },
    {
        question: 'I NEED TO CANCEL MY BOOKING',
        answer: 'Booking payments are fully refundable up to 7 days prior to the reservation. We\'re happy to partially (50%) refund your booking 2-7 days prior to your reservation, but less than 48 hours\' notice puts us in a tough spot. Salty Fox won\'t be able to refund your payment if you cancel your booking less than 48 hours prior.'
    },
    {
        question: 'I NEED TO RESCHEDULE MY TRIP',
        answer: '<p>If you need to change the date, your original booking will be canceled and you\'ll need to create a brand new reservation.</p>' +
        '<p>Please reach out to us before canceling your trip using Contact form, via email saltyfoxllc@gmail.com, or by phone ‪(206) 486-4381‬. We will try to do our best to accommodate your needs.</p>'
    },
    {
        question: 'WHAT IF WE WANT TO HAVE A RIDE FOR MORE THAN 6 PEOPLE?',
        answer: 'Unfortunately, there is a strict limit on the number of people aboard. We can\'t allow more than 6 people while cruising. If more than 6 people arrive for boarding trip will be canceled with no refund.'
    }
];

const renderUI = () => {
    const faq = content.map((item, i) => {
        return `<li>
            <a href="#" onclick="toggle(${i});">
                <div class="question">
                    <div class="icon">
                        <img src="" alt="Question" />
                    </div>
                    <div class="content">${item.question}</div>
                </div>
            </a>
            <div class="no-answer">
                <img src="images/chevron.svg" alt="Expand answer" onclick="toggle(${i});"/>
                <div class="answer-content"></div>
            </div>
            <div class="answer">
                <img src="images/close.svg" alt="Collapse answer" onclick="toggle(${i});"/>
                <div class="answer-content">${item.answer}</div>
            </div>
        </li>`;

    }).join('');

    ulElement.innerHTML = faq;

    return new Map(
        [...ulElement.childNodes].map((liElement, i) => {
          return [i, liElement];
        }),
      );
}

const liElementsMap = renderUI();

const toggle = (selectedIndex) => {
    console.log('11111');
    const liElement = liElementsMap.get(selectedIndex);
    if (liElement.classList.contains('open')) {
        liElement.classList.remove('open');
    } else {
        liElement.classList.add('open');
    }
}