
function caldate() {
  var input = document.getElementById("date");
  var inputDate = new Date(input.value);
  var today = new Date();
  if ( Object.prototype.toString.call(inputDate) === "[object Date]") {
    if ( !isNaN(inputDate.getTime()) ) {//check valid date
  var timeDiff = inputDate.getTime() - today.getTime();
  var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  document.getElementById('result').style.color = daysDiff > 0 ? '#000000':'#F00';
  document.getElementById('result').innerHTML = daysDiff > 0 ? daysDiff + " days remaining" : "Already happended!";}
  else{
    document.getElementById('result').style.color = '#F00';
    document.getElementById('result').innerHTML ="Not a valid date"
  }
}
}
