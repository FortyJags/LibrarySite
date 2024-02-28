//Get all entries in DB, then call showBooks
function getAll(){
    fetch('/all').then(response => response.json()).then(data => showBooks(data));
}

//Create new Entry in DB. Take input from 3 input fields, send POST request and display json result to console
function createNew(){
    let name = document.getElementById('name').value;
    let author = document.getElementById('author').value;
    let genre = document.getElementById('genre').value;

    fetch('/create', {
        method: 'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            'name': name,
            'author': author,
            'genre': genre
        })
    }).then(response => response.json()).then(data => console.log(data));
}


//Get all list titles. Pass json data through for loop, creating 3 p elements for each part. Append these to relevant list title. 
function showBooks(data){
    let nameList = document.getElementById('name-list');
    let authorList = document.getElementById('author-list');
    let genreList = document.getElementById('genre-list');
    let focusList = document.getElementById('focus-list');

   

   for(let i = 0; i < data.length; i++){
        let book = data[i];      
        let table = document.getElementById('books');
        let row = document.createElement('tr');
        let focusList = document.createElement('td');
        let nameEntry = document.createElement('td');
        let authorEntry = document.createElement('td');
        let genreEntry = document.createElement('td');

        row.className = 'list';

        let focusBox = createFocusBox(data[i]._id);
        focusList.appendChild(focusBox);
        row.appendChild(focusList);

        authorEntry.innerText = book.author;        
        authorEntry.id = `${data[i]._id}${'author'}`         
        row.appendChild(authorEntry);   

        genreEntry.innerText = book.genre;
        genreEntry.id = `${data[i]._id}${'genre'}`       
        row.appendChild(genreEntry);   

        nameEntry.innerText = book.name;
        nameEntry.id = `${data[i]._id}${'name'}`     
        row.appendChild(nameEntry);    

        table.appendChild(row);
    
    }

}

//Send PATCH request with new value to update DB entry with. 
function update(){
 
    let newValue = document.getElementById('newName').value;    
    let valueToChange = document.getElementById(`valueToChange`).value; 
    let focusToggles = document.getElementsByName('focus');
    let id;

    for(let i = 0; i < focusToggles.length; i++){
        if(focusToggles[i].checked){
            id = focusToggles[i].value;
        }
    }
    
   fetch(`/update/${id}`, {
        method: 'PATCH',
        headers:{
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            [valueToChange] : newValue
        })
    }).then(res => res.json());
}


function deleteItem(id){
    fetch(`/delete/${id}`, {
        method:'DELETE',
        headers:{
            'Content-type' : 'application/json'
        }
    }).then(res => console.log(res));
    
}

//Generate new 'Change value' button
function createButton(id){
    let button = document.createElement('button');
    button.id = id;
    button.innerText = 'Change value';
    button.className = 'buttons';
    button.addEventListener('click', function() {update(id)});
    return button;
}

//Create select element, call createSelectOptions to create options for populating  newly formed select
function createSelect(id){
    let select = document.createElement('select');
    select.id = `${id}value`;

    let nameOption = createSelectOptions('name');
    let authorOption = createSelectOptions('author');
    let genreOptions = createSelectOptions('genre');
    select.appendChild(nameOption);
    select.appendChild(authorOption);
    select.appendChild(genreOptions);
    return select;
}

//Create option for select element using specified name as value
 function createSelectOptions(name){
    let selectOption = document.createElement('option');
    selectOption.textContent = name;
    selectOption.value = name;
    return selectOption;
}


function createFocusBox(id){
    let radio = document.createElement('input');
    radio.type = 'radio';
    radio.id = 'focus';
    radio.name = 'focus';
    radio.value = id;
    radio.className = 'focus-button';
    return radio;
}