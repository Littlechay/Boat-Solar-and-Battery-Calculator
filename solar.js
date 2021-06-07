var slider = document.getElementById("myRange");
var output = document.getElementById("battery");
var paneloutput = document.getElementById("panelout");
var altOutput = document.getElementById("alternator");
var altSlider = document.getElementById("myAlternator");
var solarOutput = document.getElementById("solarP");
var solarSlider = document.getElementById("mySolarPanel");
var windOutput = document.getElementById("windG");
var windSlider = document.getElementById("myWindGen");
var consumersTot = document.getElementById("consumersTotal");
var consumersUp = document.getElementById("consumersUpdate");


output.innerHTML = slider.value; // Display the default slider value
paneloutput.innerHTML = 0;
altOutput.innerHTML = myAlternator.value;
solarOutput.innerHTML = mySolarPanel.value;
windOutput.innerHTML = myWindGen.value;


// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
  output.innerHTML = this.value;
  capacityTotalBatt.innerHTML = this.value;
  capacityUsable.innerHTML = this.value * 0.3;
  paneloutput.innerHTML = this.value * 0.8;

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
  var tot = 0;
  for (var i = 0; i < arr.length; i++) {
    if (parseFloat(arr[i].value))

      tot += parseFloat(arr[i].value);
  }
  tot = tot.toFixed(2);
  consumersTot.innerHTML = tot;
}

