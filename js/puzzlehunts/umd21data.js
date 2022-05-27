const puzzles = [
    'Track Stadium (1)',
    'Art Gallery (2)',
    'International Cafeteria (3)',
    'Tennyson Hall (4)',
    'Pemput Hall (5)',
    'Memory Palace (6)',
    'Unfinished Math Problem (7)',
    'Potioneering Lab (8)',
    'Kepler Hall (9)',
    'Culinary School (10)',
    'Greenhouse (11)',
    'Testudo\'s Exorcism (M)',
    'Finished (\u2605)'
];

const shortPuzzles = [
    'Track', 'Art', 'Cafe', 'Tennyson', 'Pemput', 'Memory', 'Math',
    'Potions', 'Kepler', 'Culinary', 'Greenhouse', 'Meta', '\u2605'
];
const startTime = luxon.DateTime.fromISO('2021-10-24T10:30:00');

const data = [{
    name: 'Group of Yee Type',
    shortname: 'YEE',
    id: 0,
    times: [0, 861, 1262, 1875, 2684, 3391, 4885, 5608, 6404, 7980, 8942, 15018, 16763]
}, {
    name: 'Potato Pie',
    shortname: 'POTP',
    id: 1,
    times: [0, 823, 1545, 2554, 3796, 4420, 5523, 7739, 9141, 10500, 11898, 17087, 19797]
}, {
    name: 'methwazord',
    shortname: 'METH',
    id: 2,
    times: [0, 891, 1830, 2478, 3048, 3761, 5715, 6358, 7826, 10196, 11230, 16140, 20979]
}, {
    name: 'The Pussy Punishers',
    shortname: 'PP',
    id: 3,
    times: [0, 779, 1226, 1966, 2574, 3213, 4203, 5343, 6548, 7451, 8634, 13108, 22586]
}, {
    name: 'Puzzle Aces',
    shortname: 'ACES',
    id: 4,
    times: [0, 816, 2037, 2533, 3441, 7199, 8786, 10520, 12275, 13368, 16427, 19226, 23120]
}, {
    name: 'Irrational State Machines',
    shortname: 'ISM',
    id: 5,
    times: [0, 908, 2116, 2739, 4015, 4756, 5964, 8274, 10169, 11305, 12435, 16959, 23816]
}, {
    name: 'Team of the Mean',
    shortname: 'MEAN',
    id: 6,
    times: [0, 852, 1243, 2707, 6350, 7217, 9313, 12031, 13687, 15479, 16786, 20071, 24576]
}, {
    name: 'Unknown',
    shortname: 'UKWN',
    id: 7,
    times: [0, 833, 1337, 2411, 3063, 3812, 5268, 7034, 8582, 11410, 12692, 19068, 25076]
}, {
    name: 'Turing Test Subjects',
    shortname: 'TTS',
    id: 8,
    times: [0, 843, 1449, 2359, 3719, 4587, 5508, 6657, 8339, 9724, 11427, 17988, 25100]
}, {
    name: 'Learned it in Kindergarten',
    shortname: 'LIIK',
    id: 9,
    times: [0, 1016, 2075, 2768, 3293, 4139, 5209, 8624, 10539, 12537, 13875, 16984, 25294]
}, {
    name: 'The Marlins and the Trout',
    shortname: 'MRLN',
    id: 10,
    times: [0, 974, 1843, 2991, 3886, 4888, 7722, 10833, 12188, 15107, 16752, 21218, 26111]
}, {
    name: 'Fruities',
    shortname: 'FRUT',
    id: 11,
    times: [0, 899, 1424, 3175, 4711, 6035, 7374, 8820, 11726, 14979, 16736, 20091, 26166]
}, {
    name: 'Brotatoes in the Shell',
    shortname: 'BROS',
    id: 12,
    times: [0, 808, 1391, 1843, 3267, 6010, 8797, 11575, 12943, 16354, 17944, 23700, 27273]
}, {
    name: 'scared hamsters',
    shortname: 'SHAM',
    id: 13,
    times: [0, 794, 1346, 2920, 3697, 6820, 7869, 11615, 14228, 16621, 18193, 24985, 28241]
}, {
    name: 'Boo Crew',
    shortname: 'BOO',
    id: 14,
    times: [0, 928, 2304, 4268, 5800, 10659, 11974, 14150, 15857, 18190, 20192, 26898, 29613]
}, {
    name: 'Dodd-o Dynamite \u{1F9E8} ',
    shortname: 'DYN',
    id: 15,
    times: [0, 921, 2445, 4549, 5315, 8186, 10395, 12038, 15063, 19911, 22746]
}, {
    name: 'The Squids',
    shortname: 'SQUD',
    id: 16,
    times: [0, 1047, 2717, 4326, 4911, 7799, 10097, 14580, 16795, 20439, 23408]
}, {
    name: 'One True Puzzle',
    shortname: 'OTP',
    id: 17,
    times: [0, 1029, 1934, 4435, 6644, 9315, 11991, 15237, 18060, 21952, 24041]
}, {
    name: 'Goon Platoon',
    shortname: 'GOON',
    id: 18,
    times: [0, 935, 1816, 2937, 3759, 5791, 7777, 8714, 10125]
}, {
    name: 'Herman for prez',
    shortname: 'HERM',
    id: 19,
    times: [0, 947, 2587, 5250, 7170, 9207, 10767, 14609, 18677]
}, {
    name: 'C9',
    shortname: 'C9',
    id: 20,
    times: [0, 1091, 2098, 5050, 6176, 8801, 11305, 14658]
}, {
    name: 'JADMAV',
    shortname: 'JAD',
    id: 21,
    times: [0, 982, 2001, 3148, 5440, 8327, 10569]
}, {
    name: 'Kertudo',
    shortname: 'KERT',
    id: 22,
    times: [0, 995, 3065, 4239, 6680, 12086, 13272]
}];
