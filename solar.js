var slider = document.getElementById("myRange");
var output = document.getElementById("battery");
var paneloutput = document.getElementById("panelout");

output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
  output.innerHTML = this.value;
  paneloutput.innerHTML = this.value * 2;

}
function testResults(form) {
  var TestVar = form.inputbox.value;
  alert("You typed: " + TestVar);
}
