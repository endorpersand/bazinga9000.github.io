let argamAlphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

BigNumber.config({ALPHABET: argamAlphabet})

let digitNames = [
  "Zero","One","Two","Three","Four","Five","Six","Seven","Eight",
  "Nine","Dess","Ell","Zen","Thise","Zeff","Trick","Tess","Zote","Dine","Ax","Score",
  "Tress","Dell","Flore","Cadex","Quint","Dithe","Trine","Caven","Neve","Kinex",
  "Sode","Twive","Trell","Dote","Kineff","Exent","Mack","Dax","Trithe","Kinoct",
  "Lume","Exeff","Sill","Cadell","Kinove","Diore","Foss","Exoct","Effent","Kiness",
  "Trizote","Cadithe","Sull","Exove","Kinell","Sevoct","Triax","Deve","Clore","Shock",
  "Ark","Disode","Senove","Octent","Kinithe","Exell","Kale","Cazote","Triore","Sevess",
  "Calse","Octove","Scand","Dimack","Kinchick","Catax","Sevell","Exithe","Tite","Octess",
  "Novent","Dilume","Van","Sezzen","Kinote","Dill","Trinue","Octell","Crome","Novess",
  "Sevithe","Cadore","Trisode","Doss","Kinax","Extess","Mang","Seneff","Novell","Dessent",
  "Ferr","Exote","Cobe","Octithe","Setrick","Disull","Nick","Catrine","Cupe","Desell",
  "Trimack","Setess","Zinn","Exax","Kinore","Cadeve","Novithe","Diclore","Sevote","Hund"
]
let suffixes = [
  "","ta","un","zand","myr","lak","cro"
]

for (let i = suffixes.length; i < digitNames.length; i++) {
    suffixes.push("-" + parse_suffix(digitNames[i].toLowerCase(),"pow"))
}


function parse_suffix(name, suffix) {
    if (suffix == "") return name;
    let consonants = "bcdfghjklmnpqrstvwxyz";
    let vowels = "aeiou";
    while (name[name.length-1] == name[name.length-2]) {
        name = name.slice(0,-1);
    }

    while (name[name.length - 1] == suffix[0]) {
        suffix = suffix.substring(1);
    }
    return name + suffix;
}

function getCSSClass(num, base) {
    const n = new BigNumber(num);
    if (n.isNaN()) {
        return "error";
    }

    if (!n.isFinite() || base <= 132) {
        return "argam";
    }

    return "argam-large";
}

function toArgamString(num, base) {
    const n = new BigNumber(num)
    if (n.isFinite()) {
        return n.toString(base);
    }

    if (n.isNaN()) {
        return "NaN";
    }

    return (n.isPositive() ? "∞" : "-∞")
}

function toArgamName(num, base) {
    let val = new BigNumber(num)
    if (val.isNaN()) {
        return "Not a Number";
    }
    let numberString = val.toString(base)
    let name = ""
    if (numberString[0] == "-") {
        name += "Negative "
        numberString = numberString.substring(1)
    }

    let decimalPointLocation = numberString.indexOf(".");
    let hasDecimal = (decimalPointLocation != -1)
    if (decimalPointLocation == -1) {
        decimalPointLocation = numberString.length
    }

    let getSuffix = ((x) => (x < suffixes.length ? suffixes[x] : "(" + x + ")"))

    for (let i = 0; i < numberString.length; i++) {
        let index
        if (i < decimalPointLocation) {
            index = decimalPointLocation - i - 1
        } else if (i > decimalPointLocation) {
            index = numberString.length - 1 - i
        } else {
            name += " and "
            continue
        }

        if (numberString[i] == "0" && numberString != "0" && !hasDecimal) {
            continue
        }

        let suffix = getSuffix(index)

        const n = digitNames[argamAlphabet.indexOf(numberString[i])]
        name += parse_suffix(n, suffix) + " "
    }

    const trailingDecimalDigitCount = numberString.length - decimalPointLocation
    if (trailingDecimalDigitCount != 0) {
        name += " in "
        let suffix = getSuffix(trailingDecimalDigitCount - 1)
        name += parse_suffix("One",suffix) + " "
    }

    return name.slice(0,-1)
}
