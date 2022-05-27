// date magic stolen directly from stackoverflow, lol
Date.prototype.isLeapYear = function() {
    const year = this.getFullYear();
    if ((year & 3) != 0) return false;
    return ((year % 100) != 0 || (year % 400) == 0);
};

Date.prototype.getDOY = function() {
    const dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    const mn = this.getMonth();
    const dn = this.getDate();
    let dayOfYear = dayCount[mn] + dn;
    if (mn > 1 && this.isLeapYear()) dayOfYear++;
    return dayOfYear;
};

function update_time() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const toS = (x) => toArgamString(x, 60);
    const toN = (x) => toArgamName(x, 60);

    const timeStringDigits = toS(hours) + ':' +
                         toS(minutes) + ':' +
                         toS(seconds);

    const timeStringName = toN(hours) + ' ' +
                       toN(minutes) + ' ' +
                       toN(seconds);

    const year = date.getFullYear();
    const dayOfYear = date.getDOY(); // Math.ceil((date - new Date(year,0,1)) / 86400000);

    const dateStringDigits = toS(year) + '-' +
                         toS(dayOfYear);

    const dateStringName = toN(year) + ' ' +
                       toN(dayOfYear);

    const unix = date.getTime() / 1000;

    const unixStringDigits = toS(unix);
    const unixStringName = toN(Math.floor(unix));

    document.getElementById('clock').innerText = timeStringDigits;
    document.getElementById('clock-names').innerText = timeStringName;
    document.getElementById('date').innerText = dateStringDigits;
    document.getElementById('date-names').innerText = dateStringName;
    document.getElementById('unix').innerText = unixStringDigits;
    document.getElementById('unix-names').innerText = unixStringName;
}

setInterval(update_time, 10);
