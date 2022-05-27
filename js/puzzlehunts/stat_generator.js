const colors = [
    '#c04040', '#4040c0', '#40c040', '#c0c040', '#c06b40', '#6b40c0', '#40c0c0',
    '#6bc040', '#c09640', '#9640c0', '#4096c0', '#40c096', '#96c040', '#c040c0',
    '#406bc0', '#40c06b', '#c04096', '#c06bc0', '#6bc06b', '#c0966b', '#c0406b',
    '#c06b96', '#6b96c0', '#96c06b', '#c06b6b', '#964040', '#6b6bc0', '#6bc0c0',
    '#c0c06b', '#966b40', '#966bc0', '#6bc096', '#969640', '#406b40', '#404096',
    '#40966b', '#6b9640', '#406b6b', '#96406b', '#406b96', '#409640', '#40406b',
    '#6b4040', '#964096', '#409696', '#6b406b', '#6b6b40', '#6b4096', '#c09696',
    '#404040', '#966b6b', '#96c0c0', '#c0c096', '#6b6b6b', '#6b9696', '#c096c0',
    '#96c096', '#969696', '#6b6b96', '#6b966b', '#9696c0', '#c0c0c0', '#966b96',
    '#96966b'
];

function trimToTime(timeArray, time) {
    const trimmed = [];
    for (let i = 0; i < timeArray.length; i++) {
        const t = timeArray[i];
        if (t <= time) {
            trimmed.push(t);
        } else {
            return trimmed;
        }
    }
    return trimmed;
}

function updateCurrentTime() {
    const currentTime = document.getElementById('currentTime').value;

    document.getElementById('timeDisplay').innerHTML = startTime.plus({
        seconds: currentTime
    }).toFormat('HH:mm:ss');

    generateRankTable(data, currentTime);

    const rankGraphCanvas = document.getElementById('rankgraph');
    generateGraph(data,
        function(data, currentTime) {
            return getRanks(data, currentTime).map(x => (data.length - x + 1));
        },
        currentTime,
        rankGraphCanvas,
        data.length,
        true
    );

    const solvesGraphCanvas = document.getElementById('solvesgraph');
    generateGraph(data,
        getProportionalPuzzleCount,
        currentTime,
        solvesGraphCanvas,
        puzzles.length,
        false
    );
}

function compareElements(x, y, t, breakTiesAlphabetically) {
    const xTimes = trimToTime(x.times, t);
    const yTimes = trimToTime(y.times, t);

    if (xTimes.length !== yTimes.length) {
        return xTimes.length - yTimes.length; // bigger length wins
    } else {
        const last = xTimes.length - 1;
        if (xTimes[last] !== yTimes[last]) {
            return yTimes[last] - xTimes[last]; // faster time wins
        } else {
            if (breakTiesAlphabetically) {
                // alphabetically first wins
                return y.name.toLowerCase() < x.name.toLowerCase() ? -1 : y.name.toLowerCase() > x.name.toLowerCase();
            } else {
                // tie, for use in rankings
                return 0;
            }
        }
    }
}

function getRanks(data, currentTime) {
    const dataCopy = [...data];
    dataCopy.sort(
        function(x, y) {
            return compareElements(x, y, currentTime, true);
        }
    );

    dataCopy.reverse();
    const ranks = [];
    for (let i = 0; i < data.length; i++) {
        ranks.push(0);
    }
    let currentRank = 1;
    let rankDelta = 0;
    for (let i = 0; i < data.length; i++) {
        const index = data.indexOf(dataCopy[i]);
        ranks[index] = currentRank;
        if (i !== data.length - 1) {
            if (compareElements(dataCopy[i], dataCopy[i + 1], currentTime, false) === 0) {
                rankDelta += 1;
            } else {
                rankDelta = 1;
                currentRank += rankDelta;
            }
        }
    }

    return ranks;
}

function getSolvedCounts(data, currentTime) {
    return data.map(x => trimToTime(x.times, currentTime).length);
}

