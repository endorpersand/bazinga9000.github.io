const signs = [
    'Crocodile',
    'Wind',
    'House',
    'Lizard',
    'Serpent',
    'Death',
    'Deer',
    'Rabbit',
    'Water',
    'Dog',
    'Monkey',
    'Grass',
    'Reed',
    'Ocelot',
    'Eagle',
    'Vulture',
    'Movement',
    'Flint',
    'Rain',
    'Flower'
];

let searchForTrecena = true;
let searchForDaySign = true;
let searchForDayNumber = true;

function toggleTrecena() {
    const elem = document.getElementById('trecena');
    const input = document.getElementById('trecena_choice');
    searchForTrecena = elem.checked;
    if (searchForTrecena) {
        input.style.visibility = 'visible';
    } else {
        input.style.visibility = 'hidden';
    }
}

function toggleDaySign() {
    const elem = document.getElementById('daysign');
    const input = document.getElementById('daysign_choice');
    searchForDaySign = elem.checked;
    if (searchForDaySign) {
        input.style.visibility = 'visible';
    } else {
        input.style.visibility = 'hidden';
    }
}

function toggleDayNumber() {
    const elem = document.getElementById('daynumber');
    const input = document.getElementById('daynumber_choice');
    searchForDayNumber = elem.checked;
    if (searchForDayNumber) {
        input.style.visibility = 'visible';
    } else {
        input.style.visibility = 'hidden';
    }
}

function getStartYMD() {
    const startY = +document.getElementById('startY').value;
    const startM = +document.getElementById('startM').value;
    const startD = +document.getElementById('startD').value;
    return [startY, startM, startD];
}

function getEndYMD() {
    const endY = +document.getElementById('endY').value;
    const endM = +document.getElementById('endM').value;
    const endD = +document.getElementById('endD').value;
    return [endY, endM, endD];
}

function getRecommendedCalendar(YMD) {
    const [Y, M, D] = YMD;
    if (Y > 1582) {
        return 0;
    } else if (Y === 1582) {
        if (M >= 10 || (M === 10 && D >= 4)) {
            return 0;
        } else {
            return 1;
        }
    } else {
        return 1;
    }
}

function setRecommendedStartCalendar() {
    document.getElementById('startCalendar').selectedIndex = getRecommendedCalendar(getStartYMD());
}

function setRecommendedEndCalendar() {
    document.getElementById('endCalendar').selectedIndex = getRecommendedCalendar(getEndYMD());
}

const NUM_DAY_SIGNS = 20;
const NUM_TRECENAS = 20;
const NUM_DAY_NUMBERS = 13;

function div(x, y) {
    return Math.trunc(x / y);
}

// all is pain
function gregorianToJD(Y, M, D) {
    const a = div(M - 14, 12);
    return div(1461 * (Y + 4800 + a), 4) +
         div(367 * (M - 2 - (12 * a)), 12) -
         div(3 * div(Y + 4900 + a, 100), 4) +
         D -
         32075;
}
// (1461 × (Y + 4800 + (M − 14)/12))/4 +(367 × (M − 2 − 12 × ((M − 14)/12)))/12 − (3 × ((Y + 4900 + (M - 14)/12)/100))/4 + D − 32075

function julianToJD(Y, M, D) {
    return 367 * Y -
           div(7 * (Y + 5001 + div(M - 9, 7)), 4) +
           div(275 * M, 9) +
           D +
           1729777;
}
// 367 × Y − (7 × (Y + 5001 + (M − 9)/7))/4 + (275 × M)/9 + D + 1729777

function JDtoYMD(julianDay, calendar) {
    const y = 4716;
    const j = 1401;
    const m = 2;
    const n = 12;
    const r = 4;
    const p = 1461;
    const v = 3;
    const u = 5;
    const s = 153;
    const w = 2;
    const B = 274277;
    const C = -38;
    const gregConstant = div(div(4 * julianDay + B, 146097) * 3, 4) + C;
    let f = julianDay + j;
    if (calendar === 'Gregorian') {
        f += gregConstant;
    }
    const e = r * f + v;
    const g = div(mod(e, p), r);
    const h = u * g + w;
    const D = div(mod(h, s), u) + 1;
    const M = mod(div(h, s) + m, n) + 1;
    const Y = div(e, p) - y + div(n + m - M, n);
    return [Y, M, D];
}

function YMDToJD(Y, M, D, calendar) {
    if (calendar === 'Julian') {
        return julianToJD(Y, M, D);
    } else if (calendar === 'Gregorian') {
        return gregorianToJD(Y, M, D);
    }
}

function mod(x, y) {
    return ((x % y) + y) % y;
}

function JDtoAztec(JD) {
    // our reference date is Aug 13 1521 (julian), the fall of tenochtitlan
    // this corresponded to 1-Coatl of the Coatl Trecena
    const refJD = julianToJD(1521, 8, 13);
    const refTrecena = 4;
    const refDaySign = 4;
    const refDayNumber = 0;

    const distanceToRef = JD - refJD;
    const deltaTrecena = Math.floor((refDayNumber + distanceToRef) / NUM_DAY_NUMBERS);
    const trecena = mod(refTrecena + 13 * deltaTrecena, NUM_TRECENAS);
    const daySign = mod(refDaySign + distanceToRef, NUM_DAY_SIGNS);
    const dayNumber = mod(refDayNumber + distanceToRef, NUM_DAY_NUMBERS);
    return [trecena, daySign, dayNumber];
}

function search() {
    // wipe results div
    document.getElementById('results').innerHTML = '';
    const [startY, startM, startD] = getStartYMD();
    const startCalendar = document.getElementById('startCalendar').value;
    const startJD = YMDToJD(startY, startM, startD, startCalendar);

    const [endY, endM, endD] = getEndYMD();
    const endCalendar = document.getElementById('endCalendar').value;
    const endJD = YMDToJD(endY, endM, endD, endCalendar);

    const trecenaTarget = document.getElementById('trecena_choice').selectedIndex;
    const daySignTarget = document.getElementById('daysign_choice').selectedIndex;
    const dayNumberTarget = document.getElementById('daynumber_choice').value - 1;

    const outputCalendar = document.getElementById('outputCalendar').value;

    let foundResults = false;
    const resultsDiv = document.getElementById('results');
    const h2 = document.createElement('h2');
    h2.innerHTML = 'Search Results';
    resultsDiv.appendChild(h2);

    for (let searchJD = startJD; searchJD <= endJD; searchJD++) {
        const [searchTrecena, searchDaySign, searchDayNumber] = JDtoAztec(searchJD);

        if ((!searchForTrecena || (searchTrecena === trecenaTarget)) &&
            (!searchForDaySign || (searchDaySign === daySignTarget)) &&
            (!searchForDayNumber || (searchDayNumber === dayNumberTarget))) {
            foundResults = true;
            const [resultY, resultM, resultD] = JDtoYMD(searchJD, outputCalendar);
            const resultMonthString = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][resultM - 1];

            const resultString = resultMonthString + ' ' + resultD + ' ' +
            resultY + ' is ' + signs[searchTrecena] + ' ' + (searchDayNumber + 1) +
            '-' + signs[searchDaySign];

            const newElement = document.createElement('h3');
            newElement.innerHTML = resultString;
            resultsDiv.appendChild(newElement);
        }
    }

    if (!foundResults) {
        const newElement = document.createElement('h3');
        newElement.innerHTML = 'No results found!';
        newElement.style.color = '#ff0000';
        resultsDiv.appendChild(newElement);
    }
}
