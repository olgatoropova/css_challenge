const now = new Date();
let currentMonth = now.getMonth();
let currentYear = now.getFullYear();
const dateNumberElements = [...document.querySelectorAll('.date-number')];
const previousButton = document.querySelector('button.previous');
const nextButton = document.querySelector('button.next');
const monthElement = document.querySelector('.month');


previousButton.addEventListener('click', () => {
    if(currentMonth === 0) {
        currentMonth = 11;
        currentYear--;

    }else {
        currentMonth--;
    }
    renderMonth(currentMonth, currentYear);

})
nextButton.addEventListener('click', () => {
    if(currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    }else {
        currentMonth++;
    }
    renderMonth(currentMonth, currentYear);
})

const monthIndexToName = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
}

const renderMonth = (monthIndex, year) =>  {
    const numDaysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const firstDate = new Date(year, monthIndex);
    const firstDay = firstDate.getDay();
    monthElement.innerText = `${year} - ${monthIndexToName[monthIndex]}`;
    dateNumberElements.forEach((el,i) => {
        const dateNumber =  (i + 1) - firstDay;
        el.innerText = dateNumber > 0 && dateNumber <= numDaysInMonth ? dateNumber: '';
        const today = new Date();
        console.log(today)
        if(today.getMonth() === monthIndex && today.getFullYear() === year && today.getDate()=== (i+1) - firstDay){
            el.classList.add('today');
        }else {
            el.classList.remove('today');
        }
    })
}

renderMonth(currentMonth, currentYear)

