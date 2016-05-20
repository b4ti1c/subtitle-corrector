var fs = require('fs');
var path = require('path');
var Converter = require('iconv').Iconv;
var detectCharacterEncoding = require('detect-character-encoding');

var filePath = process.argv[2];
var targetPath = filePath.slice(0, filePath.lastIndexOf('.')) + '-CORRECTED' + filePath.slice(filePath.lastIndexOf('.'));

var fileBuffer = fs.readFileSync(filePath);
var encoding = detectCharacterEncoding(fileBuffer).encoding;
var iconv = new Converter(encoding, 'UTF-8');

console.log('Will try to decode from', encoding);

var rs = fs.createReadStream(filePath);
var ws = fs.createWriteStream(targetPath);

rs.pipe(iconv).pipe(ws);

console.log('Job\'s Done!');
