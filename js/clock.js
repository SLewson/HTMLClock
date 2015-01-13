function getTime() {
  var date = new Date();
  var time = date.toLocaleTimeString();
  setTimeout(getTime, 1000);
  setTime(time);
}

function setTime(time) {
  document.getElementById("clock").innerHTML = time;
}

getTime();
