
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

const matrix = new Array(rows);

for(var i=0; i<rows; i++) {
    matrix[i] = new Array(columns);
    for(var j=0; j<columns; j++) {
        matrix[i][j] = {};
    }
}




for(var i=0; i<columns; i++){
    let th = document.createElement('th');
    th.innerText = String.fromCharCode(i+65); /// Convert ASCII vale to String
    thead.appendChild(th);
    
}
for(var i=0; i<rows; i++){
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    th.setAttribute('id','fixed-position');
    th.innerText = i+1;

    tr.appendChild(th);

    for(let j=0; j<columns; j++){
        let td = document.createElement('td');
        td.setAttribute('contenteditable',"true");
        td.setAttribute('spellcheck',"false");
        td.setAttribute('id',`${String.fromCharCode(j+65)}${i+1}`);
        td.addEventListener('focus',(ev) => onFocus(ev))
        tr.appendChild(td);
    }

    tbody.appendChild(tr);
}

function onFocus(ev){
    console.log("onFocus:",ev.target)
    currCell = ev.target;
     document.getElementById('current-cell').innerText = ev.target.id;

    //  console.log(matrix);

}

boldBtn.addEventListener('click',() => {
    
    if(currCell.style.fontWeight != "bold"){
        currCell.style.fontWeight = "bold";
    }else{
        currCell.style.fontWeight = "normal";
    }
    updateJson(currCell);
})

italicsBtn.addEventListener('click',() => {
    
    if(currCell.style.fontStyle != "italic"){
        currCell.style.fontStyle = "italic";
    }else{
        currCell.style.fontStyle = "normal";
    }
    updateJson(currCell);
})

underlineBtn.addEventListener('click',() => {
    
    if(currCell.style.textDecoration != "underline"){
        currCell.style.textDecoration = "underline";
    }else{
        currCell.style.textDecoration = "none";
    }
    updateJson(currCell);
})

textColor.addEventListener("input", () => {
    currCell.style.color = textColor.value;
    updateJson(currCell);
})

bgColor.addEventListener("input", () => {
    currCell.style.backgroundColor = bgColor.value;
    updateJson(currCell);
})

leftAlign.addEventListener('click', () => {
    currCell.style.textAlign = "left";
    updateJson(currCell);
})

rightAlign.addEventListener('click', () => {
    currCell.style.textAlign = "right";
    updateJson(currCell);
})

centerAlign.addEventListener('click', () => {
    currCell.style.textAlign = "center";
    updateJson(currCell);
})

fontSize.addEventListener('change', () => {
    currCell.style.fontSize = fontSize.value;
    updateJson(currCell);
})

fontFamily.addEventListener('change', () => {
    currCell.style.fontFamily = fontFamily.value;
    updateJson(currCell);
})

cutBtn.addEventListener('click', () => {
    cutVal = {
        text:currCell.innerText,
        css : currCell.style.cssText
    } 
    currCell.innerText = null;
    currCell.style.cssText = null;
    updateJson(currCell);
})

pasteBtn.addEventListener('click', () => {
    currCell.innerText = cutVal.text;
    currCell.style.cssText = cutVal.css;
    updateJson(currCell);
})

copyBtn.addEventListener('click', () => {
    cutVal = {
        text:currCell.innerText,
        css : currCell.style.cssText
    } 
    updateJson(currCell);

})

function updateJson(cell){
    var json = {
        id : cell.id,
        text : cell.innerText,
        style : cell.style.cssText
    };

    var id = cell.id.split(""); //Spliting cell id into two eg: A1 => ['A','1'];
    var i = id[1] -1;
    var j = id[0].charCodeAt(0) - 65;
    matrix[i][j] = json;
};

function downloadJson() {
    // Define your JSON data
  
    // Convert JSON data to a string
    const jsonString = JSON.stringify(matrix);
  
    // Create a Blob with the JSON data and set its MIME type to application/json
    const blob = new Blob([jsonString], { type: "application/json" });
  
    // Create an anchor element and set its href attribute to the Blob URL
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.json"; // Set the desired file name
  
    // Append the link to the document, click it to start the download, and remove it afterward
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

//upload

document.getElementById("jsonFile").addEventListener("change", readJsonFile);

function readJsonFile(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const fileContent = e.target.result;

      // {id,style,text}
      // Parse the JSON file content and process the data
      try{
        const jsonData = JSON.parse(fileContent);
        console.log("matrix2", jsonData);
        matrix = jsonData;
        jsonData.forEach((row) => {
          row.forEach((cell) => {
            if (cell.id) {
              var myCell = document.getElementById(cell.id);
              myCell.innerText = cell.text;
              myCell.style.cssText = cell.style;
            }
          });
        });
        // Process the JSON data as needed
      }catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };

    reader.readAsText(file);
  }
}