//Get all entries in DB, then call showBooks
function getAll(page){
    fetch('/all').then(res => res.json()).then(data =>{ 
        let dataToDisplay =  getTen(data, page);
        showBooks(dataToDisplay);
        createPageButton(data.length);
    
    });
}

function createPageButton(dataAmount){
    let div = document.getElementById('pages');
    let pagesNeeded = dataAmount / 10;
    for(let i = 1; i < pagesNeeded; i++){
        let bttn = document.createElement('button');
        bttn.addEventListener('click', function(){ getAll(i);});
        bttn.textContent = i;
        div.appendChild(bttn);
    }
    console.log(pagesNeeded);
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
    }).then(res => res.json()).then(data => console.log(data));
}



//creates a td element, populates the id and innerText with the provided text and id values.
function createTableData(text, id){
    let tableData = document.createElement('td');   
    tableData.innerText = text;
    tableData.id = `${id}${'name'}` 
    tableData.className = 'border';   
    return tableData;
    
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



function createFocusBox(id){
    let radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'focus';
    radio.value = id;
    radio.className = 'focus-button';
    return radio;
}

function getOne(){
    let value = document.getElementById('search-query').value;
    let type = document.getElementById('search-variable').value;
    
    let currentDbEntries = Array.from(document.getElementsByName('book-entry'));
    console.log(value);
   
    if(value != ''){    
    fetch(`/find/${type}/${value}`).then(res => res.json()).then(data => {
        for(let i = 0; i < currentDbEntries.length; i++){
           currentDbEntries[i].remove();           
        }
        
        showBooks(data);
        
    })};
}


//pass json data through for loop, creating a table row for each object. Call createTableData to create each element in the table, append these to the table row.

function showBooks(data){  
    

    for(let i = 0; i < data.length; i++){
         let book = data[i];      
         let table = document.getElementById('books');
         let row = document.createElement('tr');
         row.setAttribute('name', 'book-entry');
 
         let focusList = document.createElement('td');
         let nameEntry = createTableData(book.name, data[i]._id);
         let authorEntry = createTableData(book.author, data[i]._id);
         let genreEntry = createTableData(book.genre, data[i]._id);
 
         let focusBox = createFocusBox(data[i]._id);
         focusBox.className = 'border';  
         focusList.appendChild(focusBox);
         row.appendChild(focusList);
      
   
         row.appendChild(nameEntry); 
         row.appendChild(authorEntry); 
         row.appendChild(genreEntry); 
         table.appendChild(row);
     
     }
 
 }

 //takes json data and int pageNum, returns data from the json based off of what pageNum is provided. For displaying a few results at a time in a table
 function getTen(data, pageNum){

    let dataToReturn = [];
        for(let i = ((pageNum * 10) - 10); i < (pageNum * 10); i++){
           if(data[i] != undefined){
            dataToReturn.push(data[i]);
            }
           else{
                return dataToReturn;
            }
        }
        return dataToReturn;
 }