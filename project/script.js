// EXAMPLE 1

let numbers = [33, 22, 101, 8, 44, 56, 1, 90, 43, 156, 7];

document.getElementById("output").innerHTML = numbers;
document.getElementById("button1").onclick = addInput;
document.getElementById("button2").onclick = addInput2;
document.getElementById("button3").onclick = remove;
document.getElementById("button6").onclick = remove2;
document.getElementById("button4").onclick = sort;
document.getElementById("button5").onclick = sort2;

function addInput() {
    numbers.push(Math.floor(Math.random() * 100));
    showArray();
}

function addInput2() {
    let x = numbers[(Math.floor(Math.random() * numbers.length))];
    numbers.push( x );
    showArray();
}

function remove() {
    numbers.pop();
    showArray();
}

function remove2() {
	numbers.shift();
	showArray();
}

function sort() {
    numbers.sort( function (a, b ) {
        return a - b;
    });
    showArray();
}

function sort2() {
    numbers.sort( function (a, b ) {
        return b - a;
    });
    showArray();
}

function showArray() {
    document.getElementById("output").innerHTML = numbers;
}

//EXAMPLE 2

let newButton = document.getElementById("newButton");
newButton.onclick = processInput;
let form = document.getElementById("frm1");
let delButton = document.getElementById("delButton");
delButton.onclick = deleteRow;

function rowNumbers() {
    let table = document.getElementsByTagName("table")[0];
    let rows = table.getElementsByTagName("tr");
    for (let i = 1; i < rows.length; i++) {
        let parent = document.createElement("td");
        let text = document.createTextNode(i);
        parent.appendChild(text);
        rows[i].insertBefore(parent, rows[i].firstChild);
    }
}

function refreshNumbers() {
    let table = document.getElementsByTagName("table")[0];
    let rows = table.getElementsByTagName("tr");
    for (let i = 1; i < rows.length; i++) {
        let parent = document.createElement("td");
        let text = document.createTextNode(i);
        parent.appendChild(text);
        let rowChild = rows[i].firstChild;
        rowChild.parentNode.replaceChild(parent, rowChild);
    }
}

function processInput() {
    let inputValidation = validate(form);
    if (inputValidation === true) {
        let inputNew = getInput(form);
        getOutput(inputNew);
    }
}

function validate(form) {
    if (form.fname.value === "") {
        alert("Please enter a valid firstname!");
        form.fname.focus();
        return false;
    }
    if (form.lname.value === "") {
        alert("Please enter a valid lastname!");
        form.lname.focus();
        return false;
    }
    if (isNaN(form.points.value) || form.points.value === "") {
        alert("Please enter a valid number of points!");
        form.points.focus();
        return false;
    }
    return true;
}

function getInput(form) {
    let s = [];
    for (i = 0; i < form.length; i++) {
        s[i]= form.elements[i].value; 
    }
    return s;
}

function getOutput(output) {
    let table = document.getElementsByTagName("table")[0];
    let rows = table.getElementsByTagName("tr");
    let temp = rows.length;
    output.unshift(temp);
    let newRow = document.createElement("tr");
    table.appendChild(newRow);
    for (i = 0; i < output.length; i++) {
        let element = document.createElement("td");
        let text = document.createTextNode(output[i]);
        element.appendChild(text);
        newRow.appendChild(element);
    }
}

function deleteRow() {
    let rowNumb = +document.getElementById("rowID").value;
    let table = document.getElementsByTagName("table")[0];
    let rows = table.getElementsByTagName("tr");
    let temp = rows.length;
    console.log(temp);
    if (isNaN(rowNumb) || rowNumb <= 0 || rowNumb > temp-1) {
        alert(rowNumb + " is not a valid row number");
        document.getElementById("rowID").value = "";
    }
    else {
        eraseRow(rowNumb);
    }
	document.getElementById("rowID").value = "";
}

function eraseRow(numb) {
    document.getElementById("myTable").deleteRow(numb);
    refreshNumbers();
}