const DATA = [
    {
        id: 1,
        name: 'Cameron Williamson',
        email: 'cameron.wiliamson@example.com',
        title: 'Software Developer'
    },
    {
        id: 2,
        name: 'Jenny Wilson',
        email: 'jenny.wilson@example.com',
        title: 'Project Manager'
    },
    {
        id: 3,
        name: 'Jane Cooper',
        email: 'jane.cooper@example.com',
        title: 'Marketing Coordinator'
    },
    {
        id: 4,
        name: 'Wade Warren',
        email: 'wade.warren@example.com',
        title: 'Software Tester'
    },
    {
        id: 5,
        name: 'Esther Howard',
        email: 'esther.howard@example.com',
        title: 'Web Designer'
    },
    {
        id: 6,
        name: 'Kristin Watson',
        email: 'kristin.watson@example.com',
        title: 'Marketing Coordinator'
    },
    {
        id: 7,
        name: 'Esther Howard',
        email: 'esther.howard@example.com',
        title: 'Web Designer'
    },
    {
        id: 8,
        name: 'Leslie Alexander',
        email: 'leslie.alexander@example.com',
        title: 'UI/UX Designer'
    },
    {
        id: 9,
        name: 'Ralph Edwards',
        email: 'ralph.edwards@example.com',
        title: 'Software Tester'
    },
    {
        id: 10,
        name: 'Courtney Henry',
        email: 'courtney.henry@example.com',
        title: 'Ethical Hacker'
    },
    {
        id: 11,
        name: 'Willie Jennings',
        email: 'willie.jennings@example.com',
        title: 'Team Leader'
    },
    {
        id: 12,
        name: 'Neveah Simmons',
        email: 'neveah.simmons@example.com',
        title: 'Team Leader'
    },
    {
        id: 13,
        name: 'Theresa Webb',
        email: 'theresa.webb@example.com',
        title: 'Software Tester'
    },
    {
        id: 14,
        name: 'Debbe Baker',
        email: 'debbe.baker@example.com',
        title: 'Software Developer'
    },
    {
        id: 15,
        name: 'Ronald Richards',
        email: 'ronald.richards@example.com',
        title: 'Software Developer'
    },
    {
        id: 16,
        name: 'Deanna Curtis',
        email: 'deanna.curtis@example.com',
        title: 'Scrum Master'
    },
    {
        id: 17,
        name: 'Felicia Reid',
        email: 'felicia.reed@example.com',
        title: 'Ethical Hacker'
    },
    {
        id: 18,
        name: 'Jessie Alexander',
        email: 'jessie.alexander@example.com',
        title: 'Project Manager'
    },
    {
        id: 19,
        name: 'Sam Smith',
        email: 'sam.smith@example.com',
        title: 'Ethical Hacker'
    },
    {
        id: 20,
        name: 'Eleanor Rigby',
        email: 'eleanor.rigby@example.com',
        title: 'UI/UX Designer'
    },
    {
        id: 21,
        name: 'Devon Lane',
        email: 'devon.lane@example.com',
        title: 'Team Leader'
    },
    {
        id: 22,
        name: 'Guy Hawkins',
        email: 'guy.hawkins@example.com',
        title: 'Team Leader'
    },
    {
        id: 23,
        name: 'Jim Parks',
        email: 'jim.parks@example.com',
        title: 'Ethical Hacker'
    },
    {
        id: 24,
        name: 'Susanne Ford',
        email: 'susanne.ford@example.com',
        title: 'Software Developer Manager'
    },
    {
        id: 25,
        name: 'Kathryn Murphy',
        email: 'kathryn.murphy@example.com',
        title: 'Project Manager'
    },
    {
        id: 26,
        name: 'Cody Fisher',
        email: 'cody.fisher@example.com',
        title: 'Software Developer'
    },
    {
        id: 27,
        name: 'Jane Cooper',
        email: 'jane.cooper@example.com',
        title: 'Software Tester'
    },
    {
        id: 28,
        name: 'Karen MacAfee',
        email: 'karen.macafee@example.com',
        title: 'UI/UX Designer'
    },
    {
        id: 29,
        name: 'Dianne Russell',
        email: 'dianne.russell@example.com',
        title: 'Ethical Hacker'
    },
    {
        id: 30,
        name: 'Bessie Cooper',
        email: 'bessie.cooper@example.com',
        title: 'Scrum Master'
    },
]

