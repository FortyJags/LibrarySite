
//pass json data through for loop, creating a table row for each object. Call createTableData to create each element in the table, append these to the table row.

const { Model } = require("mongoose");

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

 //Clears the current table
 function clearTable(listToClear){
    console.log(listToClear);
    let currentList = Array.from(document.getElementsByName(listToClear));
    for(let i = 0; i < currentList.length; i++){
        currentList[i].remove();           
     }

 }


 export {getTen, clearTable, showBooks};