const draggable_list = document.getElementById('draggagle-list')
const check_btn = document.getElementById('check')

const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
];

const listItems = []
let dragStartIndex

createList()
  
/**
 * insert list into DOM
 */
function createList() {
    [...richestPeople]
        .map(name => ({ name, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .forEach((person, index) => {
            const listItem = document.createElement('li')
            listItem.setAttribute('data-index', index)
            listItem.innerHTML = `
                <span class="number">${index + 1}</span>
                <div class="draggable" draggable="true">
                    <p class="person-name">${person.name}</p>
                    <i class="fas fa-grip-lines"></i>
                </div>
            `
            listItems.push(listItem)
            draggable_list.appendChild(listItem)
        })

        addEventlisteners()
}

function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index')
}
function dragEnter() {
    this.classList.add('over')
}
function dragLeave() {
    this.classList.remove('over')
}
function dragDrop() {
    const dragEndIndex = + this.getAttribute('data-index')
    swapItems(dragStartIndex, dragEndIndex)

    this.classList.remove('over')
}
function dragOver(e) {
    e.preventDefault()
}

/**
 * Swap list items that are drag and drop
 */
function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable')
    const itemTwo = listItems[toIndex].querySelector('.draggable')

    listItems[fromIndex].appendChild(itemTwo)
    listItems[toIndex].appendChild(itemOne)
}

/**
 * Check order of list items
 */
function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim()
       
        if(personName !== richestPeople[index]) {
            listItem.classList.add('wrong')
        } else {
            listItem.classList.remove('wrong')
            listItem.classList.add('right')
        }
    })
}

function addEventlisteners() {
    const draggables = document.querySelectorAll('.draggable') 
    const dragListItems = document.querySelectorAll('.draggable-list li') 

    draggables.forEach(draggable => {
       draggable.addEventListener('dragstart', dragStart)
    })

   dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver)
        item.addEventListener('drop', dragDrop)
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('dragleave', dragLeave)
    })
}

check_btn.addEventListener('click', checkOrder)