
const thead = document.getElementById('table-head-row');
const tbody = document.getElementById('table-body');

const boldBtn = document.getElementById('bold-btn');
const italicsBtn = document.getElementById('italics-btn');
const underlineBtn = document.getElementById('underline-btn');

const textColor = document.getElementById('text-color');
const bgColor = document.getElementById('bg-color');

const leftAlign = document.getElementById('left-align');
const rightAlign = document.getElementById('right-align');
const centerAlign = document.getElementById('center-align');

const fontSize = document.getElementById('font-size');
const fontFamily = document.getElementById('font-family');

const cutBtn = document.getElementById('cut-btn');
const copyBtn = document.getElementById('copy-btn');
const pasteBtn = document.getElementById('paste-btn');

var cutVal = {};


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

boldBtn.addEventListener('click',() => {
    
    if(currCell.style.fontWeight != "bold"){
        currCell.style.fontWeight = "bold";
    }else{
        currCell.style.fontWeight = "normal";
    }
})

italicsBtn.addEventListener('click',() => {
    
    if(currCell.style.fontStyle != "italic"){
        currCell.style.fontStyle = "italic";
    }else{
        currCell.style.fontStyle = "normal";
    }
})

underlineBtn.addEventListener('click',() => {
    
    if(currCell.style.textDecoration != "underline"){
        currCell.style.textDecoration = "underline";
    }else{
        currCell.style.textDecoration = "none";
    }
})

textColor.addEventListener("input", () => {
    currCell.style.color = textColor.value;
})

bgColor.addEventListener("input", () => {
    currCell.style.backgroundColor = bgColor.value;
})

leftAlign.addEventListener('click', () => {
    currCell.style.textAlign = "left";
})

rightAlign.addEventListener('click', () => {
    currCell.style.textAlign = "right";
})

centerAlign.addEventListener('click', () => {
    currCell.style.textAlign = "center";
})

fontSize.addEventListener('change', () => {
    currCell.style.fontSize = fontSize.value;
})

fontFamily.addEventListener('change', () => {
    currCell.style.fontFamily = fontFamily.value;
})

cutBtn.addEventListener('click', () => {
    cutVal = {
        text:currCell.innerText,
        css : currCell.style.cssText
    } 
    currCell.innerText = null;
    currCell.style.cssText = null;
})

pasteBtn.addEventListener('click', () => {
    currCell.innerText = cutVal.text;
    currCell.style.cssText = cutVal.css;
})

copyBtn.addEventListener('click', () => {
    cutVal = {
        text:currCell.innerText,
        css : currCell.style.cssText
    } 

})