function getProportionalPuzzleCount(data, currentTime) {
    return data.map(function(x) {
        const times = x.times;
        let index = 0;
        while (index < times.length && times[index] < currentTime) {
            index += 1;
        }
        return index - 1;
    });
}

function generateRankTable(data, currentTime) {
    const table = document.getElementById('ranktable');
    table.innerHTML = '';
    data.sort(
        function(x, y) {
            return compareElements(x, y, currentTime, true);
        }
    );

    data.reverse();

    const ranks = getRanks(data, currentTime);
    const solvedCounts = getSolvedCounts(data, currentTime);

    for (let i = 0; i < data.length; i++) {
        const team = data[i];
        const tr = document.createElement('tr');

        // Rank
        const rank = document.createElement('td');
        rank.innerHTML = ranks[i];

        // Name
        const teamName = document.createElement('td');
        teamName.innerHTML = team.name;
        teamName.style.color = colors[team.id];

        // all puzzle times
        const times = trimToTime(team.times, currentTime);

        // Current Puzzle
        const currentPuzzle = document.createElement('td');
        currentPuzzle.innerHTML = puzzles[solvedCounts[i] - 1];

        // Most Recent Split
        const mostRecentSplit = document.createElement('td');
        mostRecentSplit.innerHTML = luxon.Duration.fromMillis(
            1000 * (currentTime - times[times.length - 1])
        ).toFormat('h:mm:ss');

        tr.appendChild(rank);
        tr.appendChild(teamName);
        tr.appendChild(currentPuzzle);
        tr.appendChild(mostRecentSplit);
        table.appendChild(tr);
    }
}

function drawLine(ctx, from, to, color, width) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(from[0], from[1]);
    ctx.lineTo(to[0], to[1]);
    ctx.stroke();
}

function drawText(ctx, point, color, font, message) {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.fillText(message, point[0], point[1]);
}

const NUM_DATA_POINTS = 50;

function getDrawCoordinate(y, scale, height) {
    return height * (1 - (y / scale));
}

function generateGraph(data, pointGenerator, currentTime, canvas, scale, putShortnamesOnLines) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const graphBound = width * 0.9;
    ctx.clearRect(0, 0, width, height);
    drawLine(ctx, [graphBound, 0], [graphBound, height], '#ffffff', 1);
    for (let i = 1; i <= scale; i++) {
        const lineHeight = height * (i / scale);
        drawLine(ctx, [0, lineHeight], [graphBound, lineHeight], '#ffffff', 1);
    }

    data.sort(
        function(x, y) {
            return compareElements(x, y, currentTime, true);
        }
    );

    let previousData = pointGenerator(data, 0);
    for (let i = 1; i <= NUM_DATA_POINTS; i++) {
        const t = currentTime * (i / NUM_DATA_POINTS);
        const currentData = pointGenerator(data, t);
        for (let teamNum = 0; teamNum < data.length; teamNum++) {
            const oldX = graphBound * ((i - 1) / NUM_DATA_POINTS);
            const oldY = getDrawCoordinate(previousData[teamNum], scale, height);
            const newX = graphBound * (i / NUM_DATA_POINTS);
            const newY = getDrawCoordinate(currentData[teamNum], scale, height);
            const color = colors[data[teamNum].id];
            drawLine(ctx, [oldX, oldY], [newX, newY], color, 1);
        }

        previousData = currentData;
    }

    for (let i = 0; i < data.length; i++) {
        const x = graphBound + 3;
        let y;
        if (putShortnamesOnLines) {
            y = getDrawCoordinate(previousData[i], scale, height) + 8;
        } else {
            y = height * (1 - (i / data.length));
        }
        const color = colors[data[i].id];
        drawText(ctx, [x, y], color, '10px Ariel', data[i].shortname);
    }
}

