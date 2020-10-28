//digit data
let digit_names = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Dess",
  "Ell",
  "Zen",
  "Thise",
  "Zeff",
  "Trick",
  "Tess",
  "Zote",
  "Dine",
  "Ax",
  "Score",
  "Tress",
  "Dell",
  "Flore",
  "Cadex",
  "Quint",
  "Dithe",
  "Trine",
  "Caven",
  "Neve",
  "Kinex",
  "Sode",
  "Twive",
  "Trell",
  "Dote",
  "Kineff",
  "Exent",
  "Mack",
  "Dax",
  "Trithe",
  "Kinoct",
  "Lume",
  "Exeff",
  "Sill",
  "Cadell",
  "Kinove",
  "Diore",
  "Foss",
  "Exoct",
  "Effent",
  "Kiness",
  "Trizote",
  "Cadithe",
  "Sull",
  "Exove",
  "Kinell",
  "Sevoct",
  "Triax",
  "Deve",
  "Clore"
]
let suffixes = [
  "","ta","un","zand","myr","lak"
]


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


function parse_suffix(name, suffix) {
  if (suffix == "") return name;
  let consonants = "bcdfghjklmnpqrstvwxyz";
  let vowels = "aeiou";
  if (name[name.length-1] == name[name.length-2]) {
    name = name.slice(0,-1);
  }

  return name + suffix;

}
function to_sexagesimal(x) {
  let digits = [];
  do {
    digits.unshift(x % 60);
    x -= x % 60;
    x /= 60;
  } while (x != 0);
  return digits;
}

function convert_to_sexagesimal_font(x) {
  let digits = to_sexagesimal(x);
  let font_characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWX";
  let string = "";
  for (var d of digits) {
    string += font_characters[d];
  }
  return string;
}

function convert_to_sexagesimal_name(x) {
  let digits = to_sexagesimal(x);
  let string = "";
  for (let i = 0; i < digits.length; i++) {
    let d = digits[i];
    suffix = suffixes[digits.length - i - 1];
    string += parse_suffix(digit_names[d],suffix) + " ";
  }
  return string.slice(0, -1);
}


function update_time() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  let timeStringDigits = convert_to_sexagesimal_font(hours) + ":" +
                         convert_to_sexagesimal_font(minutes) + ":" +
                         convert_to_sexagesimal_font(seconds);

  let timeStringName = convert_to_sexagesimal_name(hours) + " " +
                       convert_to_sexagesimal_name(minutes) + " " +
                       convert_to_sexagesimal_name(seconds);

  let year = date.getFullYear();
  let dayOfYear = date.getDOY(); //Math.ceil((date - new Date(year,0,1)) / 86400000);

  let dateStringDigits = convert_to_sexagesimal_font(year) + "-" +
                         convert_to_sexagesimal_font(dayOfYear);

  let dateStringName = convert_to_sexagesimal_name(year) + " " +
                       convert_to_sexagesimal_name(dayOfYear);

  let unix = Math.floor(date.getTime()/1000);

  let unixStringDigits = convert_to_sexagesimal_font(unix)
  let unixStringName = convert_to_sexagesimal_name(unix)

  document.getElementById("clock").innerText = timeStringDigits;
  document.getElementById("clock-names").innerText = timeStringName;
  document.getElementById("date").innerText = dateStringDigits;
  document.getElementById("date-names").innerText = dateStringName;
  document.getElementById("unix").innerText = unixStringDigits;
  document.getElementById("unix-names").innerText = unixStringName;

  return;
}


setInterval(update_time,500);
