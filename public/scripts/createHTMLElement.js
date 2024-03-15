
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


function createPageButton(dataAmount){
    let div = document.getElementById('pages');
    let pagesNeeded;

    if((dataAmount / 10) % 1 > 0){
        console.log('decimal found'); 
        let round = 1 - ((dataAmount / 10) % 1);       
        pagesNeeded = (dataAmount / 10) + round;      
    }    

    for(let i = 1; i <= pagesNeeded; i++){
        let bttn = document.createElement('button');
        bttn.addEventListener('click', function(){ getAll(i);});
        bttn.textContent = i;
        div.appendChild(bttn);
    } 
}

//creates a td element, populates the id and innerText with the provided text and id values.
function createTableData(text, id){
    let tableData = document.createElement('td');   
    tableData.innerText = text;
    tableData.id = `${id}${'name'}` 
    tableData.className = 'border';   
    return tableData;
    
}