function generateDifferentialTable(data) {
    const table = document.getElementById('difftable');
    table.innerHTML = '';
    data.sort(
        function(x, y) {
            return compareElements(x, y, 9999999, true);
        }
    );

    data.reverse();
    const head = document.createElement('tr');
    const headers = ['Team Name'].concat(shortPuzzles);
    for (let i = 0; i < headers.length - 1; i++) {
        const th = document.createElement('th');
        th.innerHTML = headers[i];
        head.appendChild(th);
    }
    table.appendChild(head);

    const timeMatrix = data.map(x => x.times.slice(1));
    const minimums = [];
    for (let i = 0; i < puzzles.length - 1; i++) {
        minimums.push(
            timeMatrix.map(x => x[i]).reduce(function(p, v) {
                if (typeof v === 'undefined') {
                    return p;
                } else {
                    return (p < v ? p : v);
                }
            })
        );
    }

    for (let i = 0; i < data.length; i++) {
        const team = data[i];
        const tr = document.createElement('tr');

        // Name
        const teamName = document.createElement('td');
        teamName.innerHTML = team.name;
        teamName.style.color = colors[team.id];
        tr.appendChild(teamName);

        for (let j = 0; j < team.times.length - 1; j++) {
            const time = team.times[j + 1];
            const td = document.createElement('td');
            td.style.textalign = 'center';
            if (time === minimums[j]) {
                td.style.color = 'green';
                td.innerHTML = startTime.plus({
                    seconds: time
                }).toFormat('HH:mm:ss');
            } else {
                const delta = time - minimums[j];
                const formatString = delta > 3600 ? 'h:mm:ss' : 'm:ss';
                td.innerHTML = '+' + luxon.Duration.fromMillis(
                    1000 * (time - minimums[j])
                ).toFormat(formatString);
            }
            tr.appendChild(td);
        }

        table.appendChild(tr);
    }
}

function generateSplitTable(data) {
    const table = document.getElementById('splitstable');
    table.innerHTML = '';
    data.sort(
        function(x, y) {
            return compareElements(x, y, 9999999, true);
        }
    );

    data.reverse();
    const head = document.createElement('tr');
    const headers = ['Team Name'].concat(shortPuzzles);
    for (let i = 0; i < headers.length - 1; i++) {
        const th = document.createElement('th');
        th.innerHTML = headers[i];
        head.appendChild(th);
    }
    table.appendChild(head);

    const splitsMatrix = [];
    for (let i = 0; i < data.length; i++) {
        const times = data[i].times;
        const splits = [];
        for (let j = 0; j < data.length - 1; j++) {
            splits.push(times[j + 1] - times[j]);
        }
        splitsMatrix.push(splits);
    }
    const sortedSplitsByPuzzle = [];
    for (let i = 0; i < puzzles.length - 1; i++) {
        sortedSplitsByPuzzle.push(
            splitsMatrix.map(
                x => x[i]
            ).filter(
                x => !Number.isNaN(x)
            ).sort(
                (a, b) => a - b
            )
        );
    }

    console.log(splitsMatrix);
    console.log(sortedSplitsByPuzzle);
    console.log(typeof splitsMatrix[0][0]);

    const gold = '#C9B037';
    const silver = '#B4B4B4';
    const bronze = '#AD8A56';
    for (let i = 0; i < data.length; i++) {
        const team = data[i];
        const tr = document.createElement('tr');

        // Name
        const teamName = document.createElement('td');
        teamName.innerHTML = team.name;
        teamName.style.color = colors[team.id];
        tr.appendChild(teamName);

        for (let j = 0; j < team.times.length - 1; j++) {
            const time = splitsMatrix[i][j];
            const td = document.createElement('td');

            if (time === sortedSplitsByPuzzle[j][0]) {
                td.style.color = gold;
            } else if (time === sortedSplitsByPuzzle[j][1]) {
                td.style.color = silver;
            } else if (time === sortedSplitsByPuzzle[j][2]) {
                td.style.color = bronze;
            }

            const formatString = time > 3600 ? 'h:mm:ss' : 'm:ss';
            td.innerHTML = luxon.Duration.fromMillis(
                1000 * time
            ).toFormat(formatString);
            tr.appendChild(td);
        }

        table.appendChild(tr);
    }
}
