const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The file currently has: onclick="this.parentElement.style.display='none'"
// We want: onclick="this.parentElement.style.display=\\'none\\'"
let bad = 'display=' + String.fromCharCode(39) + 'none' + String.fromCharCode(39);
let good = 'display=' + String.fromCharCode(92, 39) + 'none' + String.fromCharCode(92, 39);

html = html.replace(bad, good);
fs.writeFileSync('index.html', html);
console.log('Fixed syntax error in index.html with single backslash escape');
