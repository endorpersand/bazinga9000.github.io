//date magic stolen directly from stackoverflow, lol
Date.prototype.isLeapYear = function() {
    var year = this.getFullYear();
    if((year & 3) != 0) return false;
    return ((year % 100) != 0 || (year % 400) == 0);
};

Date.prototype.getDOY = function() {
    var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var mn = this.getMonth();
    var dn = this.getDate();
    var dayOfYear = dayCount[mn] + dn;
    if(mn > 1 && this.isLeapYear()) dayOfYear++;
    return dayOfYear;
};


function update_time() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  let toS = ((x) => toArgamString(x,60))
  let toN = ((x) => toArgamName(x,60))

  let timeStringDigits = toS(hours) + ":" +
                         toS(minutes) + ":" +
                         toS(seconds);

  let timeStringName = toN(hours) + " " +
                       toN(minutes) + " " +
                       toN(seconds);

  let year = date.getFullYear();
  let dayOfYear = date.getDOY(); //Math.ceil((date - new Date(year,0,1)) / 86400000);

  let dateStringDigits = toS(year) + "-" +
                         toS(dayOfYear);

  let dateStringName = toN(year) + " " +
                       toN(dayOfYear);

  let unix = date.getTime()/1000;

  let unixStringDigits = toS(unix)
  let unixStringName = toN(Math.floor(unix))

  document.getElementById("clock").innerText = timeStringDigits;
  document.getElementById("clock-names").innerText = timeStringName;
  document.getElementById("date").innerText = dateStringDigits;
  document.getElementById("date-names").innerText = dateStringName;
  document.getElementById("unix").innerText = unixStringDigits;
  document.getElementById("unix-names").innerText = unixStringName;

  return;
}


setInterval(update_time,10);
