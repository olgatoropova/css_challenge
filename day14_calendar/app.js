const wrapperElement = document.querySelector('.wrapper');
const dayOfWeeks = ['S', 'M', 'T', 'W', 'T', 'F', 'S']; // TODO: what if week starts from Monday??
const monthNames = {
    0 : 'January',
    1 : 'February',
    2 : 'March',
    3 : 'April',
    4 : 'May',
    5 : 'June',
    6 : 'July',
    7 : 'August',
    8 : 'September',
    9 : 'October',
    10 : 'November',
    11 : 'December',
}
const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();

const getDaysInMonth = (year, month) => {
    // Adding 1 to month, because when we pass 0 in date argument - we actually return last date of _previous_ month 
    const endOfMonth = new Date(year, month + 1, 0);
    return endOfMonth.getDate();
}

const previousMonth = () => {
    const previousMonth = new Date(currentYear, currentMonth - 1, 1);
    currentYear = previousMonth.getFullYear();
    currentMonth = previousMonth.getMonth();
    renderUI(0);
}

const nextMonth = () => {
    const nextMonth = new Date(currentYear, currentMonth + 1, 1);
    currentYear = nextMonth.getFullYear();
    currentMonth = nextMonth.getMonth();
    renderUI(0);
}

const pickDate = (selectedDayElement) => {
    const daysElements = [...document.querySelectorAll('.day')];
    daysElements.forEach((dayElement) => {
        dayElement.classList.remove('selected');
    })
    selectedDayElement.classList.add('selected');

    window.alert(new Date(currentYear, currentMonth, selectedDayElement.innerText.trim()));
}

const renderUI = (selectedDay) => {
    const days = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonthDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

    let innerHTML = `<button class="previous" onclick="previousMonth();">
            <img src="images/previous.svg" alt="Previous month" />
        </button>
        <span class="month">${currentYear} - ${monthNames[currentMonth]}</span>
        <button class="next" onclick="nextMonth();">
            <img src="images/next.svg" alt="Next month" />
        </button>`;

    innerHTML += dayOfWeeks.map((d) => {
        return `<div class="day-of-week">${d}</div>`;
    }).join('');

    for (i = 0; i < firstDayOfMonthDayOfWeek; i++) {
        innerHTML += `<div class="day"></div>`;
    }
                                                                                                                                                                
    for (i = 1; i <= days; i++) {
        innerHTML += `<div class="day${i === selectedDay ? ' selected' : ''}" onclick="pickDate(this);">${i}</div>`;
    }

    wrapperElement.innerHTML = innerHTML;
}

renderUI(today.getDate());
