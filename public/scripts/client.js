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
    let buttonList = document.getElementById('button-list');

    let elements = [nameList, authorList, genreList];
    let idName = ['name', 'author', 'genre'];
   

   for(let i = 0; i < data.length; i++){
        let book = data[i];      
        let authorEntry = document.createElement('p');
        let genreEntry = document.createElement('p');
        let nameEntry = document.createElement('p');


        authorEntry.innerText = book.author;        
        authorEntry.id = `${data[i]._id}${'author'}`         
        authorList.appendChild(authorEntry);   

        genreEntry.innerText = book.genre;
        genreEntry.id = `${data[i]._id}${'genre'}`       
        genreList.appendChild(genreEntry);   

        nameEntry.innerText = book.name;
        nameEntry.id = `${data[i]._id}${'name'}`     
        nameList.appendChild(nameEntry);    
        
     
        let button = createButton(data[i]._id);       
        buttonList.appendChild(button);   
        let select = createSelect(data[i]._id);
        buttonList.appendChild(select);
    }

}

//Send PATCH request with new value to update DB entry with. 
function update(id){
 
    let newValue = document.getElementById('newName').value;    
    let valueToChange = document.getElementById(`${id}value`).value; 

    fetch(`/update/${id}`, {
        method: 'PATCH',
        headers:{
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            [valueToChange] : newValue
        })
    }).then(response => response.json());
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