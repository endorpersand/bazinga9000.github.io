let argamAlphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

BigNumber.config({ALPHABET: argamAlphabet})

let digitNames = [
  "Zero","One","Two","Three","Four","Five","Six","Seven","Eight",
  "Nine","Dess","Ell","Zen","Thise","Zeff","Trick","Tess","Zote","Dine","Ax","Score",
  "Tress","Dell","Flore","Cadex","Quint","Dithe","Trine","Caven","Neve","Kinex",
  "Sode","Twive","Trell","Dote","Kineff","Exent","Mack","Dax","Trithe","Kinoct",
  "Lume","Exeff","Sill","Cadell","Kinove","Diore","Foss","Exoct","Effent","Kiness",
  "Trizote","Cadithe","Sull","Exove","Kinell","Sevoct","Triax","Deve","Clore"
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

function toArgamString(num, base) {
    return new BigNumber(num).toString(base)
}

function toArgamName(num, base) {
    let numberString = new BigNumber(num).toString(base)
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