const PAGE_SIZE = 4;

const tbodyElement = document.querySelector("tbody");

const sortIdBtn = document.getElementById("sortIdBtn");
const sortNameBtn = document.getElementById("sortNameBtn");
const sortEmailBtn = document.getElementById("sortEmailBtn");
const sortTitleBtn = document.getElementById("sortTitleBtn");
 
const totalResultsElement = document.getElementById("totalResults");
const currentPageInput = document.getElementById("currentPage");
const totalPagesElement = document.getElementById("totalPages");

const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");

let currentPage = 0;

function test() {
    return (<p></p>);
}

console.log(test);


previousButton.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        renderTable();
    }
});

nextButton.addEventListener('click', () => {
    if (currentPage < Math.ceil(DATA.length / PAGE_SIZE) - 1) {
        currentPage++;
        renderTable();
    }
});


const getRecordById = (id) => {
    // assume that id equals (index - 1)
    // in real time life probly better to have a map
    return DATA[id - 1];
}

const disableElement = (el) => {
    el.setAttribute("disabled", "disabled");
}

const edit = (editButton, id) => {
    const inputs = [document.getElementById(`name-${id}`),
        document.getElementById(`email-${id}`),
        document.getElementById(`title-${id}`)];

    inputs.forEach((input) => {
        input.removeAttribute("disabled");
    });

    editButton.style.display = "none";
    // set visible update button
    editButton.nextSibling.nextSibling.style.display = "block";
}

const update = (updateButton, id) => {
    const name = document.getElementById(`name-${id}`);
    const email = document.getElementById(`email-${id}`);
    const title = document.getElementById(`title-${id}`);

    const record = getRecordById(id);

    record.name = name.value;
    record.email = email.value;
    record.title = title.value;

    const inputs = [name, email, title];
    inputs.forEach((input) => {
        disableElement(input);
    })

    updateButton.style.display = "none";
    // set visible edit button
    updateButton.previousSibling.previousSibling.style.display = "block";
}

const updateInput = (input) => {
    const elementId = input.getAttribute("id");
    const hyphenIdx = elementId.indexOf("-");

    const propertyName = elementId.substring(0, hyphenIdx);
    const id = elementId.substring(hyphenIdx + 1);
    console.log(propertyName, id);

    const record = getRecordById(id);
    record[propertyName] = input.value;
    disableElement(input);
}

const renderTable = () => {
    let innerHTML = '';
    let start  = currentPage * PAGE_SIZE;
    let end = start + PAGE_SIZE;
    for (let i = start; i < DATA.length && i < end; i++ ) {
        let id = DATA[i].id;
        innerHTML += `<tr>
                <td>${id}</td>
                <td><input type="text" id="name-${id}" value="${DATA[i].name}" onblur="updateInput(this);" disabled="disabled" /></td>
                <td><input type="email" id="email-${id}" value="${DATA[i].email}" onblur="updateInput(this);" disabled="disabled"/></td>
                <td><input type="text" id="title-${id}" value="${DATA[i].title}" onblur="updateInput(this);" disabled="disabled"/></td>
                <td>
                    <button class="edit" onclick="edit(this, ${id});"><img src="images/edit.svg" alt="Edit" /></button>
                    <button class="update" onclick="update(this, ${id});"><img src="images/update.svg" alt="Update" /></button>
                </td>
            </tr>`;
    }
    tbodyElement.innerHTML = innerHTML;

    totalResultsElement.innerText = `${DATA.length} results`;
    currentPageInput.value = currentPage + 1;
    totalPagesElement.innerText = `${Math.ceil(DATA.length / PAGE_SIZE)}`;
}

renderTable();