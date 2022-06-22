const argamAlphabet = String.fromCharCode(...Array.from({length: 480}, (_, i) => 0xE000 + i));

BigNumber.config({ ALPHABET: argamAlphabet });

const digitNames = [
    'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight',
    'Nine', 'Dess', 'Ell', 'Zen', 'Thise', 'Zeff', 'Trick', 'Tess', 'Zote', 'Dine', 'Ax', 'Score',
    'Tress', 'Dell', 'Flore', 'Cadex', 'Quint', 'Dithe', 'Trine', 'Caven', 'Neve', 'Kinex',
    'Sode', 'Twive', 'Trell', 'Dote', 'Kineff', 'Exent', 'Mack', 'Dax', 'Trithe', 'Kinoct',
    'Lume', 'Exeff', 'Sill', 'Cadell', 'Kinove', 'Diore', 'Foss', 'Exoct', 'Effent', 'Kiness',
    'Trizote', 'Cadithe', 'Sull', 'Exove', 'Kinell', 'Sevoct', 'Triax', 'Deve', 'Clore', 'Shock',
    'Ark', 'Disode', 'Senove', 'Octent', 'Kinithe', 'Exell', 'Kale', 'Cazote', 'Triore', 'Sevess',
    'Calse', 'Octove', 'Scand', 'Dimack', 'Kinchick', 'Catax', 'Sevell', 'Exithe', 'Tite', 'Octess',
    'Novent', 'Dilume', 'Van', 'Sezzen', 'Kinote', 'Dill', 'Trinue', 'Octell', 'Crome', 'Novess',
    'Sevithe', 'Cadore', 'Trisode', 'Doss', 'Kinax', 'Extess', 'Mang', 'Seneff', 'Novell', 'Dessent',
    'Ferr', 'Exote', 'Cobe', 'Octithe', 'Setrick', 'Disull', 'Nick', 'Catrine', 'Cupe', 'Desell',
    'Trimack', 'Setess', 'Zinn', 'Exax', 'Kinore', 'Cadeve', 'Novithe', 'Diclore', 'Sevote', 'Hund',

    /*
  // dear reader of my source code:
  // the following may or may not be correct, to be honest
  // i found no official resources for the ismarragam naming scheme above 120
  // believe it or not, i got these from some random wikipedia that goes into
  // >800. thankfully, the font only goes up to 480 so i don't have to deal with
  // the creator of this list's terrible choice in naming primes after oganesson
  //
  // i got these from here, if you're really curious
  // https://ex515.fandom.com/wiki/List_of_numbers
  // nb: the page will say any prime >= 401 has an incorrect atomic number.
  // the page is wrong. i checked myself.
  //
  // if you, dear reader, find a better source, please just submit an issue on
  // the github repo for this website at
  // https://github.com/Bazinga9000/bazinga9000.github.io
  //
  // There was also at least one error in the page, the one that i caught:
  // digit 477 (3×3×53) was erroniously given the name "noclore" (3×3×59). I
  // have changed this to "nosull", as it should be. Unsure how many other errors
  // there are.
  // Exark and Sevark (6×61, 7×61) were erroniously spelled with "g", that has been
  // fixed too.
  // if you happen to find another error, submit an issue and i will be eternally
  // greatful
  //
  */

    'Ellent', 'Diark', 'Trilume', 'Casode', 'Kincue', 'Sedine', 'Gall', 'Tweven',
    'Trisill', 'Desithe', 'Gerr', 'Ellzen', 'Sevax', 'Dikale', 'Kintrine', 'Octote',
    'Arsen', 'Exflore', 'Selene', 'Sescore', 'Trifoss', 'Dicalse', 'Ellithe', 'Zenent',
    'Kineve', 'Discand', 'Effintri', 'Camack', 'Brome', 'Exquint', 'Krypt', 'Octax',
    'Nozote', 'Ellzeff', 'Kinsode', 'Zenithe', 'Rube', 'Ditite', 'Trisull', 'Kintrive',
    'Seflore', 'Extrine', 'Stront', 'Calume', 'Elltrick', 'Divan', 'Yttr', 'Cadexeff',
    'Thisent', 'Desote', 'Novax', 'Casill', 'Zirk', 'Exneve', 'Sequint', 'Elltess',
    'Triclore', 'Dicrome', 'Niobe', 'Scorove', 'Molyb', 'Zeffithe', 'Triark', 'Octflore',
    'Kinmack', 'Exsode', 'Ellzote', 'Cafoss', 'Setrine', 'Dessax', 'Technes', 'Tritwex',
    'Ruthe', 'Dimang', 'Trickithe', 'Zeffent', 'Rhode', 'Elldine', 'Pallade', 'Ocquint',
    'Trikale', 'Diferr', 'Seneve', 'Zenzote', 'Kinlume', 'Dicobe', 'Noflore', 'Thitess',
    'Ellax', 'Kinexeff', 'Argene', 'Casull', 'Tricalse', 'Dinick', 'Kinsill', 'Excue',
    'Sesode', 'Dicupe', 'Triscand', 'Scorell', 'Thizote', 'Exmack', 'Cadme', 'Setwive',
    'Trickent', 'Dizinn', 'Inde', 'Zenax', 'Stane', 'Desflore', 'Elltress', 'Octneve',
    'Stibe', 'Thidine', 'Kinfoss', 'Caclore', 'Tritite', 'Zeffzote', 'Tellure', 'Kinexoct',
    'Iode', 'Ellindi', 'Thrive', 'Cadark', 'Effinkin', 'Exlume', 'Thisax', 'Octsode',
    'Trivan', 'Desquint', 'Xene', 'Exineff', 'Ellflore', 'Digall', 'Trickote', 'Tweight',
    'Caese', 'Exsill', 'Semack', 'Scorithe', 'Noneve', 'Digerr', 'Bare', 'Cadexell',
    'Kinsull', 'Zeffax', 'Tricrome', 'Cakale', 'Lanthe', 'Kinexove', 'Cere', 'Tresszote',
    'Thitress', 'Diarsen', 'Ellquint', 'Zenflore', 'Prase', 'Diselene', 'Nosode', 'Kinsevoct',
    'Neode', 'Exfoss', 'Promethe', 'Cacalse', 'Trickax', 'Thidell', 'Selume', 'Notwive',
    'Zotent', 'Desneve', 'Trimang', 'Cascand', 'Samare', 'Effinex', 'Kinclore', 'Octmack',
    'Elltrine', 'Dibrome', 'Thiflore', 'Scortrick', 'Sesill', 'Dikrypt', 'Triferr', 'Tessax',
    'Kinark', 'Zotdine', 'Europ', 'Cadsevell', 'Tricobe', 'Dessode', 'Gadole', 'Cadexithe',
    'Terbe', 'Dirube', 'Kinsenove', 'Catite', 'Dyspre', 'Exsull', 'Ellneve', 'Kintwex',
    'Trinick', 'Zefflore', 'Zotax', 'Dinent', 'Thiquint', 'Distront', 'Tricupe', 'Octlume',
    'Sefoss', 'Kinexell', 'Holme', 'Cavan', 'Nomack', 'Diyttr', 'Kinkale', 'Exsevoct',
    'Erbe', 'Thisindi', 'Trizinn', 'Scorzote', 'Ellsode', 'Dinax', 'Effcue', 'Octsill',
    'Trickflore', 'Dizirk', 'Thule', 'Zeneve', 'Ytterbe', 'Zeffquint', 'Thitrine', 'Elltwive',
    'Lutete', 'Exclore', 'Kincalse', 'Cacrome', 'Zotress', 'Diniobe', 'Hafne', 'Kinoctove',
    'Axent', 'Dimolyb', 'Ellintri', 'Cadsevithe', 'Kinscand', 'Exark', 'Tante', 'Tressflore',
    'Nolume', 'Desmack', 'Sesull', 'Zensode', 'Wolfre', 'Zotdell', 'Trickquint', 'Octfoss',
    'Thineve', 'Exsenove', 'Rhene', 'Scorax', 'Trigall', 'Ditechness', 'Osme', 'Tritweven',
    'Kinsevell', 'Diruthe', 'Nosill', 'Camang', 'Iride', 'Kinexithe', 'Zotflore', 'Effinoct',
    'Trigerr', 'Dirhode', 'Kintite', 'Exinell', 'Plate', 'Dipallade', 'Axtress', 'Scorent',
    'Aure', 'Exkale', 'Thisode', 'Caferr', 'Novinkin', 'Zeffneve', 'Ellmack', 'Cadexote',
    'Hydrare', 'Deslume', 'Triarsen', 'Cacobe', 'Seclore', 'Dinflore', 'Kinvan', 'Thitwive',
    'Triselene', 'Axdell', 'Thale', 'Scoretress', 'Plumb', 'Diargene', 'Nofoss', 'Octsull',
    'Zotquint', 'Excalse', 'Sevark', 'Canick', 'Thitrell', 'Desill', 'Bisme', 'Tesstrine',
    'Polone', 'Zeffsode', 'Trickneve', 'Cacupe', 'Axflore', 'Exscand', 'Astate', 'Kinoctell',
    'Tressent', 'Zotdithe', 'Rad', 'Zenmack', 'Kincrome', 'Dicadme', 'Tribrome', 'Setwex',
    'Frane', 'Trickindi', 'Ellume', 'Cazinn', 'Trikrypt', 'Dinde', 'Kinsevithe', 'Cadexax',
    'Rade', 'Distane', 'Zotrine', 'Scorflore', 'Actin', 'Exsevell', 'Thore', 'Tessneve',
    'Tricksode', 'Distibe', 'Prote', 'Exinithe', 'Sekale', 'Desfoss', 'Trirube', 'Octclore',
    'Ellsill', 'Extite', 'Axquint', 'Cadsevote', 'Nosull', 'Ditellure', 'Uran'
];

