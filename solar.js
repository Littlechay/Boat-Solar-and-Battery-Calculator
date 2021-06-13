var slider = document.getElementById("myRange");
var output = document.getElementById("battery");
var paneloutput = document.getElementById("panelout");
var altOutput = document.getElementById("alternator");
var altSlider = document.getElementById("myAlternator");
var solarOutput = document.getElementById("solarP");
var solarSlider = document.getElementById("mySolarPanel");
var windOutput = document.getElementById("windG");
var windSlider = document.getElementById("myWindGen");
var consumersUWTot = document.getElementById("consumersUWTotal");
var consumersUp = document.getElementById("consumersUpdate");
var addRow = document.getElementById("rowAdd")

output.innerHTML = slider.value; // Display the default slider value
paneloutput.innerHTML = 0;
altOutput.innerHTML = myAlternator.value;
solarOutput.innerHTML = mySolarPanel.value;
windOutput.innerHTML = myWindGen.value;


// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
  output.innerHTML = this.value;
  capacityTotalBatt.innerHTML = (this.value);
  capacityUsable.innerHTML = (this.value * 0.3).toFixed(1);
  paneloutput.innerHTML = (this.value * 0.8).toFixed(1);

}
altSlider.oninput = function () {
  altOutput.innerHTML = this.value;
}
solarSlider.oninput = function () {
  solarOutput.innerHTML = this.value;
}
windSlider.oninput = function () {
  windOutput.innerHTML = this.value;
}

// add the total current consumed. 
consumersUp.onclick = function () {
  var arr = document.getElementsByName('consumer');
  var arrUway = document.getElementsByName("hoursUWay");
  var arrAnc = document.getElementsByName("hoursAnchored");
  var rowTot = document.getElementsByName("uWayTotalA")
  var tot = 0;

  for (var i = 0; i < arr.length; i++) {
    //    console.log((arr[i].value), (arrUway[i].value));
    if (parseFloat(arr[i].value) && (parseFloat(arrUway[i].value) > 0)) {// and corresponding hours is > 0  then do arr[1] * qty * hrs
      tot += ((parseFloat(arr[i].value)) * (parseFloat(arrUway[i].value)));
      // alert(tot)
      rowTot[i].innerHTML = ((parseFloat(arr[i].value)) * (parseFloat(arrUway[i].value))).toFixed(1);
    }
  }
  tot = tot.toFixed(2);
  consumersUWTot.innerHTML = tot;
}

// dynamically add and remove rows
// add a delete button to added rows only (don't want a delete button on the first row)
function addRows() {
  var table = document.getElementById('dataTable');
  var rowCount = table.rows.length;
  var cellCount = table.rows[0].cells.length;
  var row = table.insertRow(rowCount);
  for (var i = 0; i < cellCount; i++) {
    var cell = 'cell' + i;
    cell = row.insertCell(i);
    var copycel = document.getElementById('col' + i).innerHTML;
    if (i == cellCount - 1) {
      var deleteButton = "<input type=\"button\" value=\"Delete\" onclick = \"deleterow(this)\">"
      cell.innerHTML = deleteButton;
    }
    else {
      cell.innerHTML = copycel;
    }
  }
}

// This is called by the delete button at the end of each added row
function deleterow(r) {
  var i = r.parentNode.parentNode.rowIndex;
  document.getElementById("dataTable").deleteRow(i);
}

// Fancy table from https://codepen.io/adam-lynch/pen/GaqgXP

const min = 150;
// The max (fr) values for grid-template-columns
const columnTypeToRatioMap = {
  numeric: 1,
  'text-short': 1.67,
  'text-long': 3.33,
};

const table = document.querySelector('table');
/*
  The following will soon be filled with column objects containing
  the header element and their size value for grid-template-columns 
*/
const columns = [];
let headerBeingResized;

// The next three functions are mouse event callbacks

// Where the magic happens. I.e. when they're actually resizing
const onMouseMove = (e) => requestAnimationFrame(() => {
  console.log('onMouseMove');

  // Calculate the desired width
  horizontalScrollOffset = document.documentElement.scrollLeft;
  const width = (horizontalScrollOffset + e.clientX) - headerBeingResized.offsetLeft;

  // Update the column object with the new size value
  const column = columns.find(({header}) => header === headerBeingResized);
  column.size = Math.max(min, width) + 'px'; // Enforce our minimum

  // For the other headers which don't have a set width, fix it to their computed width
  columns.forEach((column) => {
    if (column.size.startsWith('minmax')) { // isn't fixed yet (it would be a pixel value otherwise)
      column.size = parseInt(column.header.clientWidth, 10) + 'px';
    }
  });

  /* 
    Update the column sizes
    Reminder: grid-template-columns sets the width for all columns in one value
  */
  table.style.gridTemplateColumns = columns
    .map(({header, size}) => size)
    .join(' ');
});

// Clean up event listeners, classes, etc.
const onMouseUp = () => {
  console.log('onMouseUp');

  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
  headerBeingResized.classList.remove('header--being-resized');
  headerBeingResized = null;
};

// Get ready, they're about to resize
const initResize = ({target}) => {
  console.log('initResize');

  headerBeingResized = target.parentNode;
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
  headerBeingResized.classList.add('header--being-resized');
};

// Let's populate that columns array and add listeners to the resize handles
document.querySelectorAll('th').forEach((header) => {
  const max = columnTypeToRatioMap[header.dataset.type] + 'fr';
  columns.push({
    header,
    // The initial size value for grid-template-columns:
    size: `minmax(${min}px, ${max})`,
  });
  header.querySelector('.resize-handle').addEventListener('mousedown', initResize);
});
