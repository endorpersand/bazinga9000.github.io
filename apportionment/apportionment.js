function clearStates() {
    let metadiv = document.getElementById('state_inputs');
    for (let elem of [...metadiv.children]) {
        metadiv.removeChild(elem);
    }
}


function applyTemplate(json) {
    let metadiv = document.getElementById('state_inputs');

    clearStates();

    for (let elem of json.states) {
        newState(elem.name, elem.population);
    }

    let seats = document.getElementById('seat_number');
    seats.value = json.seats;
}


function newState(name = "New District", population = 2763) {
    let metadiv = document.getElementById('state_inputs')

// create the barebone elements for the row
    let div = document.createElement('div'),     // div that holds the row
        text1 = document.createTextNode('District:'),
        box1 = document.createElement('input'),
        text2 = document.createTextNode('Population:'),
        box2 = document.createElement('input'),
        kill = document.createElement('button'); // kill button

// add element spice (give them attributes and css or whatever)
    div.class = 'state';
    box1.type = 'text';
    box1.value = name
    box2.type = 'number';
    box2.value = population;
    //input.classList.add('colors');
    kill.innerHTML = 'x';

// kill button
    kill.addEventListener('click', e => {
        e.preventDefault();    // i don't remember why i put this here
        metadiv.removeChild(div); // kill the div
    })

// append all things to div and append div to parent
    div.appendChild(text1);
    div.appendChild(box1);
    div.appendChild(text2);
    div.appendChild(box2);
    div.appendChild(kill);
    metadiv.appendChild(div);
}

function apportion() {
    let metadiv = document.getElementById('state_inputs')


    //build district list
    let districts = {};

    for (let elem of [...metadiv.children]) {
        let name = elem.children[0].value;
        let population = elem.children[1].value;

        districts[name] = [Number(population), 0, 0]; //population, seats, priority number
    }

    let seats_to_allocate = document.getElementById('seat_number').value;

    let population_order = Object.keys(districts).sort((a, b) => districts[b][0] - districts[a][0])

    seat_table = []

    //start with extra seats, most population first
    for (i = 0; i < document.getElementById('starting_seats').value; i++) {
        for (let s of population_order) {
            districts[s][1] += 1;
            seats_to_allocate -= 1;
            seat_table.push(s);
            console.log("gave seat to " + s + ". " + seats_to_allocate + " seats left.")
            if (seats_to_allocate == 0) {
                break;
            }
        }
        if (seats_to_allocate == 0) {
            break;
        }
    }

    //use the huntington-hill method to apportion seats
    while (seats_to_allocate > 0) {
        //generate priority numbers
        for (let s of population_order) {
            districts[s][2] = districts[s][0] / Math.sqrt(districts[s][1] * (districts[s][1] + 1)); //p.n = population / sqrt(seats(seats+1))
        }

        //sort by priority number, highest gets the next seat
        let next_seat = Object.keys(districts).sort((a, b) => districts[b][2] - districts[a][2])[0];
        seat_table.push(next_seat);
        districts[next_seat][1] += 1;
        seats_to_allocate -= 1;
        console.log("gave seat to " + next_seat + ". " + seats_to_allocate + " seats left.")


    }

    console.log(districts);
    updateDistrictArray(districts);
    createTable(0);

}


function updateDistrictArray(districts) {
    darray = [];

    //create array of districts
    for (d of Object.keys(districts)) {
        darray.push([d, districts[d][1], districts[d][0], Math.round(districts[d][0]/districts[d][1])])
    }
}

function createTable(sortmode) {
    //reduce old table to atoms
    let oldtable = document.getElementById('apportionment_table');
    if (oldtable !== null) {oldtable.outerHTML = "";}


    console.log(darray);
    console.log(sortmode);

    if (oldsortmode != sortmode) {
        darray.sort(function(a,b){return a[sortmode] > b[sortmode];});
        descending = false;
    } else {
        darray.reverse();
        descending = !descending;
    }

    let tbl = document.createElement('table');
    tbl.setAttribute('class','apportionment_table');
    tbl.setAttribute('id','apportionment_table');

    let head = document.createElement('thead');
    let tr = document.createElement('tr');
    let arr = ["District","Seats", "Population","Citizens per Seat"];
    for (var i = 0; i < arr.length; i++) {
        let th = document.createElement('th');
        let text = arr[i];
        if (i == sortmode) {
            if (descending) {
                text += " ▼"
            } else {
                text += " ▲"
            }
        }
        th.appendChild(document.createTextNode(text));
        th.sortmode = i;
        th.onclick = function(){createTable(th.sortmode);}
        tr.appendChild(th);
    }
    head.appendChild(tr);
    tbl.appendChild(head);

    let body = document.createElement('tbody');

    let color = 0
    for (d of darray) {
        let r = document.createElement('tr');
        if (color % 2 == 0) {r.setAttribute("class","light-color-row");}
        color = (color + 1)%2
        for (c of d) {
            let td = document.createElement('td');
            td.appendChild(document.createTextNode(c));
            r.appendChild(td);
        }
        body.appendChild(r);
    }
    tbl.appendChild(body);


    document.getElementById('meta').appendChild(tbl);


    oldsortmode = sortmode;
}


function uploadCustomTemplate() {
  let template = prompt("Paste the template here");
  if (template != null || template != "") {
    applyTemplate(JSON.parse(template))
  }
}


function exportTemplate() {

    let template = new Object();

    let districts = [];

    let metadiv = document.getElementById('state_inputs')
    for (let elem of [...metadiv.children]) {
        let district = new Object();

        district.name = elem.children[0].value;
        district.population = elem.children[1].value;

        districts.push(district);
    }

    let seats = document.getElementById('seat_number').value;

    template.seats = seats;
    template.states = districts;

    return JSON.stringify(template);


}


oldsortmode = -1;
descending = false;
