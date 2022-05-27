function convert() {
    let num = document.getElementById('num').value
    let base = parseInt(document.getElementById('base').value)
    let out = document.getElementById('output')
    let name = document.getElementById('output-name')
    out.innerText = toArgamString(num, base)
    out.className = getCSSClass(num, base)
    name.innerText = toArgamName(num, base)
}