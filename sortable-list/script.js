// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

const draggableList = document.getElementById('draggableList');
const checkBtn = document.getElementById('check');

// https://ceoworld.biz/2021/11/04/the-worlds-richest-people-2021/
const richestPeople = [
   'Elon Musk',
   'Jeff Bezos',
   'Bernard Arnault',
   'Bill Gates',
   'Larry Page',
   'Mark Zuckerberg',
   'Sergey Brin',
   'Steve Ballmer',
   'Larry Ellison',
   'Warren Buffett'
];

// Store list items
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
    [...richestPeople]
    .map(a => ({value: a, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, index) => {

        const listItem = document.createElement('li');

        listItem.setAttribute('data-index', index);
        listItem.innerHTML = `
        <span class="number">${index +1}</span>
        <div class="draggable" draggable="true">
            <p class="person-name">${person}</p>
            <i class="fas fa-grip-lines"></i>
        </div>
        `;

        listItems.push(listItem);

        draggableList.appendChild(listItem)
    });

    addEventListeners();
}

function dragStart() {
    /* console.log('Event: ', 'dragstart'); */
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragOver(e) {
    /* console.log('Event: ', 'dragover'); */
    e.preventDefault();
}

function dragDrop() {
    /* console.log('Event: ', 'dragdrop'); */
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

// Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

function dragEnter() {
    /* console.log('Event: ', 'dragenter'); */
    this.classList.add('over');
}

function dragLeave() {
    /* console.log('Event: ', 'dragleave'); */
    this.classList.remove('over');
}

// Check the order of list items compared to correct index
function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim();

        if (personName !== richestPeople[index]) {
            listItem.classList.add('wrong');
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });
}


function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart)
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}

checkBtn.addEventListener('click', checkOrder);