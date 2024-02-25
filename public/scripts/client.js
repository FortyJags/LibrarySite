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
        authorEntry.class = 'list';
        authorList.appendChild(authorEntry);   

        genreEntry.innerText = book.genre;
        genreEntry.id = `${data[i]._id}${'genre'}`
        genreEntry.class = 'list';
        genreList.appendChild(genreEntry);   

        nameEntry.innerText = book.name;
        nameEntry.id = `${data[i]._id}${'name'}`
        nameEntry.class = 'list';
        nameList.appendChild(nameEntry);    
        
     
        let button = createButton(data[i]._id);       
        buttonList.appendChild(button);   
    }

}

//Send PATCH request with new name to update DB entry with. WIP
function update(id){
 
        let name = document.getElementById('newName').value;
        console.log(name);
    fetch(`/update/${id}`, {
        method: 'PATCH',
        headers:{
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            'name': name
        })
    }).then(response => response.json());
}


//Generate new 'Change value' button
function createButton(id){
    let button = document.createElement('button');
    button.id = id;
    button.innerText = 'Change value';
    
    button.addEventListener('click', function() {update(id)});
    return button;
}