console.log(digitNames.length);

const suffixes = [
    '', 'ta', 'un', 'zand', 'myr', 'lak', 'cro'
];

for (let i = suffixes.length; i < digitNames.length; i++) {
    suffixes.push('-' + parse_suffix(digitNames[i].toLowerCase(), 'pow'));
}

function parse_suffix(name, suffix) {
    if (suffix == '') return name;
    const consonants = 'bcdfghjklmnpqrstvwxyz';
    const vowels = 'aeiou';
    while (name[name.length - 1] == name[name.length - 2]) {
        name = name.slice(0, -1);
    }

    while (name[name.length - 1] == suffix[0]) {
        suffix = suffix.substring(1);
    }
    return name + suffix;
}

function getCSSClass(num, base) {
    const n = new BigNumber(num);
    if (n.isNaN()) {
        return 'error';
    }

    if (!n.isFinite() || base <= 62) {
        return 'argam';
    }

    return 'argam-large';
}

function toArgamString(num, base) {
    const n = new BigNumber(num);
    if (n.isFinite()) {
        return n.toString(base);
    }

    if (n.isNaN()) {
        return 'NaN';
    }

    return (n.isPositive() ? '∞' : '-∞');
}

function toArgamName(num, base) {
    const val = new BigNumber(num);
    if (val.isNaN()) {
        return 'Not a Number';
    }
    let numberString = val.toString(base);
    let name = '';
    if (numberString[0] == '-') {
        name += 'Negative ';
        numberString = numberString.substring(1);
    }

    let decimalPointLocation = numberString.indexOf('.');
    const hasDecimal = (decimalPointLocation != -1);
    if (decimalPointLocation == -1) {
        decimalPointLocation = numberString.length;
    }

    const getSuffix = (x) => (x < suffixes.length ? suffixes[x] : '(' + x + ')');

    for (let i = 0; i < numberString.length; i++) {
        let index;
        if (i < decimalPointLocation) {
            index = decimalPointLocation - i - 1;
        } else if (i > decimalPointLocation) {
            index = numberString.length - 1 - i;
        } else {
            name += ' and ';
            continue;
        }

        if (numberString[i] == '0' && numberString != '0' && !hasDecimal) {
            continue;
        }

        const suffix = getSuffix(index);

        const n = digitNames[argamAlphabet.indexOf(numberString[i])];
        name += parse_suffix(n, suffix) + ' ';
    }

    const trailingDecimalDigitCount = numberString.length - decimalPointLocation;
    if (trailingDecimalDigitCount != 0) {
        name += ' in ';
        const suffix = getSuffix(trailingDecimalDigitCount - 1);
        name += parse_suffix('One', suffix) + ' ';
    }

    return name.slice(0, -1);
}
