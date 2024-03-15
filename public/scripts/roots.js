import * as table from 'client.js'

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
    }).then(res => res.json()).then(data => console.log(data));
}

//Get all entries in DB, then call showBooks
function getAll(page){
    fetch('/all').then(res => res.json()).then(data =>{ 
        table.clearTable('book-entry');
        let dataToDisplay =  getTen(data, page);
        table.showBooks(dataToDisplay);
        createPageButton(data.length);
    
    });
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

//sends DELETE request to have item removed from DB
function deleteItem(id){
    fetch(`/delete/${id}`, {
        method:'DELETE',
        headers:{
            'Content-type' : 'application/json'
        }
    }).then(res => console.log(res));
    
}


function getOne(){
    let value = document.getElementById('search-query').value;
    let type = document.getElementById('search-variable').value;
    
   
    console.log(value);
   
    if(value != ''){    
    fetch(`/find/${type}/${value}`).then(res => res.json()).then(data => {
     
        table.clearTable('book-entry');
        table.showBooks(data);
        
    })};
}
