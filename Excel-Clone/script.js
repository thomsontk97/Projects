
const thead = document.getElementById('table-head-row');
const tbody = document.getElementById('table-body');

const columns = 26;
const rows = 100;
let currCell;

for(var i=0; i<columns; i++){
    let th = document.createElement('th');
    th.innerText = String.fromCharCode(i+65); /// Convert ASCII vale to String
    thead.appendChild(th);
    
}
for(var i=1; i<=rows; i++){
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    th.setAttribute('id','fixed-position');
    th.innerText = i;

    tr.appendChild(th);

    for(let j=0; j<columns; j++){
        let td = document.createElement('td');
        td.setAttribute('contenteditable',"true");
        td.setAttribute('spellcheck',"false");
        td.setAttribute('id',`${String.fromCharCode(j+65)}${i}`);
        td.addEventListener('focus',(ev) => onFocus(ev))
        tr.appendChild(td);
    }

    tbody.appendChild(tr);
}

function onFocus(ev){
    console.log("onFocus:",ev.target)
    currCell = ev.target;
     document.getElementById('current-cell').innerText = ev.target.id;

}